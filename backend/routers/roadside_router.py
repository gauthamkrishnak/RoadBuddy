from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import random

from database import get_db
from models import RoadsideRequestModel, TransactionModel
from schemas import RoadsideCreate, RoadsideStatusUpdate, RoadsideResponse

router = APIRouter(prefix="/api/roadside", tags=["Roadside Assistance"])

def roadside_to_response(r: RoadsideRequestModel) -> RoadsideResponse:
    return RoadsideResponse(
        id=r.id,
        passengerId=r.passenger_id,
        passengerName=r.passenger_name,
        serviceType=r.service_type,
        location=r.location,
        description=r.description,
        status=r.status,
        providerName=r.provider_name,
        providerPhone=r.provider_phone,
        eta=r.eta,
        timestamp=r.timestamp,
        cost=r.cost
    )

@router.get("", response_model=List[RoadsideResponse])
def get_roadside_requests(db: Session = Depends(get_db)):
    requests = db.query(RoadsideRequestModel).order_by(RoadsideRequestModel.id.desc()).all()
    return [roadside_to_response(r) for r in requests]

@router.post("", response_model=RoadsideResponse)
def create_roadside_request(data: RoadsideCreate, db: Session = Depends(get_db)):
    now = datetime.now()
    timestamp_str = now.strftime("%Y-%m-%d %I:%M %p")
    date_str = now.strftime("%Y-%m-%d")
    new_id = f"RS-{random.randint(100, 999)}"

    new_req = RoadsideRequestModel(
        id=new_id,
        passenger_id=data.passengerId,
        passenger_name=data.passengerName,
        service_type=data.serviceType,
        location=data.location,
        description=data.description,
        status="assigned",
        provider_name="Kochi Express Roadside Mechanics",
        provider_phone="+91 98950 44556",
        eta="12 mins",
        timestamp=timestamp_str,
        cost=500.0
    )
    db.add(new_req)

    # Automatically log payment transaction
    new_txn = TransactionModel(
        id=f"TXN-{random.randint(10000, 99999)}",
        booking_id=new_id,
        description=f"Roadside Assistance: {data.serviceType}",
        amount=500.0,
        date=date_str,
        method="UPI",
        status="Successful",
        type="roadside"
    )
    db.add(new_txn)

    db.commit()
    db.refresh(new_req)
    return roadside_to_response(new_req)

@router.put("/{request_id}/status", response_model=RoadsideResponse)
def update_roadside_status(request_id: str, data: RoadsideStatusUpdate, db: Session = Depends(get_db)):
    req = db.query(RoadsideRequestModel).filter(RoadsideRequestModel.id == request_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="Roadside request not found")

    req.status = data.status
    if data.providerName:
        req.provider_name = data.providerName
    if data.providerPhone:
        req.provider_phone = data.providerPhone
    if data.eta:
        req.eta = data.eta
    if data.cost is not None:
        req.cost = data.cost

    db.commit()
    db.refresh(req)
    return roadside_to_response(req)

@router.put("/{request_id}/cancel", response_model=RoadsideResponse)
def cancel_roadside_request(request_id: str, db: Session = Depends(get_db)):
    req = db.query(RoadsideRequestModel).filter(RoadsideRequestModel.id == request_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="Roadside request not found")

    req.status = "cancelled"
    db.commit()
    db.refresh(req)
    return roadside_to_response(req)
