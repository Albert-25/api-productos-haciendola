import { IsNotEmpty, IsString, IsNumber, MinLength, IsOptional, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {

    handle: string;

    @IsNotEmpty({ message: 'El título del producto no puede estar vacío' })
    @IsString({ message: 'El título del producto debe ser una cadena' })
    title: string;

    @IsNotEmpty({ message: 'La descripción del producto no puede estar vacía' })
    @IsString({ message: 'La descripción del producto debe ser una cadena' })
    description: string;

    @IsNotEmpty({ message: 'El SKU del producto no puede estar vacío' })
    @IsString({ message: 'El SKU del producto debe ser una cadena' })
    sku: string;

    @IsNotEmpty({ message: 'Los gramos del producto no pueden estar vacíos' })
    @IsNumber({}, { message: 'Los gramos del producto deben ser un número' })
    @IsPositive({ message: 'Los gramos del producto deben ser un número positivo' })
    @Transform(({ value }) => parseInt(value))
    grams: number;

    @IsNotEmpty({ message: 'El stock del producto no puede estar vacío' })
    @IsNumber({}, { message: 'El stock del producto debe ser un número' })
    @Transform(({ value }) => parseInt(value))
    stock: number;

    @IsNotEmpty({ message: 'El precio del producto no puede estar vacío' })
    @IsNumber({}, { message: 'El precio del producto debe ser un número' })
    @IsPositive({ message: 'El precio del producto debe ser un número positivo' })
    @Transform(({ value }) => parseFloat(value))
    price: number;

    @IsOptional()
    @IsNumber({}, { message: 'El precio de comparación del producto debe ser un número' })
    @IsPositive({ message: 'El precio de comparación del producto debe ser un número positivo' })
    @Transform(({ value }) => parseFloat(value))
    comparePrice: number;

    @IsOptional()
    @IsString({ message: 'El código de barras del producto debe ser una cadena' })
    @MinLength(3, { message: 'El código de barras del producto debe contener al menos 3 caracteres' })
    barcode: string;
}
