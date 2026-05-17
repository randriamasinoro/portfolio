Déploiement
===========

Infrastructure
--------------

+------------------+-----------------------------------------------+
| Élément          | Valeur                                        |
+==================+===============================================+
| Hébergeur        | Oracle Cloud — ARM64 (aarch64)                |
+------------------+-----------------------------------------------+
| OS               | Ubuntu 24.04 LTS                              |
+------------------+-----------------------------------------------+
| Domaine          | ``elisa-dev.duckdns.org``                     |
+------------------+-----------------------------------------------+
| Accès SSH        | ``ssh oracle`` (alias configuré)              |
+------------------+-----------------------------------------------+
| Port applicatif  | 3000 (exposé via Nginx)                       |
+------------------+-----------------------------------------------+

Pipeline CI/CD (GitHub Actions)
---------------------------------

**Fichier :** ``.github/workflows/deploy.yml``

Le pipeline se déclenche automatiquement à chaque ``git push`` sur ``main``.
Il comporte deux jobs séquentiels.

**Job 1 — security** (bloque tout si échec)

- Audit npm des dépendances de production (niveau ``critical``)
- Scan Trivy du filesystem (vulnérabilités ``CRITICAL`` uniquement)

Si ce job échoue, le déploiement ne démarre pas.

**Job 2 — deploy** (seulement si security passe)

1. SSH vers le VPS
2. ``git pull`` sur ``~/portfolio``
3. ``sudo docker compose build``
4. ``sudo docker compose up -d``
5. ``docker image prune -f`` (nettoyage des images orphelines)

Secrets GitHub requis
~~~~~~~~~~~~~~~~~~~~~~

Ces secrets doivent être configurés dans :
**GitHub → Settings → Secrets and variables → Actions**

+-----------------------+----------------------------------------------------+
| Secret                | Valeur                                             |
+=======================+====================================================+
| ``VPS_HOST``          | ``elisa-dev.duckdns.org``                          |
+-----------------------+----------------------------------------------------+
| ``SSH_PRIVATE_KEY``   | Clé privée ed25519 générée sur le VPS              |
|                       | (``~/.ssh/github_actions``)                        |
+-----------------------+----------------------------------------------------+

Déploiement manuel (sans CI/CD)
---------------------------------

En cas d'urgence ou de debug, déployer manuellement depuis le VPS :

.. code-block:: bash

   # Se connecter au VPS
   ssh oracle

   # Mettre à jour et reconstruire
   cd ~/portfolio
   git pull
   sudo docker compose build
   sudo docker compose up -d

   # Vérifier que le container tourne
   sudo docker compose ps
   sudo docker compose logs --tail=50

Activer HTTPS (Certbot)
------------------------

.. important::

   Cette étape est à faire **une seule fois** après le premier déploiement.

.. code-block:: bash

   # Sur le VPS
   ssh oracle
   sudo certbot --nginx -d elisa-dev.duckdns.org

Certbot va :

1. Générer un certificat Let's Encrypt
2. Modifier la config Nginx pour forcer HTTP → HTTPS
3. Configurer le renouvellement automatique (cron)

Après cette étape, le site est accessible sur **https://elisa-dev.duckdns.org**.

.. note::

   Le certificat est renouvelé automatiquement tous les 90 jours.
   Aucune action manuelle n'est nécessaire pour le renouvellement.

Vérifier l'état du site
------------------------

.. code-block:: bash

   # Depuis n'importe où — vérifier que le site répond
   curl -I https://elisa-dev.duckdns.org

   # Depuis le VPS — voir les logs du container
   ssh oracle "sudo docker compose -f ~/portfolio/docker-compose.yml logs --tail=100"

   # Depuis le VPS — voir les logs Nginx
   ssh oracle "sudo tail -50 /var/log/nginx/error.log"

Redémarrer le container
-------------------------

.. code-block:: bash

   ssh oracle "cd ~/portfolio && sudo docker compose restart"

Structure Docker
-----------------

**Dockerfile** : build multi-stage Node.js 24 Alpine.

- Stage 1 (``deps``) : installe les dépendances npm
- Stage 2 (``builder``) : build Next.js en mode ``standalone``
- Stage 3 (``runner``) : image finale légère, seul le build est inclus

**docker-compose.yml** : un seul service ``portfolio``, port 3000, ``restart: unless-stopped``.

.. code-block:: bash

   # Voir l'image construite et sa taille
   ssh oracle "sudo docker images | grep portfolio"
