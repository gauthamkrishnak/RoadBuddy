from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import random

from database import get_db
from models import TransactionModel
from schemas import TransactionCreate, TransactionResponse

router = APIRouter(prefix="/api/payments", tags=["Payments"])

def txn_to_response(t: TransactionModel) -> TransactionResponse:
    return TransactionResponse(
        id=t.id,
        bookingId=t.booking_id,
        description=t.description,
        amount=t.amount,
        date=t.date,
        method=t.method,
        status=t.status,
        type=t.type
    )

@router.get("/transactions", response_model=List[TransactionResponse])
def get_transactions(db: Session = Depends(get_db)):
    txns = db.query(TransactionModel).order_by(TransactionModel.id.desc()).all()
    return [txn_to_response(t) for t in txns]

@router.post("/transactions", response_model=TransactionResponse)
def create_transaction(data: TransactionCreate, db: Session = Depends(get_db)):
    today_str = datetime.now().strftime("%Y-%m-%d")
    new_txn = TransactionModel(
        id=f"TXN-{random.randint(10000, 99999)}",
        booking_id=data.bookingId,
        description=data.description,
        amount=data.amount,
        date=today_str,
        method=data.method,
        status=data.status or "Successful",
        type=data.type or "ride"
    )
    db.add(new_txn)
    db.commit()
    db.refresh(new_txn)
    return txn_to_response(new_txn)
