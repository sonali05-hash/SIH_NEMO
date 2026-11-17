# NEMO - Missing Person Coordination Platform (Frontend)

> **National Emergency Management & Operations (NEMO)**  
> Emergency Missing-Person & Operations coordination client.

---

## 📁 Repository Structure

```text
NEMO/
│
├── frontend/                     # Pure Vanilla HTML5, CSS3 & JavaScript Client
│   ├── assets/                   # Branding & logos (nemo-emblem.png, nemo-logo.png)
│   ├── css/
│   │   └── style.css             # Glassmorphism, viewport-fixed disaster styling
│   ├── js/
│   │   └── app.js                # State management, reporting forms & AI match desk
│   └── index.html                # Main application entry point (all 6 screens functional)
│
├── .gitignore
└── README.md
```

---

## 🌟 Application Features

- **Home Dashboard**: Live emergency status, real-time alert tickers, key mission statistics, and rapid action triggers.
- **Incidents Registry**: Searchable emergency reports filterable by disaster type, location, and status.
- **Report Missing Person**: Multi-attribute intake form including demographics, physical traits, last-known GPS/location, and contact info.
- **Report Found Person**: Instant check-in desk for shelters and rescue workers to register found persons.
- **AI Match Desk**: Visual side-by-side comparison engine with confidence percentage, fuzzy match indicators, and verification controls.
- **About Us & Contact Us**: Team mission statement, contact channels, and emergency helpline details.

---

## 🚀 How to Run

No build tools, npm packages, or local servers are required!

Simply open `frontend/index.html` in your favorite browser (Google Chrome, Microsoft Edge, Mozilla Firefox):
```powershell
Start-Process "frontend/index.html"
```
