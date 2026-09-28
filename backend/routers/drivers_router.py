from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import time

from database import get_db
from models import DriverModel
from schemas import DriverCreate, DriverUpdate, DriverResponse

router = APIRouter(prefix="/api/drivers", tags=["Drivers"])

def driver_to_response(d: DriverModel) -> DriverResponse:
    return DriverResponse(
        id=d.id,
        name=d.name,
        phone=d.phone,
        vehicle=d.vehicle,
        status=d.status,
        rating=d.rating or 5.0,
        trips=d.trips or 0,
        todayEarnings=d.today_earnings or 0.0,
        weeklyEarnings=d.weekly_earnings or 0.0,
        monthlyEarnings=d.monthly_earnings or 0.0,
        isOnline=d.is_online if d.is_online is not None else True
    )

@router.get("", response_model=List[DriverResponse])
def get_drivers(db: Session = Depends(get_db)):
    drivers = db.query(DriverModel).all()
    return [driver_to_response(d) for d in drivers]

@router.post("", response_model=DriverResponse)
def create_driver(data: DriverCreate, db: Session = Depends(get_db)):
    new_id = f"drv_{int(time.time())}"
    new_driver = DriverModel(
        id=new_id,
        name=data.name,
        phone=data.phone,
        vehicle=data.vehicle,
        status=data.status or "Available",
        rating=5.0,
        trips=0,
        today_earnings=0.0,
        weekly_earnings=0.0,
        monthly_earnings=0.0,
        is_online=True
    )
    db.add(new_driver)
    db.commit()
    db.refresh(new_driver)
    return driver_to_response(new_driver)

@router.put("/{driver_id}", response_model=DriverResponse)
def update_driver(driver_id: str, data: DriverUpdate, db: Session = Depends(get_db)):
    driver = db.query(DriverModel).filter(DriverModel.id == driver_id).first()
    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")

    if data.name is not None: driver.name = data.name
    if data.phone is not None: driver.phone = data.phone
    if data.vehicle is not None: driver.vehicle = data.vehicle
    if data.status is not None: driver.status = data.status
    if data.isOnline is not None: driver.is_online = data.isOnline

    db.commit()
    db.refresh(driver)
    return driver_to_response(driver)

@router.put("/{driver_id}/toggle-online", response_model=DriverResponse)
def toggle_online(driver_id: str, db: Session = Depends(get_db)):
    driver = db.query(DriverModel).filter(DriverModel.id == driver_id).first()
    if not driver:
        # Fall back to default driver
        driver = db.query(DriverModel).first()
        if not driver:
            raise HTTPException(status_code=404, detail="Driver not found")

    driver.is_online = not driver.is_online
    db.commit()
    db.refresh(driver)
    return driver_to_response(driver)

@router.delete("/{driver_id}")
def delete_driver(driver_id: str, db: Session = Depends(get_db)):
    driver = db.query(DriverModel).filter(DriverModel.id == driver_id).first()
    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")

    db.delete(driver)
    db.commit()
    return {"message": "Driver deleted successfully"}
