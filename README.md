# IITBBS-WebHack: Asteroid Prediction App

A web application developed as part of **IIT Bhubaneswar WebHack** to predict whether a newly discovered asteroid could be a “New Earth” candidate.  
This project combines frontend visualization with a Java backend for asteroid data analysis and risk prediction.  

[GitHub Repository](https://github.com/PralayeshMukherjee/IITBBS-WebHack)

---

## 📌 Overview

**Asteroid Prediction App** helps users explore near-Earth objects (NEOs) and predicts whether they could be habitable “New Earth” candidates.  
It integrates NASA APIs for asteroid data, performs risk analysis, and uses predictive algorithms to classify asteroids.

---

## 🚀 Features

- Fetches real-time asteroid data from NASA NEO APIs  
- Predicts if an asteroid is a potential “New Earth”  
- Displays key asteroid attributes (size, distance, velocity, risk level)  
- Interactive and responsive UI built with React & TypeScript  
- Backend APIs built in Java (Spring Boot) for processing predictions  
- Modular and scalable project structure  

---

## 🧠 Tech Stack

| Layer     | Technology                  |
|-----------|----------------------------|
| Frontend  | React, TypeScript, HTML/CSS |
| Backend   | Java (Spring Boot)          |
| APIs      | NASA NEO APIs               |
| Database  | MySQL / PostgreSQL (optional) |
| Build     | Maven / Gradle             |
| Version Control | Git & GitHub          |
| Deployment | Render / Netlify / Heroku  |

---

## 📁 Project Structure

IITBBS-WebHack/ ├── frontend/ # Frontend source (React/TS) ├── backend/ # Java backend (Spring Boot) ├── .gitignore ├── README.md └── ...


---

## 🛠️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/PralayeshMukherjee/IITBBS-WebHack.git
cd IITBBS-WebHack
2. Frontend
cd frontend
npm install
npm run dev
Open: http://localhost:3000

3. Backend (Java)
cd ../backend
./mvnw install
./mvnw spring-boot:run
API runs on http://localhost:8080 by default.

📌 Environment Variables
Configure your .env or application.properties:

REACT_APP_API_BASE_URL=http://localhost:8080/api
NASA_API_KEY=YOUR_NASA_API_KEY
DATABASE_URL=...
JWT_SECRET=...
🧪 Testing
Frontend:
npm test
Backend (Spring Boot):
mvn test
📦 Deployment
Frontend: Netlify / Vercel
Backend: Render / Heroku / AWS
Database: MySQL / PostgreSQL / MongoDB
👥 Contributors
| Name | Role | | ------------- | -------------------- | | Your Name | Full-Stack Developer | | Contributor 1 | Frontend / UI | | Contributor 2 | Backend / API |

📞 Contact
Open an issue on GitHub or contact the maintainers for support.

⭐ Support
If you find this project useful, please give it a ⭐ on GitHub!

📷 Screenshots / Demo (Optional)
You can add screenshots of the UI or example predictions here:

![Home Page](screenshots/home.png)
![Prediction Example](screenshots/prediction.png)
Replace screenshots/... with actual screenshot paths from your project.

⚡ Future Improvements
Add advanced predictive algorithms (ML models) for asteroid habitability
Include asteroid orbit visualization
User authentication and personalized dashboards
Integrate more NASA APIs for enriched data

---

If you want, I can **also add GitHub-style badges** at the top for `Build Status`, `License`, `Repo Stars`, etc., to make it **look professional and hackathon-ready**.  

Do you want me to do that?
