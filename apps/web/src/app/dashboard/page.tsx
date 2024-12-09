"use client";

import { useEffect, useState } from "react";
import { ProjectList } from "@/components/dashboard/project-list";
import { CreateProjectModal } from "@/components/dashboard/create-project-modal";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Project, ProjectRequestBody } from "@/types/project";
import { CreateProject, GetProjects } from "@/api/projectApi";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getProjects();
  }, []);

  const handleCreateProject = async (project: ProjectRequestBody) => {
    const response = await CreateProject(project);

    if ("error" in response) {
      console.error(response.error);
    } else {
      router.push("/project/" + response.id);
      setIsModalOpen(false);
    }
  };

  const getProjects = async () => {
    const projects = await GetProjects();

    if ("error" in projects) {
      console.error(projects.error);
    } else {
      setProjects(projects);
    }
  }
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onCreateProject={() => setIsModalOpen(true)} />
      <main className="mx-3 py-6">
        <ProjectList projects={projects} />
        <CreateProjectModal
          isOpen={isModalOpen}
          onClose={() => projects.length > 0 && setIsModalOpen(false)}
          onSubmit={handleCreateProject}
          canClose={projects.length > 0}
        />
      </main>
    </div>
  );
}