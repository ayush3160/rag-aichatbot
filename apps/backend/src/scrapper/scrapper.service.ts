import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { ExtractedDocument } from 'src/types/types';
import scrapeWebsite from './scrapper';
import { writeFile } from 'fs/promises';
import { storeDocuments } from './qdrant';

@Injectable()
export class ScrapperStreamService {
    private eventSubject: Subject<string> = new Subject();

    // Method to initiate the scraping, storing, and iframe creation process
    async runProcess(url: string,projectId : string): Promise<void> {
        try {
            this.emitEvent(`Scraping website... ${url}`);
            console.log("Scraping website... ", url)
            const documents = await this.scrape(url);
            console.log(documents.length)
            if (documents) {
                console.log(documents.length)
                this.emitEvent('Scraping completed');
            }

            this.emitEvent('Storing data to vector database...');
            await this.storeDataToDatabase(documents,projectId);
            this.emitEvent('Data stored successfully');

            this.emitEvent('Creating iframe link...');
            await this.createIframeLink();
            this.emitEvent('Iframe link created');

        } catch (error) {
            this.emitEvent(`Error: ${error.message}`);
        }
    }

    // Emit event to clients
    private emitEvent(message: string) {
        this.eventSubject.next(`${message}`);
    }

    // Method to return the stream of events
    getEventStream(): Observable<string> {
        return this.eventSubject.asObservable();
    }

    // Simulate the process of scraping the website
    private async scrape(url : string): Promise<ExtractedDocument[]> {
        return await scrapeWebsite(url)
    }

    // Simulate storing data in a vector database
    private async storeDataToDatabase(documents: ExtractedDocument[],projectId : string): Promise<void> {
        return await storeDocuments(documents, projectId)
    }

    // Simulate iframe creation
    private async createIframeLink(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate async work
    }
}
