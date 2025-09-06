from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers.event_controller import router as event_router
import uvicorn

app = FastAPI(
    title="Event Management API",
    description="A simple FastAPI server for Event Management System",
    version="1.0.0",
    redirect_slashes=False
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(event_router, prefix="/api/events", tags=["events"])

@app.get("/")
async def root():
    return {"message": "Welcome to Event Management API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
