"use client";

import { useEffect, useState } from "react";
import { ProjectHeader } from "@/components/project/project-header";
import { SetupStep } from "@/components/project/setup-steps";
import { getProject, scrapeWebsite } from "@/api/scrapApi";

type StepStatus = "pending" | "loading" | "completed";

interface Step {
    title: string;
    description: string;
    status: StepStatus;
}

export default function Project({
    projectId
}: { projectId: string }) {

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
        setSteps((prev) =>
            prev.map((step, i) =>
                i === 0 ? { ...step, status: "loading" as StepStatus } : step
            )
        );
        const fetchData = async () => {
            const project = await getProject(projectId);

            if('error' in project) {
                console.error("Failed to fetch project data", project.error);
                return;
            }

            startScrapping(project.website,project.id);
        };
    
        fetchData();
    }, []);

    const startScrapping = async (url : string,projectId : string) => {
        try {
            listenToScrappingEvents();
            const response = await scrapeWebsite(url,projectId);
        } catch (error) {
            console.error("Failed to start scrapping process", error);
        }
    }

    // TODO: Will move this to a separate file with proper token handling and subscribe events callbacks functionality
    const listenToScrappingEvents = () => {
        // Listen to events
        const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scrap/stream`);

        eventSource.onmessage = (event) => {
            switch (event.data) {
                case "Data stored successfully":
                    setSteps((prev) =>
                        prev.map((step, i) =>
                            i === 1 ? { ...step, status: "completed" as StepStatus } : step
                        )
                    );
                    setSteps((prev) =>
                        prev.map((step, i) =>
                            i === 2 ? { ...step, status: "loading" as StepStatus } : step
                        )
                    );
                    break;
                case "Iframe link created":
                    setSteps((prev) =>
                        prev.map((step, i) =>
                            i === 2 ? { ...step, status: "completed" as StepStatus } : step
                        )
                    );
                    break;
                case "Scraping completed":
                    setSteps((prev) =>
                        prev.map((step, i) =>
                            i === 0 ? { ...step, status: "completed" as StepStatus } : step
                        )
                    );
                    setSteps((prev) =>
                        prev.map((step, i) =>
                            i === 1 ? { ...step, status: "loading" as StepStatus } : step
                        )
                    );
                    break;
            }
        };

        eventSource.onerror = (error) => {
            eventSource.close();
        };
    }

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
