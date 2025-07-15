from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from backend.schemas import Expense, Category, Merchant, Subscription, SavingsGoal
from datetime import date
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Allow CORS for local development (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for expenses, categories, merchants, subscriptions, savings goals
expenses_db = []
expense_id_counter = 1
categories_db = []
category_id_counter = 1
merchants_db = []
merchant_id_counter = 1
subscriptions_db = []
subscription_id_counter = 1
savings_goals_db = []
savings_goal_id_counter = 1

app.mount("/", StaticFiles(directory="static", html=True), name="static")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Financia FastAPI backend!"}

@app.get("/expenses", response_model=List[Expense])
def list_expenses():
    return expenses_db

@app.post("/expenses", response_model=Expense)
def create_expense(expense: Expense):
    global expense_id_counter
    expense.id = expense_id_counter
    expenses_db.append(expense)
    expense_id_counter += 1
    return expense

@app.put("/expenses/{expense_id}", response_model=Expense)
def update_expense(expense_id: int, updated_expense: Expense):
    for idx, exp in enumerate(expenses_db):
        if exp.id == expense_id:
            expenses_db[idx] = updated_expense
            expenses_db[idx].id = expense_id
            return expenses_db[idx]
    raise HTTPException(status_code=404, detail="Expense not found")

@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int):
    for idx, exp in enumerate(expenses_db):
        if exp.id == expense_id:
            del expenses_db[idx]
            return {"detail": "Expense deleted"}
    raise HTTPException(status_code=404, detail="Expense not found")

# Category endpoints
@app.get("/categories", response_model=List[Category])
def list_categories():
    return categories_db

@app.post("/categories", response_model=Category)
def create_category(category: Category):
    global category_id_counter
    category.id = category_id_counter
    categories_db.append(category)
    category_id_counter += 1
    return category

@app.put("/categories/{category_id}", response_model=Category)
def update_category(category_id: int, updated_category: Category):
    for idx, cat in enumerate(categories_db):
        if cat.id == category_id:
            categories_db[idx] = updated_category
            categories_db[idx].id = category_id
            return categories_db[idx]
    raise HTTPException(status_code=404, detail="Category not found")

@app.delete("/categories/{category_id}")
def delete_category(category_id: int):
    for idx, cat in enumerate(categories_db):
        if cat.id == category_id:
            del categories_db[idx]
            return {"detail": "Category deleted"}
    raise HTTPException(status_code=404, detail="Category not found")

# Merchant endpoints
@app.get("/merchants", response_model=List[Merchant])
def list_merchants():
    return merchants_db

@app.post("/merchants", response_model=Merchant)
def create_merchant(merchant: Merchant):
    global merchant_id_counter
    merchant.id = merchant_id_counter
    merchants_db.append(merchant)
    merchant_id_counter += 1
    return merchant

@app.put("/merchants/{merchant_id}", response_model=Merchant)
def update_merchant(merchant_id: int, updated_merchant: Merchant):
    for idx, m in enumerate(merchants_db):
        if m.id == merchant_id:
            merchants_db[idx] = updated_merchant
            merchants_db[idx].id = merchant_id
            return merchants_db[idx]
    raise HTTPException(status_code=404, detail="Merchant not found")

@app.delete("/merchants/{merchant_id}")
def delete_merchant(merchant_id: int):
    for idx, m in enumerate(merchants_db):
        if m.id == merchant_id:
            del merchants_db[idx]
            return {"detail": "Merchant deleted"}
    raise HTTPException(status_code=404, detail="Merchant not found")

# Subscription endpoints
@app.get("/subscriptions", response_model=List[Subscription])
def list_subscriptions():
    return subscriptions_db

@app.post("/subscriptions", response_model=Subscription)
def create_subscription(subscription: Subscription):
    global subscription_id_counter
    subscription.id = subscription_id_counter
    subscriptions_db.append(subscription)
    subscription_id_counter += 1
    return subscription

@app.put("/subscriptions/{subscription_id}", response_model=Subscription)
def update_subscription(subscription_id: int, updated_subscription: Subscription):
    for idx, sub in enumerate(subscriptions_db):
        if sub.id == subscription_id:
            subscriptions_db[idx] = updated_subscription
            subscriptions_db[idx].id = subscription_id
            return subscriptions_db[idx]
    raise HTTPException(status_code=404, detail="Subscription not found")

@app.delete("/subscriptions/{subscription_id}")
def delete_subscription(subscription_id: int):
    for idx, sub in enumerate(subscriptions_db):
        if sub.id == subscription_id:
            del subscriptions_db[idx]
            return {"detail": "Subscription deleted"}
    raise HTTPException(status_code=404, detail="Subscription not found")

# SavingsGoal endpoints
@app.get("/savings-goals", response_model=List[SavingsGoal])
def list_savings_goals():
    return savings_goals_db

@app.post("/savings-goals", response_model=SavingsGoal)
def create_savings_goal(goal: SavingsGoal):
    global savings_goal_id_counter
    goal.id = savings_goal_id_counter
    savings_goals_db.append(goal)
    savings_goal_id_counter += 1
    return goal

@app.put("/savings-goals/{goal_id}", response_model=SavingsGoal)
def update_savings_goal(goal_id: int, updated_goal: SavingsGoal):
    for idx, g in enumerate(savings_goals_db):
        if g.id == goal_id:
            savings_goals_db[idx] = updated_goal
            savings_goals_db[idx].id = goal_id
            return savings_goals_db[idx]
    raise HTTPException(status_code=404, detail="Savings goal not found")

@app.delete("/savings-goals/{goal_id}")
def delete_savings_goal(goal_id: int):
    for idx, g in enumerate(savings_goals_db):
        if g.id == goal_id:
            del savings_goals_db[idx]
            return {"detail": "Savings goal deleted"}
    raise HTTPException(status_code=404, detail="Savings goal not found")
