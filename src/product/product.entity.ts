import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Manufacturer } from "../manufacturer/manufacturer.entity";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    @OneToMany(() => Manufacturer, manufacturer => manufacturer.name)
    manufacturer: Manufacturer[];
    
}