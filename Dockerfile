# ---------- Frontend build ----------
FROM node:20 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# ---------- Backend build ----------
FROM python:3.11-slim AS backend-build
WORKDIR /app/backend
COPY backend ./
COPY --from=frontend-build /app/frontend/build /app/backend/static
RUN pip install --no-cache-dir fastapi uvicorn

# ---------- Final image ----------
FROM python:3.11-slim
WORKDIR /app
COPY --from=backend-build /app/backend ./backend
ENV PYTHONUNBUFFERED=1
EXPOSE 8000
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"] 