import { Controller, Get, Post, Body, Param, Put, Delete, Request, NotFoundException } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Request() req: ExpressRequest): Promise<Product[]> {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    try {
      const product = await this.productsService.findOne(+id);
      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }
      return product;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productsService.create(createProductDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      return await this.productsService.update(+id, updateProductDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Object> {
    try {
      const deletedId = await this.productsService.remove(+id);
      return { deletedId };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
