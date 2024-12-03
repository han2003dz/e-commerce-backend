import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { BaseEntity } from '@app/common/schema/base-schema.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Product extends BaseEntity {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  discount: number;

  @Prop()
  category: string;

  @Prop()
  brand: string;

  @Prop({ default: 0 })
  stock: number;

  @Prop({ default: 0 })
  rating: number;

  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.plugin(mongooseAggregatePaginate);
