"use client";

import { useEffect, useState } from "react";
import { ProjectList } from "@/components/dashboard/project-list";
import { CreateProjectModal } from "@/components/dashboard/create-project-modal";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Project } from "@/types/project";

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Show modal if no projects exist
    if (projects.length === 0) {
      setIsModalOpen(true);
    }
  }, [projects]);

  const handleCreateProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
    setIsModalOpen(false);
  };

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