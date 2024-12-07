import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onCreateProject: () => void;
}

export function DashboardHeader({ onCreateProject }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mx-3">Projects</h1>
          <Button onClick={onCreateProject} className="gap-1 mx-3">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>
    </header>
  );
}