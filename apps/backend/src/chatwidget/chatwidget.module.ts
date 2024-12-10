import { Module } from '@nestjs/common';
import { ChatWidgetController } from './chatwidget.controller';

@Module({
  imports: [],
  controllers: [ChatWidgetController],
  providers: [],
  exports: [ 
  ],
})
export class ChatWidgetModule {}
