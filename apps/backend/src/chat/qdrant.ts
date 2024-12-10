// TODO: will have to move this to a separate service

import { QdrantClient } from "@qdrant/qdrant-js";
import { ExtractedDocument } from "src/types/types";
import { v4 as uuidv4 } from "uuid";
import { CohereClient } from "cohere-ai";
import { EmbedResponse } from "cohere-ai/api";

const qdrantClient = new QdrantClient({
    url: "http://localhost:6333", // Qdrant instance URL
});

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY
});

const generateVector = async (text: string[]): Promise<EmbedResponse | undefined> => {
    try {
        return await cohere.embed({ texts: text });
    } catch (error) {
        console.error("Error generating vector", error);
    }
}


const ensureCollectionExists = async (collectionName: string) => {
    try {
        console.log("Inside ensureCollectionExists")
        await qdrantClient.getCollection(collectionName);
    } catch {
        console.log("Inside ensureCollectionExists catch")
        await qdrantClient.createCollection(collectionName, {
            vectors: {
                size: 4096,
                distance: "Cosine",
            },
        });
    }
};

export const storeDocuments = async (data: ExtractedDocument[], collectionName: string) => {
    try {
        console.log("Inside storeDocuments")
        await ensureCollectionExists(collectionName);
        const batchSize = 90;
        const points = [];
        const batchPromises = []; // To hold promises for each batch

        for (let i = 0; i < data.length; i += batchSize) {
            let textArray = [];

            for (let j = i; j < i + batchSize && j < data.length; j++) {
                if (data[j] && data[j].body) {
                    data[j].body = data[j].body.replace(/[\n\r]/g, '');

                    let normalizedText = data[j].body.replace(/\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g, '');
                    // Remove newline characters
                    normalizedText = normalizedText.replace(/[\r\n]+/g, '');

                    if (typeof data[j].body === 'string') {
                        textArray.push(data[j].body);
                    }
                }
            }

            const batchPromise = generateVector(textArray).then((vectors) => {
                for (let k = 0; k < textArray.length; k++) {
                    if (!vectors.embeddings[k]) {
                        continue;
                    }
                    points.push({
                        id: uuidv4(),
                        vector: vectors.embeddings[k],
                        payload: data[i + k],
                    });
                }
            });

            batchPromises.push(batchPromise);
        }

        await Promise.all(batchPromises);

        console.log("Points length", points.length);

        await qdrantClient.upsert(collectionName, { points });
    } catch (e) {
        console.log("Error", e)
    }
};

export const searchDocuments = async (query: string, topK: number = 5, collectionName: string) => {
    try {
        // Generate vector for the search query
        const queryVector = await generateVector([query]);

        // Perform the search
        const searchResults = await qdrantClient.search(collectionName, {
            vector: queryVector.embeddings[0], // Vector of the search query
            limit: topK, // Number of top results to return
        });

        // Extract and return the payloads of the matching points
        return searchResults.map((result) => ({
            score: result.score, // Similarity score
            document: result.payload, // Original document stored in Qdrant
        }));
    } catch (error) {
        console.error("Error searching documents", error);
    }
};

export const llmCall = async (prompt: string) => {
    try {
        const response = await cohere.generate({ prompt: prompt });
        return response.generations[0].text;
    } catch (error) {
        console.error("Error generating vector", error);
    }
}