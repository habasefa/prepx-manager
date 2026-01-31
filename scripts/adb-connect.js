const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// Attempt to find ADB in the default Windows location
const platformToolsPath = path.join(
  process.env.LOCALAPPDATA,
  "Android",
  "Sdk",
  "platform-tools",
);
const adbExe = path.join(platformToolsPath, "adb.exe");

// Check if file exists, otherwise assume 'adb' is in global path
const adbCommand = fs.existsSync(adbExe) ? `"${adbExe}"` : "adb";

console.log(`🔌 Attempting to connect via ADB...`);
console.log(`   Command: ${adbCommand} reverse tcp:8081 tcp:8081`);

exec(`${adbCommand} reverse tcp:8081 tcp:8081`, (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Connection Failed: ${error.message}`);
    console.log("\n⚠️ Troubleshooting Steps:");
    console.log("1. Is your phone plugged in via USB?");
    console.log(
      "2. Is 'USB Debugging' enabled in Developer Settings on the phone?",
    );
    console.log("3. Try unplugging and plugging it back in.");
    return;
  }

  console.log(`✅ Connection Successful!`);
  console.log(`   (Port 8081 forwarded to device)`);
  console.log(`\n🚀 You can now reload the app on your phone.`);
});
