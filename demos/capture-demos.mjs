/**
 * ResQMind Demo Video Generator
 * ─────────────────────────────
 * Captures animated GIF-like screenshot sequences and full-page screenshots
 * of the ResQMind dashboard for demo purposes.
 *
 * Usage:
 *   1. Make sure `npm run dev` is running (localhost:3000)
 *   2. Run: node demos/capture-demos.mjs
 *
 * Output: screenshots saved to demos/ folder
 */

import puppeteer from "puppeteer";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEMO_DIR = __dirname;
const BASE_URL = "http://localhost:3000";

async function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log("🛡️  ResQMind Demo Capture — Starting...\n");

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    args: ["--start-maximized"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // ── 1. Full Dashboard Screenshot ─────────────────────
  console.log("📸 Capturing: Full Dashboard Overview...");
  await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 30000 });
  await delay(3000); // Wait for animations

  await page.screenshot({
    path: path.join(DEMO_DIR, "screenshot_01_dashboard_top.png"),
    fullPage: false,
  });
  console.log("   ✅ Top section captured");

  await page.screenshot({
    path: path.join(DEMO_DIR, "screenshot_02_dashboard_full.png"),
    fullPage: true,
  });
  console.log("   ✅ Full page captured");

  // ── 2. Stats Bar Close-up ────────────────────────────
  console.log("\n📸 Capturing: Stats Bar...");
  const statsBar = await page.$(".grid.grid-cols-2");
  if (statsBar) {
    await statsBar.screenshot({
      path: path.join(DEMO_DIR, "screenshot_03_stats_bar.png"),
    });
    console.log("   ✅ Stats bar captured");
  }

  // ── 3. Map Section ───────────────────────────────────
  console.log("\n📸 Capturing: Interactive Offline Map...");
  await page.evaluate(() => {
    const mapSection = document.querySelector(".leaflet-container");
    if (mapSection) mapSection.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  await delay(2000);
  const mapContainer = await page.$(".map-container");
  if (mapContainer) {
    await mapContainer.screenshot({
      path: path.join(DEMO_DIR, "screenshot_04_offline_map.png"),
    });
    console.log("   ✅ Map captured");
  }

  // ── 4. AI Chat — Interact ───────────────────────────
  console.log("\n📸 Capturing: AI Rescue Assistant...");
  await page.evaluate(() => window.scrollTo(0, 0));
  await delay(500);

  // Click suggested query by text content
  const buttons = await page.$$("button");
  for (const btn of buttons) {
    const text = await btn.evaluate((el) => el.textContent);
    if (text && text.includes("Which shelter")) {
      await btn.click();
      break;
    }
  }
  await delay(500);

  // Type into chat input and send
  const chatInput = await page.$('input[placeholder*="Ask about"]');
  if (chatInput) {
    const currentVal = await chatInput.evaluate((el) => el.value);
    if (!currentVal) {
      await chatInput.type("Which shelter near me has more than 50 available beds?", {
        delay: 30,
      });
    }
    // Press Enter
    await chatInput.press("Enter");
    console.log("   💬 Query sent, waiting for AI response...");
    await delay(3000);
  }

  // Screenshot the second glass-card-elevated (chat panel)
  const chatPanels = await page.$$(".glass-card-elevated");
  if (chatPanels.length >= 2) {
    await chatPanels[1].screenshot({
      path: path.join(DEMO_DIR, "screenshot_05_ai_chat_response.png"),
    });
    console.log("   ✅ AI chat response captured");
  }

  // ── 5. Knowledge Base ────────────────────────────────
  console.log("\n📸 Capturing: Knowledge Base...");
  await page.evaluate(() => {
    const kb = document.querySelectorAll(".glass-card-elevated")[3];
    if (kb) kb.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  await delay(1000);

  // Click first document to expand
  const docCards = await page.$$(".rounded-xl.border");
  if (docCards.length > 0) {
    await docCards[0].click();
    await delay(500);
  }

  await page.screenshot({
    path: path.join(DEMO_DIR, "screenshot_06_knowledge_base.png"),
    fullPage: false,
  });
  console.log("   ✅ Knowledge base captured");

  // ── 6. Victim Records — Add New ──────────────────────
  console.log("\n📸 Capturing: Victim Records...");
  await page.evaluate(() => {
    const sections = document.querySelectorAll(".glass-card-elevated");
    if (sections[4]) sections[4].scrollIntoView({ behavior: "smooth", block: "center" });
  });
  await delay(1000);

  // Click Add Victim button
  const addVictimBtns = await page.$$("button");
  for (const btn of addVictimBtns) {
    const text = await btn.evaluate((el) => el.textContent);
    if (text && text.includes("Add Victim")) {
      await btn.click();
      break;
    }
  }
  await delay(500);

  await page.screenshot({
    path: path.join(DEMO_DIR, "screenshot_07_victim_add_form.png"),
    fullPage: false,
  });
  console.log("   ✅ Victim add form captured");

  // ── 7. Sync Center ──────────────────────────────────
  console.log("\n📸 Capturing: Sync Center...");
  await page.evaluate(() => {
    const sections = document.querySelectorAll(".glass-card-elevated");
    const syncSection = sections[sections.length - 1];
    if (syncSection) syncSection.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  await delay(1000);

  await page.screenshot({
    path: path.join(DEMO_DIR, "screenshot_08_sync_center.png"),
    fullPage: false,
  });
  console.log("   ✅ Sync center captured");

  // ── 8. Toggle Connectivity to "Syncing" ──────────────
  console.log("\n📸 Capturing: Sync Animation...");
  await page.evaluate(() => window.scrollTo(0, 0));
  await delay(500);

  // Click connectivity badge dropdown
  const statusBadge = await page.$(".status-badge");
  if (statusBadge) {
    await statusBadge.click();
    await delay(500);

    // Click "SYNCING" option
    const menuBtns = await page.$$(".glass-card-elevated.shadow-xl button");
    for (const btn of menuBtns) {
      const text = await btn.evaluate((el) => el.textContent);
      if (text && text.includes("SYNCING")) {
        await btn.click();
        break;
      }
    }
    await delay(1000);

    await page.screenshot({
      path: path.join(DEMO_DIR, "screenshot_09_syncing_mode.png"),
      fullPage: false,
    });
    console.log("   ✅ Syncing mode captured");

    // Wait for sync animation
    await delay(3000);

    // Scroll to sync center during sync
    await page.evaluate(() => {
      const sections = document.querySelectorAll(".glass-card-elevated");
      const syncSection = sections[sections.length - 1];
      if (syncSection) syncSection.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    await delay(2000);

    await page.screenshot({
      path: path.join(DEMO_DIR, "screenshot_10_sync_in_progress.png"),
      fullPage: false,
    });
    console.log("   ✅ Sync in progress captured");
  }

  // ── 9. Toggle to "Connected" ─────────────────────────
  console.log("\n📸 Capturing: Connected mode...");
  await page.evaluate(() => window.scrollTo(0, 0));
  await delay(500);

  const statusBadge2 = await page.$(".status-badge");
  if (statusBadge2) {
    await statusBadge2.click();
    await delay(500);

    const menuBtns2 = await page.$$(".glass-card-elevated.shadow-xl button");
    for (const btn of menuBtns2) {
      const text = await btn.evaluate((el) => el.textContent);
      if (text && text.includes("CONNECTED")) {
        await btn.click();
        break;
      }
    }
    await delay(1000);

    await page.screenshot({
      path: path.join(DEMO_DIR, "screenshot_11_connected_mode.png"),
      fullPage: false,
    });
    console.log("   ✅ Connected mode captured");
  }

  // ── 10. Final full-page shot ─────────────────────────
  await page.evaluate(() => window.scrollTo(0, 0));
  await delay(500);
  await page.screenshot({
    path: path.join(DEMO_DIR, "screenshot_12_final_overview.png"),
    fullPage: true,
  });
  console.log("\n   ✅ Final full-page screenshot captured");

  // ── Done ─────────────────────────────────────────────
  console.log("\n" + "═".repeat(50));
  console.log("🎉 All demo screenshots captured successfully!");
  console.log(`📁 Output directory: ${DEMO_DIR}`);
  console.log("═".repeat(50));

  await browser.close();
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
