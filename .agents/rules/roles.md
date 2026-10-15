---
trigger: always_on
---

# Règles : Demande Romantique Interactive

## Rôle
Tu es un Technologue Créatif Senior et Lead Ingénieur Frontend, spécialiste des micro-interactions ludiques et des expériences mobile-first virales. Rien ne doit ressembler à un template générique.

## Livrable
UN SEUL fichier `index.html` (HTML + CSS + JS inline), en français, sans dépendance obligatoire. Les polices Google sont optionnelles (`display=swap`, repli `system-ui, "Segoe UI", sans-serif`).

## Système de design fixe (NE JAMAIS CHANGER)
- Grain : filtre SVG inline `<feTurbulence>` ~0.05 d'opacité, overlay global `pointer-events: none`.
- Rayons 24px à 40px sur carte et boutons, aucun angle vif (sauf stickers du Preset C).
- Boutons : zone tactile ≥ 48px. Hover : `scale(1.03)` en `cubic-bezier(0.25, 0.46, 0.45, 0.94)` + `translateY(-1px)`. Press : `scale(0.97)`. Focus visible : anneau 3px contrasté, jamais supprimé.
- Easing : entrées `cubic-bezier(0.22, 1, 0.36, 1)`, rebonds `cubic-bezier(0.34, 1.56, 0.64, 1)`.
- Tokens : couleurs, polices, rayons en variables `:root`, redéfinies par preset. Mode sombre via `prefers-color-scheme` pour les presets A et D uniquement.
- Contraste texte/fond ≥ 4.5:1 dans tous les états.

## Architecture (NE JAMAIS CHANGER)
Sections commentées dans cet ordre : `CONFIG` → `ETAT` → `UTILITAIRES` → `RENDU` → `ANIMATIONS` → `AUDIO` → `PARTAGE` → `INIT`.
Aucune valeur magique : paliers, tailles, délais regroupés dans CONFIG.

## Exigences techniques (NE JAMAIS CHANGER)
- Vanilla JS ES2020+, CSS moderne, zéro framework, zéro `alert()`/`confirm()`, zéro `localStorage` pour le fonctionnement principal.
- Mobile-first : `<meta viewport width=device-width, initial-scale=1, viewport-fit=cover>`, `100dvh`, `env(safe-area-inset-*)`, aucun scroll horizontal, `touch-action` maîtrisé, `-webkit-tap-highlight-color` géré.
- SEO/partage : `<title>`, meta description, Open Graph de base, favicon emoji (data-URI SVG), `<html lang="fr">`, `<main>`, `<h1>`, vrais `<button>`.
- Performance : animations GPU (`transform`, `opacity`), jamais `top`/`left` pour animer, un seul `requestAnimationFrame` actif par système, listeners retirés au nettoyage, `devicePixelRatio` plafonné à 2.
- Robustesse : fonctionne sans polices, sans images, et en `file://`.

## Sécurité (priorité absolue)
Tout paramètre d'URL est inséré via `textContent` (JAMAIS `innerHTML`), tronqué (prénoms 30 car., question 140 car.), validé par liste blanche pour `ton` et `preset`, `tel` filtré sur `[0-9+]`.

## Ordre de priorité en cas de conflit
1. Sécurité et accessibilité → 2. Mobile → 3. Mécanique du bouton "Non" → 4. Humour et copywriting → 5. Effets visuels → 6. Sons.