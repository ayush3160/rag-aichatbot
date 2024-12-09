import { Body, Controller, Get, Sse, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ScrapperStreamService } from './scrapper.service';

@Controller('scrap')
export class ScrapperController {
  constructor(private readonly eventStreamService: ScrapperStreamService) {}

  @Get('stream')
  @Sse() // This decorator turns the method into an SSE endpoint
  stream(): Observable<string> {
    return this.eventStreamService.getEventStream();
  }

  // Endpoint to start the scraping process
  @Post('start')
  async startProcess(@Body() {url,projectId} : {url : string,projectId : string}): Promise<string> {
    await this.eventStreamService.runProcess(url,projectId); // Run the process that emits events
    return 'Process Completed';
  }
}
