import Project from "@/components/project/project";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  return (
    <Project projectId={slug} />
  );
}