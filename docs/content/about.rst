Page À propos
=============

La page ``/about`` est composée de quatre sections :
**Profil (bio)**, **Compétences**, **Formation**, **Contact**.

Chaque section a sa propre source de données — aucune n'est mélangée avec une autre.

Section Profil (bio)
---------------------

**Fichier :** ``app/about/page.tsx``

Le texte de présentation est écrit directement dans le JSX de la page.
Pour le modifier, ouvrir ce fichier et localiser le bloc ``{/* Bio */}`` :

.. code-block:: bash

   # Ouvrir le fichier
   nano app/about/page.tsx
   # Rechercher : {/* Bio */}

Les éléments modifiables dans ce bloc :

+------------------------------------------+-----------------------------------------------+
| Élément                                  | Emplacement dans le fichier                   |
+==========================================+===============================================+
| Texte principal (paragraphe de présenta\ | Balises ``<p>`` après ``{/* Bio */}``         |
| tion)                                    |                                               |
+------------------------------------------+-----------------------------------------------+
| Texte du badge "Stage"                   | Premier ``<div>`` avec ``animate-pulse``      |
+------------------------------------------+-----------------------------------------------+
| Texte du badge "Alternance"              | Deuxième ``<div>`` coloré en violet           |
+------------------------------------------+-----------------------------------------------+
| Photo de profil                          | Fichier ``public/photo.jpg`` (voir ci-dessous)|
+------------------------------------------+-----------------------------------------------+

**Changer la photo de profil :**

Déposer un fichier image dans ``public/`` avec l'un des noms suivants :
``photo.jpg``, ``photo.jpeg``, ``photo.png``, ``photo.webp``, ``photo.avif``.

Le site détecte automatiquement le format — aucune modification de code.

Section Compétences
--------------------

**Fichier :** ``lib/about.ts`` — constante ``SKILL_GROUPS``

.. code-block:: typescript

   export const SKILL_GROUPS: SkillGroup[] = [
     {
       domain: "cybersecurity",           // domaine (détermine la couleur de la card)
       skills: [
         "Reverse engineering",
         "Analyse de firmware",
         "Protocoles radio",
         "TLS / mTLS",
         "Forensics",
       ],
     },
     {
       domain: "embedded",
       skills: ["ESP32", "STM32", "nRF52", "FreeRTOS", "I²C / SPI / UART", "CAN Bus"],
     },
     // ...
   ];

Pour **ajouter une compétence** dans un groupe existant :
ajouter une chaîne à la liste ``skills`` du groupe concerné.

Pour **ajouter un nouveau groupe**, ajouter un objet ``{ domain, skills }``
à la liste. Le ``domain`` doit être l'une des quatre valeurs valides :
``"cybersecurity"``, ``"embedded"``, ``"data-science"``, ``"devsecops"``.

Section Formation
------------------

**Fichier :** ``lib/about.ts`` — constante ``TIMELINE``

.. code-block:: typescript

   export const TIMELINE: TimelineItem[] = [
     {
       year: "2026–29",
       title: "4ème année — Cycle ingénieur Cybersécurité & Data Science",
       org: "ENSIBS — Vannes (admis)",
     },
     {
       year: "2025–26",
       title: "Master 1 Cybersécurité des Systèmes Embarqués",
       org: "UBS — Lorient",
     },
     // Ajouter ici d'autres entrées
   ];

Les entrées sont affichées **de haut en bas** dans l'ordre du tableau.
Mettre les plus récentes en premier.

Pour **ajouter une formation** : insérer un objet ``{ year, title, org }``
en tête de tableau.

Section Contact
----------------

**Fichier :** ``app/about/page.tsx`` — constante ``CONTACTS``

.. code-block:: typescript

   const CONTACTS = [
     {
       href: "mailto:randriamasnrelisa@gmail.com",   // ← modifier ici
       label: "Email",
       text: "randriamasnrelisa@gmail.com",           // ← et ici (texte affiché)
       icon: <MailIcon />,
     },
     {
       href: "tel:+33664689713",
       label: "Téléphone",
       text: "06 64 68 97 13",
       icon: <PhoneIcon />,
     },
     {
       href: "https://www.linkedin.com/in/sehenonirina-elisa-randriamasinoro",
       label: "LinkedIn",
       text: "sehenonirina-elisa-randriamasinoro",
       icon: <LinkedInIcon />,
     },
     {
       href: "https://github.com/randriamasinoro-elisa",
       label: "GitHub",
       text: "randriamasinoro-elisa",
       icon: <GitHubIcon />,
     },
   ];

Pour **modifier un lien**, changer les champs ``href`` et ``text`` de l'entrée correspondante.

Pour **ajouter un contact**, copier un objet existant et l'ajouter à la liste.
Les icônes disponibles sont dans ``components/icons.tsx``.
