import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ScrapperStreamService {
  private eventSubject: Subject<string> = new Subject();

  // Method to initiate the scraping, storing, and iframe creation process
  async runProcess(url : string): Promise<void> {
    try {
      // Step 1: Scrape Website
      this.emitEvent('Scraping website...');
      await this.scrapeWebsite();
      this.emitEvent('Scraping completed');

      // Step 2: Store Data to Vector Database
      this.emitEvent('Storing data to vector database...');
      await this.storeDataToDatabase();
      this.emitEvent('Data stored successfully');

      // Step 3: Create Iframe Link
      this.emitEvent('Creating iframe link...');
      await this.createIframeLink();
      this.emitEvent('Iframe link created');

    } catch (error) {
      this.emitEvent(`Error: ${error.message}`);
    }
  }

  // Emit event to clients
  private emitEvent(message: string) {
    this.eventSubject.next(`data: ${message}\n\n`);
  }

  // Method to return the stream of events
  getEventStream(): Observable<string> {
    return this.eventSubject.asObservable();
  }

  // Simulate the process of scraping the website
  private async scrapeWebsite(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async work
    // Simulated error in scraping (uncomment to simulate failure)
    // throw new Error("Failed to scrape website");
  }

  // Simulate storing data in a vector database
  private async storeDataToDatabase(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async work
  }

  // Simulate iframe creation
  private async createIframeLink(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async work
  }
}
