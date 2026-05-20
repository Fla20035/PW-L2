# Personal Dashboard - Full Stack MERN App

Un dashboard personal interactiv construit cu React și un backend RESTful bazat pe Express și MongoDB.

## 🚀 Tehnologii Folosite
* **Frontend:** React (Vite), CSS3
* **Backend:** Node.js, Express.js
* **Bază de Date:** MongoDB, Mongoose

## ✨ Funcționalități
* Vizualizarea proiectelor salvate în baza de date.
* Adăugarea de noi proiecte direct din interfață (POST).
* Ștergerea proiectelor cu actualizare în timp real a UI-ului (DELETE).
* Căutare dinamică (filtrare după titlu).
* Widget-uri suplimentare: Click-Per-Second (CPS) test, To-Do list etc.

## 🗄️ Structura Bazei de Date

Aplicația folosește MongoDB pentru a stoca proiectele. Un document tipic din colecția `projects` arată astfel:

```json
{
  "_id": "66435c...",
  "title": "Antena DIY 137MHz",
  "tech": "Radio, Signal Processing",
  "done": false,
  "__v": 0
}
```

## 💻 Cum să rulezi proiectul local

1. **Clonează repository-ul**
   ```bash
   git clone <https://github.com/Fla20035/PW-L2.git>
   ```

2. **Pornește Backend-ul (Baza de date)**
   ```bash
   cd server
   npm install
   node index.js
   ```

3. **Pornește Frontend-ul (React)**
   Deschide un terminal nou:
   ```bash
   npm install
   npm run dev
   ```