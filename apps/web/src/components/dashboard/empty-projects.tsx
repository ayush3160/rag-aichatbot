import { FolderPlus } from "lucide-react";

export function EmptyProjects() {
  return (
    <div className="flex min-h-[600px] flex-col items-center justify-center rounded-lg border border-dashed">
      <FolderPlus className="h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">No projects yet</h3>
      <p className="text-sm text-muted-foreground">
        Create your first project to get started
      </p>
    </div>
  );
}