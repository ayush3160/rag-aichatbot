import { Module , MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { JwtMiddleware } from './middlewares/jwt-auth.middleware';
import { ProjectModule } from './projects/project.module';
import { ScrapperModule } from './scrapper/scrapper.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    ProjectModule,
    ScrapperModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'auth/signin', method: RequestMethod.POST }, 
        { path: 'auth/signup', method: RequestMethod.POST },
        { path: 'scrap/stream', method: RequestMethod.GET } // TODO: Need to remove this and add a proper mechanism of handling this route
      )
      .forRoutes('*'); // Apply to all other routes
  }
}
