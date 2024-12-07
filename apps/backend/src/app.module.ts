import { Module , MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { JwtMiddleware } from './middlewares/jwt-auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'api/signin', method: RequestMethod.POST }, 
        { path: 'api/signup', method: RequestMethod.POST }, 
      )
      .forRoutes('*'); // Apply to all other routes
  }
}
