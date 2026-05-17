Test en local
=============

Prérequis
---------

- **Node.js 24** ou supérieur
- **npm** (inclus avec Node.js)

.. code-block:: bash

   # Vérifier les versions
   node --version   # doit afficher v24.x.x
   npm --version

Installation des dépendances
------------------------------

.. code-block:: bash

   cd ~/portfolio
   npm install

À faire une seule fois après le clonage du dépôt.

Démarrer le serveur de développement
--------------------------------------

.. code-block:: bash

   npm run dev

Le site est accessible sur **http://localhost:3000**.

Le serveur se recharge automatiquement à chaque modification de fichier.
Les fichiers MDX dans ``content/projects/`` sont pris en compte sans redémarrer.

Vérifier le build de production
---------------------------------

Avant de pousser sur ``main``, vérifier que le build production réussit :

.. code-block:: bash

   npm run build

Si le build échoue, corriger les erreurs TypeScript/ESLint avant de pousser.

.. note::

   Le build production est plus strict que le mode développement.
   Une erreur TypeScript ignorée en dev bloquera le build.

Audit de sécurité
------------------

.. code-block:: bash

   npm audit --omit=dev --audit-level=critical

Cette commande vérifie les dépendances de production uniquement.
Elle est exécutée automatiquement par le pipeline CI/CD.

Linter
-------

.. code-block:: bash

   npm run lint

Vérifier qu'aucune erreur ESLint n'est présente avant de pousser.

Résumé des commandes de développement
---------------------------------------

+--------------------------------------+--------------------------------------------------+
| Commande                             | Action                                           |
+======================================+==================================================+
| ``npm run dev``                      | Serveur de développement (http://localhost:3000) |
+--------------------------------------+--------------------------------------------------+
| ``npm run build``                    | Build de production (vérifie TypeScript + ESLint)|
+--------------------------------------+--------------------------------------------------+
| ``npm run lint``                     | Linter ESLint seul                               |
+--------------------------------------+--------------------------------------------------+
| ``npm audit --omit=dev``             | Audit sécurité dépendances prod                  |
| ``--audit-level=critical``           |                                                  |
+--------------------------------------+--------------------------------------------------+

Test Docker en local (optionnel)
---------------------------------

Pour simuler exactement le comportement du VPS :

.. code-block:: bash

   # Construire l'image (ARM64 pour Oracle Cloud)
   docker build --platform linux/arm64 -t portfolio .

   # Lancer le container
   docker run --platform linux/arm64 -p 3000:3000 portfolio

Le site est alors disponible sur **http://localhost:3000**, identique à la production.

.. warning::

   Sur un Mac Apple Silicon, la plateforme ``linux/arm64`` est native.
   Sur x86, l'émulation est plus lente mais fonctionnelle via QEMU.
