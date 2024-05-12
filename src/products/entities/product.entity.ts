import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  handle: string;

  @Column()
  title: string;

  @Column({ length: 2000 })
  description: string;

  @Column()
  sku: string;

  @Column()
  grams: number;

  @Column()
  stock: number;

  @Column()
  price: number;

  @Column()
  comparePrice: number;

  @Column({ nullable: true })
  barcode: string;
}
