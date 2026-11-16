/**
 * NEMO - National Emergency Management & Operations
 * Standalone Pure JavaScript Application Logic (Light Theme & Pure Vanilla JS)
 * Includes Indian names, Indian contact numbers (+91), Indian disaster sectors, and photos
 */

// Application State
const state = {
  currentScreen: 'home',
  activeReportTab: 'missing',
  activeFilter: 'all',
  searchQuery: '',
  incidents: [
    {
      id: 'INC-9041',
      type: 'missing',
      name: 'Aarav Sharma',
      age: 23,
      gender: 'Male',
      location: 'Sector 4, Kedarnath Valley Relief Base',
      contact: '+91 98765 43210 (Father: Ramesh Sharma)',
      description: 'Wearing a navy blue jacket, blue jeans, and trekking boots. Carrying a red backpack. Last reported near riverbank bridge during sudden flash flood.',
      status: 'Assigned',
      timestamp: '14 mins ago',
      reportedBy: 'NDRF Quick Reaction Team 4',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop'
    },
    {
      id: 'INC-9040',
      type: 'found',
      name: 'Priya Patel',
      age: 27,
      gender: 'Female',
      location: 'Wayanad Relief Shelter Camp 2, Kerala',
      contact: '+91 98112 34567 (Shelter Medical Officer)',
      description: 'Found safe by SDRF flood rescue boat team. Wearing yellow salwar suit. Minor ankle sprain treated by medical volunteers.',
      status: 'Located',
      timestamp: '36 mins ago',
      reportedBy: 'SDRF Officer Nair',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop'
    },
    {
      id: 'INC-9039',
      type: 'missing',
      name: 'Ananya Verma',
      age: 8,
      gender: 'Female',
      location: 'Patna Flood Relief Camp B, Bihar',
      contact: '+91 97714 55678 (Suresh Verma - Father)',
      description: 'Wearing pink school frock and white sneakers. Separated during sudden emergency bus evacuation at Sector 2 checkpost.',
      status: 'Reported',
      timestamp: '52 mins ago',
      reportedBy: 'Suresh Verma (Parent)',
      photo: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=300&h=300&fit=crop'
    },
    {
      id: 'INC-9038',
      type: 'found',
      name: 'Rajesh Kumar (Senior Citizen)',
      age: 68,
      gender: 'Male',
      location: 'Cuttack Cyclone Evacuation Center 5, Odisha',
      contact: '+91 94370 12890 (Camp In-charge: Inspector Das)',
      description: 'Grey hair, white kurta-pajama, wearing reading spectacles. Safe and accommodated in Senior Citizen Care wing of the cyclone center.',
      status: 'Located',
      timestamp: '2 hours ago',
      reportedBy: 'Civil Defense Volunteer Mishra',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
    },
    {
      id: 'INC-9037',
      type: 'found',
      name: 'Rohan Deshmukh',
      age: 32,
      gender: 'Male',
      location: 'Chiplun Flood Rescue Hub, Maharashtra',
      contact: '+91 98220 67891 (Brother: Sachin Deshmukh)',
      description: 'Extracted by Indian Coast Guard helicopter SAR team from terrace. Reunited with his family at the municipal coordination center.',
      status: 'Reunited',
      timestamp: '4 hours ago',
      reportedBy: 'Helicopter SAR Unit 2',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop'
    }
  ],
  matches: [
    {
      id: 'match-301',
      missing_id: 'INC-9041',
      found_id: 'INC-9040',
      missing_name: 'Aarav Sharma',
      found_name: 'Aarav S. (Sheltered)',
      confidence_score: 92.5,
      match_tier: 'HIGH_CONFIDENCE',
      reasons: 'High phonetic name alignment ("Aarav Sharma" vs "Aarav S."), exact age 14 match, identical cheek scar, and navy blue jacket in Kedarnath sector.',
      status: 'pending'
    },
    {
      id: 'match-302',
      missing_id: 'INC-9039',
      found_id: 'f-202',
      missing_name: 'Ananya Verma',
      found_name: 'Ananya',
      confidence_score: 84.0,
      match_tier: 'HIGH_CONFIDENCE',
      reasons: 'Name match, age 8, pink dress and white sneakers recorded during bus evacuation triage.',
      status: 'pending'
    }
  ]
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupReportForm();
  setupIncidentsRegistry();
  setupContactForm();
  setupAdminDesk();
  renderIncidents();
  renderAdminMatches();
});

// Navigation Controller
function navigateTo(screenId) {
  state.currentScreen = screenId;
  
  // Hide all screens
  document.querySelectorAll('.screen-view').forEach(el => el.classList.remove('active'));
  
  // Show target screen
  const target = document.getElementById(`screen-${screenId}`);
  if (target) {
    target.classList.add('active');
  }

  // Update desktop navbar links
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.screen === screenId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Update mobile drawer links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    if (link.dataset.screen === screenId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Close mobile drawer if open
  const mobileNav = document.getElementById('mobile-nav');
  const menuOpenIcon = document.querySelector('.menu-open-icon');
  const menuCloseIcon = document.querySelector('.menu-close-icon');
  if (mobileNav) {
    mobileNav.classList.remove('open');
    if (menuOpenIcon) menuOpenIcon.style.display = 'block';
    if (menuCloseIcon) menuCloseIcon.style.display = 'none';
  }

  // Scroll smoothly to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupNavigation() {
  // Navigation Clicks
  document.querySelectorAll('[data-screen]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const screen = btn.dataset.screen;
      if (screen) navigateTo(screen);
    });
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const menuOpenIcon = document.querySelector('.menu-open-icon');
  const menuCloseIcon = document.querySelector('.menu-close-icon');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      if (menuOpenIcon && menuCloseIcon) {
        menuOpenIcon.style.display = isOpen ? 'none' : 'block';
        menuCloseIcon.style.display = isOpen ? 'block' : 'none';
      }
    });
  }
}

// Incident Report Form Controller
function setupReportForm() {
  const tabMissing = document.getElementById('tab-missing');
  const tabFound = document.getElementById('tab-found');
  const reportForm = document.getElementById('incident-report-form');
  const gpsBtn = document.getElementById('btn-get-gps');
  const locationInput = document.getElementById('input-location');
  const photoInput = document.getElementById('input-photo');
  const photoPreview = document.getElementById('preview-photo');
  const dropZone = document.getElementById('drop-zone-photo');
  const previewContainer = document.getElementById('photo-preview-container');
  const previewFilename = document.getElementById('preview-filename');
  const previewFilesize = document.getElementById('preview-filesize');
  const btnRemovePhoto = document.getElementById('btn-remove-photo');
  const submitBtn = document.getElementById('btn-submit-report');
  const btnHeroFound = document.getElementById('btn-hero-found');
  const btnHeroMissing = document.getElementById('btn-hero-missing');

  function setMissingMode() {
    state.activeReportTab = 'missing';
    if (tabMissing) tabMissing.className = 'tab-btn active-missing';
    if (tabFound) tabFound.className = 'tab-btn';
    const titleEl = document.getElementById('report-title');
    if (titleEl) titleEl.textContent = 'Report a Missing Individual';
    if (submitBtn) {
      submitBtn.className = 'btn-primary btn-missing-mode';
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
        <span>Submit Missing Person Report</span>
      `;
    }
  }

  function setFoundMode() {
    state.activeReportTab = 'found';
    if (tabFound) tabFound.className = 'tab-btn active-found';
    if (tabMissing) tabMissing.className = 'tab-btn';
    const titleEl = document.getElementById('report-title');
    if (titleEl) titleEl.textContent = 'Report a Safe / Located Individual';
    if (submitBtn) {
      submitBtn.className = 'btn-primary btn-found-mode';
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span>Submit Safe / Located Person Report</span>
      `;
    }
  }

  if (tabMissing && tabFound) {
    tabMissing.addEventListener('click', setMissingMode);
    tabFound.addEventListener('click', setFoundMode);
  }

  if (btnHeroFound) {
    btnHeroFound.addEventListener('click', () => {
      setFoundMode();
    });
  }

  if (btnHeroMissing) {
    btnHeroMissing.addEventListener('click', () => {
      setMissingMode();
    });
  }

  // Auto GPS Coordinates Simulation
  if (gpsBtn && locationInput) {
    gpsBtn.addEventListener('click', () => {
      locationInput.value = 'Kedarnath Sector 4 Grid (30.7346° N, 79.0669° E)';
      showToast('GPS coordinates locked via ISRO satellite telemetry.');
    });
  }

  function handleFileSelection(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (photoPreview) {
        photoPreview.src = event.target.result;
      }
      if (previewFilename) {
        previewFilename.textContent = file.name || 'reference-portrait.jpg';
      }
      if (previewFilesize) {
        const sizeKb = Math.round(file.size / 1024);
        previewFilesize.textContent = `${sizeKb > 1024 ? (sizeKb / 1024).toFixed(1) + ' MB' : sizeKb + ' KB'} • Ready for Triage`;
      }
      if (previewContainer && dropZone) {
        previewContainer.style.display = 'flex';
        dropZone.style.display = 'none';
      }
      showToast('Reference photo attached.');
    };
    reader.readAsDataURL(file);
  }

  function resetPhotoUpload() {
    if (photoInput) photoInput.value = '';
    if (photoPreview) {
      photoPreview.src = '';
    }
    if (previewContainer && dropZone) {
      previewContainer.style.display = 'none';
      dropZone.style.display = 'flex';
    }
  }

  // File input change
  if (photoInput) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      handleFileSelection(file);
    });
  }

  // Drag and Drop
  if (dropZone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('drag-over');
      });
    });

    dropZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const file = dt.files && dt.files[0];
      handleFileSelection(file);
    });
  }

  // Remove Photo Button
  if (btnRemovePhoto) {
    btnRemovePhoto.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      resetPhotoUpload();
      showToast('Photo removed.');
    });
  }

  // Handle Form Submission
  if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newIncident = {
        id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
        type: state.activeReportTab,
        name: document.getElementById('input-name').value,
        age: parseInt(document.getElementById('input-age').value, 10) || 0,
        gender: document.getElementById('input-gender').value,
        location: locationInput.value,
        contact: document.getElementById('input-contact').value,
        description: document.getElementById('input-description').value,
        status: state.activeReportTab === 'found' ? 'Located' : 'Reported',
        timestamp: 'Just now',
        reportedBy: 'Emergency Field Intake',
        photo: (photoPreview && photoPreview.src && previewContainer && previewContainer.style.display !== 'none') 
          ? photoPreview.src 
          : (state.activeReportTab === 'found' 
            ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop'
            : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop')
      };

      // Push to front of registry
      state.incidents.unshift(newIncident);
      renderIncidents();

      // Reset form
      reportForm.reset();
      resetPhotoUpload();
      setMissingMode();

      showToast(`Incident #${newIncident.id} registered to national crisis network.`);
      navigateTo('incidents');
    });
  }
}

// Incidents Registry Controller
function setupIncidentsRegistry() {
  const searchInput = document.getElementById('incident-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase();
      renderIncidents();
    });
  }

  // Filter Chips
  document.querySelectorAll('.chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip-btn').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.activeFilter = chip.dataset.filter || 'all';
      renderIncidents();
    });
  });
}

function renderIncidents() {
  const grid = document.getElementById('incidents-grid-container');
  if (!grid) return;

  const filtered = state.incidents.filter(inc => {
    const matchesFilter = state.activeFilter === 'all' || 
                          inc.type === state.activeFilter || 
                          inc.status.toLowerCase() === state.activeFilter;
    const matchesSearch = inc.name.toLowerCase().includes(state.searchQuery) || 
                          inc.location.toLowerCase().includes(state.searchQuery) || 
                          inc.contact.toLowerCase().includes(state.searchQuery) ||
                          inc.id.toLowerCase().includes(state.searchQuery);
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 2rem; background: rgba(255, 255, 255, 0.94); backdrop-filter: blur(14px); border-radius: var(--radius-lg); border: 1.5px solid var(--border-color); box-shadow: var(--shadow-sm);">
        <p style="color: var(--text-muted); font-size: 1.1rem; font-weight: 600;">No matching incident reports found in the active registry.</p>
        <button class="btn-primary" data-screen="report" style="margin-top: 1rem;" onclick="navigateTo('report')">File New Incident</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(inc => `
    <div class="incident-card" id="card-${inc.id}">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.85rem;">
          <span class="badge ${inc.type === 'found' ? 'badge-found' : 'badge-missing'}">
            ${inc.type === 'found' ? 'Safe / Located' : 'Missing'}
          </span>
          <span style="font-family: monospace; font-size: 0.85rem; font-weight: 800; color: var(--blue-primary);">${inc.id}</span>
        </div>

        <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
          <img src="${inc.photo}" alt="${inc.name}" style="width: 80px; height: 80px; border-radius: var(--radius-md); object-fit: cover; border: 2px solid var(--border-color); flex-shrink: 0; box-shadow: var(--shadow-sm);" />
          <div>
            <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.2rem;">${inc.name}</h3>
            <p style="font-size: 0.85rem; color: var(--text-dim); font-weight: 600;">${inc.gender}, ${inc.age} yrs old</p>
            <p style="font-size: 0.85rem; color: var(--blue-primary); font-weight: 700; margin-top: 0.3rem;">📍 ${inc.location}</p>
          </div>
        </div>

        <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 0.85rem;">
          ${inc.description}
        </p>

        <div style="background-color: var(--bg-soft-blue); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); font-size: 0.82rem; color: var(--text-body);">
          <strong style="color: var(--blue-dark);">📞 Contact / Indian Number:</strong> ${inc.contact}
        </div>
      </div>

      <div style="border-top: 1px solid var(--border-color); padding-top: 0.85rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <span style="font-size: 0.78rem; color: var(--text-dim); font-weight: 600;">Reported: ${inc.timestamp}</span>
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700;">Status:</span>
          <select onchange="updateIncidentStatus('${inc.id}', this.value)" style="background: #ffffff; border: 1.5px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.8rem; font-weight: 700; padding: 0.3rem 0.6rem; color: var(--text-main); cursor: pointer; outline: none;">
            <option value="Reported" ${inc.status === 'Reported' ? 'selected' : ''}>Reported</option>
            <option value="Assigned" ${inc.status === 'Assigned' ? 'selected' : ''}>Assigned</option>
            <option value="Located" ${inc.status === 'Located' ? 'selected' : ''}>Located</option>
            <option value="Reunited" ${inc.status === 'Reunited' ? 'selected' : ''}>Reunited</option>
          </select>
        </div>
      </div>
    </div>
  `).join('');
}

window.updateIncidentStatus = function(id, newStatus) {
  const item = state.incidents.find(i => i.id === id);
  if (item) {
    item.status = newStatus;
    showToast(`Status for ${item.name} updated to: ${newStatus}`);
    renderIncidents();
  }
};

// Contact Form Controller
function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');

  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      contactSuccess.style.display = 'block';
      showToast('Urgent transmission logged to National Dispatch Center.');
    });

    const resetBtn = document.getElementById('btn-reset-contact');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        contactForm.reset();
        contactForm.style.display = 'block';
        contactSuccess.style.display = 'none';
      });
    }
  }
}

// Toast Notification System
function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');
  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
}

// AI Matching & Admin Verification Desk Controller
function setupAdminDesk() {
  const runBtn = document.getElementById('btn-run-ai-pipeline');
  if (runBtn) {
    runBtn.addEventListener('click', async () => {
      runBtn.disabled = true;
      runBtn.textContent = '⚙️ Analyzing Registry...';

      try {
        // Try calling the FastAPI backend
        const res = await fetch('http://127.0.0.1:8000/api/matches/run?min_threshold=50', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.matches) {
            state.matches = data.matches;
          }
        }
      } catch (e) {
        // Offline / local fallback simulation
      }

      renderAdminMatches();
      runBtn.disabled = false;
      runBtn.textContent = '⚡ Re-run AI Matching Pipeline';
      showToast('AI pipeline scan complete. Candidate matches updated.');
    });
  }
}

function renderAdminMatches() {
  const container = document.getElementById('admin-matches-container');
  if (!container) return;

  const statMissing = document.getElementById('admin-stat-missing');
  const statFound = document.getElementById('admin-stat-found');
  const statReunited = document.getElementById('admin-stat-reunited');
  const statMatches = document.getElementById('admin-stat-matches');

  const pendingMatches = state.matches.filter(m => m.status === 'pending');
  const verifiedMatches = state.matches.filter(m => m.status === 'verified');

  if (statMissing) statMissing.textContent = state.incidents.filter(i => i.type === 'missing').length;
  if (statFound) statFound.textContent = state.incidents.filter(i => i.type === 'found').length;
  if (statReunited) statReunited.textContent = verifiedMatches.length;
  if (statMatches) statMatches.textContent = pendingMatches.length;

  if (state.matches.length === 0) {
    container.innerHTML = `
      <div style="padding: 3rem; text-align: center; background-color: #ffffff; border-radius: var(--radius-xl); border: 1.5px solid var(--border-color);">
        <h3>No candidate matches above threshold</h3>
        <p style="color: var(--text-dim);">Click 'Re-run AI Matching Pipeline' to cross-compare all open records.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.matches.map(m => {
    const isHigh = m.confidence_score >= 80;
    const tierBg = isHigh ? '#ecfdf5' : '#eff6ff';
    const tierText = isHigh ? '#059669' : '#2563eb';
    const tierBorder = isHigh ? '#a7f3d0' : '#bfdbfe';

    return `
      <div class="incident-card" style="padding: 1.5rem; background-color: #ffffff; border: 1.5px solid var(--border-color); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 0.8rem; font-weight: 800; padding: 0.3rem 0.75rem; border-radius: var(--radius-full); background-color: ${tierBg}; color: ${tierText}; border: 1px solid ${tierBorder};">
              ${m.confidence_score}% MATCH • ${(m.match_tier || 'HIGH_CONFIDENCE').replace('_', ' ')}
            </span>
            <span style="font-size: 0.85rem; color: var(--text-dim); font-weight: 600;">Pair #${m.id}</span>
          </div>

          ${m.status === 'verified' ? `
            <span style="background-color: #10b981; color: #fff; padding: 0.3rem 0.8rem; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 800;">
              ✓ OFFICIALLY REUNITED
            </span>
          ` : m.status === 'rejected' ? `
            <span style="background-color: #ef4444; color: #fff; padding: 0.3rem 0.8rem; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 800;">
              ✕ REJECTED
            </span>
          ` : `
            <span style="background-color: #f59e0b; color: #fff; padding: 0.3rem 0.8rem; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 800;">
              ● PENDING REVIEW
            </span>
          `}
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem; background-color: #f8fafc; padding: 1rem; border-radius: var(--radius-md);">
          <div>
            <div style="font-size: 0.75rem; color: #dc2626; font-weight: 800; text-transform: uppercase; margin-bottom: 0.25rem;">Reported Missing</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-main);">${m.missing_name}</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; color: #0284c7; font-weight: 800; text-transform: uppercase; margin-bottom: 0.25rem;">Sheltered in Relief Camp</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-main);">${m.found_name}</div>
          </div>
        </div>

        <div style="font-size: 0.9rem; color: var(--text-body); line-height: 1.6; margin-bottom: 1.25rem;">
          <strong>AI Justification:</strong> ${m.reasons}
        </div>

        <div style="margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-dim); margin-bottom: 0.35rem; font-weight: 700;">
            <span>Confidence Threshold</span>
            <span>${m.confidence_score}%</span>
          </div>
          <div style="height: 8px; background-color: #e2e8f0; border-radius: 4px; overflow: hidden;">
            <div style="height: 100%; width: ${m.confidence_score}%; background: ${isHigh ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #3b82f6, #0284c7)'};"></div>
          </div>
        </div>

        ${m.status === 'pending' ? `
          <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
            <button onclick="handleRejectMatch('${m.id}')" style="padding: 0.6rem 1.25rem; border-radius: var(--radius-md); border: 1.5px solid #cbd5e1; background-color: #ffffff; color: #64748b; font-weight: 700; cursor: pointer;">
              Reject Pair
            </button>
            <button onclick="handleVerifyMatch('${m.id}')" style="padding: 0.6rem 1.5rem; border-radius: var(--radius-md); border: none; background-color: #059669; color: #ffffff; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
              ✓ Verify & Reconnect
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

window.handleVerifyMatch = function(matchId) {
  const m = state.matches.find(item => item.id === matchId);
  if (m) {
    m.status = 'verified';
    showToast(`Match #${matchId} verified! Case status updated to REUNITED.`);
    renderAdminMatches();
  }
};

window.handleRejectMatch = function(matchId) {
  const m = state.matches.find(item => item.id === matchId);
  if (m) {
    m.status = 'rejected';
    showToast(`Match #${matchId} rejected.`);
    renderAdminMatches();
  }
};

