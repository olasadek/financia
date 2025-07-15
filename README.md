# Financia: AI-Powered Financial Tracking Web App

A secure, privacy-first financial tracking app with AI features, built with FastAPI (Python) and React (JS). All data stays on the user's device. Visualize your spending, manage expenses, subscriptions, savings goals, and more.

## Features
- Secure, local-first data (no cloud storage)
- Expense, category, merchant, subscription, and savings goal management
- Modern, accessible UI with dark blue theme
- Responsive and PWA-ready
- Dockerized for easy deployment

## Project Structure
```
backend/    # FastAPI backend
frontend/   # React frontend
Dockerfile  # Multi-stage build for full-stack app
docker-compose.yml
```

## Local Development
### 1. Backend
```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Frontend
```
cd frontend
npm install
npm start
```
- Frontend: http://localhost:3000
- Backend:  http://localhost:8000

## Docker Usage
1. Make sure your custom login background image (e.g., `image.png`) is in `frontend/public/`.
2. In the project root, build and run:
   ```sh
   docker-compose up --build
   ```
3. Visit [http://localhost:8000](http://localhost:8000) in your browser.

## Customization
- To change the login background, replace `frontend/public/image.png` with your own image.
- All UI is styled for clarity and accessibility. Adjust styles in the `src/` components as needed.

## License
MIT 
