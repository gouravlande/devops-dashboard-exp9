const express = require("express");
const os = require("os");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ================= LOGGER =================
function log(message) {
  const logMsg = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync("app.log", logMsg);
  console.log(logMsg);
}

// ================= DASHBOARD UI =================
app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>DevOps Dashboard</title>
    <style>
      body {
        font-family: Arial;
        background: linear-gradient(135deg, #1e3c72, #2a5298);
        color: white;
        text-align: center;
        margin: 0;
      }

      h1 { margin-top: 20px; }

      .status span {
        padding: 5px 10px;
        border-radius: 10px;
      }

      .up { background: green; }
      .down { background: red; }

      .container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 20px;
      }

      .card {
        background: rgba(255,255,255,0.1);
        border-radius: 15px;
        padding: 20px;
        margin: 15px;
        width: 250px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      }

      button {
        margin-top: 10px;
        padding: 10px;
        border: none;
        border-radius: 8px;
        background: #00c6ff;
        color: white;
        cursor: pointer;
      }

      .bar {
        height: 10px;
        background: #444;
        border-radius: 5px;
      }

      .fill {
        height: 100%;
        background: #00ffcc;
        border-radius: 5px;
      }

      pre {
        background: black;
        padding: 15px;
        border-radius: 10px;
        width: 80%;
        margin: 20px auto;
        text-align: left;
        overflow-x: auto;
      }
    </style>
  </head>

  <body>

    <h1>🚀 DevOps Live Dashboard</h1>

    <div class="status">
      Status: <span id="status" class="down">Checking...</span>
    </div>

    <div class="container">

      <div class="card">
        <h2>System Metrics</h2>
        <p>CPU Usage</p>
        <div class="bar"><div id="cpu" class="fill"></div></div>

        <p>Memory Usage</p>
        <div class="bar"><div id="memory" class="fill"></div></div>
      </div>

      <div class="card">
        <h2>Health API</h2>
        <button onclick="callAPI('/health')">Run</button>
      </div>

      <div class="card">
        <h2>Users API</h2>
        <button onclick="callAPI('/api/users')">Run</button>
      </div>

      <div class="card">
        <h2>Error Test</h2>
        <button onclick="callAPI('/error')">Run</button>
      </div>

      <div class="card">
        <h2>Deployment</h2>
        <p>Environment: Docker + Kubernetes</p>
        <p>Status: Running</p>
      </div>

    </div>

    <h2>⚙️ Pipeline Status</h2>
    <div class="container">
      <div class="card">GitHub ✔</div>
      <div class="card">Jenkins ⏳</div>
      <div class="card">Docker ✔</div>
      <div class="card">Kubernetes ✔</div>
    </div>

    <h2>📊 Output</h2>
    <pre id="output"></pre>

    <h2>📜 Logs</h2>
    <pre id="logs"></pre>

    <script>
      async function checkHealth() {
        try {
          const res = await fetch('/health');
          if(res.ok){
            document.getElementById("status").innerText = "UP";
            document.getElementById("status").className = "up";
          }
        } catch {
          document.getElementById("status").innerText = "DOWN";
          document.getElementById("status").className = "down";
        }
      }

      async function loadMetrics() {
        const res = await fetch('/info');
        const data = await res.json();

        const total = parseFloat(data.totalMemory);
        const free = parseFloat(data.freeMemory);
        const used = ((total - free) / total) * 100;

        document.getElementById("memory").style.width = used + "%";
        document.getElementById("cpu").style.width = (Math.random()*100) + "%";
      }

      async function callAPI(endpoint) {
        try {
          const res = await fetch(endpoint);
          const data = await res.json();
          document.getElementById("output").innerText =
            JSON.stringify(data, null, 2);
        } catch (err) {
          document.getElementById("output").innerText = err;
        }
      }

      async function loadLogs() {
        const res = await fetch('/logs');
        const text = await res.text();
        document.getElementById("logs").innerText = text;
      }

      setInterval(() => {
        checkHealth();
        loadMetrics();
        loadLogs();
      }, 2000);
    </script>

  </body>
  </html>
  `);
});

// ================= HEALTH =================
app.get("/health", (req, res) => {
  log("Health check");
  res.json({
    status: "UP",
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// ================= SYSTEM INFO =================
app.get("/info", (req, res) => {
  log("System info");
  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    cpu: os.cpus().length,
    totalMemory: (os.totalmem() / 1024 / 1024).toFixed(2),
    freeMemory: (os.freemem() / 1024 / 1024).toFixed(2)
  });
});

// ================= USERS =================
app.get("/api/users", (req, res) => {
  log("Users API");
  res.json([
    { id: 1, name: "Gourav", role: "DevOps Engineer" },
    { id: 2, name: "Cloud Bot", role: "AI Assistant" }
  ]);
});

// ================= ERROR =================
app.get("/error", (req, res) => {
  log("Error triggered");
  throw new Error("Simulated failure 🚨");
});

// ================= LOGS =================
app.get("/logs", (req, res) => {
  try {
    const data = fs.readFileSync("app.log", "utf-8");
    res.send(data);
  } catch {
    res.send("No logs yet...");
  }
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  log("Error: " + err.message);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

// ================= START =================
app.listen(PORT, () => {
  log("Server running on port " + PORT);
});
