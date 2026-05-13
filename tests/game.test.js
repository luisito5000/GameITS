const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

function buildDom() {
  const htmlPath = path.join(__dirname, "..", "Game.html");
  const html = fs.readFileSync(htmlPath, "utf8");
  const dom = new JSDOM(html, { runScripts: "dangerously" });
  return dom;
}

function createTimerStubs(window) {
  let nextId = 1;
  const intervals = new Map();
  window.setInterval = (fn) => {
    const id = nextId++;
    intervals.set(id, fn);
    return id;
  };
  window.clearInterval = (id) => {
    intervals.delete(id);
  };
  return {
    tickAllIntervals() {
      for (const fn of intervals.values()) {
        fn();
      }
    }
  };
}

test("creates a 3x3 board on load", () => {
  const dom = buildDom();
  const { document } = dom.window;
  const holes = document.querySelectorAll(".hole");
  assert.equal(holes.length, 9);
});

test("start game resets HUD and enables restart", () => {
  const dom = buildDom();
  const { window } = dom;
  const { document } = window;

  createTimerStubs(window);
  window.startGame();

  assert.equal(document.getElementById("score").textContent, "0");
  assert.equal(document.getElementById("timer").textContent, "30");
  assert.equal(document.getElementById("streak").textContent, "0");
  assert.equal(document.getElementById("startBtn").disabled, true);
  assert.equal(document.getElementById("restartBtn").disabled, false);

  const activeCount = document.querySelectorAll(".hole.active").length;
  assert.equal(activeCount, 1);
});

test("single mole click increments score only once (double-click guard)", () => {
  const dom = buildDom();
  const { window } = dom;
  const { document } = window;

  createTimerStubs(window);

  let randomCalls = 0;
  window.Math.random = () => {
    randomCalls += 1;
    if (randomCalls === 1) return 0.1;
    if (randomCalls === 2) return 0.9;
    return 0;
  };

  window.startGame();

  const activeHole = document.querySelector(".hole.active");
  assert.ok(activeHole);

  activeHole.click();
  activeHole.click();

  assert.equal(document.getElementById("score").textContent, "1");
  assert.equal(document.getElementById("streak").textContent, "1");
});

test("golden mole awards 3 points", () => {
  const dom = buildDom();
  const { window } = dom;
  const { document } = window;

  createTimerStubs(window);

  let randomCalls = 0;
  window.Math.random = () => {
    randomCalls += 1;
    if (randomCalls === 1) return 0.25;
    if (randomCalls === 2) return 0.0;
    return 0;
  };

  window.startGame();

  const activeHole = document.querySelector(".hole.active");
  assert.ok(activeHole.classList.contains("golden"));

  activeHole.click();

  assert.equal(document.getElementById("score").textContent, "3");
  assert.match(document.getElementById("status").textContent, /Golden hit!/);
});

test("timer countdown triggers game stop at zero", () => {
  const dom = buildDom();
  const { window } = dom;
  const { document } = window;

  const timers = createTimerStubs(window);
  window.startGame();

  for (let i = 0; i < 30; i += 1) {
    timers.tickAllIntervals();
  }

  assert.equal(document.getElementById("timer").textContent, "0");
  assert.equal(document.getElementById("startBtn").disabled, false);
  assert.match(document.getElementById("status").textContent, /Time's up!/);
});
