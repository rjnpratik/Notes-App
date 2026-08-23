from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Import your working pipeline
from pipeline_service import generate_notes_from_url

app = FastAPI(title="YouTube Notes API")

# Configure CORS so your future frontend can communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (we will restrict this in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (POST, GET, etc.)
    allow_headers=["*"],
)

# Define the expected format of the incoming request
class VideoRequest(BaseModel):
    url: str

@app.post("/api/generate")
async def generate_notes(request: VideoRequest):
    print(f"Received request for URL: {request.url}")
    try:
        # Pass the URL directly to your existing script
        notes = generate_notes_from_url(request.url)
        
        # Return the generated markdown as a JSON object
        return {"notes": notes}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))