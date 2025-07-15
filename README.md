# Financia: AI-Powered Financial Tracking Web App

Financia is a secure, privacy-first financial tracking application that helps you manage your expenses, subscriptions, merchants, and savings goals—all with a modern, accessible interface. Built with FastAPI (Python) and React (JavaScript), Financia ensures your data stays on your device, giving you full control and peace of mind.

## 🚀 Features
- **Local-First Privacy:** All data is stored and processed locally. No cloud storage or third-party data sharing.
- **Expense Management:** Add, edit, and delete expenses with category and merchant tracking.
- **Category & Merchant Management:** Organize your spending with custom categories and merchants.
- **Subscription Tracker:** Monitor recurring payments and manage active/inactive subscriptions.
- **Savings Goals:** Set, track, and update your personal savings goals.
- **Modern UI:** Bold, accessible, and responsive design with a dark blue theme.
- **PWA Ready:** Works great on desktop and mobile browsers.
- **Dockerized:** Easy to deploy and run anywhere.
- **CI/CD Pipeline:** Automated build, lint, and Docker checks on every push and pull request via GitHub Actions.

## 🛡️ Privacy & Security
- **Your Data, Your Device:** All financial data is stored and processed locally. No data leaves your device unless you choose to export it.
- **No Cloud Required:** Financia works fully offline after initial setup.

## 🗂️ Project Structure
```
financia/
├── backend/        # FastAPI backend (Python)
├── frontend/       # React frontend (JavaScript)
├── Dockerfile      # Multi-stage build for full-stack app
├── docker-compose.yml
├── README.md
└── .github/workflows/ci.yml  # GitHub Actions CI/CD pipeline
```

## 🖥️ Local Development
### 1. Backend
```sh
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
- Backend runs at http://localhost:8000

### 2. Frontend
```sh
cd frontend
npm install
npm start
```
- Frontend runs at http://localhost:3000

### 3. Usage
- Log in (any username/password)
- Add categories and merchants first, then add expenses
- Use navigation bar to manage subscriptions and savings goals

## 🐳 Docker Deployment
1. Ensure your custom login background image (e.g., `image.png`) is in `frontend/public/`.
2. Build and run the app:
   ```sh
   docker-compose up --build
   ```
3. Visit [http://localhost:8000](http://localhost:8000) in your browser.

## ⚙️ CI/CD Pipeline
Financia uses GitHub Actions for continuous integration:
- **Backend:** Installs dependencies, lints Python code with flake8
- **Frontend:** Installs dependencies, builds React app, lints JS code
- **Docker:** Builds the full-stack Docker image to ensure deployability
- Workflow file: `.github/workflows/ci.yml`
- Runs on every push and pull request to `main`

## 📝 Customization
- **Login Background:** Replace `frontend/public/image.png` with your own image.
- **Styling:** All UI is styled for clarity and accessibility. Adjust styles in the `src/` components as needed.

## 📄 License
MIT

---

**Financia: Your finances, your privacy, your control.** 