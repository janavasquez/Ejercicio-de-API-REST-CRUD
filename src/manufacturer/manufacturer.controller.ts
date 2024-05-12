import { BadRequestException, Body, Controller, Delete, Get, Logger, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Manufacturer } from './manufacturer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('manufacturer')
export class ManufacturerController {

    private readonly log = new Logger(ManufacturerController.name);

    constructor(
        @InjectRepository(Manufacturer) private manufacturerRepository: Repository<Manufacturer>
    ) {}

    @Get()
    findAll() {
        this.log.debug('REST request to execute find Restaurants');
        return this.manufacturerRepository.find();
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        this.log.debug(`REST request to find restaurant by id: ${id}`);

        if(! await this.manufacturerRepository.existsBy({id: id})) {
            this.log.warn(`Restaurant not found with id: ${id}`);
            throw new NotFoundException();
        }
        return this.manufacturerRepository.findOne({
            where: {
                id: id
            }
        });
    }

    @Post()
    async create(@Body() manufacturer: Manufacturer) {
        this.log.debug(`REST request to create a new restaurant`);
        if(manufacturer.id > 0) {
            throw new BadRequestException('No se puede crear un nuevo restaurante con id ya asignado.');
        }

        try {
            return await this.manufacturerRepository.save(manufacturer);
        } catch (error) {
            this.log.error(`Error intentando crear un nuevo restaurant`);
            throw new BadRequestException('Resturante incorrecto, no se ha podido crear.');
        }
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() manufacturer: Manufacturer) {
        this.log.debug(`REST request to update restaurant with id ${id}`);

        if(! await this.manufacturerRepository.existsBy({id: id})) {
            this.log.warn(`Restaurant not found with id: ${id}`);
            throw new NotFoundException();
        }

        try {
            return await this.manufacturerRepository.save(manufacturer);
        } catch (error) {
            this.log.error(`Error intentando crear un nuevo restaurant`);
            throw new BadRequestException('Resturante incorrecto, no se ha podido crear.');
        }

    }

    @Delete(':id')
    async deleteById(@Param('id', ParseIntPipe) id: number) {
        this.log.debug(`REST request to delete restaurant with id ${id}`);

        if(! await this.manufacturerRepository.existsBy({id: id})) {
            this.log.warn(`Restaurant not found with id: ${id}`);
            throw new NotFoundException();
        }

        this.manufacturerRepository.delete({
            id: id
        });
    }

}
