from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import os

app = FastAPI()

# biar frontend bisa akses
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # nanti bisa dibatesin
    allow_methods=["*"],
    allow_headers=["*"],
)

HF_TOKEN = os.getenv("HF_TOKEN")

@app.get("/")
def home():
    return {"status": "ok"}

@app.get("/chat")
def chat(q: str):
    res = requests.post(
        "https://api-inference.huggingface.co/models/google/flan-t5-small",
        headers={
            "Authorization": f"Bearer {HF_TOKEN}"
        },
        json={
            "inputs": f"Ubah jadi intent formal HR: {q}"
        }
    )
    return res.json()
