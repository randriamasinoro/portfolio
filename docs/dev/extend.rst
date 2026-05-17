Étendre le site
================

Ajouter un nouveau domaine
---------------------------

Les domaines sont définis en un seul endroit. Ajouter un domaine = modifier deux fichiers.

**Étape 1 — Déclarer le type et la couleur**

Fichier : ``types/project.ts``

.. code-block:: typescript

   export type Domain = "data-science" | "cybersecurity" | "embedded" | "devsecops" | "mon-domaine";

   export const DOMAIN_CONFIG = {
     // ... existants ...
     "mon-domaine": { label: "Mon Domaine", color: "#F59E0B" },
   };

**Étape 2 — Utiliser le domaine dans un projet MDX**

.. code-block:: yaml

   domains:
     - mon-domaine

Le domaine apparaît automatiquement dans les filtres, les badges et les cards.

Aucune autre modification n'est nécessaire.

Changer les couleurs du design
--------------------------------

Toutes les couleurs sont des variables CSS définies dans ``app/globals.css``.

.. code-block:: css

   :root {
     --bg: #F8F9FA;         /* fond en mode light */
     --accent: #2D7DD2;     /* couleur d'accentuation globale */
   }

   .dark {
     --bg: #0A0A0F;         /* fond en mode dark */
     --accent: #2D7DD2;
   }

Modifier une variable ici change la couleur partout sur le site.

Changer les polices
--------------------

Les polices sont déclarées dans ``app/layout.tsx`` via ``next/font/google`` :

.. code-block:: typescript

   const syne = Syne({ subsets: ["latin"], variable: "--font-display" });
   const ibmPlexSans = IBM_Plex_Sans({ ... variable: "--font-body" });
   const jetbrainsMono = JetBrains_Mono({ ... variable: "--font-mono" });

Pour changer une police :

1. Importer la nouvelle police depuis ``next/font/google``
2. Remplacer l'import existant
3. Conserver le même nom de variable CSS (``--font-display``, etc.)

Ajouter une nouvelle page
--------------------------

1. Créer ``app/ma-page/page.tsx``
2. Ajouter le lien dans ``components/NavBar.tsx`` (liste ``NAV_LINKS``)
3. Tester en local avec ``npm run dev``

Modifier la navigation
-----------------------

**Fichier :** ``components/NavBar.tsx``

Chercher la constante ``NAV_LINKS`` (ou la liste des liens) et modifier les entrées.

Exemple de structure :

.. code-block:: typescript

   const NAV_LINKS = [
     { href: "/", label: "Accueil" },
     { href: "/projects", label: "Projets" },
     { href: "/about", label: "À propos" },
     // Ajouter ici une nouvelle entrée
   ];

Modifier les métadonnées SEO
-----------------------------

**Métadonnées globales** (titre et description par défaut) :

Fichier : ``app/layout.tsx``

.. code-block:: typescript

   export const metadata: Metadata = {
     title: { default: "Elisa Randriamasinoro", template: "%s | Elisa" },
     description: "Portfolio technique...",
     openGraph: { ... },
   };

**Métadonnées par page** :

Chaque page peut surcharger les métadonnées globales en exportant sa propre constante ``metadata``.
C'est déjà fait pour ``/about`` et chaque page projet ``/projects/[id]``.
