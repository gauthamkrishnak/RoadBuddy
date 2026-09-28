from sqlalchemy import Column, String, Integer, Float, Boolean, Text, DateTime
from datetime import datetime
from database import Base

class UserModel(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    role = Column(String, default="passenger") # passenger, driver, fleet, admin
    avatar = Column(String, nullable=True)
    rating = Column(Float, default=5.0)
    emergency_contacts_json = Column(Text, nullable=True) # stored as JSON string
    status = Column(String, default="active")
    joined_date = Column(String, nullable=True)

class VehicleModel(Base):
    __tablename__ = "vehicles"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False) # Taxi, Rental Car, Traveller Van, Tourist Bus
    registration_number = Column(String, nullable=False)
    capacity = Column(Integer, default=4)
    price_per_km = Column(Float, default=15.0)
    base_fare = Column(Float, default=100.0)
    image = Column(String, nullable=True)
    eta = Column(String, default="5 mins")
    status = Column(String, default="available") # available, in_transit, maintenance, offline
    driver_name = Column(String, nullable=True)
    location = Column(String, nullable=True)
    rating = Column(Float, default=4.8)

class BookingModel(Base):
    __tablename__ = "bookings"

    id = Column(String, primary_key=True, index=True)
    passenger_id = Column(String, index=True, nullable=False)
    passenger_name = Column(String, nullable=False)
    passenger_phone = Column(String, nullable=False)
    pickup = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    vehicle_type = Column(String, nullable=False)
    vehicle_name = Column(String, nullable=False)
    fare = Column(Float, nullable=False)
    distance = Column(String, nullable=False)
    eta = Column(String, nullable=False)
    status = Column(String, default="pending") # pending, accepted, arrived, in_progress, completed, cancelled
    driver_id = Column(String, nullable=True)
    driver_name = Column(String, nullable=True)
    driver_phone = Column(String, nullable=True)
    driver_rating = Column(Float, nullable=True)
    driver_photo = Column(String, nullable=True)
    vehicle_number = Column(String, nullable=True)
    date = Column(String, nullable=False)
    time = Column(String, nullable=False)
    payment_method = Column(String, default="UPI")
    payment_status = Column(String, default="pending")
    is_scheduled = Column(Boolean, default=False)
    recurring_frequency = Column(String, default="none")

class EmergencyAlertModel(Base):
    __tablename__ = "emergencies"

    id = Column(String, primary_key=True, index=True)
    passenger_id = Column(String, index=True, nullable=False)
    passenger_name = Column(String, nullable=False)
    passenger_phone = Column(String, nullable=False)
    type = Column(String, nullable=False) # Ambulance, Police, Fire & Rescue, Other Emergency
    location = Column(String, nullable=False)
    timestamp = Column(String, nullable=False)
    status = Column(String, default="Notified") # Notified, Dispatched, Resolved, Cancelled
    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)
    assigned_responder = Column(String, nullable=True)

class RoadsideRequestModel(Base):
    __tablename__ = "roadside_requests"

    id = Column(String, primary_key=True, index=True)
    passenger_id = Column(String, index=True, nullable=False)
    passenger_name = Column(String, nullable=False)
    service_type = Column(String, nullable=False) # Towing, Fuel Delivery, Flat Tyre, Battery Support, Mechanical Repair
    location = Column(String, nullable=False)
    description = Column(String, nullable=False)
    status = Column(String, default="finding") # finding, assigned, in_progress, completed, cancelled
    provider_name = Column(String, nullable=True)
    provider_phone = Column(String, nullable=True)
    eta = Column(String, nullable=True)
    timestamp = Column(String, nullable=False)
    cost = Column(Float, default=0.0)

class TransactionModel(Base):
    __tablename__ = "transactions"

    id = Column(String, primary_key=True, index=True)
    booking_id = Column(String, nullable=True)
    description = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    date = Column(String, nullable=False)
    method = Column(String, nullable=False)
    status = Column(String, default="Successful")
    type = Column(String, default="ride")

class DriverModel(Base):
    __tablename__ = "drivers"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    vehicle = Column(String, nullable=False)
    status = Column(String, default="Available")
    rating = Column(Float, default=5.0)
    trips = Column(Integer, default=0)
    today_earnings = Column(Float, default=0.0)
    weekly_earnings = Column(Float, default=0.0)
    monthly_earnings = Column(Float, default=0.0)
    is_online = Column(Boolean, default=True)
