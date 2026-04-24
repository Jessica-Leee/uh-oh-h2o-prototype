/* ============================================================
   Uh-Oh H2O — Mock data for prototype
   All data is illustrative. Locations of real NoVA data centers
   are approximate (Loudoun, Prince William, Fairfax counties).
   ============================================================ */

window.AppData = (function () {
  /* ---------------------------------------------------------
     Data centers across "Data Center Alley" (Loudoun County +
     surrounding counties). Coordinates are approximate.
     --------------------------------------------------------- */
  const dataCenters = [
    { id: "dc-1",  name: "Ashburn Campus A",      operator: "CloudCore",    county: "Loudoun",        lat: 39.0440, lng: -77.4874, status: "operating",   dailyGallons: 4_800_000, year: 2019 },
    { id: "dc-2",  name: "Sterling East Facility", operator: "HyperNet",     county: "Loudoun",        lat: 39.0062, lng: -77.4286, status: "operating",   dailyGallons: 3_200_000, year: 2021 },
    { id: "dc-3",  name: "Dulles Tech Park 3",     operator: "OrbitAI",      county: "Loudoun",        lat: 39.0140, lng: -77.4700, status: "operating",   dailyGallons: 5_100_000, year: 2022 },
    { id: "dc-4",  name: "Leesburg North Site",    operator: "StratoEdge",   county: "Loudoun",        lat: 39.1160, lng: -77.5636, status: "construction", dailyGallons: 0,       year: 2026 },
    { id: "dc-5",  name: "Manassas DC Campus",     operator: "CloudCore",    county: "Prince William", lat: 38.7509, lng: -77.4753, status: "operating",   dailyGallons: 2_400_000, year: 2020 },
    { id: "dc-6",  name: "Gainesville Compute",    operator: "NimbusAI",     county: "Prince William", lat: 38.7956, lng: -77.6147, status: "construction", dailyGallons: 0,       year: 2026 },
    { id: "dc-7",  name: "Chantilly Node",         operator: "HyperNet",     county: "Fairfax",        lat: 38.8943, lng: -77.4311, status: "operating",   dailyGallons: 2_900_000, year: 2018 },
    { id: "dc-8",  name: "Reston AI Center",       operator: "OrbitAI",      county: "Fairfax",        lat: 38.9586, lng: -77.3570, status: "operating",   dailyGallons: 3_600_000, year: 2023 },
    { id: "dc-9",  name: "Haymarket Expansion",    operator: "StratoEdge",   county: "Prince William", lat: 38.8121, lng: -77.6366, status: "proposed",    dailyGallons: 0,       year: 2027 },
    { id: "dc-10", name: "Brambleton Facility",    operator: "NimbusAI",     county: "Loudoun",        lat: 38.9900, lng: -77.5330, status: "operating",   dailyGallons: 4_100_000, year: 2022 },
    { id: "dc-11", name: "South Riding Node",      operator: "CloudCore",    county: "Loudoun",        lat: 38.9239, lng: -77.5999, status: "proposed",    dailyGallons: 0,       year: 2027 },
    { id: "dc-12", name: "Herndon Compute Park",   operator: "HyperNet",     county: "Fairfax",        lat: 38.9695, lng: -77.3861, status: "operating",   dailyGallons: 1_800_000, year: 2017 },
  ];

  /* ---------------------------------------------------------
     Community water-quality test results (resident-submitted)
     --------------------------------------------------------- */
  const waterReadings = [
    { id: "wr-1",  location: "Broad Run, Ashburn",         county: "Loudoun",        lat: 39.0232, lng: -77.4550, date: "2026-04-18", nitrate: 38.2, chloride: 110, turbidity: 4.1, ph: 7.6, status: "bad"  },
    { id: "wr-2",  location: "Goose Creek, Leesburg",      county: "Loudoun",        lat: 39.0937, lng: -77.5350, date: "2026-04-17", nitrate: 18.5, chloride: 68,  turbidity: 2.2, ph: 7.9, status: "warn" },
    { id: "wr-3",  location: "Potomac, Algonkian Park",    county: "Loudoun",        lat: 39.0568, lng: -77.3686, date: "2026-04-16", nitrate: 7.1,  chloride: 42,  turbidity: 1.3, ph: 7.4, status: "good" },
    { id: "wr-4",  location: "Bull Run, Manassas",         county: "Prince William", lat: 38.7940, lng: -77.5220, date: "2026-04-15", nitrate: 22.0, chloride: 88,  turbidity: 3.0, ph: 7.8, status: "warn" },
    { id: "wr-5",  location: "Cedar Run, Gainesville",     county: "Prince William", lat: 38.7680, lng: -77.6000, date: "2026-04-15", nitrate: 29.4, chloride: 94,  turbidity: 3.6, ph: 7.7, status: "bad"  },
    { id: "wr-6",  location: "Difficult Run, Reston",      county: "Fairfax",        lat: 38.9480, lng: -77.3400, date: "2026-04-14", nitrate: 12.1, chloride: 55,  turbidity: 1.9, ph: 7.5, status: "warn" },
    { id: "wr-7",  location: "Sugarland Run, Herndon",     county: "Fairfax",        lat: 38.9830, lng: -77.3830, date: "2026-04-14", nitrate: 8.5,  chloride: 49,  turbidity: 1.6, ph: 7.3, status: "good" },
    { id: "wr-8",  location: "Private well, Ashburn",      county: "Loudoun",        lat: 39.0380, lng: -77.4750, date: "2026-04-13", nitrate: 42.7, chloride: 130, turbidity: 5.2, ph: 7.9, status: "bad"  },
    { id: "wr-9",  location: "Occoquan Reservoir",         county: "Prince William", lat: 38.6920, lng: -77.3700, date: "2026-04-12", nitrate: 5.4,  chloride: 36,  turbidity: 1.0, ph: 7.2, status: "good" },
  ];

  /* ---------------------------------------------------------
     Daily aggregate contamination index for past 14 days
     --------------------------------------------------------- */
  const trendIndex = [
    18, 22, 25, 21, 28, 34, 31, 36, 42, 39, 44, 48, 46, 51,
  ];

  /* ---------------------------------------------------------
     EPA thresholds (illustrative, simplified)
     --------------------------------------------------------- */
  const thresholds = {
    nitrate:   { limit: 10, unit: "mg/L", label: "Nitrate"   },
    chloride:  { limit: 250,unit: "mg/L", label: "Chloride"  },
    turbidity: { limit: 5,  unit: "NTU",  label: "Turbidity" },
    ph:        { limit: 8.5,unit: "",     label: "pH"        },
  };

  /* ---------------------------------------------------------
     Community forum posts
     --------------------------------------------------------- */
  const forumPosts = [
    {
      id: "p1",
      sub: "r/AshburnWater",
      author: "MariaH",
      ago: "2h",
      title: "Brown sediment in well water — anyone else near Ashburn Campus A?",
      body: "Started noticing brown flecks in our tap around 6am. We're about half a mile from the CloudCore facility off Waxpool Rd. Water test kit arrived yesterday — results attached (nitrate 38 mg/L). Filing with the county but want to hear if others are seeing this.",
      votes: 142, comments: 37, tags: ["sediment", "private-well"]
    },
    {
      id: "p2",
      sub: "r/LoudounCounty",
      author: "JamesO",
      ago: "5h",
      title: "New data center permit filed near Broad Run — public comment period ends Friday",
      body: "Loudoun planning commission just posted a new rezoning application for a 2.1M sq ft hyperscale facility. Public hearing is this Friday 7pm. Linking the application below — please show up or submit written comments.",
      votes: 231, comments: 84, tags: ["organizing", "permit"]
    },
    {
      id: "p3",
      sub: "r/PrinceWilliamWater",
      author: "TinaR",
      ago: "9h",
      title: "Water bill jumped 40% this quarter — is anyone tracking rate changes?",
      body: "Just got my Prince William Service Authority bill and it's way higher than last year. I know they've been building out infrastructure to support the Manassas DC Campus. Has anyone seen the rate-case filings?",
      votes: 88, comments: 22, tags: ["cost", "utility"]
    },
    {
      id: "p4",
      sub: "r/DataCenterAlley",
      author: "RohanS",
      ago: "1d",
      title: "Lab results back — nitrate 4.2x federal limit in my well (Brambleton)",
      body: "Got professional lab confirmation this morning. I live 0.7mi from Brambleton Facility. County health dept said they'd send someone next week. Uploading my test to the dashboard. If you're in the same ZIP, please test and upload.",
      votes: 419, comments: 156, tags: ["health", "nitrate"]
    },
    {
      id: "p5",
      sub: "r/FairfaxWater",
      author: "DeniseK",
      ago: "1d",
      title: "Town hall with Del. Clark on data center regulation — this Saturday, Reston CC",
      body: "Del. Clark is hosting a town hall specifically on HB 862 (data center water disclosure bill). 10am Saturday at Reston Community Center. Bringing our app data printout — if anyone wants to coordinate talking points, reply here.",
      votes: 178, comments: 41, tags: ["organizing", "policy"]
    },
    {
      id: "p6",
      sub: "r/AshburnWater",
      author: "WillP",
      ago: "2d",
      title: "Kit arrived — walking through the first-time setup",
      body: "For anyone who just got their NAACP-distributed kit: quick tutorial on calibrating the nitrate strip and logging your first result. Video in comments.",
      votes: 64, comments: 19, tags: ["help", "tutorial"]
    },
  ];

  /* ---------------------------------------------------------
     Comments for post #1 (for thread view)
     --------------------------------------------------------- */
  const threadComments = [
    { author: "GregT",  ago: "1h",  text: "Same thing on our side of Waxpool. Kid refused to drink from the tap this morning. Running a test now." },
    { author: "LindaK", ago: "1h",  text: "We've seen brown sediment intermittently for three weeks. Switched to bottled water until the county gets back to us." },
    { author: "JamesO", ago: "45m", text: "Cross-posting this to r/LoudounCounty — we need as much documentation as possible for Friday's hearing." },
    { author: "AshD",   ago: "30m", text: "Filed a report through the app's \"Report an Issue\" button — anyone want to coordinate a joint complaint letter?" },
    { author: "MariaH", ago: "10m", text: "Thanks everyone. Lab results in 3-5 days. I'll repost with the numbers when I have them." },
  ];

  /* ---------------------------------------------------------
     Real-time alerts
     --------------------------------------------------------- */
  const alerts = [
    {
      id: "a1",
      type: "construction",
      title: "New data center permit filed near you",
      body: "StratoEdge has filed a rezoning application for a 2.1M sq ft facility 1.4 miles from your home. Public comment period closes April 25.",
      time: "2h ago",
      severity: "warn",
    },
    {
      id: "a2",
      type: "quality",
      title: "Nitrate spike in Broad Run sub-basin",
      body: "8 reports in the last 24 hours show nitrate above EPA limit. Consider pausing private-well use until confirmed.",
      time: "5h ago",
      severity: "bad",
    },
    {
      id: "a3",
      type: "organizing",
      title: "Town hall this Saturday — Del. Clark",
      body: "HB 862 (Data Center Water Disclosure). Reston Community Center, 10am.",
      time: "1d ago",
      severity: "info",
    },
  ];

  /* ---------------------------------------------------------
     Advocacy campaigns
     --------------------------------------------------------- */
  const campaigns = [
    {
      id: "c1",
      title: "Petition: Require water-use disclosure for all VA data centers",
      body: "Add your signature to the petition supporting Virginia HB 862, which would require quarterly public reporting of water withdrawals and cooling wastewater outputs.",
      signatures: 8427,
      goal: 10000,
      audience: "VA General Assembly",
      icon: "scroll",
      color: "purple",
    },
    {
      id: "c2",
      title: "Letter to EPA Region 3: nitrate contamination in NoVA",
      body: "Send a pre-drafted letter with your test results attached to the EPA mid-Atlantic office requesting investigation of cooling discharge impacts.",
      signatures: 3190,
      goal: 5000,
      audience: "EPA Region 3",
      icon: "mail",
      color: "brand",
    },
    {
      id: "c3",
      title: "Town hall RSVP — Loudoun water protections ordinance",
      body: "Board of Supervisors is voting May 7 on a county ordinance adding minimum-buffer requirements between data centers and drinking-water sources.",
      signatures: 512,
      goal: 1500,
      audience: "Loudoun Board of Supervisors",
      icon: "users",
      color: "good",
    },
  ];

  return {
    dataCenters,
    waterReadings,
    trendIndex,
    thresholds,
    forumPosts,
    threadComments,
    alerts,
    campaigns,
  };
})();
