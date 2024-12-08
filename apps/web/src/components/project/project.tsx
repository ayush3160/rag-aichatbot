"use client";

import { useEffect, useState } from "react";
import { ProjectHeader } from "@/components/project/project-header";
import { SetupStep } from "@/components/project/setup-steps";

type StepStatus = "pending" | "loading" | "completed";

interface Step {
  title: string;
  description: string;
  status: StepStatus;
}

export default function Project({
    projectId
} : {projectId : string}) {

  const [steps, setSteps] = useState<Step[]>([
    {
      title: "Scrapping data from your website",
      description: "We're analyzing and extracting relevant information from your website",
      status: "pending",
    },
    {
      title: "Storing in vector database",
      description: "Converting and storing the data in an optimized format for quick retrieval",
      status: "pending",
    },
    {
      title: "Generating your iframe link",
      description: "Creating a secure and customizable chat widget for your website",
      status: "pending",
    },
  ]);

  useEffect(() => {
    const simulateProgress = async () => {
      // Step 1
      setSteps((prev) =>
        prev.map((step, i) =>
          i === 0 ? { ...step, status: "loading" as StepStatus } : step
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSteps((prev) =>
        prev.map((step, i) =>
          i === 0 ? { ...step, status: "completed" as StepStatus } : step
        )
      );

      // Step 2
      setSteps((prev) =>
        prev.map((step, i) =>
          i === 1 ? { ...step, status: "loading" as StepStatus } : step
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 4000));
      setSteps((prev) =>
        prev.map((step, i) =>
          i === 1 ? { ...step, status: "completed" as StepStatus } : step
        )
      );

      // Step 3
      setSteps((prev) =>
        prev.map((step, i) =>
          i === 2 ? { ...step, status: "loading" as StepStatus } : step
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSteps((prev) =>
        prev.map((step, i) =>
          i === 2 ? { ...step, status: "completed" as StepStatus } : step
        )
      );
    };

    simulateProgress();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ProjectHeader />
      <main className="px-12 py-12 flex justify-center items-center">
        <div className="space-y-12 w-full max-w-2xl">
          {steps.map((step, index) => (
            <SetupStep
              key={index}
              step={index + 1}
              title={step.title}
              description={step.description}
              status={step.status}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </main>
    </div>
  );
}