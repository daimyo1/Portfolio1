const projects = {
  visia: {
  label: "Project 01 / Brand Identity",
  title: "VisiaVerse",
  accent: "#ff2ea6",
    images: [
      "assets/visia/5.png",
      "assets/visia/52.png",
      "assets/visia/brand.png"
    ],
    alt: "VisiaVerse brand identity project",
    description:
      "VisiaVerse is a conceptual theme park brand focused on perception, color, motion, and immersive visual experiences.",
    role: "Brand designer, layout designer, concept development",
    tools: "Adobe Illustrator, Photoshop, InDesign",
    deliverables:
      "Logo system, posters, digital ads, environmental graphics, brand applications"
  },

  bask: {
    label: "Project 02 / Brand System",
    title: "BASK Surf Shop",
    accent: "#16d7d1",
    images: [
      "assets/bask/bask1.png",
      "assets/bask/bask2.png"
    ],
    alt: "BASK Surf Shop brand system project",
    description:
      "BASK Surf Shop is a retail branding concept inspired by surf culture, tropical color, and bold in-store experiences.",
    role: "Logo designer, brand system designer, packaging designer",
    tools: "Adobe Illustrator, Photoshop, InDesign",
    deliverables:
      "Logo, packaging, posters, retail graphics, brand touchpoints"
  },

  experimental: {
    label: "Project 03 / Experimental Illustration",
    title: "Experimental!",
    accent: "#8b5cf6",
    images: [
      "assets/experimental/Arambula_Jose_NATURE.png",
      "assets/experimental/scare.jpg",
      "assets/experimental/ny.jpg",
      "assets/experimental/Untitled-3.png"
    ],
    alt: "Experimental illustration project",
    description:
      "Experimental! is a collection of personal and class-supported visual studies exploring geometry, abstraction, character design, composition, and digital illustration.",
    role: "Illustrator, visual designer, concept artist",
    tools: "Adobe Illustrator, Photoshop, AI-assisted concept exploration",
    deliverables:
      "Digital illustrations, concept art, abstract compositions"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setupProjectPage();
  setupResumeModal();
  setupPortraitModal();
  setupScrollReveal();
  setupDuelPanel();
  setupSamuraiDuel();
});

function setupProjectPage() {
  const casePage = document.getElementById("casePage");
  const backCase = document.querySelector(".back-case");

  if (!casePage) return;

  const caseLabel = document.getElementById("caseLabel");
  const caseTitle = document.getElementById("caseTitle");
  const caseImage = document.getElementById("caseImage");
  const caseDescription = document.getElementById("caseDescription");
  const caseNotes = document.getElementById("caseNotes");
  const caseRole = document.getElementById("caseRole");
  const caseTools = document.getElementById("caseTools");
  const caseDeliverables = document.getElementById("caseDeliverables");

  document.querySelectorAll(".project").forEach((projectCard) => {
    projectCard.addEventListener("click", () => {
      const project = projects[projectCard.dataset.project];
      if (!project) return;

      const accent = project.accent || "#16d7d1";
      const images = project.images || [];

      casePage.style.setProperty("--case-accent", accent);

      if (caseLabel) caseLabel.textContent = project.label;
      if (caseTitle) caseTitle.textContent = project.title;
      if (caseDescription) caseDescription.textContent = project.description;
      if (caseNotes) caseNotes.textContent = project.notes || "";
      if (caseRole) caseRole.textContent = project.role;
      if (caseTools) caseTools.textContent = project.tools;
      if (caseDeliverables) caseDeliverables.textContent = project.deliverables;

      const oldGallery = document.querySelector(".case-top-gallery");
      if (oldGallery) oldGallery.remove();

      if (caseImage && images.length > 0) {
        caseImage.src = images[0];
        caseImage.alt = project.alt || project.title;

        if (images.length > 1) {
          const gallery = document.createElement("div");
          gallery.className = "case-top-gallery";

          images.slice(1).forEach((imagePath, index) => {
            const img = document.createElement("img");
            img.src = imagePath;
            img.alt = `${project.title} image ${index + 2}`;
            gallery.appendChild(img);
          });

          caseImage.insertAdjacentElement("afterend", gallery);
        }
      }

      casePage.classList.add("active");
      casePage.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      casePage.scrollTop = 0;
    });
  });

  function closeProject() {
    casePage.classList.remove("active");
    casePage.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (backCase) {
    backCase.addEventListener("click", closeProject);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProject();
  });
}

function setupDuelPanel() {
  const duelLaunch = document.getElementById("duelLaunch");
  const duelPanel = document.getElementById("duelPanel");

  if (!duelLaunch || !duelPanel) return;

  duelLaunch.addEventListener("click", () => {
    duelPanel.classList.toggle("open");
    const isOpen = duelPanel.classList.contains("open");
    duelPanel.setAttribute("aria-hidden", String(!isOpen));
  });
}

function setupResumeModal() {
  const resumeBtn = document.getElementById("resumeBtn");
  const resumeModal = document.getElementById("resumeModal");
  const closeResume = document.querySelector(".close-resume");

  if (!resumeBtn || !resumeModal) return;

  resumeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    openLayer(resumeModal);
  });

  if (closeResume) {
    closeResume.addEventListener("click", () => closeLayer(resumeModal));
  }

  resumeModal.addEventListener("click", (event) => {
    if (event.target === resumeModal) closeLayer(resumeModal);
  });
}

function setupPortraitModal() {
  const portraitButton = document.getElementById("portraitButton");
  const portraitModal = document.getElementById("portraitModal");
  const closePortrait = document.querySelector(".close-portrait");

  if (!portraitButton || !portraitModal || !closePortrait) return;

  portraitButton.addEventListener("click", () => openLayer(portraitModal));
  closePortrait.addEventListener("click", () => closeLayer(portraitModal));

  portraitModal.addEventListener("click", (event) => {
    if (event.target === portraitModal) closeLayer(portraitModal);
  });
}

function openLayer(layer) {
  layer.classList.add("active");
  layer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLayer(layer) {
  layer.classList.remove("active");
  layer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function setupScrollReveal() {
  const revealItems = document.querySelectorAll(".hero, .project, .about, .footer");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("visible"));
    return;
  }

  revealItems.forEach((item) => item.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupSamuraiDuel() {
  const canvas = document.getElementById("duelCanvas");
  const button = document.getElementById("duelToggle");

  if (!canvas || !button) return;

  const ctx = canvas.getContext("2d");

  const game = {
    running: false,
    lastTime: 0,
    message: "DUEL",
    keys: {},
    slashTimer: 0,
    enemySlashTimer: 0,
    enemyCooldown: 0
  };

  const player = {
    x: 24,
    y: 58,
    w: 10,
    h: 18,
    hp: 3,
    dir: 1,
    color: "#ff6201"
  };

  const enemy = {
    x: 86,
    y: 58,
    w: 10,
    h: 18,
    hp: 3,
    dir: -1,
    color: "#151515"
  };

  function resetGame() {
    player.x = 24;
    player.hp = 3;
    player.dir = 1;

    enemy.x = 86;
    enemy.hp = 3;
    enemy.dir = -1;

    game.message = "DUEL";
    game.slashTimer = 0;
    game.enemySlashTimer = 0;
    game.enemyCooldown = 0;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff7ef";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff6201";
    ctx.fillRect(0, 74, canvas.width, 4);

    drawHealth();
    drawFighter(player);
    drawFighter(enemy);
    drawSlash(player, game.slashTimer, player.color);
    drawSlash(enemy, game.enemySlashTimer, enemy.color);

    ctx.fillStyle = "#151515";
    ctx.font = "700 7px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(game.message, canvas.width / 2, 20);
  }

  function drawHealth() {
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = i < player.hp ? "#ff6201" : "rgba(255,98,1,.22)";
      ctx.fillRect(7 + i * 8, 7, 6, 5);

      ctx.fillStyle = i < enemy.hp ? "#151515" : "rgba(21,21,21,.18)";
      ctx.fillRect(95 + i * 8, 7, 6, 5);
    }
  }

  function drawFighter(fighter) {
    ctx.fillStyle = fighter.color;
    ctx.fillRect(fighter.x, fighter.y - fighter.h, fighter.w, fighter.h);
    ctx.fillRect(fighter.x + 2, fighter.y - fighter.h - 6, fighter.w - 4, 6);

    const swordX = fighter.dir === 1 ? fighter.x + fighter.w : fighter.x - 10;
    ctx.fillRect(swordX, fighter.y - 14, 10, 2);
  }

  function drawSlash(fighter, timer, color) {
    if (timer <= 0) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    if (fighter.dir === 1) {
      ctx.arc(fighter.x + fighter.w + 8, fighter.y - 12, 9, -0.9, 0.7);
    } else {
      ctx.arc(fighter.x - 8, fighter.y - 12, 9, 2.4, 3.9);
    }

    ctx.stroke();
  }

  function update(delta) {
    const speed = 0.09 * delta;

    if (game.keys.a || game.keys.arrowleft) {
      player.x -= speed;
      player.dir = -1;
    }

    if (game.keys.d || game.keys.arrowright) {
      player.x += speed;
      player.dir = 1;
    }

    player.x = clamp(player.x, 4, canvas.width - player.w - 4);

    const distance = enemy.x - player.x;

    if (Math.abs(distance) > 24) {
      enemy.x += distance > 0 ? -0.045 * delta : 0.045 * delta;
      enemy.dir = distance > 0 ? -1 : 1;
    }

    enemy.x = clamp(enemy.x, 4, canvas.width - enemy.w - 4);

    game.enemyCooldown -= delta;
    game.slashTimer -= delta;
    game.enemySlashTimer -= delta;

    if (Math.abs(distance) < 22 && game.enemyCooldown <= 0) {
      game.enemySlashTimer = 160;
      game.enemyCooldown = 900;
      enemy.dir = distance > 0 ? -1 : 1;

      if (isFacing(enemy, player)) player.hp -= 1;
    }

    checkResult();
  }

  function playerAttack() {
    if (!game.running) return;

    game.slashTimer = 160;

    if (Math.abs(player.x - enemy.x) < 24 && isFacing(player, enemy)) {
      enemy.hp -= 1;
    }

    checkResult();
  }

  function isFacing(attacker, target) {
    return attacker.dir === 1 ? target.x > attacker.x : target.x < attacker.x;
  }

  function checkResult() {
    if (player.hp <= 0) {
      game.message = "YOU LOSE";
      game.running = false;
      button.textContent = "Restart";
    }

    if (enemy.hp <= 0) {
      game.message = "YOU WIN";
      game.running = false;
      button.textContent = "Restart";
    }
  }

  function loop(time = 0) {
    const delta = time - game.lastTime;
    game.lastTime = time;

    if (game.running) update(delta);
    draw();

    requestAnimationFrame(loop);
  }

  function toggleGame() {
    if (!game.running) {
      resetGame();
      game.running = true;
      game.message = "FIGHT";
      button.textContent = "Pause";
    } else {
      game.running = false;
      game.message = "PAUSED";
      button.textContent = "Play";
    }
  }

  button.addEventListener("click", toggleGame);

  window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if (key === " " && game.running) {
      event.preventDefault();
      playerAttack();
    }

    game.keys[key] = true;
  });

  window.addEventListener("keyup", (event) => {
    game.keys[event.key.toLowerCase()] = false;
  });

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  resetGame();
  draw();
  requestAnimationFrame(loop);
}