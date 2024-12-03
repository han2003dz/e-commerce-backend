import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductDto, ProductService } from '@app/product';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('detail/:productId')
  getProduct(@Param('productId') productId: string) {
    return this.productService.detail(productId);
  }

  @Post('create')
  createProduct(@Body() productDto: ProductDto) {
    return this.productService.create(productDto);
  }
}
