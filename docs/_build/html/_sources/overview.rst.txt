Vue d'ensemble
==============

Architecture générale
---------------------

Le portfolio est un site statique généré avec **Next.js 15** (App Router).
Tout le contenu est piloté par des fichiers — aucune base de données,
aucune donnée codée en dur dans les composants.

.. code-block:: text

   portfolio/
   ├── app/                         ← pages Next.js (routing)
   │   ├── layout.tsx               ← layout global (polices, ThemeProvider, SEO)
   │   ├── page.tsx                 ← page d'accueil
   │   ├── about/page.tsx           ← page À propos
   │   ├── not-found.tsx            ← page 404 globale
   │   └── projects/
   │       ├── page.tsx             ← liste des projets avec filtres
   │       └── [id]/page.tsx        ← détail d'un projet (dynamique)
   ├── components/                  ← composants réutilisables
   ├── content/projects/            ← ⭐ fichiers MDX des projets (contenu)
   ├── lib/                         ← logique métier (lecture MDX, utilitaires)
   │   ├── projects.ts              ← readProjects() + readProject(id)
   │   ├── about.ts                 ← SKILL_GROUPS + TIMELINE
   │   └── toc.ts                   ← table des matières automatique
   ├── types/project.ts             ← types TypeScript + DOMAIN_CONFIG
   ├── public/                      ← assets statiques (photo, images projets)
   ├── Dockerfile                   ← build Docker ARM64
   ├── docker-compose.yml
   └── .github/workflows/deploy.yml ← CI/CD GitHub Actions

Principe data-driven
--------------------

.. important::

   Ajouter un projet = créer un fichier ``.mdx`` + ``git push``.
   **Zéro modification de code nécessaire.**

Le flux est le suivant :

1. Tu crées ``content/projects/mon-projet.mdx``
2. Tu pousses sur ``main``
3. GitHub Actions construit et déploie automatiquement
4. Le projet apparaît sur le site

Stack technique
---------------

+------------------+------------------+
| Outil            | Version          |
+==================+==================+
| Next.js          | 15 (App Router)  |
+------------------+------------------+
| React            | 19               |
+------------------+------------------+
| TypeScript       | strict           |
+------------------+------------------+
| Tailwind CSS     | 3.4              |
+------------------+------------------+
| Framer Motion    | 12               |
+------------------+------------------+
| next-mdx-remote  | 6                |
+------------------+------------------+
| next-themes      | 0.4              |
+------------------+------------------+

Domaines disponibles
--------------------

Le site organise les projets en quatre domaines techniques.
Chaque domaine a une couleur propre utilisée partout (badges, glows, filtres).

+------------------+------------+------------------+
| Clé              | Couleur    | Label affiché    |
+==================+============+==================+
| ``cybersecurity``| #EF4444    | Cybersécurité    |
+------------------+------------+------------------+
| ``embedded``     | #22C55E    | Systèmes Emb.    |
+------------------+------------+------------------+
| ``data-science`` | #3B82F6    | Data Science     |
+------------------+------------+------------------+
| ``devsecops``    | #A855F7    | DevSecOps        |
+------------------+------------+------------------+
