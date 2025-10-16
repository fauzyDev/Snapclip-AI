import { Clip } from "./clipVideo";

export interface Message {
    id: string,
    role: "user" | "ai",
    content: string,
    clips?: Clip[],
    isLoading?: boolean
};