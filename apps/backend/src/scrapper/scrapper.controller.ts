import { Body, Controller, Get, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ScrapperStreamService } from './scrapper.service';

@Controller('events')
export class ScrapperController {
  constructor(private readonly eventStreamService: ScrapperStreamService) {}

  @Get('stream')
  @Sse() // This decorator turns the method into an SSE endpoint
  stream(): Observable<string> {
    return this.eventStreamService.getEventStream();
  }

  // Endpoint to start the scraping process
  @Get('start')
  async startProcess(@Body() url : string): Promise<string> {
    await this.eventStreamService.runProcess(); // Run the process that emits events
    return 'Process started';
  }
}
