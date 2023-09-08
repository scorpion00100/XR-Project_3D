// product.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const {
      name,
      description,
      price,
      category,
      ingredients,
      customizationOptions,
      imageUrl,
      arExperienceId,
    } = createProductDto;

    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.ingredients = ingredients;
    product.customizationOptions = customizationOptions;
    product.imageUrl = imageUrl;
    product.arExperienceId = arExperienceId;

    await product.save();
    return product;
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const {
      name,
      description,
      price,
      category,
      ingredients,
      customizationOptions,
      imageUrl,
      arExperienceId,
    } = updateProductDto;

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.ingredients = ingredients;
    product.customizationOptions = customizationOptions;
    product.imageUrl = imageUrl;
    product.arExperienceId = arExperienceId;

    await product.save();
    return product;
  }
}
