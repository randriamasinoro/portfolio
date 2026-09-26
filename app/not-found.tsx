import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-6 md:pt-12 max-w-[60ch]">
      <h1 className="text-[2.25rem] sm:text-[3rem] leading-tight mb-4">Page introuvable</h1>
      <p className="text-[1.1875rem] text-fg-2 mb-6">
        Cette adresse ne correspond à aucune page. Le projet a peut-être changé de nom.
      </p>
      <Link href="/projects" className="font-ui text-fg">
        Voir la liste des projets
      </Link>
    </div>
  );
}
