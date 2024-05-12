import { BadRequestException, Body, Controller, Delete, Get, Logger, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('product')
export class ProductController {

    private readonly log = new Logger(ProductController.name);

    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>
    ) {}

    @Get()
    findAll() {
        this.log.debug('REST request to execute find Restaurants');
        return this.productRepository.find();
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        this.log.debug(`REST request to find restaurant by id: ${id}`);

        if(! await this.productRepository.existsBy({id: id})) {
            this.log.warn(`Restaurant not found with id: ${id}`);
            throw new NotFoundException();
        }
        return this.productRepository.findOne({
            where: {
                id: id
            }
        });
    }

    @Post()
    async create(@Body() product: Product) {
        this.log.debug(`REST request to create a new restaurant`);
        if(product.id > 0) {
            throw new BadRequestException('No se puede crear un nuevo restaurante con id ya asignado.');
        }

        try {
            return await this.productRepository.save(product);
        } catch (error) {
            this.log.error(`Error intentando crear un nuevo restaurant`);
            throw new BadRequestException('Resturante incorrecto, no se ha podido crear.');
        }
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() product: Product) {
        this.log.debug(`REST request to update restaurant with id ${id}`);

        if(! await this.productRepository.existsBy({id: id})) {
            this.log.warn(`Restaurant not found with id: ${id}`);
            throw new NotFoundException();
        }

        try {
            return await this.productRepository.save(product);
        } catch (error) {
            this.log.error(`Error intentando crear un nuevo restaurant`);
            throw new BadRequestException('Resturante incorrecto, no se ha podido crear.');
        }

    }

    @Delete(':id')
    async deleteById(@Param('id', ParseIntPipe) id: number) {
        this.log.debug(`REST request to delete restaurant with id ${id}`);

        if(! await this.productRepository.existsBy({id: id})) {
            this.log.warn(`Restaurant not found with id: ${id}`);
            throw new NotFoundException();
        }

        this.productRepository.delete({
            id: id
        });
    }

}
