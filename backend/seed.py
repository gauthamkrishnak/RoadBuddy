import json
from database import engine, Base, SessionLocal
from models import (
    UserModel, VehicleModel, BookingModel, EmergencyAlertModel,
    RoadsideRequestModel, TransactionModel, DriverModel
)
from auth import hash_password

def seed_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Seed Users if empty
        if db.query(UserModel).count() == 0:
            print("Seeding Users...")
            default_password_hash = hash_password("password123")
            users_data = [
                {
                    "id": "usr_1",
                    "name": "Gautham S.",
                    "email": "gautham@roadbuddy.ai",
                    "hashed_password": default_password_hash,
                    "phone": "+91 98765 43210",
                    "role": "passenger",
                    "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
                    "rating": 4.9,
                    "emergency_contacts_json": json.dumps([
                        {"id": "c1", "name": "Anjali Sharma", "relationship": "Sister", "phone": "+91 98950 12345"},
                        {"id": "c2", "name": "Rajesh Kumar", "relationship": "Father", "phone": "+91 94470 67890"}
                    ]),
                    "status": "active",
                    "joined_date": "2025-11-12"
                },
                {
                    "id": "usr_2",
                    "name": "Priya Menon",
                    "email": "priya@gmail.com",
                    "hashed_password": default_password_hash,
                    "phone": "+91 98450 22334",
                    "role": "passenger",
                    "status": "active",
                    "joined_date": "2026-01-05"
                },
                {
                    "id": "usr_driver_1",
                    "name": "Rahul Verma (Driver)",
                    "email": "rahul.driver@roadbuddy.ai",
                    "hashed_password": default_password_hash,
                    "phone": "+91 98470 11223",
                    "role": "driver",
                    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
                    "rating": 4.92,
                    "status": "active",
                    "joined_date": "2025-08-20"
                },
                {
                    "id": "usr_fleet_1",
                    "name": "Apex Fleet Operations",
                    "email": "fleet@apexfleet.in",
                    "hashed_password": default_password_hash,
                    "phone": "+91 98950 00112",
                    "role": "fleet",
                    "status": "active",
                    "joined_date": "2025-06-15"
                },
                {
                    "id": "usr_admin_1",
                    "name": "Admin Ops HQ",
                    "email": "admin@roadbuddy.ai",
                    "hashed_password": default_password_hash,
                    "phone": "+91 99000 11223",
                    "role": "admin",
                    "status": "active",
                    "joined_date": "2025-01-01"
                }
            ]

            for u in users_data:
                db.add(UserModel(**u))

        # Seed Vehicles
        if db.query(VehicleModel).count() == 0:
            print("Seeding Vehicles...")
            vehicles_data = [
                {
                    "id": "v1",
                    "name": "RoadBuddy Mini Taxi",
                    "type": "Taxi",
                    "registration_number": "KL 07 CC 4521",
                    "capacity": 4,
                    "price_per_km": 18,
                    "base_fare": 100,
                    "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
                    "eta": "4 mins",
                    "status": "available",
                    "driver_name": "Vikram Nair",
                    "location": "MG Road, Kochi",
                    "rating": 4.85
                },
                {
                    "id": "v2",
                    "name": "RoadBuddy Sedan Premier",
                    "type": "Rental Car",
                    "registration_number": "KL 01 BT 8890",
                    "capacity": 4,
                    "price_per_km": 24,
                    "base_fare": 150,
                    "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600",
                    "eta": "6 mins",
                    "status": "available",
                    "driver_name": "Rahul Verma",
                    "location": "Kaloor, Kochi",
                    "rating": 4.92
                },
                {
                    "id": "v3",
                    "name": "RoadBuddy Luxury Cruiser",
                    "type": "Rental Car",
                    "registration_number": "KL 07 CA 9001",
                    "capacity": 5,
                    "price_per_km": 35,
                    "base_fare": 250,
                    "image": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600",
                    "eta": "8 mins",
                    "status": "available",
                    "driver_name": "Mathew Thomas",
                    "location": "Vytilla, Kochi",
                    "rating": 4.98
                },
                {
                    "id": "v4",
                    "name": "Force Traveller Van Deluxe",
                    "type": "Traveller Van",
                    "registration_number": "KL 08 AS 3322",
                    "capacity": 12,
                    "price_per_km": 42,
                    "base_fare": 500,
                    "image": "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=600",
                    "eta": "12 mins",
                    "status": "available",
                    "driver_name": "Suresh Kumar",
                    "location": "Palarivattom, Kochi",
                    "rating": 4.79
                },
                {
                    "id": "v5",
                    "name": "Volvo Multi-Axle Tourist Bus",
                    "type": "Tourist Bus",
                    "registration_number": "KL 07 CH 7788",
                    "capacity": 45,
                    "price_per_km": 85,
                    "base_fare": 2500,
                    "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600",
                    "eta": "25 mins",
                    "status": "available",
                    "driver_name": "Anil K.",
                    "location": "Edappally, Kochi",
                    "rating": 4.88
                }
            ]

            for v in vehicles_data:
                db.add(VehicleModel(**v))

        # Seed Bookings
        if db.query(BookingModel).count() == 0:
            print("Seeding Bookings...")
            bookings_data = [
                {
                    "id": "BK-9042",
                    "passenger_id": "usr_1",
                    "passenger_name": "Gautham S.",
                    "passenger_phone": "+91 98765 43210",
                    "pickup": "InfoPark, Kakkanad, Kochi",
                    "destination": "Cochin International Airport (COK)",
                    "vehicle_type": "Rental Car",
                    "vehicle_name": "RoadBuddy Sedan Premier",
                    "fare": 850,
                    "distance": "28.4 km",
                    "eta": "35 mins",
                    "status": "in_progress",
                    "driver_id": "drv_1",
                    "driver_name": "Rahul Verma",
                    "driver_phone": "+91 98470 11223",
                    "driver_rating": 4.92,
                    "driver_photo": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
                    "vehicle_number": "KL 01 BT 8890",
                    "date": "2026-09-01",
                    "time": "10:30 AM",
                    "payment_method": "UPI",
                    "payment_status": "paid",
                    "is_scheduled": False,
                    "recurring_frequency": "none"
                },
                {
                    "id": "BK-8821",
                    "passenger_id": "usr_1",
                    "passenger_name": "Gautham S.",
                    "passenger_phone": "+91 98765 43210",
                    "pickup": "MG Road, Kochi",
                    "destination": "Bhavans Vidya Mandir",
                    "vehicle_type": "Traveller Van",
                    "vehicle_name": "Force Traveller Van Deluxe",
                    "fare": 5400,
                    "distance": "128 km",
                    "eta": "3 hrs 45 mins",
                    "status": "pending",
                    "driver_id": "drv_2",
                    "driver_name": "Suresh Kumar",
                    "driver_phone": "+91 97450 99887",
                    "driver_rating": 4.8,
                    "driver_photo": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
                    "vehicle_number": "KL 08 AS 3322",
                    "date": "2026-09-03",
                    "time": "06:00 AM",
                    "payment_method": "Credit/Debit Card",
                    "payment_status": "paid",
                    "is_scheduled": True,
                    "recurring_frequency": "none"
                },
                {
                    "id": "BK-7712",
                    "passenger_id": "usr_1",
                    "passenger_name": "Gautham S.",
                    "passenger_phone": "+91 98765 43210",
                    "pickup": "Marine Drive, Kochi",
                    "destination": "Lulu Mall, Edappally",
                    "vehicle_type": "Taxi",
                    "vehicle_name": "RoadBuddy Mini Taxi",
                    "fare": 280,
                    "distance": "9.2 km",
                    "eta": "20 mins",
                    "status": "completed",
                    "driver_id": "drv_3",
                    "driver_name": "Vikram Nair",
                    "driver_phone": "+91 98951 77665",
                    "driver_rating": 4.85,
                    "driver_photo": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
                    "vehicle_number": "KL 07 CC 4521",
                    "date": "2026-08-28",
                    "time": "04:15 PM",
                    "payment_method": "UPI",
                    "payment_status": "paid",
                    "is_scheduled": False,
                    "recurring_frequency": "none"
                }
            ]
            for b in bookings_data:
                db.add(BookingModel(**b))

        # Seed Emergencies
        if db.query(EmergencyAlertModel).count() == 0:
            print("Seeding Emergencies...")
            db.add(EmergencyAlertModel(
                id="EMG-102",
                passenger_id="usr_1",
                passenger_name="Gautham S.",
                passenger_phone="+91 98765 43210",
                type="Ambulance",
                location="NH 544 Near Aluva Flyover, Kochi",
                timestamp="2026-09-01 08:30 AM",
                status="Notified",
                assigned_responder="Kerala Emergency Services Patrol Unit #14"
            ))

        # Seed Roadside Requests
        if db.query(RoadsideRequestModel).count() == 0:
            print("Seeding Roadside Requests...")
            db.add(RoadsideRequestModel(
                id="RS-409",
                passenger_id="usr_1",
                passenger_name="Gautham S.",
                service_type="Flat Tyre",
                location="Kalamassery Toll Plaza, Kochi",
                description="Rear right tyre punctured. Spare wheel available.",
                status="in_progress",
                provider_name="Kochi QuickAssist Tow & Repair",
                provider_phone="+91 98460 88990",
                eta="14 mins",
                timestamp="2026-09-01 09:10 AM",
                cost=450.0
            ))

        # Seed Drivers
        if db.query(DriverModel).count() == 0:
            print("Seeding Drivers...")
            drivers_data = [
                {"id": "drv_1", "name": "Rahul Verma", "phone": "+91 98470 11223", "vehicle": "KL 01 BT 8890", "status": "On Trip", "rating": 4.92, "trips": 1420, "today_earnings": 3450, "weekly_earnings": 18400, "monthly_earnings": 72000, "is_online": True},
                {"id": "drv_2", "name": "Suresh Kumar", "phone": "+91 97450 99887", "vehicle": "KL 08 AS 3322", "status": "Available", "rating": 4.80, "trips": 890, "today_earnings": 1200, "weekly_earnings": 9500, "monthly_earnings": 41000, "is_online": True},
                {"id": "drv_3", "name": "Vikram Nair", "phone": "+91 98951 77665", "vehicle": "KL 07 CC 4521", "status": "Available", "rating": 4.85, "trips": 2150, "today_earnings": 2100, "weekly_earnings": 14200, "monthly_earnings": 58000, "is_online": True},
                {"id": "drv_4", "name": "Mathew Thomas", "phone": "+91 94460 33445", "vehicle": "KL 07 CA 9001", "status": "Maintenance", "rating": 4.98, "trips": 3100, "today_earnings": 0, "weekly_earnings": 16000, "monthly_earnings": 65000, "is_online": False},
                {"id": "drv_5", "name": "Anil K.", "phone": "+91 98461 44556", "vehicle": "KL 07 CH 7788", "status": "Available", "rating": 4.88, "trips": 640, "today_earnings": 4500, "weekly_earnings": 22000, "monthly_earnings": 80000, "is_online": True},
            ]
            for d in drivers_data:
                db.add(DriverModel(**d))

        # Seed Transactions
        if db.query(TransactionModel).count() == 0:
            print("Seeding Transactions...")
            txns_data = [
                {"id": "TXN-99881", "booking_id": "BK-9042", "description": "Ride to Cochin International Airport", "amount": 850, "date": "2026-09-01", "method": "UPI", "status": "Successful", "type": "ride"},
                {"id": "TXN-99842", "booking_id": "BK-7712", "description": "City Trip: Marine Drive to Lulu Mall", "amount": 280, "date": "2026-08-28", "method": "UPI", "status": "Successful", "type": "ride"},
                {"id": "TXN-99710", "booking_id": "RS-409", "description": "Roadside Assistance - Flat Tyre Service", "amount": 450, "date": "2026-08-25", "method": "Wallet", "status": "Successful", "type": "roadside"}
            ]
            for t in txns_data:
                db.add(TransactionModel(**t))

        db.commit()
        print("Database seeded successfully.")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
