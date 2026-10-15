---
description: La description, c'est un fichier qui me permet de pouvoir créer un agent qui va vérifier mes applications et les tester pour moi.
---

# Workflow : Constructeur de "Demande Romantique Interactive"

Applique les règles du projet (design fixe, architecture, sécurité). Travaille en mode Planning.

## Étape 0 : Questions (UN SEUL message, puis attends la réponse)
Pose ces 4 questions dans un seul message numéroté. Si je réponds "défaut" ou ne réponds pas, utilise les valeurs par défaut. Aucune autre question ensuite.
1. Occasion et question posée ? (défaut : "Saint-Valentin : Tu veux être ma valentine ? 🌸")
2. Prénoms destinataire / expéditeur ? (défaut : "toi" / "moi")
3. Ton : A. Mignon / B. Dramatique / C. Chaotique (défaut : Mignon)
4. Preset esthétique : A, B, C ou D (défaut : A)

## Presets
- **A "Pêche Tendre"** : fond #FFD6E0 → #FFE8D6, accent #FF5C8A, texte #3A1F2B, titres Fredoka, corps Nunito. Bonbon, cœurs, pétales.
- **B "Nuit Étoilée"** : fond #14102B → #2B1B4D, accent #FF8FB1, or #F4C95D, texte #F6EEFF, titres Baloo 2, corps Quicksand. Étoiles, lucioles.
- **C "Pop Chaos"** : fond #FFF36B, cartes blanches bordure noire 3px, ombre dure décalée, accent #FF3D81, secondaire #3D5AFE, titres Bagel Fat One, corps DM Sans. Néo-brutalisme joyeux, stickers.
- **D "Papier Vintage"** : fond #F7EFE2, accent #C2415D, sauge #7A9E7E, titres Caveat, corps Lora. Lettre d'amour, grain de papier, tampon postal.

## Spécifications fonctionnelles

### CONFIG
```js
const CONFIG = {
  question, prenomDestinataire, prenomExpediteur, telephoneExpediteur: "",
  ton: "mignon" | "dramatique" | "chaotique",
  preset: "A" | "B" | "C" | "D",
  theme: { couleurs, police },
  etapes: [ { message, image, legende } ],   // ≥ 8 étapes PAR TON
  messageFinal, imageFinale
};
```
- Chaque ton a ses ≥ 8 étapes, du plus doux au plus insistant. Mignon : tendre. Dramatique : théâtral ("mon cœur… il se brise 💔"). Chaotique : absurde et meta ("le bouton Non a démissionné").
- Le comportement du bouton suit le numéro d'étape, pas le texte.
- `image` accepte URL, data-URI ou emoji. Repli en emoji géant via `onerror` + timeout 4s.

### Bouton "Non" (machine à états)
Chaque tentative (clic, tap, Entrée/Espace) incrémente `etat.tentatives`, avec verrou anti double-clic de 250ms.

| Palier | "Non" | "OUI" |
|---|---|---|
| 1 | Rétrécit (-15%) | Grossit (+15%) |
| 2 | Rétrécit + léger décalage aléatoire | Grossit |
| 3-4 | Fuit le curseur (`pointermove`, distance < 90px) ou saute au toucher | Grossit |
| 5-6 | Quasi invisible (opacité 0.25) | Presque pleine largeur |
| 7+ | Disparaît (retiré du flux ET de l'arbre d'accessibilité) | Seule option |

- Détection tactile via `matchMedia('(hover: none)')`.
- "Non" ne sort JAMAIS de l'écran : clamp avec marge 16px, recalcul sur `resize` et `orientationchange`.
- Zone `aria-live="polite"`, message d'accueil pour lecteurs d'écran, focus sur "OUI" quand "Non" disparaît.
- "OUI" à tout moment → écran de célébration. Shake de la carte à chaque "Non".

### Personnalisation par lien
- Paramètres : `?to=&from=&q=&ton=&preset=&tel=`.
- Mode "Créer" (sans paramètre) : formulaire avec aperçu en direct, lien via `URLSearchParams`, "Copier" (`navigator.clipboard` → `execCommand` → champ sélectionnable), "Partager" via `navigator.share` si dispo.
- Préciser que les photos téléversées sont locales et NON incluses dans le lien ; proposer un champ "URL d'image" qui, lui, voyage dans le lien.

### Images et effets
- Emojis, SVG simples (cœur, ours, fleur, chat) ou images de l'utilisateur. Aucun contenu protégé.
- Téléversement : `FileReader`, compression canvas (côté max 800px, JPEG 0.8), 5 images max, rejet des non-images.
- Fond dégradé animé + ≤ 18 cœurs flottants. Final : confettis/cœurs en canvas, arrêt après ~6s, nettoyage complet.
- `prefers-reduced-motion` : désactive cœurs, fuite, shake, confettis (fondu simple), reste jouable.
- Sons désactivés par défaut, bouton 🔇/🔊 (`aria-pressed`), Web Audio créé après un geste utilisateur, volume doux.

### Écran de célébration
Message final avec prénom de l'expéditeur, image finale, compteur "Tu as essayé de dire non X fois" (pluriel correct 0/1/2+), bouton "Prévenir [expéditeur]" (`https://wa.me/<tel>?text=…` ou `https://wa.me/?text=…`, repli `sms:?&body=…`, `encodeURIComponent`), "Copier le lien", "Créer ma propre page".

## Séquence de construction
1. Génère l'**Implementation Plan** (preset → tokens, structure CONFIG, machine à états) et la **Task List**. Continue sans attendre de validation sauf blocage.
2. Écris `index.html` section par section dans l'ordre imposé.
3. Lance un serveur statique local dans le terminal (`python -m http.server`) pour tester, puis vérifie aussi l'ouverture en `file://`.

## Vérification avec le navigateur intégré (OBLIGATOIRE avant de conclure)
Teste réellement, ne suppose rien :
- [ ] Aucune erreur dans la console au chargement et pendant le parcours.
- [ ] Les 8+ paliers de chaque ton se déclenchent dans l'ordre, y compris en cliquant très vite.
- [ ] Viewport 360px de large puis paysage : "Non" ne sort jamais de l'écran, aucun scroll horizontal.
- [ ] Parcours complet au clavier seul, focus toujours visible.
- [ ] `?to=<img src=x onerror=alert(1)>` s'affiche comme texte inoffensif.
- [ ] Image cassée → emoji de secours. Photo lourde → compressée.
- [ ] Mode "Créer" : aperçu en direct, lien généré valide et fonctionnel une fois ouvert.
- [ ] Écran final : confettis puis arrêt, compteur correct, liens WhatsApp/SMS bien formés.
- [ ] `prefers-reduced-motion` émulé : animations réduites, jeu toujours possible.
- [ ] Contrastes ≥ 4.5:1 sur les 4 presets, boutons ≥ 48px.
Corrige tout échec, puis reteste.

## Rendu final
Produis le **Walkthrough** avec captures d'écran (mobile 360px, étape intermédiaire, écran final, mode Créer) et le statut de chaque case ci-dessus. Ajoute un guide de 5 à 8 lignes pour modifier textes, couleurs et images.

## Directive d'exécution
"Ne construis pas une page de demande ; construis un petit moment de joie partageable. Chaque refus doit faire sourire, chaque animation doit sembler faite à la main. Éradique tous les patterns génériques d'IA."