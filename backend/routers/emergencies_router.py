from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import random

from database import get_db
from models import EmergencyAlertModel
from schemas import EmergencyCreate, EmergencyStatusUpdate, EmergencyResponse

router = APIRouter(prefix="/api/emergencies", tags=["Emergencies"])

def emergency_to_response(e: EmergencyAlertModel) -> EmergencyResponse:
    return EmergencyResponse(
        id=e.id,
        passengerId=e.passenger_id,
        passengerName=e.passenger_name,
        passengerPhone=e.passenger_phone,
        type=e.type,
        location=e.location,
        timestamp=e.timestamp,
        status=e.status,
        lat=e.lat,
        lng=e.lng,
        assignedResponder=e.assigned_responder
    )

@router.get("", response_model=List[EmergencyResponse])
def get_emergencies(db: Session = Depends(get_db)):
    emergencies = db.query(EmergencyAlertModel).order_by(EmergencyAlertModel.id.desc()).all()
    return [emergency_to_response(e) for e in emergencies]

@router.post("", response_model=EmergencyResponse)
def trigger_emergency(data: EmergencyCreate, db: Session = Depends(get_db)):
    now = datetime.now()
    timestamp_str = now.strftime("%Y-%m-%d %I:%M %p")
    new_id = f"EMG-{random.randint(100, 999)}"

    responder = f"Kerala Emergency Response Unit #{random.randint(10, 99)}"

    new_alert = EmergencyAlertModel(
        id=new_id,
        passenger_id=data.passengerId,
        passenger_name=data.passengerName,
        passenger_phone=data.passengerPhone,
        type=data.type,
        location=data.location,
        timestamp=timestamp_str,
        status="Notified",
        lat=data.lat,
        lng=data.lng,
        assigned_responder=responder
    )
    db.add(new_alert)
    db.commit()
    db.refresh(new_alert)
    return emergency_to_response(new_alert)

@router.put("/{emergency_id}/status", response_model=EmergencyResponse)
def update_emergency_status(emergency_id: str, data: EmergencyStatusUpdate, db: Session = Depends(get_db)):
    alert = db.query(EmergencyAlertModel).filter(EmergencyAlertModel.id == emergency_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Emergency alert not found")

    alert.status = data.status
    if data.assignedResponder:
        alert.assigned_responder = data.assignedResponder

    db.commit()
    db.refresh(alert)
    return emergency_to_response(alert)

@router.put("/{emergency_id}/cancel", response_model=EmergencyResponse)
def cancel_emergency(emergency_id: str, db: Session = Depends(get_db)):
    alert = db.query(EmergencyAlertModel).filter(EmergencyAlertModel.id == emergency_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Emergency alert not found")

    alert.status = "Cancelled"
    db.commit()
    db.refresh(alert)
    return emergency_to_response(alert)
