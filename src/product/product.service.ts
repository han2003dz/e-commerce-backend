import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from '@app/product/schema/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel } from 'mongoose';
import { ProductDto } from '@app/product';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: AggregatePaginateModel<ProductDocument>,
  ) {}
  async detail(productId: string) {
    return await this.productModel.findOne({ _id: productId });
  }

  async create(productDto: ProductDto) {
    await this.productModel.create(productDto);
  }
}
