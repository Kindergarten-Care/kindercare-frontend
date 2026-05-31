const fs = require("fs");
const path = require("path");

const appsDir = path.join(__dirname, "..", "apps");
const turboDir = path.join(__dirname, "..", ".turbo");

// Clean .next cache from all apps
if (fs.existsSync(appsDir)) {
  const apps = fs.readdirSync(appsDir, { withFileTypes: true });

  for (const app of apps) {
    if (!app.isDirectory()) continue;

    const nextDir = path.join(appsDir, app.name, ".next");
    if (fs.existsSync(nextDir)) {
      fs.rmSync(nextDir, { recursive: true, force: true });
      console.log(`Cleaned: apps/${app.name}/.next`);
    }
  }
}

// Clean .turbo cache
if (fs.existsSync(turboDir)) {
  fs.rmSync(turboDir, { recursive: true, force: true });
  console.log("Cleaned: .turbo");
}

console.log("All caches cleaned successfully.");
