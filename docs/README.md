# Documentation — Portfolio Elisa

Documentation technique du portfolio générée avec [Sphinx](https://www.sphinx-doc.org/).

## Prérequis

Python 3 et pip doivent être installés.

```bash
python3 --version
pip --version
```

## Installation

```bash
pip install sphinx sphinx-rtd-theme
```

## Générer la documentation

Depuis la racine du projet :

```bash
sphinx-build -b html docs/ docs/_build/html
```

Ou depuis le dossier `docs/` :

```bash
cd docs
sphinx-build -b html . _build/html
```

## Consulter la documentation

Ouvrir directement le fichier généré dans un navigateur :

```bash
xdg-open docs/_build/html/index.html
```

Ou naviguer manuellement vers `docs/_build/html/index.html` et l'ouvrir avec le navigateur.

## Modifier la documentation

Les sources sont des fichiers `.rst` dans `docs/` :

| Fichier | Contenu |
|---|---|
| `overview.rst` | Architecture générale, stack, domaines |
| `content/projects.rst` | Gérer les projets MDX |
| `content/about.rst` | Page À propos (bio, compétences, formation, contact) |
| `content/home.rst` | Page d'accueil (hero, featured, SEO) |
| `dev/local.rst` | Test en local |
| `dev/deploy.rst` | Déploiement CI/CD et VPS |
| `dev/extend.rst` | Ajouter un domaine, une page, changer les polices |

Après modification, relancer `sphinx-build` pour régénérer le HTML.

## Structure des fichiers sources

```
docs/
├── conf.py          ← configuration Sphinx
├── index.rst        ← sommaire (table des matières)
├── overview.rst
├── content/
│   ├── projects.rst
│   ├── about.rst
│   └── home.rst
└── dev/
    ├── local.rst
    ├── deploy.rst
    └── extend.rst
```

> Le dossier `_build/` est généré et ne doit pas être versionné.
