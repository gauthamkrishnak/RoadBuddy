import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from seed import seed_db

from routers.auth_router import router as auth_router
from routers.bookings_router import router as bookings_router
from routers.emergencies_router import router as emergencies_router
from routers.roadside_router import router as roadside_router
from routers.vehicles_router import router as vehicles_router
from routers.drivers_router import router as drivers_router
from routers.users_router import router as users_router
from routers.ai_router import router as ai_router
from routers.payments_router import router as payments_router

# Initialize database tables
Base.metadata.create_all(bind=engine)

# Seed initial data if empty
seed_db()

app = FastAPI(
    title="RoadBuddy Backend API",
    description="Full-featured FastAPI Backend for RoadBuddy Taxi, Emergency SOS, Roadside Assistance & Fleet Platform",
    version="1.0.0"
)

# CORS middleware for React frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(auth_router)
app.include_router(bookings_router)
app.include_router(emergencies_router)
app.include_router(roadside_router)
app.include_router(vehicles_router)
app.include_router(drivers_router)
app.include_router(users_router)
app.include_router(ai_router)
app.include_router(payments_router)

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "RoadBuddy Backend API", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
