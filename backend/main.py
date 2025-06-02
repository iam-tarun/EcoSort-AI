from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from torchvision.models import efficientnet
import torchvision.transforms.v2 as v2
import torch
import os
from PIL import Image
import io
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from fastapi import Request
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

limiter = Limiter(key_func=get_remote_address)

app = FastAPI()

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["https://ecosortAI.tarunteja.dev"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

val_test_transformations = v2.Compose([
  v2.Resize(size=256, antialias=True),
  v2.CenterCrop(224),
  v2.ToImage(),
  v2.ToDtype(torch.float32, scale=True),
  v2.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

class_labels = ["biodegradable", "hazardous", "non-recyclable", "recyclable"]

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model_path = os.getenv("model_path", "../models/ecosortAI-5")
model = torch.load("../models/ecosortAI-5", weights_only=False, map_location=device)
model.eval().to(device)

@app.post("/classify")
@limiter.limit("5/minute")
async def classifyImage(request: Request, file: UploadFile):
  image_bytes = await file.read()
  image = Image.open(io.BytesIO(image_bytes)).convert('RGB')

  input_tensor = val_test_transformations(image).unsqueeze(0).to(device)

  with torch.no_grad():
    output = model(input_tensor)
    prediction_idx = output.argmax(dim=1).item()
    prediction_class = class_labels[prediction_idx]
    confidence = torch.softmax(output, dim=1)[0][prediction_idx].item()

  return {
      'prediction_idx': prediction_idx,
      'prediction_class': prediction_class,
      'confidence_score': round(confidence, 4)
    }