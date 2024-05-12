import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/product.entity';
import { Manufacturer } from './manufacturer/manufacturer.entity';
import { ProductService } from './product/product.service';
import { ManufacturerService } from './manufacturer/manufacturer.service';
import { ManufacturerController } from './manufacturer/manufacturer.controller';
import { ProductController } from './product/product.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'nest_ejercicio1', 
      entities: [Product, Manufacturer],
      synchronize: true, 
      logging: true
    }),
    TypeOrmModule.forFeature([Product, Manufacturer])
  ],
  controllers: [AppController, ManufacturerController, ProductController],
  providers: [AppService, ProductService, ManufacturerService],
})
export class AppModule {}
