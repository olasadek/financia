from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date

class Category(BaseModel):
    id: int
    name: str

class Merchant(BaseModel):
    id: int
    name: str

class Expense(BaseModel):
    id: int
    amount: float
    date: date
    category_id: int
    merchant_id: Optional[int] = None
    description: Optional[str] = None

class Subscription(BaseModel):
    id: int
    name: str
    amount: float
    next_payment_date: date
    active: bool = True

class SavingsGoal(BaseModel):
    id: int
    name: str
    target_amount: float
    current_amount: float = 0.0
    due_date: Optional[date] = None 