/* ============================================================
   Uh-Oh H2O — Prototype navigation + screens (no backend)
   ============================================================ */
/* global L, AppData */

(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const els = {
    header: $("#app-header"),
    hdrTitle: $("#hdrTitle"),
    backBtn: $("#backBtn"),
    alertBtn: $("#alertBtn"),
    appBody: $("#appBody"),
    tabs: $("#appTabs"),
    modalRoot: $("#modalRoot"),
  };

  const state = {
    activeTab: "home",
    stack: [],
    hasOnboarded: false,
    map: null,
    mapLayers: {
      centers: [],
      readings: [],
    },
    mapFilter: "all",
    forumFilter: "all",
    reportType: "water",
  };

  const ICONS = {
    droplet: `<svg viewBox="0 0 24 24"><path d="M12 2S5 10 5 15a7 7 0 0 0 14 0C19 10 12 2 12 2z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/></svg>`,
    test: `<svg viewBox="0 0 24 24"><path d="M10 2v2l-3 7a6 6 0 0 0 5 9h0a6 6 0 0 0 5-9l-3-7V2" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M9 8h6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>`,
    pin: `<svg viewBox="0 0 24 24"><path d="M12 21s7-4.4 7-11a7 7 0 0 0-14 0c0 6.6 7 11 7 11z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M12 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>`,
    warn: `<svg viewBox="0 0 24 24"><path d="M12 9v4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M12 17h.01" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M10.3 4.2 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/></svg>`,
    chat: `<svg viewBox="0 0 24 24"><path d="M4 5h16v11H7l-3 3V5z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/></svg>`,
    megaphone: `<svg viewBox="0 0 24 24"><path d="M4 10l10-6v16L4 14v-4z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M14 8h4v8h-4" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/></svg>`,
    plus: `<svg viewBox="0 0 24 24"><path d="M12 5v14 M5 12h14" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`,
    arrow: `<svg viewBox="0 0 24 24"><path d="M5 12h12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    camera: `<svg viewBox="0 0 24 24"><path d="M4 7h4l2-2h4l2 2h4v12H4V7z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>`,
    signal: `<svg viewBox="0 0 24 24"><path d="M4 18h2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M8 18h2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M12 18h2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M6 18V14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M10 18V11" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M14 18V8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M18 18V6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M16 18h4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  };

  function fmtNumber(n) {
    if (typeof n !== "number") return String(n ?? "");
    return n.toLocaleString("en-US");
  }

  function haversineMiles(a, b) {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 3958.8; // miles
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const h =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  function chipForStatus(status) {
    if (status === "good") return `<span class="chip chip-good"><span class="chip-dot"></span>Safe</span>`;
    if (status === "warn") return `<span class="chip chip-warn"><span class="chip-dot"></span>Caution</span>`;
    return `<span class="chip chip-bad"><span class="chip-dot"></span>Avoid</span>`;
  }

  function setHeader({ title, showBack, showTabs } = {}) {
    els.hdrTitle.textContent = title ?? "Uh-Oh H2O";
    els.backBtn.classList.toggle("show", !!showBack);
    els.header.classList.toggle("hide", showTabs === false);
    els.tabs.classList.toggle("hide", showTabs === false);
  }

  function push(route) {
    state.stack.push(route);
    renderRoute(route, { pushToStack: false });
  }

  function pop() {
    state.stack.pop();
    const route = state.stack[state.stack.length - 1];
    if (!route) {
      goToTab(state.activeTab, { resetStack: true });
      return;
    }
    renderRoute(route, { pushToStack: false });
  }

  function clearMap() {
    if (!state.map) return;
    try {
      state.map.remove();
    } catch (_) {
      // ignore
    }
    state.map = null;
    state.mapLayers.centers = [];
    state.mapLayers.readings = [];
  }

  function toast(msg) {
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    $("#phone-screen").appendChild(el);
    setTimeout(() => el.remove(), 1600);
  }

  function openModal({ title, subtitle, bodyHTML }) {
    els.modalRoot.hidden = false;
    els.modalRoot.innerHTML = `
      <div class="modal-sheet" role="dialog" aria-modal="true">
        <div class="modal-handle"></div>
        <div class="modal-title">${title}</div>
        ${subtitle ? `<p class="modal-sub">${subtitle}</p>` : `<div class="spacer-s"></div>`}
        ${bodyHTML}
        <div class="spacer-m"></div>
        <button class="btn btn-secondary btn-block" id="modalClose">Close</button>
      </div>
    `;
    $("#modalClose", els.modalRoot).addEventListener("click", closeModal);
    els.modalRoot.addEventListener(
      "click",
      (e) => {
        if (e.target === els.modalRoot) closeModal();
      },
      { once: true },
    );
  }

  function closeModal() {
    els.modalRoot.hidden = true;
    els.modalRoot.innerHTML = "";
  }

  /* ============================================================
     Onboarding (PDF-like “slide” flow)
     ============================================================ */
  const onboardIntro = {
    brand: "Uh-Oh H2O",
    headline: "Your water, your health, your community.",
    body:
      "Northern Virginia faces a water crisis driven by AI data centers. Together, with partners like the NAACP and local communities, we can reclaim transparency and demand clean water.",
    features: ["Upload water test results", "See community maps + alerts", "Report issues in real time"],
    cta: "Enter the app",
  };

  function renderOnboarding() {
    clearMap();
    setHeader({ showTabs: false });

    els.appBody.innerHTML = `
      <section class="onboard">
        <div class="onboard-top">
          <div class="onboard-kicker onboard-brand">${onboardIntro.brand}</div>
        </div>
        <div class="onboard-hero" aria-hidden="true">
          <img class="onboard-hero-img" src="assets/logo.svg" alt="Uh-Oh H2O Logo" />
        </div>
        <div class="onboard-title onboard-title-sentence">${onboardIntro.headline}</div>
        <p class="onboard-sub">${onboardIntro.body}</p>
        <div class="onboard-features" aria-label="Key features">
          ${onboardIntro.features.map((t) => `<div class="onboard-pill">${t}</div>`).join("")}
        </div>
        <div class="onboard-cta">
          <button class="btn btn-primary btn-block" id="onboardCta">${onboardIntro.cta}</button>
        </div>
      </section>
    `;

    $("#onboardCta").addEventListener("click", () => {
      finishOnboarding();
    });
  }

  function finishOnboarding() {
    state.hasOnboarded = true;
    goToTab("home", { resetStack: true });
  }

  /* ============================================================
     Screens
     ============================================================ */
  function renderHome() {
    clearMap();
    setHeader({ title: "Uh-Oh H2O", showBack: false, showTabs: true });

    const latest = [...AppData.waterReadings].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
    const totalReports = AppData.waterReadings.length;
    const operating = AppData.dataCenters.filter((d) => d.status === "operating").length;
    const newBuild = AppData.dataCenters.filter((d) => d.status !== "operating").length;
    els.appBody.innerHTML = `
      <div class="home-hero">
        <div class="home-hero-label">Northern Virginia · Community Water Watch</div>
        <div class="home-hero-headline">See risk early. Organize fast.</div>
        <div class="home-hero-sub">Latest report: <strong>${latest.location}</strong> (${latest.date}) · ${chipForStatus(latest.status)}</div>
        <div class="home-hero-stats">
          <div class="home-hero-stat">
            <div class="home-hero-stat-n">${fmtNumber(totalReports)}</div>
            <div class="home-hero-stat-l">Reports<br/>this month</div>
          </div>
          <div class="home-hero-stat">
            <div class="home-hero-stat-n">${fmtNumber(operating)}</div>
            <div class="home-hero-stat-l">Data centers<br/>operating</div>
          </div>
          <div class="home-hero-stat">
            <div class="home-hero-stat-n">${fmtNumber(newBuild)}</div>
            <div class="home-hero-stat-l">Proposed /<br/>construction</div>
          </div>
        </div>
      </div>

      <div class="section" style="padding-top: 16px;">
        <button class="btn btn-primary btn-block" id="homeUploadTest" style="padding: 16px; font-size: 15px; border-radius: 16px; box-shadow: 0 8px 20px rgba(14,165,233,0.35);">
          ${ICONS.camera} Upload a water test
        </button>
      </div>

      <div class="section">
        <div class="section-title">Alerts <a href="#" id="viewAlerts">View all</a></div>
        <div class="card">
          ${AppData.alerts
            .slice(0, 2)
            .map((a) => {
              const sevIconBg =
                a.severity === "bad"
                  ? "rgba(239,68,68,0.12)"
                  : a.severity === "warn"
                    ? "rgba(245,158,11,0.14)"
                    : "rgba(14,165,233,0.12)";
              const sevColor = a.severity === "bad" ? "#991b1b" : a.severity === "warn" ? "#92400e" : "#0369a1";
              return `
                <div class="alert-card">
                  <div class="alert-card-icon" style="background:${sevIconBg}; color:${sevColor};">${ICONS.warn}</div>
                  <div>
                    <div class="alert-card-title">${a.title}</div>
                    <div class="alert-card-body">${a.body}</div>
                    <div class="alert-card-time">${a.time}</div>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;

    $("#viewAlerts").addEventListener("click", (e) => {
      e.preventDefault();
      openAlertsModal();
    });
    $("#homeUploadTest").addEventListener("click", () => push({ type: "water" }));
  }

  function renderWaterQuality() {
    clearMap();
    setHeader({ title: "Water quality", showBack: true, showTabs: true });

    const latest = [...AppData.waterReadings].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
    const score = latest.status === "good" ? 82 : latest.status === "warn" ? 58 : 29;
    const ringBg =
      latest.status === "good"
        ? "linear-gradient(135deg, #10b981, #34d399)"
        : latest.status === "warn"
          ? "linear-gradient(135deg, #f59e0b, #fb923c)"
          : "linear-gradient(135deg, #ef4444, #fb7185)";

    const bars = AppData.trendIndex.slice(-7);
    const max = Math.max(...bars);

    const cont = [
      { k: "nitrate", v: latest.nitrate },
      { k: "chloride", v: latest.chloride },
      { k: "turbidity", v: latest.turbidity },
      { k: "ph", v: latest.ph },
    ];

    els.appBody.innerHTML = `
      <div class="section">
        <div class="card wq-card">
          <div class="wq-gauge">
            <div class="wq-gauge-ring" style="background:${ringBg};">${score}</div>
            <div class="wq-gauge-text">
              <div class="wq-gauge-title">${latest.location}</div>
              <div class="wq-gauge-sub">Most recent community reading · ${latest.date} · ${chipForStatus(latest.status)}</div>
            </div>
          </div>
          <div class="spacer-m"></div>
          <button class="btn btn-primary btn-block" id="uploadTestBtn">${ICONS.camera} Upload a test result</button>
        </div>
      </div>

      <div class="section">
        <div class="section-title">7-day trend index</div>
        <div class="card wq-chart">
          <div class="ink-3" style="font-size:12px; line-height:1.4;">
            Higher values indicate more “above-threshold” reports across nearby basins (illustrative).
          </div>
          <div class="wq-chart-bars">
            ${bars
              .map((n, i) => {
                const h = Math.round((n / max) * 100);
                const cls = n < 25 ? "wq-bar-good" : n < 40 ? "wq-bar-warn" : "wq-bar-bad";
                return `<div class="wq-bar ${cls}" style="height:${h}%"><div class="wq-bar-label">D${i + 1}</div></div>`;
              })
              .join("")}
          </div>
          <div class="wq-chart-legend">
            <span>Low</span><span>Medium</span><span>High</span>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Contaminants (latest)</div>
        <div class="card wq-contaminant-grid">
          ${cont
            .map(({ k, v }) => {
              const th = AppData.thresholds[k];
              const over = k === "ph" ? v > th.limit : v > th.limit;
              return `
                <div class="wq-contaminant-row">
                  <div>
                    <div class="wq-name">${th.label}</div>
                    <div class="wq-limit">Limit: ${th.limit}${th.unit ? ` ${th.unit}` : ""}</div>
                  </div>
                  <div class="wq-value" style="color:${over ? "#b45309" : "#0f172a"}">${v}</div>
                  <div>${over ? `<span class="chip chip-warn"><span class="chip-dot"></span>High</span>` : `<span class="chip chip-good"><span class="chip-dot"></span>OK</span>`}</div>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;

    $("#uploadTestBtn").addEventListener("click", () => {
      openModal({
        title: "Upload a test result",
        subtitle: "Prototype demo: no real upload, but shows the intended flow.",
        bodyHTML: `
          <div class="form-group">
            <label class="form-label">Location</label>
            <input class="form-control" value="Broad Run, Ashburn" />
          </div>
          <div class="form-group">
            <label class="form-label">Nitrate (mg/L)</label>
            <input class="form-control" type="number" value="12.4" />
          </div>
          <div class="form-group">
            <label class="form-label">Photo (test strip)</label>
            <div class="photo-drop">${ICONS.camera}<div class="spacer-s"></div>Tap to add a photo</div>
          </div>
          <button class="btn btn-primary btn-block" id="fakeSubmit">Submit</button>
        `,
      });
      $("#fakeSubmit").addEventListener("click", () => {
        closeModal();
        toast("Submitted. Thanks for contributing.");
      });
    });
  }

  function renderMap() {
    setHeader({ title: "Map", showBack: false, showTabs: true });

    const latest = [...AppData.waterReadings].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
    const nearest = AppData.dataCenters
      .map((dc) => ({ dc, miles: haversineMiles({ lat: latest.lat, lng: latest.lng }, { lat: dc.lat, lng: dc.lng }) }))
      .sort((x, y) => x.miles - y.miles)[0];

    const myStatusLabel = latest.status === "good" ? "Safe" : latest.status === "warn" ? "Caution" : "Avoid";
    const myIcon =
      latest.status === "good"
        ? `<span class="map-mini-icon map-mini-good">✓</span>`
        : latest.status === "warn"
          ? `<span class="map-mini-icon map-mini-warn">!</span>`
          : `<span class="map-mini-icon map-mini-bad">!</span>`;

    const coolingLabel = nearest.dc.dailyGallons >= 4_000_000 ? "High" : nearest.dc.dailyGallons >= 2_500_000 ? "Medium" : "Low";
    const coolingClass = coolingLabel === "High" ? "map-stat-high" : coolingLabel === "Medium" ? "map-stat-med" : "map-stat-low";

    const alert = AppData.alerts.find((a) => a.severity === "bad") || AppData.alerts[0];
    const alertPrefix = alert?.type ? alert.type.toUpperCase() : "ALERT";

    els.appBody.innerHTML = `
      <div class="map-wrap">
        <div class="map-area">
          <div class="map-legend">
            <div class="map-legend-row"><span class="map-dot" style="background:#0ea5e9;"></span> Data center</div>
            <div class="map-legend-row"><span class="map-dot" style="background:#10b981;"></span> Water report (safe)</div>
            <div class="map-legend-row"><span class="map-dot" style="background:#f59e0b;"></span> Water report (caution)</div>
            <div class="map-legend-row"><span class="map-dot" style="background:#ef4444;"></span> Water report (avoid)</div>
          </div>
          <div id="leaflet-map"></div>
          <div class="map-filter" id="mapFilter">
            <button class="filter-pill ${state.mapFilter === "all" ? "active" : ""}" data-filter="all">All</button>
            <button class="filter-pill ${state.mapFilter === "centers" ? "active" : ""}" data-filter="centers">Data centers</button>
            <button class="filter-pill ${state.mapFilter === "reports" ? "active" : ""}" data-filter="reports">Water reports</button>
            <button class="filter-pill ${state.mapFilter === "proposed" ? "active" : ""}" data-filter="proposed">New builds</button>
          </div>
        </div>

        <div class="map-panel">
          <div class="map-alert" role="note">
            <strong>${alertPrefix}:</strong> ${alert?.body ?? "New water activity reported nearby. Review community notes."}
          </div>

          <div class="map-cards">
            <button class="map-card map-card-btn" id="homeAlertCard" type="button">
              <div class="map-card-title">Local Alert</div>
              <div class="map-card-body">
                <div class="map-card-status">
                  ${myIcon}
                  <div class="map-card-status-text">
                    <div class="map-card-status-label">Alert: ${myStatusLabel}</div>
                    <div class="map-card-status-sub">Last updated ${latest.date}</div>
                  </div>
                </div>
                <div class="map-home-note">
                  Based on the most recent community report near <strong>${latest.location}</strong>.
                </div>
              </div>
            </button>

            <button class="map-card map-card-btn" id="nearDcCard" type="button">
              <div class="map-card-title">Nearby Data Center</div>
              <div class="map-card-body">
                <div class="map-dc-row">
                  <div class="map-dc-name">${nearest.dc.name}</div>
                  <div class="map-dc-dist">${nearest.miles.toFixed(1)} miles</div>
                </div>
                <div class="map-dc-sub">${nearest.dc.operator} · ${nearest.dc.county} County</div>
                <div class="map-dc-signal">
                  <div class="map-dc-signal-icon">${ICONS.signal}</div>
                  <div class="map-dc-signal-text">Tap for details</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    `;

    initMap();
    $("#mapFilter").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      state.mapFilter = btn.getAttribute("data-filter");
      $$(".filter-pill", $("#mapFilter")).forEach((b) => b.classList.toggle("active", b === btn));
      applyMapFilter();
    });

    $("#nearDcCard").addEventListener("click", () => {
      openModal({
        title: nearest.dc.name,
        subtitle: `${nearest.dc.operator} · ${nearest.dc.county} County · ${nearest.miles.toFixed(1)} miles away`,
        bodyHTML: `
          <div class="card" style="overflow:hidden;">
            <div class="wq-contaminant-row" style="grid-template-columns:1fr auto;">
              <div>
                <div class="wq-name">Cooling activity</div>
                <div class="wq-limit">Estimated from reported water use (prototype).</div>
              </div>
              <div><strong class="${coolingClass}" style="font-size:13px;">${coolingLabel}</strong></div>
            </div>
            <div class="wq-contaminant-row" style="grid-template-columns:1fr auto;">
              <div>
                <div class="wq-name">Status</div>
                <div class="wq-limit">Permitting / construction stage.</div>
              </div>
              <div><strong style="font-size:13px;">${nearest.dc.status}</strong></div>
            </div>
            <div class="wq-contaminant-row" style="grid-template-columns:1fr auto;">
              <div>
                <div class="wq-name">Water use</div>
                <div class="wq-limit">Cooling withdrawals (illustrative).</div>
              </div>
              <div><strong style="font-size:13px;">${nearest.dc.dailyGallons ? `${fmtNumber(nearest.dc.dailyGallons)} gal/day` : "—"}</strong></div>
            </div>
          </div>
        `,
      });
    });

    $("#homeAlertCard").addEventListener("click", () => {
      const rows = [
        { label: "Nitrate", value: `${latest.nitrate} mg/L`, limit: `${AppData.thresholds.nitrate.limit} mg/L` },
        { label: "Turbidity", value: `${latest.turbidity} NTU`, limit: `${AppData.thresholds.turbidity.limit} NTU` },
        { label: "Chloride", value: `${latest.chloride} mg/L`, limit: `${AppData.thresholds.chloride.limit} mg/L` },
        { label: "pH", value: `${latest.ph}`, limit: `${AppData.thresholds.ph.limit}` },
      ];

      openModal({
        title: `Local report: ${myStatusLabel}`,
        subtitle: `${latest.location} · ${latest.county} County · ${latest.date}`,
        bodyHTML: `
          <div class="ink-2" style="font-size:13px; line-height:1.55;">
            This is the most recent community-submitted test in your area (prototype demo). Use it as an early signal and compare against simplified EPA-style limits.
          </div>
          <div class="spacer-m"></div>
          <div class="card" style="overflow:hidden;">
            ${rows
              .map(
                (r) => `
                  <div class="wq-contaminant-row" style="grid-template-columns:1fr auto;">
                    <div>
                      <div class="wq-name">${r.label}</div>
                      <div class="wq-limit">Limit: ${r.limit}</div>
                    </div>
                    <div><strong style="font-size:13px;">${r.value}</strong></div>
                  </div>
                `,
              )
              .join("")}
            <div class="wq-contaminant-row" style="grid-template-columns:1fr auto;">
              <div>
                <div class="wq-name">PFAs</div>
                <div class="wq-limit">Not included in the latest report.</div>
              </div>
              <div><strong style="font-size:13px;">Not tested</strong></div>
            </div>
          </div>
        `,
      });
    });
  }

  function initMap() {
    clearMap();
    const center = [39.01, -77.48]; // Loudoun-ish
    state.map = L.map("leaflet-map", { zoomControl: false }).setView(center, 10.5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(state.map);
    setTimeout(() => {
      if (state.map) state.map.invalidateSize();
    }, 0);

    // Data centers
    state.mapLayers.centers = AppData.dataCenters.map((dc) => {
      const color =
        dc.status === "operating" ? "#0ea5e9" : dc.status === "construction" ? "#f59e0b" : "#8b5cf6";
      const marker = L.circleMarker([dc.lat, dc.lng], {
        radius: 7,
        color: "#ffffff",
        weight: 2,
        fillColor: color,
        fillOpacity: 0.95,
      })
        .addTo(state.map)
        .bindPopup(
          `<div class="map-popup">
            <strong>${dc.name}</strong>
            <div class="map-popup-row">${dc.operator} · ${dc.county} County</div>
            <div class="map-popup-row">Status: ${dc.status}</div>
            <div class="map-popup-row">Cooling water: ${dc.dailyGallons ? `${fmtNumber(dc.dailyGallons)} gal/day` : "—"}</div>
          </div>`,
        );
      marker.__type = "center";
      marker.__status = dc.status;
      return marker;
    });

    // Water readings
    state.mapLayers.readings = AppData.waterReadings.map((wr) => {
      const fill = wr.status === "good" ? "#10b981" : wr.status === "warn" ? "#f59e0b" : "#ef4444";
      const marker = L.circleMarker([wr.lat, wr.lng], {
        radius: 7,
        color: "#ffffff",
        weight: 2,
        fillColor: fill,
        fillOpacity: 0.95,
      })
        .addTo(state.map)
        .bindPopup(
          `<div class="map-popup">
            <strong>${wr.location}</strong>
            <div class="map-popup-row">${wr.county} County · ${wr.date}</div>
            <div class="map-popup-row">Nitrate: ${wr.nitrate} mg/L</div>
            <div class="map-popup-row">Turbidity: ${wr.turbidity} NTU</div>
          </div>`,
        );
      marker.__type = "reading";
      marker.__status = wr.status;
      return marker;
    });

    applyMapFilter();
  }

  function applyMapFilter() {
    if (!state.map) return;
    const showCenters = state.mapFilter === "all" || state.mapFilter === "centers" || state.mapFilter === "proposed";
    const showReadings = state.mapFilter === "all" || state.mapFilter === "reports";
    const onlyNewBuilds = state.mapFilter === "proposed";

    state.mapLayers.centers.forEach((m) => {
      const visible = showCenters && (!onlyNewBuilds || (m.__status !== "operating"));
      if (visible) m.addTo(state.map);
      else m.remove();
    });
    state.mapLayers.readings.forEach((m) => {
      const visible = showReadings;
      if (visible) m.addTo(state.map);
      else m.remove();
    });
  }

  function renderForum() {
    clearMap();
    setHeader({ title: "Forum", showBack: false, showTabs: true });

    const posts =
      state.forumFilter === "all"
        ? AppData.forumPosts
        : AppData.forumPosts.filter((p) => (state.forumFilter === "organizing" ? p.tags.includes("organizing") : true));

    els.appBody.innerHTML = `
      <div class="forum-tabs">
        <button class="forum-tab ${state.forumFilter === "all" ? "active" : ""}" data-filter="all">All</button>
        <button class="forum-tab ${state.forumFilter === "organizing" ? "active" : ""}" data-filter="organizing">Organizing</button>
        <button class="forum-tab ${state.forumFilter === "health" ? "active" : ""}" data-filter="health">Health</button>
      </div>
      <div>
        ${posts
          .map((p) => {
            const avatarBg = p.sub.includes("Ashburn") ? "#0ea5e9" : p.sub.includes("Fairfax") ? "#8b5cf6" : "#10b981";
            return `
              <button class="post-card" data-post="${p.id}">
                <div class="post-meta">
                  <span class="post-avatar" style="background:${avatarBg};">${p.author.slice(0, 1).toUpperCase()}</span>
                  <span class="post-author">${p.author}</span>
                  <span class="post-sub">${p.sub}</span>
                  <span>·</span>
                  <span>${p.ago}</span>
                </div>
                <div class="post-title">${p.title}</div>
                <div class="post-body">${p.body}</div>
                <div class="post-actions">
                  <span class="post-action">${ICONS.plus} ${fmtNumber(p.votes)}</span>
                  <span class="post-action">${ICONS.chat} ${fmtNumber(p.comments)}</span>
                  <span class="post-action">${ICONS.arrow} Open</span>
                </div>
              </button>
            `;
          })
          .join("")}
      </div>
      <button class="fab" id="newPostFab" aria-label="New post">${ICONS.plus}</button>
    `;

    $(".forum-tabs").addEventListener("click", (e) => {
      const b = e.target.closest("[data-filter]");
      if (!b) return;
      state.forumFilter = b.getAttribute("data-filter");
      renderForum();
    });

    $$("[data-post]").forEach((b) =>
      b.addEventListener("click", () => push({ type: "thread", postId: b.getAttribute("data-post") })),
    );
    $("#newPostFab").addEventListener("click", () => {
      openModal({
        title: "Create a post",
        subtitle: "Prototype demo. In the real app, posts can be anonymous and location-privacy protected.",
        bodyHTML: `
          <div class="form-group">
            <label class="form-label">Title</label>
            <input class="form-control" value="Is anyone else seeing foamy runoff near Goose Creek?" />
          </div>
          <div class="form-group">
            <label class="form-label">Details</label>
            <textarea class="form-control">Noticed foam and odor after heavy rain. If you’re nearby, please test and upload.</textarea>
          </div>
          <button class="btn btn-primary btn-block" id="fakePost">Post</button>
        `,
      });
      $("#fakePost").addEventListener("click", () => {
        closeModal();
        toast("Posted to your local forum.");
      });
    });
  }

  function renderThread(postId) {
    clearMap();
    const post = AppData.forumPosts.find((p) => p.id === postId);
    setHeader({ title: "Thread", showBack: true, showTabs: true });
    if (!post) {
      els.appBody.innerHTML = `<div class="empty-state">Post not found.</div>`;
      return;
    }

    const avatarBg = post.sub.includes("Ashburn") ? "#0ea5e9" : post.sub.includes("Fairfax") ? "#8b5cf6" : "#10b981";
    els.appBody.innerHTML = `
      <div class="detail-hero">
        <div class="post-meta" style="margin-bottom:10px;">
          <span class="post-avatar" style="background:${avatarBg};">${post.author.slice(0, 1).toUpperCase()}</span>
          <span class="post-author">${post.author}</span>
          <span class="post-sub">${post.sub}</span>
          <span>·</span>
          <span>${post.ago}</span>
        </div>
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <div class="spacer-m"></div>
        <button class="btn btn-secondary btn-block" id="attachData">${ICONS.test} Attach my water test</button>
      </div>
      <div class="thread-comments">
        ${AppData.threadComments
          .map((c) => {
            const bg = "#0f172a";
            return `
              <div class="thread-comment">
                <div class="thread-comment-avatar" style="background:${bg};">${c.author.slice(0, 1).toUpperCase()}</div>
                <div class="thread-comment-body">
                  <div class="thread-comment-meta"><strong>${c.author}</strong> · ${c.ago}</div>
                  <div class="thread-comment-text">${c.text}</div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
      <div class="section">
        <button class="btn btn-primary btn-block" id="replyBtn">${ICONS.chat} Reply</button>
      </div>
    `;

    $("#attachData").addEventListener("click", () => toast("Attached your latest test (demo)."));
    $("#replyBtn").addEventListener("click", () => {
      openModal({
        title: "Reply",
        subtitle: "Prototype demo. Replies can be anonymous in the real app.",
        bodyHTML: `
          <div class="form-group">
            <label class="form-label">Your reply</label>
            <textarea class="form-control">We’re seeing the same sediment. Filed a report through the app—happy to coordinate a joint complaint.</textarea>
          </div>
          <button class="btn btn-primary btn-block" id="fakeReply">Post reply</button>
        `,
      });
      $("#fakeReply").addEventListener("click", () => {
        closeModal();
        toast("Reply posted.");
      });
    });
  }

  function renderReport() {
    clearMap();
    setHeader({ title: "Report", showBack: false, showTabs: true });

    const types = [
      {
        id: "water",
        title: "Water change",
        sub: "Odor, color, sediment, foam",
        iconBg: "rgba(239,68,68,0.12)",
        iconColor: "#991b1b",
        icon: ICONS.warn,
      },
      {
        id: "runoff",
        title: "Runoff / spill",
        sub: "Drainage, discharge, creek impact",
        iconBg: "rgba(245,158,11,0.14)",
        iconColor: "#92400e",
        icon: ICONS.pin,
      },
      {
        id: "construction",
        title: "New construction",
        sub: "Permits, rezoning, land clearing",
        iconBg: "rgba(139,92,246,0.12)",
        iconColor: "#6d28d9",
        icon: ICONS.megaphone,
      },
      {
        id: "noise",
        title: "Noise / air",
        sub: "Fan noise, diesel, dust",
        iconBg: "rgba(14,165,233,0.12)",
        iconColor: "#0369a1",
        icon: ICONS.chat,
      },
    ];

    els.appBody.innerHTML = `
      <div class="report-hero">
        <h2>Report an issue</h2>
        <p>Create a timestamped record the community can corroborate (prototype demo).</p>
      </div>

      <div class="report-type-grid" id="reportTypes">
        ${types
          .map(
            (t) => `
              <button class="report-type ${state.reportType === t.id ? "selected" : ""}" data-type="${t.id}">
                <div class="report-type-icon" style="background:${t.iconBg}; color:${t.iconColor};">${t.icon}</div>
                <div class="report-type-title">${t.title}</div>
                <div class="report-type-sub">${t.sub}</div>
              </button>
            `,
          )
          .join("")}
      </div>

      <div class="form-group">
        <label class="form-label">Nearest area</label>
        <input class="form-control" value="Ashburn · Broad Run basin" />
      </div>
      <div class="form-group">
        <label class="form-label">What did you observe?</label>
        <textarea class="form-control">Water is cloudy with brown sediment; noticeable metallic smell.</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Add photo (optional)</label>
        <div class="photo-drop">${ICONS.camera}<div class="spacer-s"></div>Tap to add a photo</div>
      </div>
      <div class="section">
        <button class="btn btn-danger btn-block" id="submitReport">${ICONS.warn} Submit report</button>
        <div class="spacer-s"></div>
        <button class="btn btn-secondary btn-block" id="attachTest">${ICONS.test} Attach a water test</button>
      </div>
    `;

    $("#reportTypes").addEventListener("click", (e) => {
      const b = e.target.closest("[data-type]");
      if (!b) return;
      state.reportType = b.getAttribute("data-type");
      renderReport();
    });

    $("#submitReport").addEventListener("click", () => toast("Report submitted. Thank you."));
    $("#attachTest").addEventListener("click", () => push({ type: "water" }));
  }

  function renderAdvocate() {
    clearMap();
    setHeader({ title: "Advocate", showBack: false, showTabs: true });

    const top = AppData.campaigns[0];
    const pct = Math.min(100, Math.round((top.signatures / top.goal) * 100));

    els.appBody.innerHTML = `
      <div class="adv-hero">
        <div class="adv-hero-label">Turn evidence into action</div>
        <div class="adv-hero-h">Bring your community data to decision-makers.</div>
        <p class="adv-hero-p">Coordinate hearings, export summaries, and sign petitions tied to NoVA water protections.</p>
        <div class="adv-progress">
          <div class="adv-progress-fill" style="width:${pct}%"></div>
        </div>
        <div class="adv-progress-label">${fmtNumber(top.signatures)} / ${fmtNumber(top.goal)} signatures · ${top.title}</div>
      </div>

      <div class="section">
        <div class="section-title">Campaigns</div>
        <div class="card">
          ${AppData.campaigns
            .map((c) => {
              const bg =
                c.color === "purple"
                  ? "rgba(139,92,246,0.12)"
                  : c.color === "good"
                    ? "rgba(16,185,129,0.14)"
                    : "rgba(14,165,233,0.12)";
              const col = c.color === "purple" ? "#6d28d9" : c.color === "good" ? "#065f46" : "#0369a1";
              const pct2 = Math.min(100, Math.round((c.signatures / c.goal) * 100));
              return `
                <button class="list-row" data-campaign="${c.id}">
                  <div class="list-row-icon" style="background:${bg}; color:${col};">${ICONS.megaphone}</div>
                  <div class="list-row-body">
                    <div class="list-row-title">${c.title}</div>
                    <div class="list-row-sub">${c.body}</div>
                    <div class="list-row-meta">${pct2}% to goal</div>
                  </div>
                  <div class="list-row-meta">Open</div>
                </button>
              `;
            })
            .join("")}
        </div>
      </div>
    `;

    $$("[data-campaign]").forEach((b) =>
      b.addEventListener("click", () => {
        const c = AppData.campaigns.find((x) => x.id === b.getAttribute("data-campaign"));
        if (!c) return;
        openModal({
          title: c.title,
          subtitle: c.audience,
          bodyHTML: `
            <div class="ink-2" style="font-size:13px; line-height:1.55;">${c.body}</div>
            <div class="spacer-m"></div>
            <button class="btn btn-primary btn-block" id="signBtn">Sign / RSVP</button>
            <div class="spacer-s"></div>
            <button class="btn btn-secondary btn-block" id="exportBtn">Export local summary (PDF)</button>
          `,
        });
        $("#signBtn").addEventListener("click", () => {
          closeModal();
          toast("Signed. Thanks for taking action.");
        });
        $("#exportBtn").addEventListener("click", () => {
          closeModal();
          toast("Export queued (demo).");
        });
      }),
    );
  }

  function openAlertsModal() {
    openModal({
      title: "Alerts",
      subtitle: "Real-time notifications from your basin and nearby permits (prototype).",
      bodyHTML: `
        <div class="card" style="overflow:hidden;">
          ${AppData.alerts
            .map((a) => {
              const chip =
                a.severity === "bad"
                  ? `<span class="chip chip-bad"><span class="chip-dot"></span>High</span>`
                  : a.severity === "warn"
                    ? `<span class="chip chip-warn"><span class="chip-dot"></span>Medium</span>`
                    : `<span class="chip chip-info"><span class="chip-dot"></span>Info</span>`;
              return `
                <div class="wq-contaminant-row" style="grid-template-columns:1fr auto;">
                  <div>
                    <div class="wq-name">${a.title}</div>
                    <div class="wq-limit">${a.body}</div>
                    <div class="wq-limit" style="margin-top:6px;">${a.time}</div>
                  </div>
                  <div>${chip}</div>
                </div>
              `;
            })
            .join("")}
        </div>
      `,
    });
  }

  /* ============================================================
     Router
     ============================================================ */
  function renderRoute(route, { pushToStack = true } = {}) {
    if (pushToStack) state.stack.push(route);
    els.appBody.classList.remove("fade-in");
    // force reflow for animation
    void els.appBody.offsetWidth; // eslint-disable-line no-unused-expressions
    els.appBody.classList.add("fade-in");

    if (route.type === "water") renderWaterQuality();
    else if (route.type === "thread") renderThread(route.postId);
    else renderHome();
  }

  function goToTab(tab, { resetStack = false } = {}) {
    state.activeTab = tab;
    if (resetStack) state.stack = [{ type: "tab", tab }];
    else if (!state.stack.length) state.stack = [{ type: "tab", tab }];

    $$(".tab", els.tabs).forEach((b) => b.classList.toggle("active", b.getAttribute("data-screen") === tab));

    // Render
    if (tab === "home") renderHome();
    else if (tab === "map") renderMap();
    else if (tab === "report") renderReport();
    else if (tab === "forum") renderForum();
    else if (tab === "advocate") renderAdvocate();
  }

  /* ============================================================
     Wiring
     ============================================================ */
  els.backBtn.addEventListener("click", () => pop());
  els.alertBtn.addEventListener("click", () => openAlertsModal());

  els.tabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    const tab = btn.getAttribute("data-screen");
    goToTab(tab, { resetStack: true });
  });

  // Initial boot
  const params = new URLSearchParams(window.location.search);
  const screen = params.get('screen');
  if (screen === 'home') { state.hasOnboarded = true; goToTab('home', {resetStack: true}); }
  else if (screen === 'map') { state.hasOnboarded = true; goToTab('map', {resetStack: true}); }
  else if (screen === 'report') { state.hasOnboarded = true; goToTab('report', {resetStack: true}); }
  else if (!state.hasOnboarded) renderOnboarding();
})();

