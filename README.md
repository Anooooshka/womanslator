# 💕 WOMANSLATOR 💕

## 📌 Project Description

WOMANSLATOR is a romantic translator web application that converts casual or emotionally distant messages from a boyfriend into their loving, affectionate, and emotionally expressive meaning.
It uses AI to reveal the hidden care and affection behind simple or cold statements.

---

## 🛠 Tech Stack

* Python
* Flask
* Groq API (LLM)
* HTML5
* CSS3
* JavaScript

---

## ✨ Features

* AI-powered romantic message translation
* 650-character concise romantic responses
* Chat interface with real-time replies
* Clear chat history option
* REST API endpoint (`/api/interpret`)
* Backend + frontend integration

---

## ⚙️ Installation Commands

```bash
# Clone repository
git clone <your-repo-link>

# Navigate to project folder
cd womanslator

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
venv\Scripts\activate   # Windows
source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt
```

---

## ▶️ Run Commands

```bash
python app.py
```

App runs at:

```
http://127.0.0.1:5000
```

---

## 📸 Screenshots

### 1. Home Page

<img width="1881" height="903" alt="image" src="https://github.com/user-attachments/assets/9b3f872a-cab1-4b71-82cf-f992d6824d1c" />

### 2. Chat in Action

<img width="1268" height="833" alt="image" src="https://github.com/user-attachments/assets/bb37506c-a923-4b93-8a24-6e00b267c1c4" />

### 3. API Response Example

<img width="1268" height="833" alt="image" src="https://github.com/user-attachments/assets/fbfa26e3-9caa-421a-ac45-db6145443a61" />

---

## 🎥 Demo Video

(Add YouTube / Drive demo link here)

---

## 🏗 Architecture Diagram

```
User (Browser)
      ↓
Frontend (HTML/CSS/JS)
      ↓
Flask Backend (app.py)
      ↓
Groq API (LLM Model)
      ↓
Response → Frontend Display
```

(Diagram image can also be added in /docs folder)

---

## 📡 API Documentation

### POST `/api/interpret`

**Request Body:**

```json
{
  "message": "I'm busy"
}
```

**Response:**

```json
{
  "reply": "Romantic translated message..."
}
```

---

### POST `/api/clear`

**Response:**

```json
{
  "status": "cleared"
}
```

---

## 👩‍💻 Team Members

* Anushka K Jothish
* Taniya Thomson
---

---

## 🚀 Deployment

**Live Application:**
[https://womanslatorrr.vercel.app/](https://womanslatorrr.vercel.app/)

* Deployed on Vercel
* Uses HTTPS
* Live production build

---

## 📜 License

This project is licensed under the MIT License.

See `LICENSE` file for more details.
