# ♻️ Recycnet AI

Recycnet AI is a deep learning-powered web app that classifies uploaded waste images into four categories: **Recyclable**, **Non-Recyclable**, **Hazardous**, and **Biodegradable**. It aims to promote better waste segregation habits and assist in automating waste sorting systems.

<br/>

## 🌐 Live Demo
🔗 [https://recycnetai.tarunteja.dev](https://recycnetai.tarunteja.dev)

---

## 🚀 Features

- 🧠 Image classification using a fine-tuned EfficientNet model
- 📦 Frontend built with React and served using Nginx
- ⚙️ Backend built with FastAPI and served through Uvicorn
- 🐳 Dockerized deployment with Nginx reverse proxy
- 🔐 HTTPS secured via Let's Encrypt
- 📈 Precision confidence returned with every prediction

---

## 📦 Tech Stack

- **Frontend:** React.js + Nginx
- **Backend:** FastAPI + PyTorch + torchvision
- **Model:** EfficientNet
- **Deployment:** Docker Compose, Nginx reverse proxy
- **Domain & SSL:** tarunteja.dev + Certbot (Let’s Encrypt)

---

## 📁 Directory Structure

```

.
├── backend/
│   └── main.py, model loading, classify route
├── recycnet-ai/
│   └── React frontend source
├── docker-compose.yml
└── nginx (root reverse proxy)

````

---

## 🧪 How to Run Locally

1. **Clone the repository**
```bash
git clone https://github.com/your-username/recycnet-ai.git
cd recycnet-ai
````

2. **Update your model**
   Put your trained model file (e.g., `recycnetAI-10`) inside `models/`.

3. **Build & start the containers**

```bash
docker compose up --build -d
```

4. **Access the app**
   Visit [http://localhost:8003](http://localhost:8003)

---

## 🛠️ Future Development

* ✅ Add a **user feedback loop**: After prediction, ask the user **"Was this correct?"** and store the result.
* ✅ Use the feedback to **fine-tune the model** over time (active learning).
* 🔄 Migrate from **pure classification** to **object detection + classification** (e.g., using Faster R-CNN or YOLOv5).
* 🧪 Add batch image support and drag-and-drop enhancements.
* 📊 Create an analytics dashboard for model performance & category distribution.

---

## 📃 License

MIT License. Feel free to use, modify, and contribute.

---

## 🤝 Contributing

Pull requests and issues are welcome! Let’s build a smarter, cleaner world together 🌍

```

Let me know if you'd like a version with image placeholders, badges (Docker, Build Passing, etc.), or to auto-deploy with GitHub Actions.
```
