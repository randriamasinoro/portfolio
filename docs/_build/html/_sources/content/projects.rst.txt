Gérer les projets
=================

Chaque projet est un fichier ``.mdx`` dans ``content/projects/``.
C'est le seul endroit à modifier pour tout ce qui touche aux projets.

Structure d'un fichier projet
------------------------------

Chaque fichier MDX est composé de deux parties :
un **frontmatter** YAML (métadonnées) et un **corps Markdown** (contenu détaillé).

.. code-block:: yaml

   ---
   id: mon-projet                         # identifiant unique, kebab-case (= nom du fichier sans .mdx)
   title: Mon projet                      # titre affiché sur les cards et la page détail
   description: Résumé court 2 lignes.   # affiché sous le titre dans la card
   domains:                               # liste de domaines (voir tableau ci-dessous)
     - cybersecurity
     - embedded
   tags:                                  # technologies utilisées (style terminal [Python])
     - Python
     - SDR
   date: "2025"                           # année de réalisation
   github: https://github.com/…           # lien GitHub obligatoire
   demo: https://…                        # lien démo (optionnel)
   featured: true                         # apparaît sur la page d'accueil si true (optionnel)
   media:                                 # chemins d'images (optionnel)
     - /images/mon-projet/schema.png
   ---

   ## Contexte

   Description narrative du projet...

   ## Méthodologie

   - Étape 1
   - Étape 2

   ## Résultats

   Ce que tu as obtenu.

Champs frontmatter détaillés
------------------------------

.. list-table::
   :header-rows: 1
   :widths: 15 10 10 65

   * - Champ
     - Type
     - Requis
     - Description
   * - ``id``
     - string
     - ✅
     - Identifiant unique kebab-case. Doit correspondre exactement au nom du fichier (sans ``.mdx``).
   * - ``title``
     - string
     - ✅
     - Titre affiché dans la card et en haut de la page détail.
   * - ``description``
     - string
     - ✅
     - Résumé court (2 lignes max). Affiché dans la card projet.
   * - ``domains``
     - string[]
     - ✅
     - Un ou plusieurs domaines parmi : ``cybersecurity``, ``embedded``, ``data-science``, ``devsecops``.
   * - ``tags``
     - string[]
     - ✅
     - Langages et outils. Affichés comme badges monospace cliquables.
   * - ``date``
     - string
     - ✅
     - Année de réalisation (ex : ``"2025"``). Mettre entre guillemets.
   * - ``github``
     - string
     - ✅
     - URL complète du dépôt GitHub.
   * - ``demo``
     - string
     - ❌
     - URL de démonstration live (optionnel).
   * - ``featured``
     - boolean
     - ❌
     - Si ``true``, la card apparaît sur la page d'accueil dans "Projets mis en avant".
   * - ``media``
     - string[]
     - ❌
     - Chemins des images à afficher. Placer les fichiers dans ``public/images/[id]/``.

Ajouter un nouveau projet
--------------------------

.. code-block:: bash

   # 1. Créer le fichier MDX
   touch content/projects/mon-nouveau-projet.mdx

Remplir le fichier en respectant le schéma frontmatter ci-dessus,
puis écrire le contenu Markdown en dessous du ``---`` fermant.

.. code-block:: bash

   # 2. (Optionnel) Ajouter les images
   mkdir -p public/images/mon-nouveau-projet/
   cp chemin/vers/image.png public/images/mon-nouveau-projet/

.. code-block:: bash

   # 3. Vérifier en local
   npm run dev
   # Ouvrir http://localhost:3000/projects/mon-nouveau-projet

.. code-block:: bash

   # 4. Déployer
   git add content/projects/mon-nouveau-projet.mdx
   git add public/images/mon-nouveau-projet/   # si images
   git commit -m "feat: add mon-nouveau-projet"
   git push

Le pipeline CI/CD reconstruit et déploie automatiquement.

Modifier un projet existant
----------------------------

Ouvrir directement le fichier MDX correspondant dans ``content/projects/`` :

+-------------------------------+-----------------------------------------------------------+
| Projet                        | Fichier                                                   |
+===============================+===========================================================+
| Sécurité Zigbee               | ``content/projects/zigbee-security.mdx``                  |
+-------------------------------+-----------------------------------------------------------+
| Rover STM32                   | ``content/projects/rover-stm32.mdx``                      |
+-------------------------------+-----------------------------------------------------------+
| Projet bancaire               | ``content/projects/projet-bancaire.mdx``                  |
+-------------------------------+-----------------------------------------------------------+
| Classification graines        | ``content/projects/classification-graines.mdx``           |
+-------------------------------+-----------------------------------------------------------+
| DevSecOps landing             | ``content/projects/devsecops-landing.mdx``                |
+-------------------------------+-----------------------------------------------------------+
| Reverse engineering           | ``content/projects/reverse-engineering.mdx``              |
+-------------------------------+-----------------------------------------------------------+
| Cryptographie                 | ``content/projects/cryptographie.mdx``                    |
+-------------------------------+-----------------------------------------------------------+
| CAN Bus                       | ``content/projects/can-bus.mdx``                          |
+-------------------------------+-----------------------------------------------------------+

Après modification, ``git push`` suffit — le site se reconstruit.

Mettre un projet en avant sur l'accueil
----------------------------------------

Ajouter ``featured: true`` dans le frontmatter du projet :

.. code-block:: yaml

   ---
   id: zigbee-security
   title: Sécurité Zigbee — Analyse passive
   featured: true          # ← cette ligne
   ...
   ---

Pour retirer un projet de l'accueil, passer à ``featured: false`` ou supprimer la ligne.

Ajouter des images à un projet
--------------------------------

.. code-block:: bash

   # Créer le répertoire dédié au projet
   mkdir -p public/images/[id-du-projet]/

   # Déposer les images en kebab-case
   cp capture.png public/images/zigbee-security/wireshark-capture.png

Dans le corps MDX du projet :

.. code-block:: markdown

   ![Description de l'image](/images/zigbee-security/wireshark-capture.png)

.. note::

   Next.js optimise automatiquement les images au format WebP.
   Utiliser des noms en ``kebab-case`` pour les fichiers.

Éléments disponibles dans le corps MDX
----------------------------------------

En plus du Markdown standard, le corps des fichiers ``.mdx`` supporte :

**Callouts colorés** (notes, avertissements, conseils, dangers) :

.. code-block:: markdown

   <Callout type="info">Information importante.</Callout>
   <Callout type="warning">Attention à ce point.</Callout>
   <Callout type="tip">Conseil utile.</Callout>
   <Callout type="danger">Ne pas faire ceci en production.</Callout>

**Blocs de code** avec bouton copier et label de langage :

.. code-block:: markdown

   ```python
   import numpy as np
   print("Hello")
   ```

**Titres** ``## h2`` et ``### h3`` — générés automatiquement dans la table des matières.
