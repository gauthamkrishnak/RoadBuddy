from fastapi import APIRouter
from schemas import AIChatRequest, AIChatResponse

router = APIRouter(prefix="/api/ai", tags=["AI Assistant"])

@router.post("/chat", response_model=AIChatResponse)
def ai_chat(data: AIChatRequest):
    text = data.message.lower()

    if "book" in text or "ride" in text or "cab" in text or "taxi" in text:
        return AIChatResponse(
            text="I can help you book a ride right now! Select your pickup and destination in our Ride Booking section.",
            actionButtons=[
                {"label": "Book a Ride Now", "route": "/passenger/book-ride"},
                {"label": "View Available Vehicles", "route": "/passenger/book-ride"}
            ]
        )
    elif "emergency" in text or "sos" in text or "accident" in text or "police" in text or "ambulance" in text:
        return AIChatResponse(
            text="⚠️ EMERGENCY MODE ACTIVATED: If you are in immediate danger or need medical assistance, tap below to dispatch emergency responders and alert your emergency contacts.",
            actionButtons=[
                {"label": "Trigger Emergency SOS", "route": "/passenger/emergency"}
            ]
        )
    elif "breakdown" in text or "flat" in text or "tyre" in text or "tow" in text or "fuel" in text or "roadside" in text:
        return AIChatResponse(
            text="RoadBuddy provides 24/7 Roadside Assistance for flat tyres, towing, battery jumpstarts, and fuel delivery. Would you like to request help?",
            actionButtons=[
                {"label": "Request Roadside Assistance", "route": "/passenger/roadside"}
            ]
        )
    elif "schedule" in text or "later" in text:
        return AIChatResponse(
            text="You can schedule rides in advance or set up recurring daily/weekly commutes with top-rated drivers.",
            actionButtons=[
                {"label": "Schedule a Ride", "route": "/passenger/scheduled-rides"}
            ]
        )
    elif "payment" in text or "fare" in text or "history" in text or "cost" in text:
        return AIChatResponse(
            text="Our pricing is transparent: Base fare starting from ₹100 + ₹18/km for taxis, and ₹24/km for premium sedans. You can pay via UPI, Card, or Wallet.",
            actionButtons=[
                {"label": "View Payment History", "route": "/passenger/payments"}
            ]
        )
    else:
        return AIChatResponse(
            text=f"I'm your RoadBuddy AI Assistant! I can help you book rides, schedule trips, call 24/7 roadside assistance, or trigger emergency SOS alerts. How can I assist you today?",
            actionButtons=[
                {"label": "Book a Ride", "route": "/passenger/book-ride"},
                {"label": "Emergency SOS", "route": "/passenger/emergency"},
                {"label": "Roadside Assistance", "route": "/passenger/roadside"}
            ]
        )
