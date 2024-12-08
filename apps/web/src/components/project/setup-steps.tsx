import { StepIndicator } from "./step-indicator";

interface SetupStepProps {
  step: number;
  title: string;
  description: string;
  status: "pending" | "loading" | "completed";
  isLast?: boolean;
}

export function SetupStep({
  step,
  title,
  description,
  status,
  isLast,
}: SetupStepProps) {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col items-center">
        <StepIndicator status={status} />
        {!isLast && (
          <div className="w-px h-24 border-r border-dashed border-muted-foreground/50 my-4" />
        )}
      </div>
      <div className="pt-2">
        <div className="text-sm text-muted-foreground mb-1">Step {step}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}