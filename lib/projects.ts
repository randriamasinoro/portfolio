import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project } from "@/types/project";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export function readProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return data as Project;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

// Projets partageant au moins un domaine avec le projet courant.
// Sert au maillage interne et aux clusters thématiques (SEO).
export function getRelatedProjects(id: string, limit = 3): Project[] {
  const all = readProjects();
  const current = all.find((p) => p.id === id);
  if (!current) return [];

  return all
    .filter((p) => p.id !== id)
    .map((p) => ({
      project: p,
      shared: p.domains.filter((d) => current.domains.includes(d)).length,
    }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared || b.project.date.localeCompare(a.project.date))
    .slice(0, limit)
    .map((x) => x.project);
}

export function readProject(
  id: string
): { frontmatter: Project; content: string } | null {
  const filePath = path.join(PROJECTS_DIR, `${id}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as Project, content };
}
