export interface Project {
    id: string;
    name: string;
    website: string;
    description: string;
}

export interface ProjectRequestBody {
    name: string;
    website: string;
    description: string;
}