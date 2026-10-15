# 💌 ROMANCE — Demande Romantique Interactive & Studio SaaS

Une application web mobile-first, élégante et ludique, permettant de composer, personnaliser et partager une demande romantique sous la forme d'une lettre d'amour scellée dans une enveloppe 3D avec un cœur battant et le fameux bouton « Non » farceur.

---

## ✨ Fonctionnalités clés

* 📮 **Studio de composition multi-étapes (SaaS)** :
  * Étape 1 : Choix des amoureux (Destinataire, Expéditeur et Numéro WhatsApp pour être prévenu).
  * Étape 2 : Question romantique personnalisable et sélection du ton (*Mignon*, *Dramatique*, *Chaotique*).
  * Étape 3 : Ambiance visuelle en temps réel (*Papier Vintage*, *Douceur Pêche*, *Nuit Étoilée*, *Pop Rétro*), photo et aperçu dynamique.
* 💌 **Enveloppe 3D interactive** : Le destinataire reçoit une enveloppe scellée d'un cœur battant. En cliquant sur le cœur, l'enveloppe s'ouvre avec un effet sonore et la lettre sort élégamment.
* 🏃‍♂️ **Bouton « Non » farceur (8 paliers)** : Rétrécissement, esquive au survol, fuite aléatoire, messages comiques et disparition totale.
* 🎉 **Célébration festive** : Explosion de confettis, messages de joie personnalisés, bouton direct WhatsApp et option « Créer ma propre page ».
* 🎵 **Effets sonores intégrés** : Synthèse sonore native via l'API Web Audio (aucun fichier audio lourd externe).
* 🔒 **Sécurité & Confidentialité** : Traitement 100% côté client, assainissement strict des paramètres URL contre les injections XSS.

---

## 🚀 Structure du projet

```text
ROMANCE/
├── index.html   # Structure HTML5 sémantique et accessible
├── style.css    # Système de design, thèmes tokens et animations 3D
├── app.js       # Logique applicative, stepper, audio synth et interaction
└── README.md    # Documentation du projet
```

---

## 💻 Utilisation locale

Ouvrez simplement `index.html` dans n'importe quel navigateur moderne, ou lancez un serveur local :

```bash
# Avec Python
python -m http.server 8080

# Ou avec Node.js npx serve
npx serve .
```

---

Fait avec ❤️ par [walidsayaogo23_tech](https://github.com/walidsayaogo23-tech).
