import { Module , MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { JwtMiddleware } from './middlewares/jwt-auth.middleware';
import { ProjectModule } from './projects/project.module';
import { ScrapperModule } from './scrapper/scrapper.module';
import { ChatWidgetModule } from './chatwidget/chatwidget.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    ProjectModule,
    ScrapperModule,
    ChatWidgetModule,
    ChatModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'auth/signin', method: RequestMethod.POST }, 
        { path: 'auth/signup', method: RequestMethod.POST },
        { path: 'scrap/stream', method: RequestMethod.GET }, // TODO: Need to remove this and add a proper mechanism of handling this route
        { path: 'chatwidget/widget/:projectId', method: RequestMethod.GET },
        {path: "chat/query", method: RequestMethod.POST}
      )
      .forRoutes('*'); // Apply to all other routes
  }
}
