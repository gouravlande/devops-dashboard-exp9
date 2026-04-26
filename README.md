# 🚀 DevOps Pipeline Dashboard 

## 📌 Project Overview

This project demonstrates a complete DevOps workflow by designing and deploying a web application using cloud services and containerization.

The application is a **Node.js-based DevOps Dashboard** that visualizes system metrics, API status, and pipeline stages.

---

## ⚙️ Tech Stack

* **Backend**: Node.js (Express)
* **Containerization**: Docker
* **Cloud Platform**: AWS EC2
* **Version Control**: Git & GitHub

---

## 🔄 DevOps Workflow

Developer → GitHub → Jenkins → Docker → Kubernetes → AWS Cloud

*(In this project, Docker and AWS deployment are implemented practically, while Jenkins and Kubernetes are represented conceptually in the dashboard.)*

---

## 🖥️ Features

* 📊 System Metrics (CPU & Memory usage)
* 🩺 Health Check API
* 👥 Users API (sample data)
* ❌ Error Simulation API
* 🚀 Deployment status visualization
* ⚙️ Pipeline status (GitHub, Jenkins, Docker, Kubernetes)

---

## 📂 Project Structure

```
exp9/
│── app.js
│── package.json
│── Dockerfile
│── README.md
```

---

## 🐳 Docker Setup

### 1️⃣ Build Image

```
docker build -t devops-dashboard .
```

### 2️⃣ Run Container

```
docker run -d -p 80:3000 devops-dashboard
```

---

## ☁️ AWS Deployment

* EC2 instance (Ubuntu)
* Docker installed and configured
* Security Group configured to allow:

  * Port 80 (HTTP)
  * Port 22 (SSH)


---

## 📸 Screenshots

* Application Dashboard
* Docker Container Running
* AWS Security Group Configuration

---

## 🧠 Key Learnings

* Containerizing applications using Docker
* Deploying applications on AWS EC2
* Managing ports and networking in cloud environments
* Handling real-world DevOps issues (Docker errors, WSL issues, port conflicts)

---


---

## 👨‍💻 Author

**Gourav Lande**
