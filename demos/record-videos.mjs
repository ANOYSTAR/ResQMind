/**
 * ResQMind Demo Video Recorder (No FFmpeg Required)
 * ──────────────────────────────────────────────────
 * Uses Puppeteer CDP Page.screencastFrame to capture frames
 * and creates animated GIF-like demo sequences as PNG screenshot series.
 * Also creates a beautiful HTML video player for the demos.
 *
 * Usage:
 *   1. Make sure `npm run dev` is running (localhost:3000)
 *   2. Run: node demos/record-videos.mjs
 *
 * Output: screenshots + HTML viewer saved to demos/videos/
 */

import puppeteer from "puppeteer";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIDEO_DIR = path.join(__dirname, "videos");
const BASE_URL = "http://localhost:3000";

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Capture a series of screenshots as a "video sequence"
 */
async function captureSequence(page, name, steps) {
  const seqDir = path.join(VIDEO_DIR, name);
  await mkdir(seqDir, { recursive: true });

  let frameCount = 0;
  const captureFrame = async () => {
    frameCount++;
    const filename = `frame_${String(frameCount).padStart(4, "0")}.png`;
    await page.screenshot({ path: path.join(seqDir, filename) });
    return filename;
  };

  for (const step of steps) {
    await step(page, captureFrame);
  }

  console.log(`   📸 ${frameCount} frames captured for "${name}"`);
  return { name, frameCount, dir: seqDir };
}

async function main() {
  console.log("🛡️  ResQMind Demo Video Recorder — Starting...\n");
  await mkdir(VIDEO_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    args: ["--start-maximized"],
  });

  const sequences = [];

  // ═══════════════════════════════════════════════════
  // DEMO 1: Dashboard Overview Scroll
  // ═══════════════════════════════════════════════════
  console.log("🎬 Recording: Dashboard Overview...");
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 30000 });
    await delay(3000);

    const seq = await captureSequence(page, "01_dashboard_overview", [
      // Initial view
      async (p, snap) => {
        await snap();
        await delay(1000);
        await snap();
      },
      // Scroll down slowly
      async (p, snap) => {
        const totalHeight = await p.evaluate(() => document.body.scrollHeight);
        const viewHeight = 1080;
        for (let y = 0; y < totalHeight - viewHeight; y += 150) {
          await p.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
          await delay(100);
          await snap();
        }
        // Bottom
        await p.evaluate((h) => window.scrollTo(0, h), totalHeight);
        await delay(500);
        await snap();
        await snap();
      },
      // Scroll back up
      async (p, snap) => {
        const totalHeight = await p.evaluate(() => document.body.scrollHeight);
        for (let y = totalHeight; y > 0; y -= 250) {
          await p.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
          await delay(80);
          await snap();
        }
        await p.evaluate(() => window.scrollTo(0, 0));
        await delay(500);
        await snap();
      },
    ]);
    sequences.push(seq);
    await page.close();
    console.log("   ✅ Done\n");
  }

  // ═══════════════════════════════════════════════════
  // DEMO 2: AI Chat Interaction
  // ═══════════════════════════════════════════════════
  console.log("🎬 Recording: AI Chat Interaction...");
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 30000 });
    await delay(2000);

    const seq = await captureSequence(page, "02_ai_chat", [
      // Capture initial state
      async (p, snap) => {
        await snap();
        await delay(500);
      },
      // Type query
      async (p, snap) => {
        const chatInput = await p.$('input[placeholder*="Ask about"]');
        if (!chatInput) return;
        await chatInput.click();
        await snap();

        const query = "Which shelter near me has more than 50 available beds?";
        for (let i = 0; i < query.length; i++) {
          await chatInput.type(query[i]);
          if (i % 3 === 0) await snap(); // Capture every few chars
          await delay(30);
        }
        await snap();
        await delay(300);
      },
      // Send and wait for response
      async (p, snap) => {
        const chatInput = await p.$('input[placeholder*="Ask about"]');
        if (!chatInput) return;
        await chatInput.press("Enter");
        await snap();

        // Capture typing animation
        for (let i = 0; i < 8; i++) {
          await delay(300);
          await snap();
        }

        // Wait for full response
        await delay(2000);
        await snap();
        await snap();
      },
    ]);
    sequences.push(seq);
    await page.close();
    console.log("   ✅ Done\n");
  }

  // ═══════════════════════════════════════════════════
  // DEMO 3: Connectivity Status Change
  // ═══════════════════════════════════════════════════
  console.log("🎬 Recording: Connectivity Status Toggle...");
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 30000 });
    await delay(2000);

    const seq = await captureSequence(page, "03_connectivity_toggle", [
      async (p, snap) => {
        await snap(); // Offline state
        await delay(500);

        // Click status badge
        const badge = await p.$(".status-badge");
        if (badge) {
          await badge.click();
          await delay(500);
          await snap(); // Dropdown open

          // Click SYNCING
          const buttons = await p.$$("button");
          for (const btn of buttons) {
            const text = await btn.evaluate((el) => el.textContent || "");
            if (text.trim() === "SYNCING") {
              await btn.click();
              break;
            }
          }
          await delay(500);
          await snap(); // Syncing mode
          await delay(1000);
          await snap();

          // Scroll to sync center
          await p.evaluate(() => {
            const el = document.querySelectorAll(".glass-card-elevated");
            el[el.length - 1]?.scrollIntoView({ behavior: "smooth", block: "center" });
          });
          for (let i = 0; i < 6; i++) {
            await delay(500);
            await snap();
          }

          // Scroll back up
          await p.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
          await delay(1000);
          await snap();

          // Switch to Connected
          const badge2 = await p.$(".status-badge");
          if (badge2) {
            await badge2.click();
            await delay(500);
            await snap();

            const btns2 = await p.$$("button");
            for (const btn of btns2) {
              const text = await btn.evaluate((el) => el.textContent || "");
              if (text.trim() === "CONNECTED") {
                await btn.click();
                break;
              }
            }
            await delay(500);
            await snap();
            await delay(1000);
            await snap();
          }
        }
      },
    ]);
    sequences.push(seq);
    await page.close();
    console.log("   ✅ Done\n");
  }

  // ═══════════════════════════════════════════════════
  // DEMO 4: Victim Record Creation
  // ═══════════════════════════════════════════════════
  console.log("🎬 Recording: Add Victim Record...");
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 30000 });
    await delay(2000);

    const seq = await captureSequence(page, "04_add_victim", [
      async (p, snap) => {
        // Scroll to victim section
        await p.evaluate(() => {
          const sections = document.querySelectorAll(".glass-card-elevated");
          sections[4]?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
        await delay(1000);
        await snap();

        // Click "Add Victim"
        const buttons = await p.$$("button");
        for (const btn of buttons) {
          const text = await btn.evaluate((el) => el.textContent || "");
          if (text.includes("Add Victim")) {
            await btn.click();
            break;
          }
        }
        await delay(800);
        await snap();

        // Fill form fields
        const nameInput = await p.$('input[placeholder="Full Name *"]');
        if (nameInput) {
          const name = "Anand Verma";
          for (const ch of name) {
            await nameInput.type(ch);
            await delay(40);
          }
          await snap();
        }

        const ageInput = await p.$('input[placeholder="Age"]');
        if (ageInput) {
          await ageInput.type("35", { delay: 80 });
          await snap();
        }

        const condInput = await p.$('input[placeholder="Medical Condition *"]');
        if (condInput) {
          await condInput.type("Hypothermia, dehydration", { delay: 30 });
          await snap();
        }

        const addrInput = await p.$('input[placeholder="Address"]');
        if (addrInput) {
          await addrInput.type("Ward 6, Danapur", { delay: 30 });
          await snap();
        }

        const textarea = await p.$("textarea");
        if (textarea) {
          await textarea.type("Found near river bank", { delay: 25 });
          await snap();
        }

        await delay(500);
        await snap();

        // Click Save
        for (const btn of await p.$$("button")) {
          const text = await btn.evaluate((el) => el.textContent || "");
          if (text.includes("Save Record")) {
            await btn.click();
            break;
          }
        }
        await delay(1000);
        await snap();
        await snap();
      },
    ]);
    sequences.push(seq);
    await page.close();
    console.log("   ✅ Done\n");
  }

  // ═══════════════════════════════════════════════════
  // Create HTML Demo Viewer
  // ═══════════════════════════════════════════════════
  console.log("🖥️  Creating HTML Demo Viewer...");

  const viewerHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ResQMind — Demo Videos</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0B1120;
      color: #E8EDF5;
      font-family: 'Segoe UI', system-ui, sans-serif;
      min-height: 100vh;
      padding: 40px;
    }
    h1 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 8px;
    }
    h1 span:first-child { color: white; }
    h1 span:last-child { color: #0A84FF; }
    .subtitle { text-align: center; color: #6B7A99; font-size: 0.9rem; margin-bottom: 40px; }
    .demos { display: grid; grid-template-columns: repeat(auto-fit, minmax(600px, 1fr)); gap: 24px; max-width: 1400px; margin: 0 auto; }
    .demo-card {
      background: rgba(17, 24, 39, 0.7);
      border: 1px solid rgba(59, 130, 246, 0.15);
      border-radius: 16px;
      overflow: hidden;
    }
    .demo-header {
      padding: 16px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .demo-title { font-weight: 600; font-size: 0.95rem; }
    .demo-frame-info { font-size: 0.75rem; color: #6B7A99; }
    .demo-viewer {
      position: relative;
      background: #000;
      aspect-ratio: 16/9;
    }
    .demo-viewer img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .demo-controls {
      padding: 12px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .demo-controls button {
      padding: 6px 16px;
      border-radius: 8px;
      border: 1px solid rgba(59,130,246,0.3);
      background: rgba(10,132,255,0.1);
      color: #0A84FF;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .demo-controls button:hover { background: rgba(10,132,255,0.2); }
    .demo-controls button.active { background: #0A84FF; color: white; }
    .progress-bar {
      flex: 1;
      height: 4px;
      background: rgba(255,255,255,0.1);
      border-radius: 2px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #0A84FF, #FF6B2C);
      border-radius: 2px;
      transition: width 0.1s;
    }
    .speed-control { font-size: 0.75rem; color: #6B7A99; }
    .footer { text-align: center; margin-top: 40px; color: #6B7A99; font-size: 0.8rem; }
  </style>
</head>
<body>
  <h1><span>ResQ</span><span>Mind</span></h1>
  <p class="subtitle">Demo Video Viewer — Frame-by-Frame Playback</p>
  <div class="demos" id="demos"></div>
  <p class="footer">Made with ❤ by Grey Coder | Powered by Qdrant Edge + Local LLM</p>

  <script>
    const demos = ${JSON.stringify(
      sequences.map((s) => ({
        name: s.name,
        frameCount: s.frameCount,
        title: s.name
          .replace(/^\\d+_/, "")
          .replace(/_/g, " ")
          .replace(/\\b\\w/g, (c) => c.toUpperCase()),
      }))
    )};

    const container = document.getElementById("demos");
    demos.forEach((demo, idx) => {
      const card = document.createElement("div");
      card.className = "demo-card";
      card.innerHTML = \`
        <div class="demo-header">
          <span class="demo-title">\${demo.title}</span>
          <span class="demo-frame-info">\${demo.frameCount} frames</span>
        </div>
        <div class="demo-viewer">
          <img id="img-\${idx}" src="\${demo.name}/frame_0001.png" alt="\${demo.title}" />
        </div>
        <div class="demo-controls">
          <button id="play-\${idx}" onclick="togglePlay(\${idx})">▶ Play</button>
          <div class="progress-bar"><div class="progress-fill" id="progress-\${idx}" style="width:0%"></div></div>
          <span class="speed-control" id="speed-\${idx}">1x</span>
          <button onclick="changeSpeed(\${idx}, -1)">−</button>
          <button onclick="changeSpeed(\${idx}, 1)">+</button>
        </div>
      \`;
      container.appendChild(card);
    });

    const states = demos.map(() => ({ playing: false, frame: 1, speed: 150, interval: null }));
    const speeds = [300, 200, 150, 100, 50];
    const speedLabels = ['0.5x', '0.75x', '1x', '1.5x', '2x'];

    function togglePlay(idx) {
      const state = states[idx];
      const btn = document.getElementById('play-' + idx);
      if (state.playing) {
        clearInterval(state.interval);
        state.playing = false;
        btn.textContent = '▶ Play';
        btn.classList.remove('active');
      } else {
        state.playing = true;
        btn.textContent = '⏸ Pause';
        btn.classList.add('active');
        state.interval = setInterval(() => {
          state.frame++;
          if (state.frame > demos[idx].frameCount) state.frame = 1;
          const img = document.getElementById('img-' + idx);
          const progress = document.getElementById('progress-' + idx);
          img.src = demos[idx].name + '/frame_' + String(state.frame).padStart(4, '0') + '.png';
          progress.style.width = ((state.frame / demos[idx].frameCount) * 100) + '%';
        }, state.speed);
      }
    }

    function changeSpeed(idx, dir) {
      const state = states[idx];
      const currentIdx = speeds.indexOf(state.speed);
      const newIdx = Math.max(0, Math.min(speeds.length - 1, currentIdx + dir));
      state.speed = speeds[newIdx];
      document.getElementById('speed-' + idx).textContent = speedLabels[newIdx];
      if (state.playing) {
        clearInterval(state.interval);
        state.interval = setInterval(() => {
          state.frame++;
          if (state.frame > demos[idx].frameCount) state.frame = 1;
          document.getElementById('img-' + idx).src = demos[idx].name + '/frame_' + String(state.frame).padStart(4, '0') + '.png';
          document.getElementById('progress-' + idx).style.width = ((state.frame / demos[idx].frameCount) * 100) + '%';
        }, state.speed);
      }
    }
  </script>
</body>
</html>`;

  await writeFile(path.join(VIDEO_DIR, "viewer.html"), viewerHTML);
  console.log("   ✅ HTML viewer created\n");

  // ── Summary ────────────────────────────────────────
  console.log("═".repeat(55));
  console.log("🎉 All demos recorded successfully!");
  console.log(`📁 Output: ${VIDEO_DIR}`);
  console.log("");
  console.log("📽️  Recorded Sequences:");
  sequences.forEach((s) => {
    console.log(`   ${s.name}/ — ${s.frameCount} frames`);
  });
  console.log("");
  console.log("🖥️  Open viewer.html in your browser to play demos:");
  console.log(`   file:///${VIDEO_DIR.replace(/\\/g, "/")}/viewer.html`);
  console.log("═".repeat(55));

  await browser.close();
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
