import { Injectable } from "@nestjs/common";
import { searchDocuments , llmCall } from "./qdrant";

@Injectable()
export class ChatService {

    async query(query: string, projectId: string): Promise<string> {
        const qdrantResult = await searchDocuments(query,5,projectId);

        let context = "";

        if(qdrantResult && qdrantResult.length > 0){
            qdrantResult.forEach((result) => {
                context += result.document.body + "\n";
            });
        }

        const prompt = "You are chatbot who is talking to a user and you have to respond to the user's query only from the context. If the query has any question apart from the context given simply says I don't know the answer. The user has asked the following question: " + query + ". The context of the conversation is as follows: " + context;

        console.log("Prompt", prompt);

        return await llmCall(prompt);
    }
} 