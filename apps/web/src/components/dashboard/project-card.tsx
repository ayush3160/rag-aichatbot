import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Project } from "@/types/project";
import { Globe } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle><Link href={`/project/${project.id}`}>{project.name}</Link></CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          {project.website}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </CardContent>
    </Card>
  );
}