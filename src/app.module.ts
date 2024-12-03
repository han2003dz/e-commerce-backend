import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductController, ProductService } from '@app/product';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import featureDb from '@app/common/featureDb/index.feature';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_NAME,
    }),
    MongooseModule.forFeature(featureDb),
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply() // add AuthMiddleware
      .exclude({
        path: 'user/profile',
        method: RequestMethod.GET,
      })
      .forRoutes('*');
  }
}
