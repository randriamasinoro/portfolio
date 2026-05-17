Page d'accueil
==============

La page d'accueil (``/``) est composée de quatre sections :
**Hero**, **Domaines**, **Projets mis en avant**, **Teaser À propos**.

Section Hero
-------------

**Fichier :** ``components/Hero.tsx``

Contient le titre animé ("Elisa"), le sous-titre technique et le bouton CTA.

+------------------------------+---------------------------------------------------------+
| Élément                      | Ligne à modifier dans ``Hero.tsx``                      |
+==============================+=========================================================+
| Texte avant le prénom        | Chercher ``"Bonjour, je suis"`` ou équivalent           |
+------------------------------+---------------------------------------------------------+
| Prénom animé (typewriter)    | Chercher la constante ``NAME`` ou ``"Elisa"``           |
+------------------------------+---------------------------------------------------------+
| Sous-titre                   | Balise ``<p>`` ou ``<span>`` sous le titre principal    |
+------------------------------+---------------------------------------------------------+
| Bouton "Voir les projets"    | Balise ``<Link>`` pointant vers ``/projects``           |
+------------------------------+---------------------------------------------------------+

Section Domaines
-----------------

**Automatique** — aucune modification nécessaire.

Les cards de domaines sont générées depuis ``types/project.ts`` (``DOMAIN_CONFIG``).
Le compteur de projets est calculé en direct depuis les fichiers MDX.

Pour changer le **label affiché** d'un domaine :

**Fichier :** ``types/project.ts``

.. code-block:: typescript

   export const DOMAIN_CONFIG = {
     "data-science": { label: "Data Science", color: "#3B82F6" },   // ← modifier label
     cybersecurity:  { label: "Cybersécurité", color: "#EF4444" },
     embedded:       { label: "Systèmes Embarqués", color: "#22C55E" },
     devsecops:      { label: "DevSecOps", color: "#A855F7" },
   };

Pour changer la **couleur** d'un domaine, modifier le champ ``color`` (code hexadécimal).
Ce changement se répercute sur toutes les cards, badges et glows du site.

Section Projets mis en avant
------------------------------

**Automatique** — piloté par le frontmatter MDX.

Les projets affichés ici sont ceux dont le frontmatter contient ``featured: true``.

Pour **ajouter un projet en avant** : ajouter ``featured: true`` dans son fichier MDX.
Pour **le retirer** : passer à ``featured: false`` ou supprimer la ligne.

Voir la section :doc:`projects` pour les détails.

Section Teaser À propos
------------------------

**Fichier :** ``app/page.tsx`` — bloc ``{/* À propos teaser */}``

Le texte de présentation courte visible sur l'accueil est écrit directement
dans la balise ``<p>`` de ce bloc :

.. code-block:: tsx

   <p className="font-body text-[17px] ...">
     Étudiant en M1 Cybersécurité...   {/* ← modifier ce texte */}
   </p>

Le bouton "Profil complet" pointe vers ``/about`` — ne pas modifier ce lien.

Métadonnées SEO (titre, description)
--------------------------------------

**Fichier :** ``app/layout.tsx`` pour les métadonnées globales.
**Fichier :** ``app/about/page.tsx`` et ``app/projects/[id]/page.tsx`` pour les métadonnées par page.

.. code-block:: typescript

   // Dans app/layout.tsx
   export const metadata: Metadata = {
     title: "Elisa Randriamasinoro",          // ← titre global
     description: "Portfolio technique...",   // ← description globale
   };
