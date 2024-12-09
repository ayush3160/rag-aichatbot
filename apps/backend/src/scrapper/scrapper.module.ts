import { Module } from '@nestjs/common';
import { ScrapperController } from './scrapper.controller';
import { ScrapperStreamService } from './scrapper.service';

@Module({
  imports: [],
  controllers: [ScrapperController],
  providers: [ScrapperStreamService],
  exports: [ 
  ],
})
export class ScrapperModule {}
