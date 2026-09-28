from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
import json

from database import get_db
from models import UserModel
from schemas import UserResponse, UserUpdate

router = APIRouter(prefix="/api/users", tags=["Users"])

def user_to_response(user: UserModel) -> UserResponse:
    contacts = []
    if user.emergency_contacts_json:
        try:
            contacts = json.loads(user.emergency_contacts_json)
        except Exception:
            contacts = []
    return UserResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        phone=user.phone,
        role=user.role,
        avatar=user.avatar,
        rating=user.rating or 5.0,
        emergencyContacts=contacts,
        status=user.status or "active",
        joinedDate=user.joined_date
    )

@router.get("", response_model=List[UserResponse])
def get_users(role: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(UserModel)
    if role:
        query = query.filter(UserModel.role == role)
    users = query.all()
    return [user_to_response(u) for u in users]

@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: str, data: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if data.name: user.name = data.name
    if data.email: user.email = data.email
    if data.phone: user.phone = data.phone
    if data.role: user.role = data.role
    if data.status: user.status = data.status

    db.commit()
    db.refresh(user)
    return user_to_response(user)

@router.delete("/{user_id}")
def delete_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}
