import json
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import UserModel
from schemas import UserRegister, UserLogin, UserUpdate, UserResponse, TokenResponse
from auth import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["Auth"])

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
        rating=user.rating,
        emergencyContacts=contacts,
        status=user.status,
        joinedDate=user.joined_date
    )

@router.post("/register", response_model=TokenResponse)
def register(data: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(UserModel).filter(UserModel.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_id = f"usr_{data.role}_{int(db.query(UserModel).count() + 1)}"
    new_user = UserModel(
        id=user_id,
        name=data.name,
        email=data.email,
        hashed_password=hash_password(data.password),
        phone=data.phone,
        role=data.role,
        avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
        rating=5.0,
        status="active",
        joined_date="2026-09-28"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({"sub": new_user.id, "role": new_user.role})
    return TokenResponse(access_token=token, user=user_to_response(new_user))

@router.post("/login", response_model=TokenResponse)
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.email == data.email).first()

    # Convenience role switcher fallback if email is like passenger@roadbuddy.ai / driver / admin / fleet
    if not user:
        if "driver" in data.email:
            user = db.query(UserModel).filter(UserModel.role == "driver").first()
        elif "fleet" in data.email:
            user = db.query(UserModel).filter(UserModel.role == "fleet").first()
        elif "admin" in data.email:
            user = db.query(UserModel).filter(UserModel.role == "admin").first()
        elif "gautham" in data.email or "passenger" in data.email:
            user = db.query(UserModel).filter(UserModel.role == "passenger").first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token({"sub": user.id, "role": user.role})
    return TokenResponse(access_token=token, user=user_to_response(user))

@router.get("/me", response_model=UserResponse)
def get_me(current_user: UserModel = Depends(get_current_user)):
    return user_to_response(current_user)

@router.put("/profile", response_model=UserResponse)
def update_profile(data: UserUpdate, current_user: UserModel = Depends(get_current_user), db: Session = Depends(get_db)):
    if data.name:
        current_user.name = data.name
    if data.email:
        current_user.email = data.email
    if data.phone:
        current_user.phone = data.phone
    if data.role:
        current_user.role = data.role
    if data.avatar:
        current_user.avatar = data.avatar

    db.commit()
    db.refresh(current_user)
    return user_to_response(current_user)
