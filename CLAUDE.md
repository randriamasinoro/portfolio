# Profil développeur — Global Elisa

## Identité
Nom : Sehenonirina Elisa Randriamasinoro
Niveau : M1 Cybersécurité Systèmes Embarqués — UBS Lorient
Langue : répondre en français par défaut

## Stack personnelle
- Frontend : Next.js 14, Tailwind CSS, TypeScript, MDX
- Infra : VPS Oracle Cloud ARM64, 24Go RAM, 4 CPU, 150Go
- CI/CD : GitHub Actions
- Docker : ARM64 obligatoire

## Règles globales
- Jamais de sudo avec npm
- Images Docker toujours en --platform linux/arm64
- Commits : feat/fix/docs/chore en anglais
- Jamais de secrets dans le code
- Répondre en français
- Toujours valider avant de passer à l'étape suivante

## Agents disponibles

### @dev
Fichier : .claude/agents/dev.md
Rôle : écrire et modifier le code (composants, pages, config)
Quand l'utiliser : pour toute création ou modification de fichier de code

### @review
Fichier : .claude/agents/review.md
Rôle : valider chaque sprint avant de passer au suivant
Quand l'utiliser : quand toutes les tâches d'un sprint sont terminées
Règle : aucun sprint ne commence sans sa validation

### @doc
Fichier : .claude/agents/doc.md
Rôle : mettre à jour CLAUDE.md et documenter les composants
Quand l'utiliser : après chaque composant créé, après chaque sprint validé

## Ordre de travail par sprint
1. @dev code les tâches du sprint
2. @review valide avec sa checklist
3. @doc met à jour la documentation
4. On passe au sprint suivant uniquement si @review a tout validé

## Amélioration continue

Le site évolue en permanence après les sprints initiaux.

### Ajout d'un projet
1. Créer un fichier /content/projects/[id].mdx
2. Respecter le schéma frontmatter défini ci-dessus
3. git push → CI/CD rebuild automatiquement
4. Aucune modification du code nécessaire

### Modification d'un projet existant
1. Éditer directement le fichier MDX correspondant
2. git push → rebuild automatique

### Amélioration d'un composant existant
1. @dev fait la modification
2. @review valide (checklist allégée — pas besoin de tout repasser)
3. @doc met à jour si l'interface du composant change

### Ajout d'un nouveau domaine
1. Ajouter la valeur dans la liste des domaines (CLAUDE.md + types/)
2. Définir sa couleur dans la palette Tailwind
3. Aucune autre modification nécessaire

### Ajout d'une nouvelle page
1. Sprint dédié avec ses propres tâches et critères de validation
2. Même processus : @dev → @review → @doc

## Règle générale
Toute modification, même mineure, passe par :
@dev (code) → @review (validation) → @doc (documentation)
Pas de code non validé en production.