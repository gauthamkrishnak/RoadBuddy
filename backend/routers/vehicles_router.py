from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
import time

from database import get_db
from models import VehicleModel
from schemas import VehicleCreate, VehicleUpdate, VehicleResponse

router = APIRouter(prefix="/api/vehicles", tags=["Vehicles"])

def vehicle_to_response(v: VehicleModel) -> VehicleResponse:
    return VehicleResponse(
        id=v.id,
        name=v.name,
        type=v.type,
        registrationNumber=v.registration_number,
        capacity=v.capacity,
        pricePerKm=v.price_per_km,
        baseFare=v.base_fare,
        image=v.image or "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
        eta=v.eta or "5 mins",
        status=v.status,
        driverName=v.driver_name,
        location=v.location,
        rating=v.rating or 4.8
    )

@router.get("", response_model=List[VehicleResponse])
def get_vehicles(vehicle_type: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(VehicleModel)
    if vehicle_type:
        query = query.filter(VehicleModel.type == vehicle_type)
    vehicles = query.all()
    return [vehicle_to_response(v) for v in vehicles]

@router.post("", response_model=VehicleResponse)
def create_vehicle(data: VehicleCreate, db: Session = Depends(get_db)):
    new_id = f"v_{int(time.time())}"
    new_veh = VehicleModel(
        id=new_id,
        name=data.name,
        type=data.type,
        registration_number=data.registrationNumber,
        capacity=data.capacity,
        price_per_km=data.pricePerKm,
        base_fare=data.baseFare,
        image=data.image or "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
        eta=data.eta or "5 mins",
        status=data.status or "available",
        driver_name=data.driverName,
        location=data.location or "Kochi Central",
        rating=4.8
    )
    db.add(new_veh)
    db.commit()
    db.refresh(new_veh)
    return vehicle_to_response(new_veh)

@router.put("/{vehicle_id}", response_model=VehicleResponse)
def update_vehicle(vehicle_id: str, data: VehicleUpdate, db: Session = Depends(get_db)):
    veh = db.query(VehicleModel).filter(VehicleModel.id == vehicle_id).first()
    if not veh:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    if data.name is not None: veh.name = data.name
    if data.type is not None: veh.type = data.type
    if data.registrationNumber is not None: veh.registration_number = data.registrationNumber
    if data.capacity is not None: veh.capacity = data.capacity
    if data.pricePerKm is not None: veh.price_per_km = data.pricePerKm
    if data.baseFare is not None: veh.base_fare = data.baseFare
    if data.image is not None: veh.image = data.image
    if data.eta is not None: veh.eta = data.eta
    if data.status is not None: veh.status = data.status
    if data.driverName is not None: veh.driver_name = data.driverName
    if data.location is not None: veh.location = data.location

    db.commit()
    db.refresh(veh)
    return vehicle_to_response(veh)

@router.delete("/{vehicle_id}")
def delete_vehicle(vehicle_id: str, db: Session = Depends(get_db)):
    veh = db.query(VehicleModel).filter(VehicleModel.id == vehicle_id).first()
    if not veh:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    db.delete(veh)
    db.commit()
    return {"message": "Vehicle deleted successfully"}
