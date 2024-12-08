import { Module , MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { JwtMiddleware } from './middlewares/jwt-auth.middleware';
import { ProjectModule } from './projects/project.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    ProjectModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'auth/signin', method: RequestMethod.POST }, 
        { path: 'auth/signup', method: RequestMethod.POST }, 
      )
      .forRoutes('*'); // Apply to all other routes
  }
}
