import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) { }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne({ where: { id } });
  }

  async create(productoData: Partial<Product>): Promise<Product> {
    const product = this.productsRepository.create(productoData);
    return this.productsRepository.save(product);
  }

  async update(id: number, productoData: Partial<Product>): Promise<Product> {
    await this.productsRepository.update(id, productoData);
    return this.productsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<Number> {
    await this.productsRepository.delete(id);
    return id;
  }
}

