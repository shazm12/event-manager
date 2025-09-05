from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers.event_controller import router as event_router
from app.controllers.user_controller import router as user_router

app = FastAPI(
    title="Event Management API",
    description="A simple FastAPI server following MVC architecture",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Event Management API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
