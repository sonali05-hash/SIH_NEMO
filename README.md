# NEMO - Missing Person Coordination Platform (Crisis Net)

> **National Emergency Management & Operations (NEMO)**  
> 4-tier disaster coordination network architecture for a 6-member team.

---

## 📁 Repository & Folder Structure

```text
NEMO/
│
├── frontend/                     # [YOUR ROLE] Pure Vanilla HTML, CSS & JS Client
│   ├── assets/                   # Branding & icons (nemo-emblem.png, nemo-logo.png)
│   ├── css/                      # Stylesheets
│   │   └── style.css             # Glassmorphism, viewport-fixed disaster styling
│   ├── js/                       # Pure Vanilla JavaScript
│   │   └── app.js                # State management, reporting forms & AI match desk
│   └── index.html                # Main application entry point (all 6 screens functional)
│
├── backend/                      # [ASSIGNED TO TEAMMATES] FastAPI REST API
│   ├── routes/
│   │   ├── missing.py            # [Teammate Task] POST & GET /api/missing
│   │   ├── found.py              # [Teammate Task] POST & GET /api/found
│   │   ├── matches.py            # [Teammate Task] POST /api/matches/run, GET /api/matches
│   │   ├── admin.py              # [Teammate Task] POST /api/admin/verify-match
│   │   └── __init__.py           # [Teammate Task]
│   ├── main.py                   # [Teammate Task] FastAPI app & CORS middleware
│   ├── requirements.txt          # [Teammate Task] Python dependencies
│   └── __init__.py               # [Teammate Task]
│
├── ai-engine/                    # [ASSIGNED TO TEAMMATES] Python AI Matching Engine
│   ├── matcher.py                # [Teammate Task] RapidFuzz / fuzzy token comparison
│   ├── scoring.py                # [Teammate Task] Weighted attribute scoring (Name 35%, Location 20%, etc.)
│   └── __init__.py               # [Teammate Task]
│
├── database/                     # [ASSIGNED TO TEAMMATES] PostgreSQL / Supabase
│   └── schema.sql                # [Teammate Task] Table definitions (missing_persons, found_persons, etc.)
│
├── assets/                       # Root static assets & logos
├── index.html                    # Root launcher (redirects directly to frontend/index.html)
└── README.md                     # Project architecture & team division of work
```

---

## 👥 Team Work Division

- **Frontend (`frontend/`)**: Built and completed with pure HTML5, CSS3, and modern Vanilla JavaScript. Includes Home, Incidents Registry, Report Missing/Found forms, AI Match Desk, About Us, and Contact Us.
- **Backend (`backend/`)**: Folder and file stubs prepared (blank) for backend teammates.
- **AI Matching Engine (`ai-engine/`)**: Folder and file stubs prepared (blank) for AI teammates.
- **Database (`database/`)**: Folder and file stubs prepared (blank) for database teammates.

---

## 🚀 Running Your Frontend Work

Double-click or open directly in any browser (Chrome, Edge, Firefox):
```powershell
Start-Process "chrome.exe" "file:///$((Get-Location).Path)/frontend/index.html"
```
Or open the root launcher:
```powershell
Start-Process "chrome.exe" "file:///$((Get-Location).Path)/index.html"
```
Zero build tools, npm packages, or servers required.
