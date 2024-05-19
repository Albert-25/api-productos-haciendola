import { Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      return await this.productsRepository.find();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.productsRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }
      return product;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(productoData: Partial<Product>): Promise<Product> {
    try {
      const product = this.productsRepository.create(productoData);
      return await this.productsRepository.save(product);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: number, productoData: Partial<Product>): Promise<Product> {
    try {
      await this.productsRepository.update(id, productoData);
      return await this.productsRepository.findOne({ where: { id } });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async remove(id: number): Promise<number> {
    try {
      const result = await this.productsRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Producto no encontrado');
      }
      return id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
