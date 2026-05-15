cat > ~/portfolio/CLAUDE.md << 'EOF'
# Portfolio Elisa — Instructions projet
mai 2026 — Sprint 1 EN COURS

## Référence design visuelle
URL : https://api.anthropic.com/v1/design/h/pHdmt2gvWCht4YNZavHfVw?open_file=ui_kits%2Fportfolio%2Findex.html
Ce fichier est la référence visuelle (layout, animations, interactions).
Ne pas copier son code — implémenter avec notre stack définie ci-dessous.

## Concept
Site portfolio technique data-driven, modulaire et évolutif.
Double usage : vitrine recruteurs (alternance ENSIBS sept. 2026) + outil personnel.

## Stack
- Framework  : Next.js 14 App Router
- Style      : Tailwind CSS uniquement (pas de CSS custom sauf exception justifiée)
- Contenu    : MDX — fichiers dans /content/projects/
- Typage     : TypeScript strict, pas de any
- Animations : Framer Motion
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

## Domaines valides
"data-science" | "cybersecurity" | "embedded" | "devsecops"
Extensible sans refonte — ajouter une valeur à la liste suffit.

## Projets à intégrer
zigbee-security        → [cybersecurity, embedded]
rover-stm32            → [embedded]
projet-bancaire        → [data-science]
classification-graines → [data-science]
devsecops-landing      → [devsecops, cybersecurity]
reverse-engineering    → [cybersecurity]
cryptographie          → [cybersecurity]
can-bus                → [embedded, cybersecurity]

## Design system (dark mode uniquement)

### Palette couleurs
Fond principal   : #0A0A0F
Surface cards    : #12121A
Bordures         : #1E1E2E
Texte principal  : #E8E8F0
Texte secondaire : #6B7280
Accent global    : #2D7DD2

Couleurs domaines :
  data-science  : #3B82F6
  cybersecurity : #EF4444
  embedded      : #22C55E
  devsecops     : #A855F7

### Typographie
Titres    : Syne — bold, impactant
Corps     : IBM Plex Sans — lisibilité technique
Code/tags : JetBrains Mono — style terminal
Interdits : Inter, Roboto, Arial, Helvetica

### Animations et interactions
Respecter les animations et interactions du fichier design de référence.
Principes généraux :
  - Transitions : 200–300ms ease-out
  - Entrée de page : fade + translateY staggered
  - Hover cards : glow couleur du domaine + légère élévation
  - Titres hero : effet typewriter au chargement
  - Scroll : animations déclenchées à l'entrée dans le viewport
  - Mobile : animations réduites si impact sur performance

### Effets visuels
  - Grille de points subtile en background (style circuit imprimé)
  - Glow léger sur les cards au hover (couleur = couleur du domaine)
  - Badge tags style monospace avec bordure colorée
  - Bordures cards : 1px solid #1E1E2E, radius max 8px

### Interdits design
  - Gradients violets sur fond blanc
  - Glassmorphism excessif
  - Animations décoratives sans utilité
  - Rounded corners > 8px sur les cards
  - Illustrations génériques

## Composants clés
NavBar        : navigation fixe, indicateur page active
ProjectCard   : card projet avec glow hover domaine
DomainBadge   : badge coloré par domaine
TechTag       : badge monospace style terminal [Python]
FilterBar     : filtres domaines + tags + compteur
ProjectDetail : page détail avec sidebar sticky
SectionTitle  : titre section avec accent coloré
CodeBlock     : bloc code avec bouton copier
Callout       : note colorée info/warning/tip

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