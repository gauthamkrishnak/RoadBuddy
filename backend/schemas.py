from pydantic import BaseModel, EmailStr
from typing import Optional, List

# User Schemas
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: str
    role: str = "passenger"

class UserLogin(BaseModel):
    email: str
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    role: Optional[str] = None
    avatar: Optional[str] = None
    status: Optional[str] = None

class EmergencyContact(BaseModel):
    id: str
    name: str
    relationship: str
    phone: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    role: str
    avatar: Optional[str] = None
    rating: Optional[float] = 5.0
    emergencyContacts: Optional[List[EmergencyContact]] = []
    status: Optional[str] = "active"
    joinedDate: Optional[str] = None

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Vehicle Schemas
class VehicleCreate(BaseModel):
    name: str
    type: str
    registrationNumber: str
    capacity: int = 4
    pricePerKm: float = 15.0
    baseFare: float = 100.0
    image: Optional[str] = None
    eta: Optional[str] = "5 mins"
    status: Optional[str] = "available"
    driverName: Optional[str] = None
    location: Optional[str] = None

class VehicleUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    registrationNumber: Optional[str] = None
    capacity: Optional[int] = None
    pricePerKm: Optional[float] = None
    baseFare: Optional[float] = None
    image: Optional[str] = None
    eta: Optional[str] = None
    status: Optional[str] = None
    driverName: Optional[str] = None
    location: Optional[str] = None

class VehicleResponse(BaseModel):
    id: str
    name: str
    type: str
    registrationNumber: str
    capacity: int
    pricePerKm: float
    baseFare: float
    image: str
    eta: str
    status: str
    driverName: Optional[str] = None
    location: Optional[str] = None
    rating: Optional[float] = 4.8

    class Config:
        from_attributes = True

# Booking Schemas
class BookingCreate(BaseModel):
    passengerId: str
    passengerName: str
    passengerPhone: str
    pickup: str
    destination: str
    vehicleType: str
    vehicleName: str
    fare: float
    distance: str
    eta: str
    paymentMethod: str = "UPI"
    isScheduled: Optional[bool] = False
    recurringFrequency: Optional[str] = "none"

class BookingStatusUpdate(BaseModel):
    status: str

class BookingResponse(BaseModel):
    id: str
    passengerId: str
    passengerName: str
    passengerPhone: str
    pickup: str
    destination: str
    vehicleType: str
    vehicleName: str
    fare: float
    distance: str
    eta: str
    status: str
    driverId: Optional[str] = None
    driverName: Optional[str] = None
    driverPhone: Optional[str] = None
    driverRating: Optional[float] = None
    driverPhoto: Optional[str] = None
    vehicleNumber: Optional[str] = None
    date: str
    time: str
    paymentMethod: str
    paymentStatus: str
    isScheduled: Optional[bool] = False
    recurringFrequency: Optional[str] = "none"

    class Config:
        from_attributes = True

# Emergency Schemas
class EmergencyCreate(BaseModel):
    passengerId: str
    passengerName: str
    passengerPhone: str
    type: str
    location: str
    lat: Optional[float] = None
    lng: Optional[float] = None

class EmergencyStatusUpdate(BaseModel):
    status: str
    assignedResponder: Optional[str] = None

class EmergencyResponse(BaseModel):
    id: str
    passengerId: str
    passengerName: str
    passengerPhone: str
    type: str
    location: str
    timestamp: str
    status: str
    lat: Optional[float] = None
    lng: Optional[float] = None
    assignedResponder: Optional[str] = None

    class Config:
        from_attributes = True

# Roadside Assistance Schemas
class RoadsideCreate(BaseModel):
    passengerId: str
    passengerName: str
    serviceType: str
    location: str
    description: str

class RoadsideStatusUpdate(BaseModel):
    status: str
    providerName: Optional[str] = None
    providerPhone: Optional[str] = None
    eta: Optional[str] = None
    cost: Optional[float] = None

class RoadsideResponse(BaseModel):
    id: str
    passengerId: str
    passengerName: str
    serviceType: str
    location: str
    description: str
    status: str
    providerName: Optional[str] = None
    providerPhone: Optional[str] = None
    eta: Optional[str] = None
    timestamp: str
    cost: Optional[float] = None

    class Config:
        from_attributes = True

# Transaction Schemas
class TransactionCreate(BaseModel):
    bookingId: Optional[str] = None
    description: str
    amount: float
    method: str
    status: str = "Successful"
    type: str = "ride"

class TransactionResponse(BaseModel):
    id: str
    bookingId: Optional[str] = None
    description: str
    amount: float
    date: str
    method: str
    status: str
    type: str

    class Config:
        from_attributes = True

# Driver Schemas
class DriverCreate(BaseModel):
    name: str
    phone: str
    vehicle: str
    status: str = "Available"

class DriverUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    vehicle: Optional[str] = None
    status: Optional[str] = None
    isOnline: Optional[bool] = None

class DriverResponse(BaseModel):
    id: str
    name: str
    phone: str
    vehicle: str
    status: str
    rating: float
    trips: int
    todayEarnings: float = 0.0
    weeklyEarnings: float = 0.0
    monthlyEarnings: float = 0.0
    isOnline: bool = True

    class Config:
        from_attributes = True

# AI Assistant Schemas
class AIChatRequest(BaseModel):
    message: str

class AIChatResponse(BaseModel):
    text: str
    actionButtons: Optional[List[dict]] = None
