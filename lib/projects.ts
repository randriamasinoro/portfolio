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

export function readProject(
  id: string
): { frontmatter: Project; content: string } | null {
  const filePath = path.join(PROJECTS_DIR, `${id}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as Project, content };
}
