Stratégie SEO
=============

Documentation complète du référencement (SEO) du portfolio **sinoro.fr**.

Objectif : être trouvé par les recruteurs sur des recherches liées à
**cybersécurité embarquée** et **data science**, et bien apparaître quand on
cherche le nom *Sehenonirina Elisa Randriamasinoro*.

.. note::

   On ne rank pas sur un mot générique comme « data » ou « embarqué »
   (millions de pages en concurrence). Les gains réels sont sur le **nom
   propre** et les **longues traînes** (« stage cybersécurité embarqué
   Lorient », « reverse engineering firmware ENSIBS »).


Les 3 piliers (référentiel Google)
----------------------------------

.. list-table::
   :header-rows: 1
   :widths: 20 50 30

   * - Pilier
     - But
     - État
   * - **Technique**
     - Google peut explorer et lire le site
     - ✅ Fait
   * - **Contenu (E-E-A-T)**
     - Satisfaire l'internaute, prouver l'expertise
     - ✅ En place, à nourrir
   * - **Hors-page**
     - Notoriété via backlinks
     - 🔲 Action manuelle


To-do list
----------

Fait (dans le code)
~~~~~~~~~~~~~~~~~~~~~

- ✅ **sitemap.xml** généré automatiquement (``next-sitemap``)
- ✅ **robots.txt** généré, autorise l'indexation
- ✅ **Métadonnées** complètes (title, description) par page
- ✅ **Canonical par page** (corrige un bug critique d'héritage)
- ✅ **OpenGraph + Twitter Card** (aperçus sociaux)
- ✅ **Image OG dynamique** 1200×630 (police Syne bundlée)
- ✅ **JSON-LD** : Person, WebSite, TechArticle, BreadcrumbList
- ✅ **H1 unique** sur chaque page (corrigé sur l'accueil)
- ✅ **Contenu rendu côté serveur** (le nom n'était plus vide dans le HTML)
- ✅ **llms.txt** (référencement par les IA / GEO)
- ✅ **manifest.webmanifest** + ``theme-color``
- ✅ **Maillage interne** : « Projets similaires » + signature auteur
- ✅ **Longueurs optimisées** : title ≤ 60, description ≤ 160
- ✅ **Performance** : Framer Motion supprimé, animations en CSS (LCP ↓)
- ✅ **HTTPS** (Traefik + Let's Encrypt sur le VPS)

À faire manuellement (hors code)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- 🔲 **Google Search Console** : soumettre ``sitemap.xml``
- 🔲 **Search Console** : « Inspection d'URL » → Demander l'indexation de l'accueil
- 🔲 **Backlinks** : mettre ``sinoro.fr`` dans le profil **LinkedIn**
- 🔲 **Backlinks** : mettre ``sinoro.fr`` dans le profil **GitHub** (champ website)
- 🔲 **Backlinks** : lien dans les README des repos GitHub
- 🔲 **Backlinks** : demander un lien dans un annuaire **UBS / ENSIBS**
  (domaine ``.fr`` académique = très fort)
- 🔲 (Optionnel) **Analytics** : Umami auto-hébergé sur le VPS
- 🔲 **Suivi** mensuel dans Search Console (pages indexées, requêtes)

À NE PAS faire
~~~~~~~~~~~~~~~

- ❌ **Acheter des backlinks** (sites type ``best-seo-domains.com``) → pénalité Google
- ❌ **Bourrage de mots-clés** → considéré comme spam
- ❌ Se fier à la balise ``meta keywords`` → **ignorée par Google** (gardée, inoffensive)
- ❌ Viser un nombre de mots « magique » → écrire ce qui est utile, point


Solutions techniques (détail par fichier)
-----------------------------------------

``next-sitemap.config.js`` — Sitemap & robots
   Génère ``public/sitemap.xml`` et ``public/robots.txt`` à chaque build via le
   script ``postbuild`` dans ``package.json``. Priorités : accueil ``1.0``,
   ``/projects`` ``0.9``, projets & about ``0.8``. ``exclude`` retire les routes
   techniques (``/opengraph-image``, ``/manifest.webmanifest``…).

   .. warning::

      ``public/sitemap.xml`` et ``public/robots.txt`` sont **générés** : ne
      jamais les éditer à la main, ils sont écrasés à chaque build. Toute modif
      passe par ``next-sitemap.config.js``.

``app/layout.tsx`` — Métadonnées globales
   ``metadataBase``, ``title`` (default + template), ``description``,
   ``openGraph``, ``twitter``, ``robots`` (index/follow), ``alternates.canonical``
   pour l'accueil, ``viewport.themeColor`` adaptatif clair/sombre.

``app/about/page.tsx`` et ``app/projects/page.tsx``
   Chaque page exporte ses propres ``metadata`` avec **son canonical** et son
   OpenGraph.

``app/projects/[id]/page.tsx`` — Pages projets dynamiques
   ``generateMetadata()`` : title, description, **canonical par projet**,
   keywords (tags + domaines), OpenGraph ``type: article``. Signature auteur
   liée à ``/about`` (E-E-A-T) + section « Projets similaires » (maillage).

``components/JsonLd.tsx`` — Données structurées globales
   Schéma **Person** (nom, ``alumniOf``, ``knowsAbout``, ``sameAs`` GitHub +
   LinkedIn, ``seeks``) et schéma **WebSite**.

``components/ProjectJsonLd.tsx`` — Données structurées projet
   **TechArticle** (titre, description, date ISO, image, auteur, repo GitHub) et
   **BreadcrumbList** (fil d'Ariane).

``app/opengraph-image.tsx`` — Image de partage social
   Image 1200×630 (fond noir, nom, badges domaines) via ``next/og``. Police
   **Syne** bundlée dans ``public/fonts/`` (pas de ``fetch`` réseau, sinon le
   build Docker échoue).

``app/llms.txt/route.ts`` — Référencement IA (GEO)
   Résumé structuré du site au format `llmstxt.org <https://llmstxt.org>`_, lu
   par ChatGPT, Perplexity, etc.

``app/manifest.ts`` — Manifest PWA
   Nom, couleurs, catégories — signal mobile.


Techniques SEO appliquées (et le « pourquoi »)
----------------------------------------------

Canonical par page
   **Problème rencontré** : ``canonical: "/"`` défini dans le layout racine était
   **hérité par toutes les pages** → ``/about``, ``/projects`` et tous les projets
   déclaraient ``canonical = sinoro.fr``, disant à Google « ces pages sont des
   doublons de l'accueil ». Ça empêchait l'indexation des pages projets.
   **Solution** : chaque page définit son propre ``alternates.canonical``.

Contenu rendu côté serveur (SSR)
   **Problème** : le nom « Elisa » du Hero était animé par un typewriter JS qui
   démarrait **vide**. Le HTML servi contenait un titre vide → Google et les IA
   voyaient un H1 sans contenu (« contenu rendu : 0% »).
   **Solution** : nom rendu en dur côté serveur, présent dès le 1er octet HTML.

H1 sémantique riche
   Le H1 de l'accueil contient le **nom complet + domaines** (via un ``<span>``
   ``sr-only`` pour le SEO/lecteurs d'écran) ; la version visuelle affiche juste
   « Elisa ». Un seul H1 par page ; sous-titres en H2/H3.

E-E-A-T
   *(Experience, Expertise, Authoritativeness, Trust)* — **Qui** : signature
   auteur sur chaque projet + page ``/about`` avec bio. **Quoi** : projets
   techniques **réels** (preuve d'expertise originale). Schéma ``Person`` reliant
   identité, formation et compétences.

Maillage interne
   Les pages projets étaient des culs-de-sac. Ajout de « Projets similaires »
   (même domaine → clusters thématiques), signature auteur → ``/about``, et fil
   d'Ariane. Règle : **textes d'ancrage descriptifs** (titre du projet, pas
   « cliquez ici »).

Longueurs des balises
   ``<title>`` 50–60 car. · ``meta description`` 120–160 car. · ``og:title``
   ≤ 60 · ``twitter:title`` ≤ 70. Choix assumé : garder le **nom complet** dans
   le title, slogan raccourci en « Cybersécurité & Data ».

URLs propres
   ``/projects/zigbee-security`` (descriptif) plutôt qu'un identifiant aléatoire.


Performance & Core Web Vitals
-----------------------------

La vitesse est un **critère de classement Google**.

.. list-table::
   :header-rows: 1
   :widths: 35 30 35

   * - Métrique
     - Seuil « bon »
     - Le portfolio
   * - **LCP** (Largest Contentful Paint)
     - < 2,5 s
     - ~2,2 s ✅
   * - **CLS** (décalage visuel)
     - < 0,1
     - 0 ✅
   * - **TBT / INP** (réactivité)
     - < 200 ms
     - ~50 ms ✅
   * - **FCP**
     - < 1,8 s
     - 0,8 s ✅

Optimisations appliquées :

- **Framer Motion supprimé** entièrement du bundle client (JS lourd qui bloquait
  le thread principal et retardait le LCP de ~2 s).
- Animations d'entrée réécrites en **CSS** (``animate-fade-up``,
  ``animate-fade-down`` dans ``globals.css``) → s'exécutent dès le 1er rendu,
  sans attendre le JS.
- **Typewriter retiré** : le nom s'affiche instantanément (curseur clignotant
  conservé en CSS).
- ``StaggerList`` (code mort) supprimé.
- Polices via ``next/font`` avec ``display: swap``.
- Images via ``next/image`` (WebP automatique), attribut ``alt`` systématique.

.. tip::

   **Pourquoi les animations CSS battent le JS ici** : un composant Framer Motion
   rend son état initial (``opacity: 0``) dans le HTML serveur → le contenu reste
   **invisible** jusqu'à l'hydratation JS. Une animation CSS peint et anime le
   contenu immédiatement.


Techniques de test
------------------

Test rapide en ligne de commande
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   # Pages accessibles ?
   for p in "" about projects projects/zigbee-security; do
     curl -s -o /dev/null -w "/$p → %{http_code}\n" "https://sinoro.fr/$p"
   done

   # robots.txt et sitemap
   curl -s https://sinoro.fr/robots.txt
   curl -s https://sinoro.fr/sitemap.xml | grep -c "<url>"

   # Vérifier les balises d'une page
   curl -s https://sinoro.fr/ | grep -oE '<title>[^<]*</title>'
   curl -s https://sinoro.fr/ | grep -oE 'rel="canonical" href="[^"]*"'
   curl -s https://sinoro.fr/ | grep -oE '"@type":"[^"]*"' | sort -u

Lighthouse
~~~~~~~~~~~

.. code-block:: bash

   npx lighthouse@12 https://sinoro.fr/ \
     --only-categories=performance,accessibility,seo,best-practices \
     --chrome-flags="--headless --no-sandbox" \
     --view

Objectifs : **SEO 100**, Performance > 90, Accessibilité > 90.

Outils en ligne (après chaque déploiement)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 35 40

   * - Outil
     - URL
     - Ce qu'il teste
   * - **Rich Results Test**
     - search.google.com/test/rich-results
     - Données structurées (Person, Article, Breadcrumb)
   * - **LinkedIn Post Inspector**
     - linkedin.com/post-inspector
     - Aperçu social (image OG, titres)
   * - **OpenGraph.xyz**
     - opengraph.xyz
     - Aperçu social rapide
   * - **PageSpeed Insights**
     - pagespeed.web.dev
     - Core Web Vitals (labo + terrain)
   * - **Search Console**
     - search.google.com/search-console
     - Indexation réelle, requêtes, erreurs

Checklist post-déploiement
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. ``npm run build`` réussit (génère sitemap + robots)
2. Lighthouse SEO = 100
3. Rich Results Test : Person + TechArticle + Breadcrumb détectés, 0 erreur
4. LinkedIn Inspector : image OG s'affiche, titres non tronqués
5. Search Console : sitemap « Réussite », pages en cours d'indexation


Maintenance
-----------

Ajouter un projet
   1. Créer ``/content/projects/[id].mdx`` (respecter le frontmatter).
   2. ``git push`` → sitemap, JSON-LD, maillage et image OG se mettent à jour
      **automatiquement**. Aucune modification de code SEO nécessaire.

Délais réalistes
   L'indexation Google prend **3 à 10 jours** après soumission du sitemap. Le
   classement sur le nom propre vient en premier, les longues traînes ensuite.
   Le SEO est un travail de **fond et de durée**, pas instantané.

Suivi mensuel (Search Console)
   **Pages** (URLs indexées) · **Performances** (requêtes, position moyenne,
   CTR) · corriger les erreurs d'exploration signalées.
