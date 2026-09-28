from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
import random

from database import get_db
from models import BookingModel, TransactionModel
from schemas import BookingCreate, BookingStatusUpdate, BookingResponse

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])

def booking_to_response(b: BookingModel) -> BookingResponse:
    return BookingResponse(
        id=b.id,
        passengerId=b.passenger_id,
        passengerName=b.passenger_name,
        passengerPhone=b.passenger_phone,
        pickup=b.pickup,
        destination=b.destination,
        vehicleType=b.vehicle_type,
        vehicleName=b.vehicle_name,
        fare=b.fare,
        distance=b.distance,
        eta=b.eta,
        status=b.status,
        driverId=b.driver_id,
        driverName=b.driver_name,
        driverPhone=b.driver_phone,
        driverRating=b.driver_rating,
        driverPhoto=b.driver_photo,
        vehicleNumber=b.vehicle_number,
        date=b.date,
        time=b.time,
        paymentMethod=b.payment_method,
        paymentStatus=b.payment_status,
        isScheduled=b.is_scheduled,
        recurringFrequency=b.recurring_frequency
    )

@router.get("", response_model=List[BookingResponse])
def get_bookings(role: Optional[str] = None, status: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(BookingModel)
    if status:
        query = query.filter(BookingModel.status == status)
    bookings = query.order_by(BookingModel.id.desc()).all()
    return [booking_to_response(b) for b in bookings]

@router.post("", response_model=BookingResponse)
def create_booking(data: BookingCreate, db: Session = Depends(get_db)):
    today = datetime.now()
    date_str = today.strftime("%Y-%m-%d")
    time_str = today.strftime("%I:%M %p")

    new_id = f"BK-{random.randint(1000, 9999)}"

    new_booking = BookingModel(
        id=new_id,
        passenger_id=data.passengerId,
        passenger_name=data.passengerName,
        passenger_phone=data.passengerPhone,
        pickup=data.pickup,
        destination=data.destination,
        vehicle_type=data.vehicleType,
        vehicle_name=data.vehicleName,
        fare=data.fare,
        distance=data.distance,
        eta=data.eta,
        status="accepted",
        driver_id="drv_1",
        driver_name="Rahul Verma",
        driver_phone="+91 98470 11223",
        driver_rating=4.92,
        driver_photo="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        vehicle_number="KL 01 BT 8890",
        date=date_str,
        time=time_str,
        payment_method=data.paymentMethod,
        payment_status="paid",
        is_scheduled=data.isScheduled or False,
        recurring_frequency=data.recurringFrequency or "none"
    )

    db.add(new_booking)

    # Automatically create a successful payment transaction
    new_txn = TransactionModel(
        id=f"TXN-{random.randint(10000, 99999)}",
        booking_id=new_id,
        description=f"Ride: {data.pickup} to {data.destination}",
        amount=data.fare,
        date=date_str,
        method=data.paymentMethod,
        status="Successful",
        type="ride"
    )
    db.add(new_txn)

    db.commit()
    db.refresh(new_booking)
    return booking_to_response(new_booking)

@router.put("/{booking_id}/status", response_model=BookingResponse)
def update_status(booking_id: str, data: BookingStatusUpdate, db: Session = Depends(get_db)):
    booking = db.query(BookingModel).filter(BookingModel.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    booking.status = data.status
    db.commit()
    db.refresh(booking)
    return booking_to_response(booking)

@router.put("/{booking_id}/cancel", response_model=BookingResponse)
def cancel_booking(booking_id: str, db: Session = Depends(get_db)):
    booking = db.query(BookingModel).filter(BookingModel.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    booking.status = "cancelled"
    db.commit()
    db.refresh(booking)
    return booking_to_response(booking)
