/* ============================================================
   Uh-Oh H2O — Mock data for prototype
   All data is illustrative. Locations of real NoVA data centers
   are approximate (Loudoun, Prince William, Fairfax counties).
   ============================================================ */

window.AppData = (function () {
  /* ---------------------------------------------------------
     Real NoVA data-center sites (public addresses/locations).
     Coordinates are based on real mapped locations.
     --------------------------------------------------------- */
  const dataCenters = [
    {
      id: "dc-1",
      name: "Equinix Ashburn DC15",
      operator: "Equinix",
      county: "Loudoun",
      lat: 39.0225001,
      lng: -77.4502558,
      status: "operating",
      dailyGallons: 4_700_000,
      year: 2019,
    },
    {
      id: "dc-2",
      name: "QTS Ashburn 1",
      operator: "QTS",
      county: "Loudoun",
      lat: 38.9996134,
      lng: -77.4501392,
      status: "operating",
      dailyGallons: 4_200_000,
      year: 2020,
    },
    {
      id: "dc-3",
      name: "QTS Ashburn (Shellhorn)",
      operator: "QTS",
      county: "Loudoun",
      lat: 39.000915,
      lng: -77.475168,
      status: "operating",
      dailyGallons: 4_900_000,
      year: 2021,
    },
    {
      id: "dc-4",
      name: "Digital Realty IAD24",
      operator: "Digital Realty",
      county: "Loudoun",
      lat: 39.0043335,
      lng: -77.4843499,
      status: "operating",
      dailyGallons: 3_300_000,
      year: 2018,
    },
    {
      id: "dc-5",
      name: "CyrusOne NVA1-NVA3",
      operator: "CyrusOne",
      county: "Loudoun",
      lat: 39.0259287,
      lng: -77.4145789,
      status: "operating",
      dailyGallons: 2_900_000,
      year: 2017,
    },
    {
      id: "dc-6",
      name: "CyrusOne NVA4",
      operator: "CyrusOne",
      county: "Loudoun",
      lat: 38.9856079,
      lng: -77.424503,
      status: "operating",
      dailyGallons: 2_100_000,
      year: 2020,
    },
  ];

  /* ---------------------------------------------------------
     Community water-quality test results (resident-submitted)
     pinned to real waterways/landmarks in Northern Virginia.
     --------------------------------------------------------- */
  const waterReadings = [
    {
      id: "wr-1",
      location: "Broad Run (Potomac confluence, Sterling)",
      county: "Loudoun",
      lat: 39.0712187,
      lng: -77.443877,
      date: "2026-04-18",
      nitrate: 21.4,
      chloride: 84,
      turbidity: 3.3,
      ph: 7.6,
      status: "warn",
    },
    {
      id: "wr-2",
      location: "Goose Creek (near Leesburg mouth)",
      county: "Loudoun",
      lat: 39.1012177,
      lng: -77.4772109,
      date: "2026-04-17",
      nitrate: 17.8,
      chloride: 67,
      turbidity: 2.4,
      ph: 7.8,
      status: "warn",
    },
    {
      id: "wr-3",
      location: "Potomac River (Algonkian Regional Park)",
      county: "Loudoun",
      lat: 39.05844,
      lng: -77.37915,
      date: "2026-04-16",
      nitrate: 8.2,
      chloride: 44,
      turbidity: 1.4,
      ph: 7.4,
      status: "good",
    },
    {
      id: "wr-4",
      location: "Bull Run (Manassas battlefield area)",
      county: "Prince William",
      lat: 38.81278,
      lng: -77.52167,
      date: "2026-04-15",
      nitrate: 23.1,
      chloride: 91,
      turbidity: 3.1,
      ph: 7.7,
      status: "warn",
    },
    {
      id: "wr-5",
      location: "Occoquan Reservoir",
      county: "Prince William",
      lat: 38.69417,
      lng: -77.27639,
      date: "2026-04-14",
      nitrate: 6.0,
      chloride: 38,
      turbidity: 1.1,
      ph: 7.3,
      status: "good",
    },
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
      sub: "Ashburn",
      author: "WRritter",
      authorHandle: "@WWriter",
      ago: "2 hrs ago",
      topicLabel: "HOT TOPIC",
      title: "Strange metallic taste in well water, anyone else?",
      body: "Noticing an odd taste in our tap near Data Center Z since this morning. Curious if neighbors in this zone are seeing the same change.",
      votes: 112,
      comments: 45,
      tags: ["Smell", "Taste", "Well Water"]
    },
    {
      id: "p2",
      sub: "Chesapeake",
      author: "ChesapeakeAdvocate",
      authorHandle: "@ChesapeakeAdvocate",
      ago: "5 hrs ago",
      topicLabel: "UPCOMING ACTION",
      pinnedBy: "NAACP Partner Liaison, 5 hrs ago",
      title: "Aggregate well water data to present to local EPA office. Volunteer sign-up thread.",
      body: "We are compiling resident kit results this week for a coordinated EPA briefing. Add your data point and availability for testimony support.",
      votes: 98,
      comments: 27,
      tags: ["EPA", "Advocacy", "Data Collection"]
    },
    {
      id: "p3",
      sub: "Ashburn",
      author: "NewTeSteR",
      authorHandle: "@NewTeSteR",
      ago: "8 hrs ago",
      title: "Need help interpreting Turbidity test result from kit. Yellow seems darker than chart, can anyone advise?",
      body: "First time using the kit and I am unsure if this falls into caution range. Sharing a photo in comments for anyone who can sanity-check my reading.",
      votes: 74,
      comments: 18,
      tags: ["Kit Help", "Interpretation", "Turbidity"]
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
      title: "Letter to EPA Region 3: nitrate contamination",
      body: "Send a pre-drafted letter with your test results attached to the EPA mid-Atlantic office requesting investigation of cooling discharge impacts.",
      signatures: 3190,
      goal: 5000,
      audience: "EPA Region 3",
      icon: "mail",
      color: "brand",
    },
    {
      id: "c3",
      title: "Town hall RSVP - Loudoun water protections ordinance",
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
