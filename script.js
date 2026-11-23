/**
 * Portfolio JavaScript - Kousar Fathima
 * First-Year B.Tech Computer Science & Engineering Student
 * DR. RVR NRI College, Pothavarapadu (NIAT)
 * Includes: Animated typewriter role, live project runners, theme toggle, navigation
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. DOM REFERENCES
  // =========================================================================
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-item');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Hero Typewriter & Buttons
  const dynamicRoleElem = document.getElementById('dynamic-role');
  const btnViewProjects = document.getElementById('btn-view-projects');
  const btnHeroSkills = document.getElementById('btn-hero-skills');
  const btnHeroContact = document.getElementById('btn-hero-contact');

  // Contact Form & Copy
  const contactForm = document.getElementById('contact-form');
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const emailTextElem = document.getElementById('email-text');

  // Modal Elements
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBodyContent = document.getElementById('modal-body-content');
  const viewProjectBtns = document.querySelectorAll('.view-project-btn');
  const runDemoBtns = document.querySelectorAll('.run-demo-btn');

  // Toast
  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toast-icon');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');

  // Tracked Sections for Scroll Spy
  const sections = document.querySelectorAll('section[id]');

  // =========================================================================
  // 2. ANIMATED TYPEWRITER EFFECT (TWO LINES ONLY: B.Tech CSE NIAT & Next Wave of Technologies)
  // =========================================================================
  const rolePhrases = [
    'B.Tech CSE - NIAT',
    'Next Wave of Technologies'
  ];

  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeWriterLoop() {
    const currentPhrase = rolePhrases[phraseIndex];

    if (isDeleting) {
      dynamicRoleElem.textContent = currentPhrase.substring(0, letterIndex - 1);
      letterIndex--;
      typingSpeed = 50;
    } else {
      dynamicRoleElem.textContent = currentPhrase.substring(0, letterIndex + 1);
      letterIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && letterIndex === currentPhrase.length) {
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % rolePhrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeWriterLoop, typingSpeed);
  }

  if (dynamicRoleElem) {
    typeWriterLoop();
  }

  // =========================================================================
  // 3. THEME GLOW TOGGLE
  // =========================================================================
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('glow-theme');
      const isGlow = document.body.classList.contains('glow-theme');
      themeIcon.className = isGlow ? 'fa-solid fa-moon' : 'fa-regular fa-sun';
      showToast('Glow Mode', isGlow ? 'Enhanced cosmic glow active' : 'Default dark mode active', true);
    });
  }

  // =========================================================================
  // 4. NAVIGATION DRAWER & SMOOTH SCROLLING
  // =========================================================================
  function toggleMobileMenu() {
    const isOpen = navLinksContainer.classList.toggle('open');
    mobileToggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    if (navLinksContainer.classList.contains('open')) {
      navLinksContainer.classList.remove('open');
      mobileToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  navItems.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  document.addEventListener('click', (e) => {
    if (navLinksContainer.classList.contains('open') && !navLinksContainer.contains(e.target) && !mobileToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Hero button smooth scroll
  if (btnViewProjects) {
    btnViewProjects.addEventListener('click', (e) => {
      e.preventDefault();
      const projSec = document.getElementById('projects');
      if (projSec) projSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (btnHeroSkills) {
    btnHeroSkills.addEventListener('click', (e) => {
      e.preventDefault();
      const skillsSec = document.getElementById('skills');
      if (skillsSec) skillsSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (btnHeroContact) {
    btnHeroContact.addEventListener('click', (e) => {
      e.preventDefault();
      const contactSec = document.getElementById('contact');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const nameInput = document.getElementById('user-name');
          if (nameInput) nameInput.focus();
        }, 500);
      }
    });
  }

  // Scroll Header Shadow & Scroll Spy
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = sec.getAttribute('id');
      }
    });

    if (current) {
      navItems.forEach((item) => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
          item.classList.add('active');
        }
      });
    }
  }, { passive: true });

  // =========================================================================
  // 5. INTERACTIVE PROJECT DETAILS & LIVE RUNNERS (MODAL)
  // =========================================================================
  const projectInfoMap = {
    portfolio: {
      title: 'Personal Portfolio Website',
      category: 'Frontend Development • Portfolio',
      desc: 'Built using semantic HTML5, CSS3, and vanilla JavaScript. Features cosmic dark aesthetic, interactive code workspace mockup, dynamic role typewriter, and GitHub repository hosting.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'GitHub Repo'],
      points: [
        'Responsive layout tested across desktop, tablet, and mobile devices.',
        'Zero external framework dependencies for maximum performance.',
        'Version-controlled with Git and hosted on a GitHub repository.',
        'Clean section architecture matching professional developer portfolio standards.'
      ]
    },
    webdev: {
      title: 'Web Development Projects',
      category: 'Web Design • Layout Engineering',
      desc: 'Hands-on practice modules mastering the core building blocks of the modern web: Flexbox, CSS Grid, custom variables, responsive media queries, and accessible web forms.',
      tags: ['HTML5', 'CSS3', 'Flexbox', 'Grid System', 'CSS Variables'],
      points: [
        'Structured layout patterns with header, nav, main, section, and footer elements.',
        'Interactive card styling with subtle hover elevations and gradient borders.',
        'Form input validation styling and responsive layout rearrangement.'
      ]
    },
    python: {
      title: 'Python Practice',
      category: 'Core Programming • Algorithms',
      desc: 'Foundational programming exercises covering procedural coding, algorithmic logic, control structures, and function modularity executed in Linux terminal environments.',
      tags: ['Python 3', 'Linux Bash', 'Logic Building', 'Control Flow', 'Functions'],
      points: [
        'Practice with conditional if-elif-else branching and loop iterations.',
        'Execution and debugging using Linux command line tools.',
        'Modular script writing with reusable custom functions.'
      ]
    }
  };

  function openDetailsModal(id) {
    const data = projectInfoMap[id];
    if (!data) return;

    modalBodyContent.innerHTML = `
      <span class="pill-category-badge" style="margin-bottom: 12px; display: inline-block;">${data.category}</span>
      <h3 style="font-family: var(--font-heading); font-size: 1.7rem; font-weight: 800; color: #ffffff; margin-bottom: 14px;">${data.title}</h3>
      
      <p style="font-size: 0.98rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 20px;">${data.desc}</p>

      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
        ${data.tags.map(t => `<span class="badge-pill">${t}</span>`).join('')}
      </div>

      <h4 style="color: #ffffff; font-size: 1rem; margin-bottom: 12px;">Learning Highlights:</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 26px;">
        ${data.points.map(p => `
          <li style="display: flex; gap: 10px; font-size: 0.9rem; color: var(--text-muted);">
            <i class="fa-solid fa-circle-check" style="color: #10b981; margin-top: 3px;"></i>
            <span>${p}</span>
          </li>
        `).join('')}
      </ul>

      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <button type="button" class="btn btn-gradient-glow btn-sm" id="modal-run-action" data-demo="${id}">
          <i class="fa-solid fa-play"></i>
          <span>Launch Interactive Demo</span>
        </button>
        <button type="button" class="btn btn-glass-card btn-sm" id="modal-close-action">
          <span>Close</span>
        </button>
      </div>
    `;

    document.getElementById('modal-close-action')?.addEventListener('click', closeModal);
    document.getElementById('modal-run-action')?.addEventListener('click', (e) => {
      const demo = e.currentTarget.getAttribute('data-demo');
      openLiveRunnerModal(demo);
    });

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function openLiveRunnerModal(demoId) {
    let html = '';

    if (demoId === 'python') {
      html = `
        <span class="pill-category-badge" style="color: #38bdf8; border-color: rgba(6, 182, 212, 0.4); margin-bottom: 12px; display: inline-block;">LINUX TERMINAL RUNNER</span>
        <h3 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: #ffffff; margin-bottom: 8px;">Python &amp; Linux Command Simulator</h3>
        <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 16px;">Execute this Python program live in your browser to inspect first-year algorithms and Linux terminal output.</p>

        <div class="terminal-runner-frame">
          <div class="terminal-top-bar">
            <div class="mac-dots">
              <span class="mac-dot dot-red"></span>
              <span class="mac-dot dot-yellow"></span>
              <span class="mac-dot dot-green"></span>
            </div>
            <span style="font-size: 0.78rem; color: #94a3b8;">bash &bull; linux ~ /home/kousar/practice</span>
            <span style="font-size: 0.72rem; color: #64748b;">Python 3.12</span>
          </div>
          <div class="terminal-body" id="term-screen">
            <div style="color: #64748b;"># Linux Terminal & Python CSE Fundamentals</div>
            <div style="color: #38bdf8;">$ git status</div>
            <div style="color: #34d399;">&gt; On branch main: working tree clean. GitHub synced.</div>
            <div style="margin-top: 8px; color: #38bdf8;">$ python3 main.py</div>
            <div style="padding-left: 12px; color: #f8fafc;">student = <span style="color: #34d399;">"Kousar Fathima"</span></div>
            <div style="padding-left: 12px; color: #f8fafc;">college = <span style="color: #34d399;">"DR. RVR NRI College, Pothavarapadu"</span></div>
            <div style="padding-left: 12px; color: #f8fafc;">skills  = [<span style="color: #34d399;">"Python"</span>, <span style="color: #34d399;">"HTML/CSS"</span>, <span style="color: #34d399;">"Linux"</span>, <span style="color: #34d399;">"GitHub"</span>]</div>
            <div style="margin-top: 10px; color: #c084fc;">&gt;&gt;&gt; Ready to execute... Click "Execute Code" below!</div>
          </div>
        </div>

        <div style="display: flex; gap: 10px;">
          <button type="button" class="btn btn-gradient-glow btn-sm" id="btn-exec-py">
            <i class="fa-solid fa-play"></i>
            <span>Execute Code</span>
          </button>
          <button type="button" class="btn btn-glass-card btn-sm" id="btn-clear-py">
            <i class="fa-solid fa-rotate-left"></i>
            <span>Reset Terminal</span>
          </button>
        </div>
      `;
    } else if (demoId === 'portfolio') {
      html = `
        <span class="pill-category-badge" style="margin-bottom: 12px; display: inline-block;">INTERACTIVE PALETTE</span>
        <h3 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: #ffffff; margin-bottom: 8px;">Cosmic Accent Preview</h3>
        <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 18px;">Click any accent gradient preset below to dynamically transform the buttons and glows across the entire website live!</p>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 24px;">
          <button type="button" class="btn-glass-card theme-choice-btn active" data-grad="linear-gradient(90deg, #6366f1 0%, #3b82f6 50%, #06b6d4 100%)" data-cyan="#06b6d4" style="padding: 14px; text-align: left; display: flex; align-items: center; gap: 12px;">
            <span style="width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #06b6d4); flex-shrink: 0;"></span>
            <div>
              <strong style="color: #ffffff; font-size: 0.9rem; display: block;">Electric Cyan</strong>
              <small style="color: #94a3b8; font-size: 0.75rem;">Reference Signature</small>
            </div>
          </button>

          <button type="button" class="btn-glass-card theme-choice-btn" data-grad="linear-gradient(90deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%)" data-cyan="#c084fc" style="padding: 14px; text-align: left; display: flex; align-items: center; gap: 12px;">
            <span style="width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg, #8b5cf6, #c084fc); flex-shrink: 0;"></span>
            <div>
              <strong style="color: #ffffff; font-size: 0.9rem; display: block;">Royal Lavender</strong>
              <small style="color: #94a3b8; font-size: 0.75rem;">Purple Glow</small>
            </div>
          </button>

          <button type="button" class="btn-glass-card theme-choice-btn" data-grad="linear-gradient(90deg, #059669 0%, #10b981 50%, #34d399 100%)" data-cyan="#34d399" style="padding: 14px; text-align: left; display: flex; align-items: center; gap: 12px;">
            <span style="width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #34d399); flex-shrink: 0;"></span>
            <div>
              <strong style="color: #ffffff; font-size: 0.9rem; display: block;">Emerald Mint</strong>
              <small style="color: #94a3b8; font-size: 0.75rem;">Fresh Terminal</small>
            </div>
          </button>

          <button type="button" class="btn-glass-card theme-choice-btn" data-grad="linear-gradient(90deg, #ec4899 0%, #f43f5e 50%, #fb7185 100%)" data-cyan="#f43f5e" style="padding: 14px; text-align: left; display: flex; align-items: center; gap: 12px;">
            <span style="width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #fb7185); flex-shrink: 0;"></span>
            <div>
              <strong style="color: #ffffff; font-size: 0.9rem; display: block;">Cyber Rose</strong>
              <small style="color: #94a3b8; font-size: 0.75rem;">Vibrant Sunset</small>
            </div>
          </button>
        </div>

        <p style="font-size: 0.84rem; color: #94a3b8;">
          <i class="fa-solid fa-circle-info" style="color: var(--accent-cyan);"></i>
          Modifies CSS custom variables on root in real time without reloading.
        </p>
      `;
    } else if (demoId === 'webdev') {
      html = `
        <span class="pill-category-badge" style="color: #38bdf8; border-color: rgba(6, 182, 212, 0.4); margin-bottom: 12px; display: inline-block;">HTML &amp; CSS PLAYGROUND</span>
        <h3 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: #ffffff; margin-bottom: 8px;">Interactive Component Sandbox</h3>
        <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 18px;">Demonstrates Flexbox spacing, border-radius manipulation, and active glassmorphic hover shadows.</p>

        <div id="demo-box-preview" style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(6, 182, 212, 0.4); border-radius: 16px; padding: 24px; margin-bottom: 20px; transition: all 0.3s ease;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 0.74rem; font-weight: 700; color: #38bdf8; background: rgba(6, 182, 212, 0.15); padding: 4px 10px; border-radius: 9999px;">CSS3 FLEXBOX</span>
            <span style="font-size: 0.75rem; color: #94a3b8;">Status: Active</span>
          </div>
          <h4 style="font-size: 1.2rem; color: #ffffff; font-weight: 700; margin-bottom: 6px;">Sample Card Component</h4>
          <p style="font-size: 0.88rem; color: #cbd5e1; margin-bottom: 16px;">Interact with the buttons below to dynamically alter this card's styling via JavaScript.</p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button type="button" class="btn btn-gradient-glow btn-sm" id="btn-toggle-glow">Toggle Glow</button>
            <button type="button" class="btn btn-glass-card btn-sm" id="btn-toggle-round">Toggle Shape</button>
          </div>
        </div>
      `;
    }

    modalBodyContent.innerHTML = html;
    attachRunnerHandlers(demoId);
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function attachRunnerHandlers(demoId) {
    if (demoId === 'python') {
      const btnExec = document.getElementById('btn-exec-py');
      const btnClear = document.getElementById('btn-clear-py');
      const termScreen = document.getElementById('term-screen');

      if (btnExec && termScreen) {
        btnExec.addEventListener('click', () => {
          btnExec.disabled = true;
          termScreen.innerHTML += `
            <div style="margin-top: 10px; color: #cbd5e1;">$ python3 main.py</div>
            <div class="term-success">&gt; [1/4] Loaded Linux environment: bash 5.2</div>
            <div class="term-success">&gt; [2/4] Verified Student: Kousar Fathima (DR. RVR NRI College - NIAT)</div>
            <div class="term-success">&gt; [3/4] Verified Skills: Python, HTML5, CSS3, Linux, Git & GitHub</div>
            <div class="term-success">&gt; [4/4] Output: Initialized First-Year Engineering Profile successfully!</div>
            <div style="color: #60a5fa; margin-top: 6px;">&gt;&gt;&gt; Process returned 0 (Execution Successful).</div>
          `;
          termScreen.scrollTop = termScreen.scrollHeight;
          btnExec.disabled = false;
          showToast('Executed Successfully', 'Script finished with return code 0.', true);
        });
      }

      if (btnClear && termScreen) {
        btnClear.addEventListener('click', () => {
          termScreen.innerHTML = `
            <div style="color: #64748b;"># Terminal cleared.</div>
            <div style="color: #c084fc;">&gt;&gt;&gt; Ready to execute... Click "Execute Code" below!</div>
          `;
        });
      }
    } else if (demoId === 'portfolio') {
      const choiceBtns = document.querySelectorAll('.theme-choice-btn');
      choiceBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          choiceBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const grad = btn.getAttribute('data-grad');
          const cyan = btn.getAttribute('data-cyan');

          document.documentElement.style.setProperty('--gradient-primary', grad);
          document.documentElement.style.setProperty('--accent-cyan', cyan);

          showToast('Theme Updated', 'Transformed portfolio accent palette!', true);
        });
      });
    } else if (demoId === 'webdev') {
      const box = document.getElementById('demo-box-preview');
      const btnGlow = document.getElementById('btn-toggle-glow');
      const btnRound = document.getElementById('btn-toggle-round');

      let glowOn = false;
      let roundOn = false;

      btnGlow?.addEventListener('click', () => {
        glowOn = !glowOn;
        box.style.boxShadow = glowOn ? '0 0 35px rgba(6, 182, 212, 0.6)' : 'none';
        box.style.borderColor = glowOn ? '#06b6d4' : 'rgba(6, 182, 212, 0.4)';
      });

      btnRound?.addEventListener('click', () => {
        roundOn = !roundOn;
        box.style.borderRadius = roundOn ? '32px' : '16px';
      });
    }
  }

  function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  viewProjectBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-project');
      openDetailsModal(pId);
    });
  });

  runDemoBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const dId = btn.getAttribute('data-demo');
      openLiveRunnerModal(dId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeMobileMenu();
    }
  });

  // =========================================================================
  // 6. TOAST NOTIFICATION UTILITY
  // =========================================================================
  let toastTimer = null;

  function showToast(title, message, isSuccess = true) {
    if (toastTimer) clearTimeout(toastTimer);

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    if (isSuccess) {
      toastIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
      toastIcon.style.color = '#10b981';
      toastIcon.style.borderColor = '#10b981';
      toastIcon.style.background = 'rgba(16, 185, 129, 0.15)';
    } else {
      toastIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
      toastIcon.style.color = '#f59e0b';
      toastIcon.style.borderColor = '#f59e0b';
      toastIcon.style.background = 'rgba(245, 158, 11, 0.15)';
    }

    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // =========================================================================
  // 7. COPY EMAIL BUTTON
  // =========================================================================
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', async () => {
      const email = emailTextElem ? emailTextElem.textContent.trim() : 'Kousarfathima2008@gmail.com';
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(email);
        } else {
          const t = document.createElement('input');
          t.value = email;
          document.body.appendChild(t);
          t.select();
          document.execCommand('copy');
          document.body.removeChild(t);
        }
        showToast('Email Copied!', `${email} copied to clipboard.`);
      } catch (err) {
        showToast('Email', email, false);
      }
    });
  }

  // =========================================================================
  // 8. CONTACT FORM VALIDATION
  // =========================================================================
  if (contactForm) {
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const msgInput = document.getElementById('user-message');
    const nameErr = document.getElementById('name-error');
    const emailErr = document.getElementById('email-error');
    const msgErr = document.getElementById('message-error');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    nameInput?.addEventListener('input', () => {
      if (nameInput.value.trim().length >= 2) {
        nameInput.classList.remove('is-invalid');
        nameErr.classList.remove('visible');
      }
    });

    emailInput?.addEventListener('input', () => {
      if (emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.remove('is-invalid');
        emailErr.classList.remove('visible');
      }
    });

    msgInput?.addEventListener('input', () => {
      if (msgInput.value.trim().length >= 10) {
        msgInput.classList.remove('is-invalid');
        msgErr.classList.remove('visible');
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const msgVal = msgInput.value.trim();

      let valid = true;

      if (nameVal.length < 2) {
        nameInput.classList.add('is-invalid');
        nameErr.classList.add('visible');
        valid = false;
      }

      if (!emailRegex.test(emailVal)) {
        emailInput.classList.add('is-invalid');
        emailErr.classList.add('visible');
        valid = false;
      }

      if (msgVal.length < 10) {
        msgInput.classList.add('is-invalid');
        msgErr.classList.add('visible');
        valid = false;
      }

      if (valid) {
        showToast(
          'Message Received!',
          `Thank you, ${nameVal}! Your message has been recorded on screen.`,
          true
        );
        contactForm.reset();
      } else {
        showToast('Validation Error', 'Please complete all required fields.', false);
      }
    });
  }

});
