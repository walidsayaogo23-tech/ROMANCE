/**
 * ══════════════════════════════════════════════════════════
 * DEMANDE ROMANTIQUE INTERACTIVE — APPLICATION COMPLÈTE
 * ══════════════════════════════════════════════════════════
 * Architecture : CONFIG → ETAT → UTILITAIRES → RENDU → ANIMATIONS → AUDIO → PARTAGE → INIT
 */

(function () {
  'use strict';

  // ════════════════════════════════════════════
  // CONFIG
  // ════════════════════════════════════════════
  const CONFIG = {
    // Valeurs par défaut
    question: 'Tu veux être avec moi ? 💕',
    prenomDestinataire: 'Samira',
    prenomExpediteur: 'Walid',
    telephoneExpediteur: '',
    ton: 'mignon',
    preset: 'D',
    imageUrl: '',

    // Étapes par ton (8 paliers pour le bouton Non)
    etapes: {
      mignon: [
        { message: 'Non ? Vraiment vraiment ? 🥺', image: '🥺', legende: 'ces yeux te jugent tendrement' },
        { message: 'Mais… regarde ces petits yeux… 🥺👉👈', image: '🐻', legende: 'même l\'ourson te supplie' },
        { message: 'S\'il te plaîîît… je ferai des crêpes ! 🥞💕', image: '🥞', legende: 'avec du chocolat ET des fraises' },
        { message: 'Mon petit cœur fait boum boum boum… 💗', image: '💓', legende: 'écoute bien… tu l\'entends battre ?' },
        { message: 'Je vais pleurer des mini larmes de panda… 🐼', image: '🐼', legende: 'alerte mignonnerie en détresse' },
        { message: '*snif* Mon cœur fond comme un nuage de guimauve… 🫠', image: '🫠', legende: 'fonte émotionnelle maximale' },
        { message: 'Le bouton Non a fui… il n\'assume plus du tout ! 😤', image: '🚪', legende: 'porte claquée, adieu !' },
        { message: 'Il ne reste qu\'une seule réponse possible… la meilleure 💕', image: '✨', legende: 'le destin a déjà choisi' },
      ],
      dramatique: [
        { message: 'Non ?! Mon cœur… il se brise en mille éclats ! 💔', image: '💔', legende: 'tragédie en direct' },
        { message: '*tombe à genoux sous la pluie* Pourquoi tant de cruauté ?! 😭', image: '🧎', legende: 'acte II, la désolation' },
        { message: 'Le ciel s\'assombrit… les violons sanglotent… 🎻', image: '🌧️', legende: 'tempête sentimentale de catégorie 5' },
        { message: 'Shakespeare lui-même n\'a jamais écrit drame si poignant 📜', image: '📜', legende: 'un requiem pour cet amour' },
        { message: 'Mon âme vacille… je défaille sur un lit de pétales flétris… 🥀', image: '🥀', legende: 'le rideau tremble' },
        { message: '*l\'orchestre symphonique s\'affole au loin* 🎭🎺', image: '🎭', legende: 'tension insoutenable' },
        { message: 'Le bouton Non a succombé sous le poids de la fatalité ⚰️', image: '🌹', legende: 'adieu, pauvre bouton Non' },
        { message: 'Le triomphe de l\'amour est inéluctable… OUI t\'attend 🌟', image: '🌟', legende: 'dénouement romanesque' },
      ],
      chaotique: [
        { message: 'Attends… t\'as vraiment osé cliquer là ? 🤔', image: '🤨', legende: 'erreur 404 : refus non accepté' },
        { message: 'Le bouton Non est parti googler "comment démissionner" 💻', image: '💻', legende: 'requête envoyée au serveur' },
        { message: 'ALERTE ROUGE : le bouton Non refuse d\'obéir ! 🚨', image: '🚨', legende: 'panique dans la matrice' },
        { message: 'Le bouton Non a déposé un préavis de grève immédiat 📝', image: '📝', legende: 'syndicat des boutons fatigués' },
        { message: 'Le bouton Non est en PLS totale sous le canapé 🫠', image: '🫠', legende: 'tentative de survie' },
        { message: 'FLASH INFO : le bouton Non a quitté la galaxie 📰🚀', image: '🛸', legende: 'mission spatiale improvisée' },
        { message: 'Le bouton Non a glitché dans une faille temporelle 👾', image: '⚡', legende: 'plus aucun signal' },
        { message: 'Plot twist : le destin n\'accepte que le OUI ! 🤯', image: '🤯', legende: 'victoire cosmique de l\'amour' },
      ],
    },

    // Messages de célébration personnalisés et joyeux (première personne)
    messageFinal: {
      mignon: 'Waouh, je n\'en crois pas mes yeux ! 🥰 Elle a dit OUI, je suis tellement content ! 💕',
      dramatique: 'Elle a dit OUI ! 🎭 Mon cœur explose de joie, je n\'en crois pas mes yeux ! 🌟💕',
      chaotique: 'C\'EST UN GRAND OUI ! 🤯 Je suis sur un petit nuage, je n\'en crois pas mes yeux ! 🚀✨',
    },

    // Paliers de physique du bouton "Non"
    paliers: {
      shrinkStep: 0.15,
      growStep: 0.16,
      fleeDistance: 95,
      fadeOpacity: 0.22,
      antiDoubleClic: 220,
      clampMargin: 16,
    },

    // Animations & Particules
    maxFloatingElements: 16,
    confettiDuration: 6500,
    confettiCount: 130,

    // Emojis flottants par Preset
    floatingEmojis: {
      A: ['💕', '🌸', '🍬', '💗', '🫧', '✨', '🌷', '💌'],
      B: ['⭐', '✨', '🌙', '💫', '🪐', '🌟', '💜', '🔮'],
      C: ['⚡', '🔥', '💥', '🎯', '🎪', '🎭', '🤪', '💖'],
      D: ['💌', '🌹', '✉️', '🕊️', '💕', '🌸', '✨', '💗'],
    },
  };

  // ════════════════════════════════════════════
  // ETAT
  // ════════════════════════════════════════════
  const etat = {
    currentStep: 1,
    totalSteps: 3,
    tentatives: 0,
    dernierClic: 0,
    ecran: 'creator', // 'creator' | 'share' | 'envelope' | 'question' | 'celebration'
    soundEnabled: false,
    audioCtx: null,
    confettiId: null,
    isTouchDevice: false,
    nonFloating: false,
    reducedMotion: false,
    generatedUrl: '',
    uploadedPhotos: [],
    envelopeOpened: false,
  };

  // ════════════════════════════════════════════
  // UTILITAIRES & SÉCURITÉ
  // ════════════════════════════════════════════
  function sanitizeName(str) {
    if (!str) return '';
    return String(str).slice(0, 30).trim();
  }

  function sanitizeQuestion(str) {
    if (!str) return '';
    return String(str).slice(0, 140).trim();
  }

  function validateTon(str) {
    const allowed = ['mignon', 'dramatique', 'chaotique'];
    return allowed.includes(str) ? str : 'mignon';
  }

  function validatePreset(str) {
    const allowed = ['A', 'B', 'C', 'D'];
    const upper = String(str || '').toUpperCase();
    return allowed.includes(upper) ? upper : 'D';
  }

  function sanitizeTel(str) {
    if (!str) return '';
    return String(str).replace(/[^0-9+]/g, '').slice(0, 20);
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function parseURLParams() {
    const params = new URLSearchParams(window.location.search);
    if (!params.toString() || (!params.get('to') && !params.get('q'))) return null;

    return {
      to: sanitizeName(params.get('to')) || CONFIG.prenomDestinataire,
      from: sanitizeName(params.get('from')) || CONFIG.prenomExpediteur,
      q: sanitizeQuestion(params.get('q')) || CONFIG.question,
      ton: validateTon(params.get('ton')),
      preset: validatePreset(params.get('preset')),
      tel: sanitizeTel(params.get('tel')),
      img: params.get('img') || '',
    };
  }

  function pluralize(n) {
    if (n === 0) return 'Tu as dit oui dès la première seconde… Mon cœur bat la chamade ! 💖';
    if (n === 1) return 'Tu as essayé de dire non 1 seule fois avant de craquer… 😏💕';
    return `Tu as essayé de résister ${n} fois avant de craquer… Impossible de lutter contre l'amour ! 😏💘`;
  }

  function showToast(text) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2600);
  }

  function isEmoji(str) {
    return str && str.length <= 8 && !str.startsWith('http') && !str.startsWith('data:');
  }

  async function compressImage(file) {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) { reject(new Error('Fichier non image')); return; }
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let w = img.width, h = img.height;
          const maxSide = 800;
          if (w > maxSide || h > maxSide) {
            if (w > h) { h = Math.round(h * maxSide / w); w = maxSide; }
            else { w = Math.round(w * maxSide / h); h = maxSide; }
          }
          canvas.width = w;
          canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.82));
        };
        img.onerror = () => reject(new Error('Erreur de lecture image'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Erreur de fichier'));
      reader.readAsDataURL(file);
    });
  }

  // ════════════════════════════════════════════
  // GESTION DU THÈME & PRESETS
  // ════════════════════════════════════════════
  function applyPresetTheme(preset) {
    const valid = validatePreset(preset);
    document.documentElement.setAttribute('data-preset', valid);
    CONFIG.preset = valid;
    createFloatingElements();
  }

  // ════════════════════════════════════════════
  // GESTION DU STEPPER (WIZARD FORMULAIRES)
  // ════════════════════════════════════════════
  function setWizardStep(step) {
    etat.currentStep = clamp(step, 1, etat.totalSteps);

    // Mettre à jour les panneaux d'étapes
    for (let i = 1; i <= etat.totalSteps; i++) {
      const stepEl = document.getElementById(`step-${i}`);
      const navItem = document.getElementById(`stepper-item-${i}`);
      if (stepEl) {
        stepEl.classList.toggle('active', i === etat.currentStep);
      }
      if (navItem) {
        navItem.classList.toggle('active', i === etat.currentStep);
        navItem.classList.toggle('completed', i < etat.currentStep);
      }
    }

    // Mettre à jour la barre de progression
    const progressFill = document.getElementById('stepper-progress-fill');
    if (progressFill) {
      const pct = ((etat.currentStep - 1) / (etat.totalSteps - 1)) * 80;
      progressFill.style.width = `${pct}%`;
    }

    renderCreatorPreview();
  }

  // ════════════════════════════════════════════
  // RENDU DES ÉCRANS
  // ════════════════════════════════════════════
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(name + '-screen');
    if (target) {
      target.classList.add('active');
      etat.ecran = name;
    }
  }

  function renderCreatorPreview() {
    const toInput = document.getElementById('field-to');
    const fromInput = document.getElementById('field-from');
    const qInput = document.getElementById('field-question');
    const tonSelected = document.querySelector('input[name="ton"]:checked')?.value || 'mignon';
    const presetSelected = document.querySelector('input[name="preset"]:checked')?.value || 'D';

    const to = sanitizeName(toInput ? toInput.value : '') || CONFIG.prenomDestinataire;
    const from = sanitizeName(fromInput ? fromInput.value : '') || CONFIG.prenomExpediteur;
    const q = sanitizeQuestion(qInput ? qInput.value : '') || CONFIG.question;

    const previewGreeting = document.getElementById('preview-greeting');
    const previewQuestion = document.getElementById('preview-question');
    const previewEmoji = document.getElementById('preview-emoji');

    if (previewGreeting) previewGreeting.textContent = `Chère ${to},`;
    if (previewQuestion) previewQuestion.textContent = q;

    // Emoji selon le ton
    const emojisParTon = {
      mignon: '🥺',
      dramatique: '🎭',
      chaotique: '🤪'
    };
    if (previewEmoji) previewEmoji.textContent = emojisParTon[tonSelected] || '💌';

    // Appliquer le preset choisi pour que l'ambiance change en temps réel
    applyPresetTheme(presetSelected);
  }

  function renderEnvelopeScreen(cfg) {
    const toBadge = document.getElementById('envelope-to-name');
    const fromBadge = document.getElementById('envelope-from-name');
    const title = document.getElementById('envelope-screen-title');

    if (toBadge) toBadge.textContent = cfg.prenomDestinataire;
    if (fromBadge) fromBadge.textContent = cfg.prenomExpediteur;
    if (title) title.textContent = `Une lettre scellée pour ${cfg.prenomDestinataire} 💌`;

    // Réinitialiser l'état d'ouverture de l'enveloppe
    const envContainer = document.getElementById('interactive-envelope');
    if (envContainer) envContainer.classList.remove('opening');
    etat.envelopeOpened = false;
  }

  function renderQuestionScreen(cfg) {
    const greeting = document.getElementById('q-greeting');
    const question = document.getElementById('q-question');
    const footer = document.getElementById('q-footer');

    if (greeting) greeting.textContent = `Chère ${cfg.prenomDestinataire},`;
    if (question) question.textContent = cfg.question;
    if (footer) footer.textContent = `Avec tout mon amour, ${cfg.prenomExpediteur} 💌`;

    document.title = `💌 Une lettre pour ${cfg.prenomDestinataire}`;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = `💌 Une lettre pour ${cfg.prenomDestinataire}`;

    // Réinitialisation de l'affichage d'étape
    updateStageDisplay(null);
  }

  function updateStageDisplay(etape) {
    const imgEl = document.getElementById('q-image');
    const legendEl = document.getElementById('q-legend');
    const msgEl = document.getElementById('q-message');

    if (!etape) {
      if (imgEl) imgEl.textContent = '💌';
      if (legendEl) legendEl.textContent = '';
      if (msgEl) msgEl.textContent = '';
      return;
    }

    if (imgEl) {
      if (isEmoji(etape.image)) {
        imgEl.textContent = etape.image;
      } else {
        const img = document.createElement('img');
        img.src = etape.image;
        img.alt = etape.legende || '';
        img.onerror = () => { imgEl.textContent = '💌'; };
        imgEl.textContent = '';
        imgEl.appendChild(img);
      }

      if (!etat.reducedMotion) {
        imgEl.style.transform = 'scale(0.5)';
        requestAnimationFrame(() => {
          imgEl.style.transform = 'scale(1)';
        });
      }
    }

    if (legendEl) legendEl.textContent = etape.legende || '';
    if (msgEl) msgEl.textContent = etape.message;
  }

  function updateButtonStates() {
    const btnOui = document.getElementById('btn-oui');
    const btnNon = document.getElementById('btn-non');
    if (!btnOui || !btnNon) return;

    const stage = etat.tentatives;
    const p = CONFIG.paliers;

    if (stage === 0) return;

    // Le bouton OUI grandit à chaque tentative
    const ouiScale = 1 + Math.min(stage, 6) * p.growStep;
    btnOui.style.transform = `scale(${ouiScale})`;

    if (stage >= 7) {
      // Le bouton Non disparaît définitivement
      btnNon.style.display = 'none';
      btnNon.setAttribute('aria-hidden', 'true');
      btnNon.tabIndex = -1;
      etat.nonFloating = false;

      // Le bouton OUI occupe toute la largeur
      btnOui.style.transform = 'scale(1.05)';
      btnOui.style.width = '100%';
      btnOui.style.fontSize = '1.35rem';
      btnOui.style.padding = '1.1rem 2rem';
      btnOui.focus();

      document.removeEventListener('pointermove', handlePointerMoveForFlee);
    } else if (stage >= 5) {
      // Non devient quasi transparent
      btnNon.style.opacity = String(p.fadeOpacity);
      btnOui.style.width = '70%';
      btnOui.style.fontSize = '1.18rem';

      if (etat.nonFloating) {
        returnNonToFlow();
      }
    } else if (stage >= 3) {
      // Non s'enfuit en flottant
      if (!etat.nonFloating) {
        floatNonButton();
      }
      const nonScale = 1 - stage * p.shrinkStep * 0.5;
      btnNon.style.transform = `scale(${Math.max(nonScale, 0.5)})`;
    } else if (stage >= 1) {
      // Non rétrécit
      const nonScale = 1 - stage * p.shrinkStep;
      btnNon.style.transform = `scale(${Math.max(nonScale, 0.55)})`;

      if (stage === 2) {
        const offsetX = (Math.random() - 0.5) * 24;
        const offsetY = (Math.random() - 0.5) * 12;
        btnNon.style.transform = `scale(${Math.max(nonScale, 0.55)}) translate(${offsetX}px, ${offsetY}px)`;
      }
    }
  }

  function floatNonButton() {
    const btnNon = document.getElementById('btn-non');
    if (!btnNon) return;
    const rect = btnNon.getBoundingClientRect();

    btnNon.style.position = 'fixed';
    btnNon.style.left = rect.left + 'px';
    btnNon.style.top = rect.top + 'px';
    btnNon.style.margin = '0';
    btnNon.style.zIndex = '500';
    etat.nonFloating = true;

    if (!etat.isTouchDevice) {
      document.addEventListener('pointermove', handlePointerMoveForFlee);
    }
  }

  function returnNonToFlow() {
    const btnNon = document.getElementById('btn-non');
    if (!btnNon) return;
    btnNon.style.position = '';
    btnNon.style.left = '';
    btnNon.style.top = '';
    btnNon.style.margin = '';
    btnNon.style.zIndex = '';
    etat.nonFloating = false;
    document.removeEventListener('pointermove', handlePointerMoveForFlee);
  }

  function handlePointerMoveForFlee(e) {
    if (etat.tentatives < 3 || etat.tentatives > 4) return;
    if (etat.reducedMotion) return;

    const btnNon = document.getElementById('btn-non');
    if (!btnNon || btnNon.style.display === 'none') return;

    const rect = btnNon.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < CONFIG.paliers.fleeDistance) {
      const angle = Math.atan2(dy, dx);
      const pushDist = CONFIG.paliers.fleeDistance + 45;
      let newX = cx - Math.cos(angle) * pushDist - rect.width / 2;
      let newY = cy - Math.sin(angle) * pushDist - rect.height / 2;
      const margin = CONFIG.paliers.clampMargin;

      newX = clamp(newX, margin, window.innerWidth - rect.width - margin);
      newY = clamp(newY, margin, window.innerHeight - rect.height - margin);

      btnNon.style.left = newX + 'px';
      btnNon.style.top = newY + 'px';
      btnNon.style.transition = 'left 0.2s var(--ease-enter), top 0.2s var(--ease-enter)';
    }
  }

  function jumpNonRandom() {
    const btnNon = document.getElementById('btn-non');
    if (!btnNon || !etat.nonFloating) return;

    const rect = btnNon.getBoundingClientRect();
    const margin = CONFIG.paliers.clampMargin;
    const maxX = window.innerWidth - rect.width - margin;
    const maxY = window.innerHeight - rect.height - margin;

    const newX = margin + Math.random() * (maxX - margin);
    const newY = margin + Math.random() * (maxY - margin);

    btnNon.style.transition = 'left 0.25s var(--ease-bounce), top 0.25s var(--ease-bounce)';
    btnNon.style.left = newX + 'px';
    btnNon.style.top = newY + 'px';
  }

  function recalcNonPosition() {
    if (!etat.nonFloating) return;
    const btnNon = document.getElementById('btn-non');
    if (!btnNon) return;
    const rect = btnNon.getBoundingClientRect();
    const margin = CONFIG.paliers.clampMargin;
    const x = clamp(rect.left, margin, window.innerWidth - rect.width - margin);
    const y = clamp(rect.top, margin, window.innerHeight - rect.height - margin);
    btnNon.style.left = x + 'px';
    btnNon.style.top = y + 'px';
  }

  function shakeCard() {
    if (etat.reducedMotion) return;
    const card = document.getElementById('question-card');
    if (!card) return;
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
  }

  function renderCelebration(cfg) {
    const msg = CONFIG.messageFinal[cfg.ton] || CONFIG.messageFinal.mignon;

    const celebMsg = document.getElementById('celeb-message');
    const celebCounter = document.getElementById('celeb-counter');
    const notifyBtn = document.getElementById('celeb-notify');

    if (celebMsg) celebMsg.textContent = msg;
    if (celebCounter) celebCounter.textContent = pluralize(etat.tentatives);

    // Préparation de l'envoi WhatsApp pour prévenir l'expéditeur
    if (notifyBtn) {
      const shareText = encodeURIComponent(`J'ai dit OUI ! 💕🥰 Je suis tellement content(e) !`);
      if (cfg.telephoneExpediteur) {
        const cleanTel = cfg.telephoneExpediteur.replace(/[^0-9+]/g, '');
        notifyBtn.href = `https://wa.me/${cleanTel}?text=${shareText}`;
      } else {
        notifyBtn.href = `https://wa.me/?text=${shareText}`;
      }
      notifyBtn.textContent = `💬 Prévenir ${cfg.prenomExpediteur} sur WhatsApp`;
    }
  }

  // ════════════════════════════════════════════
  // ANIMATIONS DE FOND & CONFETTIS
  // ════════════════════════════════════════════
  function createFloatingElements() {
    if (etat.reducedMotion) return;

    const container = document.getElementById('floating-container');
    if (!container) return;
    container.innerHTML = '';
    const emojis = CONFIG.floatingEmojis[CONFIG.preset] || CONFIG.floatingEmojis.D;
    const count = Math.min(CONFIG.maxFloatingElements, 18);

    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'floating-el';
      el.textContent = emojis[i % emojis.length];
      el.style.setProperty('--f-delay', `${Math.random() * 18}s`);
      el.style.setProperty('--f-dur', `${13 + Math.random() * 10}s`);
      el.style.setProperty('--f-x', `${2 + Math.random() * 96}vw`);
      el.style.setProperty('--f-drift', `${(Math.random() - 0.5) * 80}px`);
      el.style.setProperty('--f-spin', `${(Math.random() - 0.5) * 360}deg`);
      el.style.setProperty('--f-size', `${0.85 + Math.random() * 1.25}rem`);
      container.appendChild(el);
    }
  }

  function launchConfetti() {
    if (etat.reducedMotion) return;

    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const colors = ['#C2415D', '#E8697F', '#C8A96E', '#7A9E7E', '#FFCCD5', '#FFF0F2'];
    const confetti = [];

    for (let i = 0; i < CONFIG.confettiCount; i++) {
      confetti.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 14 - 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 7 + 4,
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        shape: Math.random() > 0.4 ? 'rect' : 'heart',
      });
    }

    const startTime = performance.now();

    function render(time) {
      const elapsed = time - startTime;
      if (elapsed > CONFIG.confettiDuration) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        return;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const p of confetti) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28; // Gravité
        p.vx *= 0.99;
        p.rotation += p.vRot;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          // Petit cœur stylisé
          ctx.beginPath();
          ctx.arc(-p.size / 4, -p.size / 4, p.size / 4, Math.PI, 0, false);
          ctx.arc(p.size / 4, -p.size / 4, p.size / 4, Math.PI, 0, false);
          ctx.lineTo(0, p.size / 2);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      etat.confettiId = requestAnimationFrame(render);
    }

    if (etat.confettiId) cancelAnimationFrame(etat.confettiId);
    etat.confettiId = requestAnimationFrame(render);
  }

  // ════════════════════════════════════════════
  // AUDIO SYNTHÉTISÉ (WEB AUDIO API)
  // ════════════════════════════════════════════
  function ensureAudioCtx() {
    if (!etat.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        etat.audioCtx = new AudioCtx();
      }
    }
    if (etat.audioCtx && etat.audioCtx.state === 'suspended') {
      etat.audioCtx.resume();
    }
  }

  function playSound(type) {
    if (!etat.soundEnabled || !etat.audioCtx) return;
    try {
      const ctx = etat.audioCtx;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.1);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'ding') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1320, now + 0.12);
        gain2.gain.setValueAtTime(0.06, now + 0.12);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc2.start(now + 0.12);
        osc2.stop(now + 0.45);
      } else if (type === 'open') {
        // Son de froissement de papier / clochette magique
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'whoosh') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.2);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'fanfare') {
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, now + i * 0.15);
          g.gain.setValueAtTime(0.08, now + i * 0.15);
          g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.35);
          o.start(now + i * 0.15);
          o.stop(now + i * 0.15 + 0.35);
        });
      }
    } catch (e) {
      // Audio facultatif
    }
  }

  // ════════════════════════════════════════════
  // GÉNÉRATION & PARTAGE DU LIEN D'AMOUR
  // ════════════════════════════════════════════
  function generateLink() {
    const to = sanitizeName(document.getElementById('field-to').value) || CONFIG.prenomDestinataire;
    const from = sanitizeName(document.getElementById('field-from').value) || CONFIG.prenomExpediteur;
    const q = sanitizeQuestion(document.getElementById('field-question').value) || CONFIG.question;
    const ton = validateTon(document.querySelector('input[name="ton"]:checked')?.value);
    const preset = validatePreset(document.querySelector('input[name="preset"]:checked')?.value);
    const tel = sanitizeTel(document.getElementById('field-tel').value);
    const imgUrl = document.getElementById('field-imgurl').value.trim();

    const params = new URLSearchParams();
    params.set('to', to);
    params.set('from', from);
    params.set('q', q);
    params.set('ton', ton);
    params.set('preset', preset);
    if (tel) params.set('tel', tel);
    if (imgUrl) params.set('img', imgUrl);

    // Mettre à jour CONFIG avec ces valeurs
    CONFIG.prenomDestinataire = to;
    CONFIG.prenomExpediteur = from;
    CONFIG.question = q;
    CONFIG.ton = ton;
    CONFIG.preset = preset;
    CONFIG.telephoneExpediteur = tel;
    CONFIG.imageUrl = imgUrl;

    const base = window.location.origin + window.location.pathname;
    const finalUrl = base + '?' + params.toString();
    etat.generatedUrl = finalUrl;
    return finalUrl;
  }

  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        showToast('Lien de la lettre copié ! 💌📋');
        return;
      }
    } catch (e) { /* fallback */ }

    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('Lien de la lettre copié ! 💌📋');
    } catch (e) {
      showToast('Erreur : impossible de copier 😢');
    }
  }

  async function shareLink(url) {
    const to = CONFIG.prenomDestinataire;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `💌 Une lettre pour ${to}`,
          text: `J'ai préparé une surprise très spéciale pour toi… Ouvre vite cette lettre ! 💕`,
          url: url,
        });
      } catch (e) {
        if (e.name !== 'AbortError') {
          await copyToClipboard(url);
        }
      }
    } else {
      await copyToClipboard(url);
    }
  }

  // ════════════════════════════════════════════
  // INTERACTION D'OUVERTURE DE L'ENVELOPPE
  // ════════════════════════════════════════════
  function triggerEnvelopeOpening() {
    if (etat.envelopeOpened) return;
    etat.envelopeOpened = true;

    ensureAudioCtx();
    playSound('open');

    const envContainer = document.getElementById('interactive-envelope');
    if (envContainer) {
      envContainer.classList.add('opening');
    }

    // Après l'animation d'ouverture (0.8s), basculer vers la question
    setTimeout(() => {
      renderQuestionScreen(CONFIG);
      showScreen('question');
      playSound('ding');
    }, 850);
  }

  // ════════════════════════════════════════════
  // INITIALISATION
  // ════════════════════════════════════════════
  function init() {
    etat.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    etat.isTouchDevice = window.matchMedia('(hover: none)').matches;

    // Analyse des paramètres d'URL (destinataire)
    const params = parseURLParams();

    if (params) {
      // Mode Destinataire : charger la configuration
      CONFIG.prenomDestinataire = params.to;
      CONFIG.prenomExpediteur = params.from;
      CONFIG.question = params.q;
      CONFIG.ton = params.ton;
      CONFIG.preset = params.preset;
      CONFIG.telephoneExpediteur = params.tel;
      CONFIG.imageUrl = params.img;

      applyPresetTheme(CONFIG.preset);

      // Le destinataire arrive d'abord sur la magnifique Enveloppe fermée avec le cœur battant !
      renderEnvelopeScreen(CONFIG);
      showScreen('envelope');
    } else {
      // Mode Créateur (SaaS)
      applyPresetTheme(CONFIG.preset);
      showScreen('creator');
      setWizardStep(1);

      // Valeurs par défaut
      const toField = document.getElementById('field-to');
      const fromField = document.getElementById('field-from');
      const qField = document.getElementById('field-question');
      if (toField) toField.value = CONFIG.prenomDestinataire;
      if (fromField) fromField.value = CONFIG.prenomExpediteur;
      if (qField) qField.value = CONFIG.question;

      renderCreatorPreview();
    }

    createFloatingElements();

    // ─── Écouteurs d'événements du formulaire de création ───

    // Navigation Stepper : Étape 1 → Étape 2
    const btnNext1 = document.getElementById('btn-step1-next');
    if (btnNext1) {
      btnNext1.addEventListener('click', () => {
        ensureAudioCtx();
        playSound('pop');
        const toVal = document.getElementById('field-to')?.value.trim();
        if (!toVal) {
          showToast('Indique le prénom du destinataire 💕');
          document.getElementById('field-to')?.focus();
          return;
        }
        setWizardStep(2);
      });
    }

    // Navigation Stepper : Étape 2 → Étape 1 (Retour)
    const btnBack2 = document.getElementById('btn-step2-prev');
    if (btnBack2) {
      btnBack2.addEventListener('click', () => {
        ensureAudioCtx();
        playSound('pop');
        setWizardStep(1);
      });
    }

    // Navigation Stepper : Étape 2 → Étape 3
    const btnNext2 = document.getElementById('btn-step2-next');
    if (btnNext2) {
      btnNext2.addEventListener('click', () => {
        ensureAudioCtx();
        playSound('pop');
        setWizardStep(3);
      });
    }

    // Navigation Stepper : Étape 3 → Étape 2 (Retour)
    const btnBack3 = document.getElementById('btn-step3-prev');
    if (btnBack3) {
      btnBack3.addEventListener('click', () => {
        ensureAudioCtx();
        playSound('pop');
        setWizardStep(2);
      });
    }

    // Puces d'idées de questions (chips)
    document.querySelectorAll('.prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.getAttribute('data-text');
        const qInput = document.getElementById('field-question');
        if (text && qInput) {
          qInput.value = text;
          renderCreatorPreview();
          ensureAudioCtx();
          playSound('pop');
        }
      });
    });

    // Inputs réactifs en direct (nom, expéditeur, question)
    ['field-to', 'field-from', 'field-question', 'field-tel'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', renderCreatorPreview);
    });

    // Radios réactives en direct (ton & preset)
    document.querySelectorAll('input[name="ton"]').forEach(radio => {
      radio.addEventListener('change', () => {
        renderCreatorPreview();
        ensureAudioCtx();
        playSound('pop');
      });
    });

    document.querySelectorAll('input[name="preset"]').forEach(radio => {
      radio.addEventListener('change', () => {
        renderCreatorPreview();
        ensureAudioCtx();
        playSound('pop');
      });
    });

    // Upload de photos locales
    const photoInput = document.getElementById('field-photos');
    if (photoInput) {
      photoInput.addEventListener('change', async (e) => {
        const files = Array.from(e.target.files).slice(0, 5);
        const previews = document.getElementById('photo-previews');
        if (previews) previews.innerHTML = '';
        etat.uploadedPhotos = [];

        for (const file of files) {
          if (!file.type.startsWith('image/')) continue;
          try {
            const dataUri = await compressImage(file);
            etat.uploadedPhotos.push(dataUri);
            const img = document.createElement('img');
            img.src = dataUri;
            img.alt = 'Photo ajoutée';
            img.className = 'photo-thumb';
            if (previews) previews.appendChild(img);
          } catch (err) {}
        }
      });
    }

    // BOUTON "GÉNÉRER MA LETTRE" / "CRÉER MA PAGE" (SaaS)
    const btnGenerate = document.getElementById('btn-generate');
    if (btnGenerate) {
      btnGenerate.addEventListener('click', () => {
        ensureAudioCtx();
        playSound('ding');

        const link = generateLink();

        // Mettre à jour l'écran de partage
        const shareUrlDisplay = document.getElementById('share-url-display');
        if (shareUrlDisplay) shareUrlDisplay.textContent = link;

        const shareToBadge = document.getElementById('share-to-badge');
        if (shareToBadge) shareToBadge.textContent = CONFIG.prenomDestinataire;

        // Préparer le lien direct WhatsApp
        const btnWa = document.getElementById('btn-share-whatsapp');
        if (btnWa) {
          const waMsg = encodeURIComponent(
            `Coucou ${CONFIG.prenomDestinataire} ! 💌 J'ai préparé une surprise romantique pour toi…\n` +
            `Ouvre vite cette lettre scellée avec amour ici : ${link} 💕`
          );
          btnWa.href = `https://wa.me/?text=${waMsg}`;
        }

        // Basculer vers l'écran de partage avec enveloppe
        showScreen('share');
        showToast('Lettre créée avec succès ! 💌✨');
      });
    }

    // Actions de l'écran de partage
    const btnCopyShare = document.getElementById('btn-copy-share');
    if (btnCopyShare) {
      btnCopyShare.addEventListener('click', () => {
        copyToClipboard(etat.generatedUrl || generateLink());
      });
    }

    const btnNativeShare = document.getElementById('btn-native-share');
    if (btnNativeShare) {
      btnNativeShare.addEventListener('click', () => {
        shareLink(etat.generatedUrl || generateLink());
      });
    }

    // Tester l'ouverture de la lettre en tant qu'expéditeur
    const btnTestEnvelope = document.getElementById('btn-test-envelope');
    if (btnTestEnvelope) {
      btnTestEnvelope.addEventListener('click', () => {
        renderEnvelopeScreen(CONFIG);
        showScreen('envelope');
      });
    }

    // Modifier la lettre (retour au créateur étape 3)
    const btnEditLetter = document.getElementById('btn-edit-letter');
    if (btnEditLetter) {
      btnEditLetter.addEventListener('click', () => {
        showScreen('creator');
        setWizardStep(3);
      });
    }

    // Interaction sur l'enveloppe cliquable (destinataire et aperçu)
    const interactiveEnvelope = document.getElementById('interactive-envelope');
    if (interactiveEnvelope) {
      interactiveEnvelope.addEventListener('click', triggerEnvelopeOpening);
      interactiveEnvelope.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerEnvelopeOpening();
        }
      });
    }

    const envelopeHeart = document.getElementById('envelope-heart-btn');
    if (envelopeHeart) {
      envelopeHeart.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerEnvelopeOpening();
      });
    }

    // Bouton de son
    const soundBtn = document.getElementById('sound-toggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        ensureAudioCtx();
        etat.soundEnabled = !etat.soundEnabled;
        soundBtn.textContent = etat.soundEnabled ? '🔊' : '🔇';
        soundBtn.setAttribute('aria-pressed', String(etat.soundEnabled));
        soundBtn.setAttribute('aria-label', etat.soundEnabled ? 'Désactiver le son' : 'Activer le son');
        if (etat.soundEnabled) playSound('pop');
      });
    }

    // BOUTON OUI
    const btnOui = document.getElementById('btn-oui');
    if (btnOui) {
      btnOui.addEventListener('click', () => {
        ensureAudioCtx();
        playSound('ding');
        handleOui();
      });
    }

    // BOUTON NON (Paliers d'esquive et humour)
    const btnNon = document.getElementById('btn-non');
    if (btnNon) {
      btnNon.addEventListener('click', (e) => {
        e.preventDefault();
        handleNon();
      });
      btnNon.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNon();
        }
      });
    }

    // Actions écran de célébration
    const celebCopy = document.getElementById('celeb-copy');
    if (celebCopy) {
      celebCopy.addEventListener('click', () => {
        copyToClipboard(window.location.href);
      });
    }

    // "Créer ma propre page" sur l'écran de célébration
    const celebCreate = document.getElementById('celeb-create');
    if (celebCreate) {
      celebCreate.addEventListener('click', () => {
        // Réinitialiser proprement l'URL sans recharger brutalement
        try {
          window.history.pushState({}, '', window.location.pathname);
        } catch (e) {}

        // Réinitialiser les états
        etat.tentatives = 0;
        etat.nonFloating = false;
        const btnNonEl = document.getElementById('btn-non');
        if (btnNonEl) {
          btnNonEl.style.display = '';
          btnNonEl.style.transform = '';
          btnNonEl.style.opacity = '';
          btnNonEl.removeAttribute('aria-hidden');
          btnNonEl.tabIndex = 0;
        }
        const btnOuiEl = document.getElementById('btn-oui');
        if (btnOuiEl) {
          btnOuiEl.style.transform = '';
          btnOuiEl.style.width = '';
          btnOuiEl.style.fontSize = '';
        }

        // Remettre les étapes au début
        showScreen('creator');
        setWizardStep(1);
        showToast('À ton tour de composer ta lettre d\'amour ! ✨💌');
      });
    }

    // Repositionnement lors du redimensionnement
    window.addEventListener('resize', recalcNonPosition);
    window.addEventListener('orientationchange', () => {
      setTimeout(recalcNonPosition, 100);
    });
  }

  function handleNon() {
    const now = Date.now();
    if (now - etat.dernierClic < CONFIG.paliers.antiDoubleClic) return;
    etat.dernierClic = now;

    ensureAudioCtx();

    etat.tentatives++;
    const etapes = CONFIG.etapes[CONFIG.ton] || CONFIG.etapes.mignon;
    const stage = Math.min(etat.tentatives, etapes.length) - 1;
    const etape = etapes[Math.max(0, stage)];

    updateStageDisplay(etape);
    shakeCard();
    updateButtonStates();

    if (etat.isTouchDevice && etat.nonFloating && etat.tentatives >= 3 && etat.tentatives <= 4) {
      jumpNonRandom();
      playSound('whoosh');
    } else {
      playSound('pop');
    }
  }

  function handleOui() {
    renderCelebration(CONFIG);
    showScreen('celebration');
    playSound('fanfare');
    launchConfetti();
  }

  // ─── Démarrage au chargement du DOM ───
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
