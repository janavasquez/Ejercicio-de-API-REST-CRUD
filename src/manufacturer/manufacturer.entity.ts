import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/product.entity";

@Entity()
export class Manufacturer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    @OneToMany(() => Product, product => product.title)
    product: string;

}