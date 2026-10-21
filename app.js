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

    // Étapes par ton (8 paliers personnalisés, profondément humains et romantiques)
    etapes: {
      mignon: [
        {
          question: 'Tu es vraiment sûre ? Regarde mes petits yeux… 🥺',
          message: 'S\'il te plaît, sinon ça me ferait trop de peine… 💔🥺',
          image: '🥺',
          legende: 'ces yeux te supplient tendrement'
        },
        {
          question: 'S\'il te plaît… Ne me brise pas le cœur ! 💔🥺',
          message: 'Moi-même je te supplie avec tout mon cœur et tout mon espoir… 🐻👉👈',
          image: '🐻',
          legende: 'un regard plein de douceur et d\'espoir'
        },
        {
          question: 'Allez dis oui… Je te promets qu\'on sera si heureux ensemble ! 💕',
          message: 'Je prendrai tellement soin de toi, je serai toujours là pour toi… 🌹✨',
          image: '🌹',
          legende: 'une promesse d\'amour sincère'
        },
        {
          question: 'Mon petit cœur ne tiendra jamais le coup sans toi… 💓',
          message: 'Écoute bien… il bat si fort pour toi : boum boum boum… 💗',
          image: '💓',
          legende: 'mon cœur bat uniquement pour toi'
        },
        {
          question: 'Tu vas vraiment me laisser avec le cœur si lourd ? 🥺💔',
          message: 'Moi-même j\'ai le cœur tellement lourd et serré de peine sans toi… 🥺',
          image: '🥺',
          legende: 'j\'ai le cœur lourd sans ton sourire'
        },
        {
          question: 'Je t\'aime tellement fort… S\'il te plaît, dis-moi oui ! 🥺💕',
          message: 'Tu illumines ma vie chaque jour, je ne veux que toi… 🕊️💗',
          image: '💖',
          legende: 'mes sentiments pour toi sont infinis'
        },
        {
          question: 'Mon cœur n\'attend plus que toi, offre-moi ce bonheur… 🌹💖',
          message: 'Je ne peux plus imaginer ma vie sans toi… Tu es mon évidence. 💕',
          image: '🌹',
          legende: 'mon amour pour toi ne faiblira jamais'
        },
        {
          question: 'Dis-moi OUI et faisons de notre histoire un conte de fées ! ✨💖',
          message: 'Regarde, tout mon amour t\'attend les bras grands ouverts… 🥰💕',
          image: '✨',
          legende: 'notre plus belle histoire commence ici'
        },
      ],
      dramatique: [
        {
          question: 'Non ?! Tu oses poignarder mon cœur en plein vol ?! 💔',
          message: 'S\'il te plaît… sans toi mon existence perd toute sa lumière ! 😭',
          image: '💔',
          legende: 'mon cœur saigne en silence'
        },
        {
          question: 'S\'il te plaît, épargne-moi cette déchirante douleur ! 🧎😭',
          message: 'Je me mets à genoux devant toi… par pitié, ne me rejette pas !',
          image: '🧎',
          legende: 'une prière venue du fond du cœur'
        },
        {
          question: 'Le ciel s\'assombrit… Mon âme pleure des torrents de larmes ! 🎻',
          message: 'Comment pourrais-je vivre si tu refuses de m\'aimer en retour ? 🌧️',
          image: '🌧️',
          legende: 'un chagrin immense sans toi'
        },
        {
          question: 'Même dans mes pires cauchemars, je n\'aurais imaginé ce refus ! 📜',
          message: 'Mon amour pour toi est si pur, si passionné, si brûlant… 🥀',
          image: '📜',
          legende: 'les mots me manquent tant je t\'aime'
        },
        {
          question: 'Mon âme vacille… Vois comme je tremble pour toi… 🥀',
          message: 'Ne laisse pas cet amour s\'éteindre… donne-nous cette chance ! 🥀',
          image: '🥀',
          legende: 'un espoir qui refuse de mourir'
        },
        {
          question: 'Chaque seconde sans ton accord est une torture… Dis OUI ! 🎭🎺',
          message: 'Prends ma main et efface toute ma peine d\'un seul mot… 🌟',
          image: '🎭',
          legende: 'l\'attente est insoutenable'
        },
        {
          question: 'La tristesse s\'incline enfin devant la force de mon amour ! 🌹💖',
          message: 'Rien au monde ne pourra m\'empêcher de t\'aimer toujours plus fort… 🌹',
          image: '🌹',
          legende: 'l\'amour finit toujours par triompher'
        },
        {
          question: 'Le triomphe de notre amour est écrit dans les étoiles… Dis OUI ! 🌟💕',
          message: 'Notre destin s\'illumine d\'un bonheur éternel ! 💖✨',
          image: '🌟',
          legende: 'notre amour est invincible'
        },
      ],
      chaotique: [
        {
          question: 'Attends… tu as vraiment osé appuyer sur Non ?! 🤨',
          message: 'S\'il te plaît, regarde-moi dans les yeux et dis la vérité ! 💕',
          image: '🤨',
          legende: 'je sais que tu as envie de dire oui'
        },
        {
          question: 'S\'il te plaît… Ne me fais pas languir comme ça ! 🥺',
          message: 'Tu sais très bien qu\'on est faits pour être ensemble ! 💖',
          image: '👉👈',
          legende: 'tu joues avec mes nerfs de petit amoureux'
        },
        {
          question: 'Alerte générale : mon cœur s\'emballe à 200 à l\'heure ! 🚨',
          message: 'Arrête de faire semblant d\'hésiter, je sais que tu m\'aimes ! 💥',
          image: '💓',
          legende: 'mon cœur ne sait plus où donner de la tête'
        },
        {
          question: 'Tu essaies de m\'échapper, mais c\'est impossible ! 🏃‍♂️💨',
          message: 'Je te suivrai jusqu\'au bout du monde pour obtenir ton sourire ! 💕',
          image: '🌹',
          legende: 'détermination amoureuse absolue'
        },
        {
          question: 'Moi-même je ne sais plus quoi faire tellement je tiens à toi ! 🫠',
          message: 'Allez, un seul petit mot magique et on s\'envole ensemble ! ⚡',
          image: '🫠',
          legende: 'complètement fou amoureux de toi'
        },
        {
          question: 'Tu as vu comme j\'insiste ? C\'est parce que tu es unique ! 🚀',
          message: 'Personne d\'autre que toi ne me fait ressentir ça… 💕',
          image: '✨',
          legende: 'tu es la seule dans mon cœur'
        },
        {
          question: 'Tous les doutes s\'effacent : tu es faite pour moi ! 💖',
          message: 'Plus aucune hésitation possible, regarde ce grand bouton d\'amour ! 🌹',
          image: '🥰',
          legende: 'notre complicité est magique'
        },
        {
          question: 'Tu n\'as plus d\'autre choix que de devenir mon bonheur ! 🤯💖',
          message: 'Dis OUI et commençons notre plus belle aventure dès maintenant ! 🚀✨',
          image: '🎉',
          legende: 'le plus beau jour de notre vie'
        },
      ],
    },

    // Messages de célébration plein d'émotion, de gratitude et de bonheur (adressés directement à la personne : "Tu as dit OUI !")
    messageFinal: {
      mignon: 'Tu as dit OUI ! 🎉💖 Mon cœur déborde de joie et d\'émotion… Merci infiniment d\'illuminer ma vie. Je te promets d\'aimer et de chérir chaque instant à tes côtés ! 💕✨',
      dramatique: 'Tu as dit OUI ! 🌟💖 Le soleil renaît dans mon ciel ! Mon cœur est rempli d\'une reconnaissance infinie, je te promets un amour éternel et sincère ! 🌹✨',
      chaotique: 'Tu as dit OUI ! 🚀💖 C\'est le plus beau jour de ma vie ! Merci pour ce bonheur immense, je t\'aime tellement fort ! 🥰✨',
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
    const questionEl = document.getElementById('q-question');
    const imgEl = document.getElementById('q-image');
    const legendEl = document.getElementById('q-legend');
    const msgEl = document.getElementById('q-message');

    if (!etape) {
      if (questionEl) questionEl.textContent = CONFIG.question;
      if (imgEl) imgEl.textContent = '💌';
      if (legendEl) legendEl.textContent = '';
      if (msgEl) msgEl.textContent = '';
      return;
    }

    // Mise à jour DYNAMIQUE de la phrase / question principale
    if (questionEl && etape.question) {
      questionEl.textContent = etape.question;
      if (!etat.reducedMotion) {
        questionEl.classList.remove('pulse-text');
        void questionEl.offsetWidth; // Déclenche le reflow pour relancer l'animation
        questionEl.classList.add('pulse-text');
      }
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
    if (msgEl) {
      msgEl.textContent = etape.message;
      if (!etat.reducedMotion) {
        msgEl.style.opacity = '0';
        msgEl.style.transform = 'translateY(6px)';
        requestAnimationFrame(() => {
          msgEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          msgEl.style.opacity = '1';
          msgEl.style.transform = 'translateY(0)';
        });
      }
    }
  }

  function updateButtonStates() {
    const btnOui = document.getElementById('btn-oui');
    const btnNon = document.getElementById('btn-non');
    if (!btnOui || !btnNon) return;

    const stage = etat.tentatives;

    if (stage === 0) {
      btnNon.style.transform = '';
      btnNon.style.opacity = '1';
      btnNon.style.display = 'inline-flex';
      btnOui.style.transform = '';
      btnOui.style.width = '';
      btnOui.style.fontSize = '';
      return;
    }

    // Le bouton OUI grossit avec douceur et modération, sans jamais empiéter sur le bouton Non
    const ouiScale = 1 + Math.min(stage, 4) * 0.05;
    btnOui.style.transform = `scale(${ouiScale})`;
    btnOui.style.width = '';

    // Le bouton Non reste TOUJOURS visible, propre et bien séparé du Oui
    btnNon.style.display = 'inline-flex';
    btnNon.style.opacity = '1';

    // Léger rétrécissement progressif très doux pour marquer l'hésitation
    const nonScale = Math.max(0.85, 1 - stage * 0.02);
    const rot = (stage % 2 === 1 ? -2.5 : 2.5);
    btnNon.style.transform = `scale(${nonScale}) rotate(${rot}deg)`;
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

    const celebTitle = document.getElementById('celeb-title');
    const celebMsg = document.getElementById('celeb-message');
    const notifyBtn = document.getElementById('celeb-notify');
    const notifyText = document.getElementById('celeb-notify-text');

    if (celebTitle) celebTitle.textContent = "TU AS DIT OUI ! 🎉💖🥰";
    if (celebMsg) celebMsg.textContent = msg;

    // Préparation de l'envoi WhatsApp pour prévenir l'expéditeur
    const expName = (cfg.prenomExpediteur || '').trim();

    const messageOui = expName
      ? `Coucou ${expName} ! 💌 J'ai ouvert ta lettre et… J'AI DIT OUI ! 🎉💖🥰 Je suis tellement heureuse ! 💕✨`
      : `J'ai ouvert ta lettre et… J'AI DIT OUI ! 🎉💖🥰 Je suis tellement heureuse ! 💕✨`;

    etat.messageOui = messageOui;

    if (notifyBtn) {
      const shareText = encodeURIComponent(messageOui);
      let waUrl = `https://api.whatsapp.com/send?text=${shareText}`;
      if (cfg.telephoneExpediteur) {
        const cleanTel = cfg.telephoneExpediteur.replace(/[^0-9]/g, '');
        if (cleanTel) {
          waUrl = `https://api.whatsapp.com/send?phone=${cleanTel}&text=${shareText}`;
        }
      }
      notifyBtn.href = waUrl;
    }

    if (notifyText) {
      notifyText.textContent = expName ? `Prévenir ${expName} sur WhatsApp 💬` : `Prévenir sur WhatsApp 💬`;
    }
  }

  function renderHeartbreak(cfg) {
    const msgEl = document.getElementById('heartbreak-message');
    const waBtn = document.getElementById('heartbreak-whatsapp');
    const waText = document.getElementById('heartbreak-whatsapp-text');

    const destName = (cfg.prenomDestinataire || '').trim();
    const expName = (cfg.prenomExpediteur || '').trim();

    if (msgEl) {
      msgEl.textContent = `J'espérais tellement de tout mon être qu'on soit ensemble… Ton refus me fait mal et j'ai le cœur brisé, car mes sentiments pour toi sont sincères et profonds. Mais je respecterai toujours ta décision… Prends grand soin de toi${destName ? ', ' + destName : ''}. 🕊️🥺`;
    }

    if (waBtn) {
      const waMsg = encodeURIComponent(
        `Coucou${expName ? ' ' + expName : ''}… 🕊️\n` +
        `J'ai bien reçu ta lettre d'amour. Je voulais t'écrire pour te dire que ça m'a beaucoup touchée… Prends bien soin de toi. 🥺`
      );
      let waUrl = `https://api.whatsapp.com/send?text=${waMsg}`;
      if (cfg.telephoneExpediteur) {
        const cleanTel = cfg.telephoneExpediteur.replace(/[^0-9]/g, '');
        if (cleanTel) {
          waUrl = `https://api.whatsapp.com/send?phone=${cleanTel}&text=${waMsg}`;
        }
      }
      waBtn.href = waUrl;
    }

    if (waText && expName) {
      waText.textContent = `Dire un mot à ${expName} sur WhatsApp 💬`;
    }
  }

  function handleHeartbreak() {
    renderHeartbreak(CONFIG);
    showScreen('heartbreak');
    playSound('pop');
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

  function getLetterTextMessage(url) {
    const to = CONFIG.prenomDestinataire || 'Mon amour';
    const from = CONFIG.prenomExpediteur ? `De la part de ${CONFIG.prenomExpediteur}` : 'De la part de quelqu\'un qui t\'aime';
    const finalUrl = url || etat.generatedUrl || window.location.href;

    return (
      `💌 *UNE LETTRE D'AMOUR POUR TOI* 💌\n` +
      `───────────────────────\n` +
      `✨ *${from}*\n` +
      `💝 *Pour : ${to}*\n\n` +
      `Chère ${to},\n` +
      `J'ai scellé pour toi une lettre secrète avec une question très importante à l'intérieur… 🤫💕\n\n` +
      `Ne l'ouvre que si ton cœur bat la chamade ! 🕊️❤️\n\n` +
      `👉 *Clique ici pour ouvrir et décacheter ta lettre :*\n` +
      `${finalUrl}\n` +
      `───────────────────────\n` +
      `Scellée avec un cœur battant 💕`
    );
  }

  async function copyToClipboard(text, customToast) {
    const toastMsg = customToast || 'Copié dans le presse-papier ! 💌📋';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        showToast(toastMsg);
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
      showToast(toastMsg);
    } catch (e) {
      showToast('Erreur : impossible de copier 😢');
    }
  }

  async function shareLink(url) {
    const to = CONFIG.prenomDestinataire || 'Mon amour';
    const textMsg = getLetterTextMessage(url);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `💌 Une lettre d'amour pour ${to}`,
          text: textMsg,
          url: url,
        });
      } catch (e) {
        if (e.name !== 'AbortError') {
          await copyToClipboard(textMsg, 'Lettre complète copiée ! 💌📋');
        }
      }
    } else {
      await copyToClipboard(textMsg, 'Lettre complète copiée ! 💌📋');
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

    // BOUTON "GÉNÉRER MA LETTRE" (SaaS)
    const btnGenerate = document.getElementById('btn-generate');
    if (btnGenerate) {
      btnGenerate.addEventListener('click', () => {
        ensureAudioCtx();
        playSound('ding');

        const link = generateLink();
        const letterText = getLetterTextMessage(link);

        // Mettre à jour l'aperçu textuel de la lettre d'amour
        const letterPreviewText = document.getElementById('letter-preview-text');
        if (letterPreviewText) {
          letterPreviewText.textContent = letterText;
        }

        const shareToBadge = document.getElementById('share-to-badge');
        if (shareToBadge) shareToBadge.textContent = CONFIG.prenomDestinataire || 'toi';

        // Préparer le lien direct WhatsApp avec le message de lettre d'amour complet
        const btnWa = document.getElementById('btn-share-whatsapp');
        if (btnWa) {
          btnWa.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(letterText)}`;
        }

        // Basculer vers l'écran de partage
        showScreen('share');
        showToast('Lettre prête et scellée avec amour ! 💌✨');
      });
    }

    // Actions de l'écran de partage

    // 1. Bouton Instagram (Partage natif avec fallback presse-papier vers Instagram)
    const btnShareInsta = document.getElementById('btn-share-instagram');
    if (btnShareInsta) {
      btnShareInsta.addEventListener('click', async () => {
        ensureAudioCtx();
        playSound('pop');
        const link = etat.generatedUrl || generateLink();
        const letterText = getLetterTextMessage(link);

        if (navigator.share) {
          try {
            await navigator.share({
              title: `💌 Lettre d'amour pour ${CONFIG.prenomDestinataire}`,
              text: letterText,
              url: link,
            });
            showToast('Lettre partagée avec succès ! 💌✨');
            return;
          } catch (e) {
            if (e.name === 'AbortError') return;
          }
        }

        // Fallback mobile/desktop : copie et ouvre Instagram
        await copyToClipboard(letterText, 'Lettre d\'amour copiée ! Colle-la en DM sur Instagram 💕📸');
        setTimeout(() => {
          window.open('https://www.instagram.com/direct/inbox/', '_blank');
        }, 800);
      });
    }

    // 2. Partage universel natif (SMS, Messenger, Snapchat...)
    const btnNativeShare = document.getElementById('btn-native-share');
    if (btnNativeShare) {
      btnNativeShare.addEventListener('click', async () => {
        ensureAudioCtx();
        playSound('pop');
        const link = etat.generatedUrl || generateLink();
        const letterText = getLetterTextMessage(link);

        if (navigator.share) {
          try {
            await navigator.share({
              title: `💌 Lettre pour ${CONFIG.prenomDestinataire}`,
              text: letterText,
              url: link,
            });
            showToast('Lettre partagée ! 💌✨');
          } catch (e) {
            if (e.name !== 'AbortError') {
              await copyToClipboard(letterText, 'Lettre d\'amour complète copiée ! 💌📋');
            }
          }
        } else {
          await copyToClipboard(letterText, 'Lettre d\'amour complète copiée ! 💌📋');
        }
      });
    }

    // 3. Copier la lettre d'amour complète (bouton principal et chip)
    const copyLetterHandler = async () => {
      ensureAudioCtx();
      playSound('pop');
      const link = etat.generatedUrl || generateLink();
      const letterText = getLetterTextMessage(link);
      await copyToClipboard(letterText, 'Lettre d\'amour complète copiée ! Prête à être envoyée 💌📋');
    };

    const btnCopyShare = document.getElementById('btn-copy-share');
    if (btnCopyShare) btnCopyShare.addEventListener('click', copyLetterHandler);

    const btnCopyChip = document.getElementById('btn-copy-letter-chip');
    if (btnCopyChip) btnCopyChip.addEventListener('click', copyLetterHandler);

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

    // Actions de l'écran de célébration
    const celebNotifyInsta = document.getElementById('celeb-notify-insta');
    if (celebNotifyInsta) {
      celebNotifyInsta.addEventListener('click', async () => {
        ensureAudioCtx();
        playSound('pop');
        const msg = etat.messageOui || "J'ai dit OUI ! 🎉💖🥰 Je suis tellement heureuse ! 💕✨";

        if (navigator.share) {
          try {
            await navigator.share({
              title: "J'ai dit OUI ! 🎉💖",
              text: msg,
            });
            showToast('Réponse partagée avec amour ! 💕🎉');
            return;
          } catch (e) {
            if (e.name === 'AbortError') return;
          }
        }

        // Fallback copie et toast
        await copyToClipboard(msg, 'Message d\'amour copié ! Prêt à être envoyé sur Instagram ou SMS 💕📋');
      });
    }

    const celebCopy = document.getElementById('celeb-copy');
    if (celebCopy) {
      celebCopy.addEventListener('click', async () => {
        ensureAudioCtx();
        playSound('pop');
        const msg = etat.messageOui || "J'ai dit OUI ! 🎉💖🥰 Je suis tellement heureuse ! 💕✨";
        await copyToClipboard(msg, 'Message d\'amour copié dans le presse-papier ! 💕📋');
      });
    }

    // Actions écran de cœur brisé (refus final)
    const btnHeartbreakRetry = document.getElementById('btn-heartbreak-retry');
    if (btnHeartbreakRetry) {
      btnHeartbreakRetry.addEventListener('click', () => {
        ensureAudioCtx();
        playSound('ding');
        handleOui();
      });
    }

    const btnHeartbreakBack = document.getElementById('btn-heartbreak-back');
    if (btnHeartbreakBack) {
      btnHeartbreakBack.addEventListener('click', () => {
        ensureAudioCtx();
        playSound('pop');
        etat.tentatives = 0;
        renderQuestionScreen(CONFIG);
        showScreen('question');
        updateButtonStates();
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

    const etapes = CONFIG.etapes[CONFIG.ton] || CONFIG.etapes.mignon;

    // Si on a vu toutes les supplications douces et qu'elle clique encore sur Non :
    // On affiche l'écran touchant de cœur brisé !
    if (etat.tentatives >= etapes.length) {
      handleHeartbreak();
      return;
    }

    const stage = etat.tentatives;
    const etape = etapes[stage];

    etat.tentatives++;

    updateStageDisplay(etape);
    shakeCard();
    updateButtonStates();
    playSound('pop');
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
