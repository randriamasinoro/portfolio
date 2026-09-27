cat > ~/portfolio/CLAUDE.md << 'EOF'
# Portfolio Elisa — Instructions projet
Sprints 1 → 6 terminés. Site en ligne. Phase d'amélioration continue.

## Direction design (refonte Sprint 7, v3 "sombre violet")
Validée par Elisa sur la base de captures d'un template Figma (style, pas copie) :
fond sombre neutre, un seul accent violet, sa photo détourée dans le hero,
cards de projets avec couverture typographique. "Pas trop de choses."
Skill de référence : frontend-design (plugin claude-plugins-official).
Les schémas techniques ne sont jamais la première image vue : ils vont dans les fiches.

## Concept
Site portfolio technique data-driven, modulaire et évolutif.
Double usage : vitrine recruteurs (stage de fin d'études janv. 2027, alternance envisagée) + outil personnel.

## Stack
- Framework  : Next.js 16 App Router (React 19)
- Style      : Tailwind CSS uniquement (pas de CSS custom sauf exception justifiée)
- Contenu    : MDX — fichiers dans /content/projects/
- Typage     : TypeScript strict, pas de any
- Animations : CSS uniquement (Framer Motion retiré)
- Hébergement : VPS Oracle Cloud ARM64, Docker + Nginx + GitHub Actions

## Architecture data-driven
Jamais de données hardcodées dans les composants.
Tout projet vient d'un fichier MDX lu par Next.js.
Ajouter un projet = créer un fichier MDX + git push. Zéro modification de code.

## Schéma projet (frontmatter MDX obligatoire)
id          : string    -- identifiant unique kebab-case
title       : string    -- titre affiché
description : string    -- résumé court 2 lignes max
domains     : string[]  -- valeurs valides ci-dessous
tags        : string[]  -- technologies utilisées
date        : string    -- année YYYY
github      : string    -- URL GitHub
demo?       : string    -- URL démo optionnel
media?      : string[]  -- chemins images optionnel
featured?   : boolean   -- affiché dans "Projets choisis" sur l'accueil
order?      : number    -- position dans la sélection (1 = premier, le plus mémorisé)
cover?      : string    -- visuel de la vitrine (sinon media[0]) ; SVG accepté

## Domaines valides
"data-science" | "cybersecurity" | "embedded" | "devsecops"
Extensible sans refonte — ajouter une valeur à la liste suffit.

## Projets à intégrer
zigbee-security        → [cybersecurity, embedded]
rover-stm32            → [embedded]
classification-graines → [data-science]
devsecops-landing      → [devsecops, cybersecurity]
can-bus                → [embedded, cybersecurity]
health-hub             → [embedded]
yocto-home-automation  → [embedded]
vhdl-fpga              → [embedded]
forensique-usb         → [cybersecurity]
reverse-engineering    → [cybersecurity]  (brouillon vide, en attente des sources)

## Design system (dark par défaut, mode clair disponible)

Thème piloté par next-themes (darkMode: "class", defaultTheme "dark").
Couleurs = variables CSS dans app/globals.css (:root clair, .dark sombre),
exposées en tokens Tailwind (bg-bg, bg-surface, text-fg, text-fg-2, text-fg-muted,
border-border, bg-accent, text-accent-ink, bg-accent-deep, text-watermark...).
Jamais de hex dans un composant (exception : écran d'instrument UartTrace).

### Palette sombre (.dark)
bg #161616, surface #1E1E1F, surface-2 #262628, border #303033 / #48484D
fg #F2F2F3, fg-2 #BDBDC3, fg-muted #8E8E96
accent #A43BFF (grands textes, boutons), accent-ink #C27CFF (liens, petits textes),
accent-deep #4A1F6E (bloc derrière la photo), watermark #211A27 (mot en filigrane)

### Domaines (types/project.ts, DOMAIN_CONFIG : trace + ink)
cybersecurity rouge --ch1, embedded turquoise --ch2, data ambre --ch3, devsecops bleu --ch4
Utilisés pour l'étiquette des cards et le halo de la couverture.

### Typographie
Interface et titres : B612 (police Airbus pour écrans de cockpit), police du body
Textes longs des fiches : Source Serif 4 (classe font-body sur le contenu MDX)
Code : JetBrains Mono (B612 Mono dessine les parenthèses presque carrées, trompeur dans du code)

### Mise en page
  - Accueil : hero ("Bonjour, je m'appelle Elisa" dans un cadre, photo détourée
    public/photo-detouree.png sur bloc violet, mot "EMBARQUÉ" en filigrane),
    puis projets choisis (featured + order : 1 card large, puis grille 2 colonnes),
    puis encart disponibilité + "M'écrire"
  - Projets : titre avec halos flous, onglets de domaine (Tous / ...), recherche,
    grille de cards 3 colonnes (4 en 2xl), halos flous sur toute la largeur de l'écran
  - Card : couverture typographique (frontmatter `label`, sinon tags[0]) sur fond
    sombre avec halo du domaine ; `cover` seulement pour une vraie belle photo
  - Fiche projet : colonne gauche sticky (fiche + sommaire), texte serif à droite
  - À propos : bio, panneau UART interactif, compétences, formation, certifications
  - Pas de carrousel

### Lois UX appliquées (lawsofux.com)
  - Fitts : cibles cliquables >= 40px
  - Hick / Miller : un bouton principal, 4 technos max par card
  - Position : ordre des projets choisis réglé par `order`
  - Postel : recherche insensible aux accents et à la casse
  - Apogée-fin : l'accueil se termine sur la disponibilité + "M'écrire"
  - Jakob : logo à gauche, menu à droite, lien actif souligné

### Rédaction (textes du site et des MDX)
  - Première personne, phrases courtes, faits vérifiables (chiffres, outils, résultats)
  - Dire aussi ce qui n'a pas marché et les limites
  - Pas de tiret cadratin (—), pas de gras au milieu d'une phrase
  - Formules interdites : "à la croisée de", "au-delà de", "passionné(e)",
    "de bout en bout", "robuste", "plonger dans", "n'est pas seulement X mais Y",
    énumérations en trois adjectifs
  - Ne jamais inventer un fait absent des sources

## Composants clés
NavBar        : logo "E" + nom, menu à droite, lien actif en violet souligné
Footer        : contact + lien vers le code source du site
UartTrace     : panneau analyseur logique, trame UART 8N1 interactive (page À propos)
ProjectCard   : card projet (couverture typographique, domaines, titre, résumé, technos)
DomainBadge   : libellé du domaine avec repère à la couleur de sa voie
FilterBar     : onglets de domaine + recherche + technos actives + compteur
TableOfContents : sommaire de la colonne latérale (lg+)
CodeBlock     : bloc code sombre arrondi, coloration Shiki au build (rehype-pretty-code,
                thème github-dark-default), bouton copier en icône
Callout       : note avec filet gauche à la couleur d'une voie

## Conventions code
- Composants    : PascalCase (ProjectCard.tsx)
- Fichiers pages : kebab-case
- Props         : toujours typées TypeScript
- Accessibilité : aria-label sur tous les boutons icônes
- Pas de any TypeScript

## Structure des dossiers
portfolio/
├── app/
│   ├── page.tsx                -- Home
│   ├── projects/
│   │   ├── page.tsx            -- liste projets avec filtres
│   │   └── [id]/page.tsx       -- détail projet dynamique
│   └── about/page.tsx
├── components/                 -- composants réutilisables
├── content/projects/           -- fichiers MDX projets
├── lib/                        -- fonctions utilitaires (lecture MDX, filtres)
├── types/                      -- types TypeScript partagés
└── public/                     -- images et assets

## Agents disponibles

### @dev
Fichier : .claude/agents/dev.md
Rôle : écrire et modifier le code (composants, pages, config)
Utiliser : pour toute création ou modification de code

### @review
Fichier : .claude/agents/review.md
Rôle : valider chaque sprint avant de passer au suivant
Règle : aucun sprint ne commence sans sa validation ✅

### @doc
Fichier : .claude/agents/doc.md
Rôle : mettre à jour CLAUDE.md et documenter les composants
Utiliser : après chaque composant créé, après chaque sprint validé

## Ordre de travail par sprint
1. @dev code les tâches du sprint
2. @review valide avec sa checklist complète
3. @doc met à jour la documentation
4. Sprint suivant uniquement si @review valide ✅

## Sprints SCRUM

### Sprint 1 — Fondation (EN COURS)
Objectif : site qui tourne en local, pages vides, navigation fonctionnelle
Tâches :
  - Init Next.js 14 + Tailwind + TypeScript
  - Installation Framer Motion + polices (Syne, IBM Plex Sans, JetBrains Mono)
  - Configuration Tailwind avec la palette couleurs ci-dessus
  - Structure dossiers complète
  - NavBar + layout global dark mode
  - Pages vides : Home / Projects / About
  - Routing fonctionnel entre toutes les pages
Validation :
  - npm run dev démarre sans erreur
  - Navigation entre pages sans erreur console
  - Fond #0A0A0F visible, NavBar présente partout
  - npm run build réussi

### Sprint 2 — Système de projets
Objectif : projets visibles depuis les fichiers MDX
Tâches :
  - Configuration next-mdx-remote
  - Type Project TypeScript selon schéma ci-dessus
  - Fonction readProjects() dans lib/
  - 2 fichiers MDX de test créés
  - Composant ProjectCard avec glow hover
  - Composants DomainBadge + TechTag
  - Page /projects affiche la liste
Validation :
  - 2 projets visibles en /projects depuis les fichiers MDX
  - Aucune donnée hardcodée dans les composants
  - Hover glow fonctionne sur les cards
  - npm run build réussi

### Sprint 3 — Filtres et navigation
Objectif : filtrage fonctionnel par domaine et tags
Tâches :
  - Composant FilterBar
  - Logique filtrage via paramètres URL
  - Tags cliquables
  - Recherche globale
  - Compteur projets
Validation :
  - ?domain=cyber affiche uniquement les projets cyber
  - URL mise à jour lors du filtrage
  - Compteur correct après filtrage
  - Recherche retourne les bons résultats

### Sprint 4 — Pages projets détaillées
Objectif : chaque projet accessible individuellement
Tâches :
  - Page [id]/page.tsx dynamique
  - Rendu MDX complet (titres, code, images, callouts)
  - CodeBlock avec bouton copier
  - Sidebar table des matières sticky
  - 404 propre si projet inexistant
  - Tous les projets réels ajoutés en MDX
Validation :
  - /projects/zigbee-security affiche le bon contenu
  - CodeBlock fonctionne avec bouton copier
  - 404 sur /projects/inexistant
  - Tous les projets réels présents

### Sprint 5 — UI/UX et animations
Objectif : design final fidèle à la référence, responsive, fluide
Tâches :
  - Animations Framer Motion sur entrées de page
  - Effet typewriter sur le titre hero
  - Glow hover cards par couleur domaine
  - Grille de points en background
  - Responsive mobile complet (375px)
  - Optimisation performance
Validation :
  - Lighthouse Performance > 90
  - Lighthouse Accessibility > 90
  - Responsive mobile sans scroll horizontal
  - Animations ne bloquent pas le scroll
  - Design fidèle à la référence visuelle

### Sprint 6 — Déploiement CI/CD
Objectif : site en ligne sur le VPS
Tâches :
  - Dockerfile ARM64
  - GitHub Actions : build image + push + deploy VPS
  - Configuration Nginx reverse proxy
  - HTTPS via certbot
Validation :
  - Docker build ARM64 réussi
  - GitHub Actions pipeline vert
  - Site accessible en HTTPS sur le domaine
  - Nginx répond correctement
  - Aucun secret exposé dans les logs

## Amélioration continue (après Sprint 6)

### Ajout d'un projet
1. Créer /content/projects/[id].mdx
2. Respecter le schéma frontmatter
3. git push → CI/CD rebuild automatiquement
4. Aucune modification de code nécessaire

### Modification d'un projet existant
1. Éditer le fichier MDX correspondant
2. git push → rebuild automatique

### Amélioration d'un composant
1. @dev fait la modification
2. @review valide (checklist allégée)
3. @doc met à jour si l'interface change

### Ajout d'un nouveau domaine
1. Ajouter la valeur dans types/ + CLAUDE.md
2. Définir sa couleur dans tailwind.config.ts
3. Aucune autre modification nécessaire

### Ajout d'une nouvelle page
1. Sprint dédié avec tâches et critères de validation
2. Même processus : @dev → @review → @doc

## Règle générale
Toute modification passe par : @dev → @review → @doc
Pas de code non validé en production.


## Schémas (TikZ -> SVG)

Jamais de schéma en ASCII dans un MDX : tous les schémas sont des figures TikZ.
- Sources : diagrams/src/<nom>.tex, préambule commun diagrams/preamble.tex
- 1re ligne de chaque source : "% out: public/images/<id-projet>/<nom>.svg"
- Build : ./diagrams/build.sh (tout) ou ./diagrams/build.sh <motif> (un seul)
  Prérequis : pdflatex (tikz, standalone, lmodern) et pdftocairo
- Style : Latin Modern Sans, fond blanc arrondi, boîtes pastel à coins arrondis
- Couleurs à sens fixe : violet = ce que j'ai écrit, turquoise = embarqué,
  bleu = infrastructure, rose = sécurité/blocage, jaune = stockage,
  pêche = utilisateurs, gris = briques existantes, vert = succès
- Élément simulé ou non testé : bordure en pointillés (style simulated)
- Dans le MDX : ![légende descriptive](/images/<id>/<nom>.svg) ; la figure est
  cliquable pour l'ouvrir en grand (lisibilité mobile)

## Gestion des images

### Emplacement
Toutes les images dans /public/images/[id-projet]/
Exemple : /public/images/zigbee-security/setup.png

### Nommage
kebab-case obligatoire : zigbee-capture.png, schema-architecture.png

### Dans le frontmatter MDX
media: [/images/zigbee-security/setup.png, /images/zigbee-security/capture.png]

### Dans le corps MDX
![Description claire de l'image](/images/zigbee-security/schema.png)
Toujours mettre une description (accessibilité + SEO)

### Formats acceptés
- PNG : screenshots, schémas, captures terminal
- JPG : photos hardware
- SVG : diagrammes et schémas (préféré quand possible)
- WebP : images optimisées (converti automatiquement par Next.js)

### Optimisation
Next.js optimise automatiquement via le composant Image.
@dev doit utiliser next/image et non la balise img HTML :
  import Image from 'next/image'
  <Image src="/images/..." alt="description" width={800} height={400} />

### Ce qu'on peut mettre comme images
- Screenshots Wireshark (captures Zigbee, CAN)
- Photos hardware (ESP32, nRF52840, STM32)
- Schémas d'architecture
- Graphiques résultats ML (matplotlib, Power BI)
- Captures terminal
- Diagrammes de flux

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
