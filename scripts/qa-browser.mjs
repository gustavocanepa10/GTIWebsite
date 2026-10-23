// Local QA: start Vite on 4317 and a Chromium browser with --remote-debugging-port=9223.
// Uses the browser's own DevTools protocol, with no additional dependency.
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const origin = "http://127.0.0.1:4317";
const tabs = await (await fetch("http://127.0.0.1:9223/json/list")).json();
const target = tabs.find((tab) => tab.type === "page");
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }));
let sequence = 0;
const pending = new Map();
const exceptions = [];
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (message.method === "Runtime.exceptionThrown")
    exceptions.push(message.params.exceptionDetails.text);
  if (pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(JSON.stringify(message.error)));
    else resolve(message.result);
  }
});
function call(method, params = {}) {
  const id = ++sequence;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function evaluate(expression) {
  const response = await call("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
  return response.result.value;
}
const output = path.join(os.tmpdir(), "gti-site-browser-qa");
await fs.mkdir(output, { recursive: true });
await call("Page.enable");
await call("Runtime.enable");
await call("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "reduce" }],
});
const routes = [
  "/",
  ...["atendimento", "telefonia", "automacoes", "relatorios"].map((key) => `/solucoes/${key}`),
];
const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const checks = [];
const pageDetails = [];
try {
  for (const route of routes) {
    await call("Page.navigate", { url: `${origin}${route}` });
    for (let attempt = 0; attempt < 80; attempt++) {
      if (
        await evaluate(
          `document.readyState === 'complete' && !!document.querySelector('main h1') && !!document.querySelector('#contato a') && !document.querySelector('vite-error-overlay')`,
        )
      )
        break;
      await pause(150);
    }
    await pause(300);
    for (const width of widths) {
      await call("Emulation.setDeviceMetricsOverride", {
        width,
        height: 900,
        deviceScaleFactor: 1,
        mobile: width < 768,
      });
      await pause(90);
      const geometry = await evaluate(
        `(() => ({route: location.pathname, width: innerWidth, documentWidth: document.documentElement.scrollWidth, h1: document.querySelectorAll('h1').length, horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1, offenders: [...document.querySelectorAll('main *')].filter(el => {const r=el.getBoundingClientRect();return r.width > 0 && (r.left < -1 || r.right > innerWidth+1) && getComputedStyle(el).position !== 'absolute' && !el.closest('[role=tablist]')}).slice(0,8).map(el=>({tag:el.tagName,cls:el.className}))}))()`,
      );
      if (geometry.route !== route || geometry.h1 !== 1 || geometry.horizontalOverflow)
        throw new Error(JSON.stringify(geometry));
      checks.push({
        route,
        width,
        documentWidth: geometry.documentWidth,
        overflow: geometry.horizontalOverflow,
      });
      if (
        (route === "/" || route === "/solucoes/relatorios" || route === "/solucoes/telefonia") &&
        [390, 1440].includes(width)
      ) {
        await evaluate(
          `(async()=>{document.documentElement.style.scrollBehavior='auto';for(let y=0;y<document.body.scrollHeight;y+=750){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,25));}window.scrollTo(0,0);await new Promise(r=>setTimeout(r,200));})()`,
        );
        const shot = await call("Page.captureScreenshot", { format: "png" });
        await fs.writeFile(
          path.join(output, `${route.split("/").filter(Boolean).join("-") || "home"}-${width}.png`),
          Buffer.from(shot.data, "base64"),
        );
      }
    }
    const details = await evaluate(
      `(() => ({ route: location.pathname, title: document.title, description: document.querySelector('meta[name=description]')?.content, og: document.querySelector('meta[property="og:title"]')?.content, twitter: document.querySelector('meta[name="twitter:title"]')?.content, brokenImages: [...document.images].filter(img=>img.complete && !img.naturalWidth).map(img=>img.src), missingAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(decodeURIComponent(a.hash.slice(1)))).map(a=>a.hash), solutionLinks: [...new Set([...document.querySelectorAll('a[href^="/solucoes/"]')].map(a=>a.pathname))], fakePrivacyLink: [...document.querySelectorAll('a')].some(a=>a.textContent.includes('Política de privacidade')), whatsapp: document.querySelector('#contato a')?.getAttribute('href')?.startsWith('https://wa.me/552122037888?text=') }))()`,
    );
    if (
      details.brokenImages.length ||
      details.missingAnchors.length ||
      details.fakePrivacyLink ||
      !details.whatsapp ||
      !details.og ||
      !details.twitter ||
      details.solutionLinks.length !== 4
    )
      throw new Error(JSON.stringify(details));
    pageDetails.push(details);
    console.log(`Checked ${route}: all 9 widths, images, links and metadata.`);
  }
  // Mobile keyboard focus, navigation and lightbox behavior in the real browser.
  await call("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await call("Page.navigate", { url: origin });
  await pause(900);
  await evaluate(`document.querySelector('button[aria-label="Abrir menu"]').click()`);
  await pause(150);
  if (!(await evaluate(`!!document.querySelector('[role="dialog"] nav[aria-label="Mobile"]')`)))
    throw new Error("Mobile menu did not open");
  await call("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await call("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await pause(150);
  if (
    !(await evaluate(
      `!document.querySelector('[role="dialog"]') && document.activeElement.getAttribute('aria-label')==='Abrir menu'`,
    ))
  )
    throw new Error("Menu Escape/focus failure");
  await evaluate(`document.querySelector('button[aria-label^="Ampliar:"]').click()`);
  await pause(150);
  if (
    !(await evaluate(
      `!!document.querySelector('[role="dialog"]') && !!document.body.getAttribute('data-scroll-locked')`,
    ))
  )
    throw new Error("Lightbox did not open/lock scroll");
  await call("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
  });
  await call("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
  });
  if (!(await evaluate(`!!document.activeElement.closest('[role="dialog"]')`)))
    throw new Error("Lightbox focus escaped");
  await evaluate(`document.querySelector('button[aria-label="Fechar"]').click()`);
  await pause(150);
  if (
    !(await evaluate(`document.activeElement.getAttribute('aria-label')?.startsWith('Ampliar:')`))
  )
    throw new Error("Lightbox focus not restored");
  // Follow real TanStack links instead of checking only direct page loads.
  await evaluate(`document.querySelector('button[aria-label="Abrir menu"]').click()`);
  await pause(100);
  await evaluate(
    `document.querySelector('nav[aria-label="Mobile"] a[href="/solucoes/telefonia"]').click()`,
  );
  await pause(800);
  if (
    !(await evaluate(
      `location.pathname==='/solucoes/telefonia' && !document.querySelector('[role="dialog"]') && document.querySelector('h1').textContent.includes('telefonia integrada')`,
    ))
  )
    throw new Error("Mobile solution navigation failed");
  await call("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await evaluate(`document.querySelector('header button[aria-haspopup="menu"]').focus()`);
  for (const type of ["keyDown", "keyUp"])
    await call("Input.dispatchKeyEvent", {
      type,
      key: "ArrowDown",
      code: "ArrowDown",
      windowsVirtualKeyCode: 40,
    });
  await pause(120);
  if (!(await evaluate(`!!document.activeElement.closest('[role="menu"]')`)))
    throw new Error("Desktop dropdown keyboard opening failed");
  await evaluate(
    `document.querySelector('[role="menuitem"][href="/solucoes/relatorios"]').click()`,
  );
  await pause(800);
  if (!(await evaluate(`location.pathname==='/solucoes/relatorios'`)))
    throw new Error("Desktop solution navigation failed");
  await call("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await evaluate(`document.querySelector('[role="tab"]').focus()`);
  for (let step = 0; step < 2; step++) {
    for (const type of ["keyDown", "keyUp"])
      await call("Input.dispatchKeyEvent", {
        type,
        key: "ArrowRight",
        code: "ArrowRight",
        windowsVirtualKeyCode: 39,
      });
    await pause(80);
  }
  if (
    !(await evaluate(
      `document.querySelector('[role="tab"][aria-selected="true"]').textContent==='Mapa de Calor' && document.querySelector('[role="tabpanel"] img').getAttribute('alt').includes('Mapa de calor')`,
    ))
  )
    throw new Error("Report keyboard selection failed");
  await evaluate(
    `document.querySelector('[role="tabpanel"]').scrollIntoView({block:'start',behavior:'instant'})`,
  );
  await pause(150);
  const reportScreenshot = await call("Page.captureScreenshot", { format: "png" });
  await fs.writeFile(
    path.join(output, "report-explorer-390.png"),
    Buffer.from(reportScreenshot.data, "base64"),
  );
  await evaluate(
    `document.querySelector('#contato').scrollIntoView({block:'start',behavior:'instant'})`,
  );
  await pause(150);
  const contactScreenshot = await call("Page.captureScreenshot", { format: "png" });
  await fs.writeFile(
    path.join(output, "contact-390.png"),
    Buffer.from(contactScreenshot.data, "base64"),
  );
  if (exceptions.length) throw new Error(JSON.stringify({ exceptions }));
  const result = {
    viewportChecks: checks.length,
    widths,
    routes,
    pageDetails,
    interactions: [
      "mobile menu",
      "Escape",
      "focus restoration",
      "lightbox",
      "focus containment",
      "scroll lock",
      "mobile route navigation",
      "desktop dropdown keyboard navigation",
      "report keyboard selection",
      "confirmed WhatsApp contact link",
    ],
    runtimeExceptions: exceptions,
    screenshots: output,
  };
  await fs.writeFile(path.join(output, "results.json"), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result));
} finally {
  socket.close();
}
