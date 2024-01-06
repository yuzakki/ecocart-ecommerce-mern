import { Schema, model, Document } from 'mongoose';
import slugify from 'slugify';

interface ICategory {
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct extends Document {
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  category: ICategory;
  featured: boolean;
  recommended: boolean;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: String,
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    category: {
      type: categorySchema,
      required: true,
    },
    featured: {
      type: Boolean,
      required: true,
      default: false,
    },
    recommended: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre('save', function (this: any, next: Function) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = model<IProduct>('Product', productSchema);

export default Product;
