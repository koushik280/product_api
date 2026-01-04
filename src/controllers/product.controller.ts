import { Request, Response } from "express";
import { Product } from "../models/product.model";
import {
  CreateProductDTO,
  ProductResponseDTO,
  UpdateProductDTO
} from "../dtos/product.dto";


class ProductController {
  // CREATE
 async create(req: Request, res: Response) {
  try {
    const dto: CreateProductDTO = req.body;

    if (!dto.name || !dto.category || dto.price === undefined) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const product = await Product.create(dto);

    const response: ProductResponseDTO = {
      id: product._id.toString(),
      name: product.name,
      category: product.category,
      price: product.price
    };

    return res.status(201).json({
      success: true,
      data: response
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to create product"
    });
  }
}


  // READ ALL (FILTER + SORT)
 async getAll(req: Request, res: Response) {
  try {
    const { category, sortBy, order } = req.query;

    const filter: Record<string, any> = {};
    if (category) filter.category = category;

    const sort: Record<string, 1 | -1> = {};
    if (sortBy === "price") sort.price = order === "desc" ? -1 : 1;
    if (sortBy === "date") sort.createdAt = order === "desc" ? -1 : 1;

    const products = await Product.find(filter).sort(sort);

    const response: ProductResponseDTO[] = products.map(p => ({
      id: p._id.toString(),
      name: p.name,
      category: p.category,
      price: p.price
    }));

    return res.status(200).json({
      success: true,
      count: response.length,
      data: response
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });
  }
}



  // READ ONE
 async getById(req: Request, res: Response) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const response: ProductResponseDTO = {
      id: product._id.toString(),
      name: product.name,
      category: product.category,
      price: product.price
    };

    return res.status(200).json({
      success: true,
      data: response
    });
  } catch {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID"
    });
  }
}


  // UPDATE
 async update(req: Request, res: Response) {
  try {
    const dto: UpdateProductDTO = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      dto,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const response: ProductResponseDTO = {
      id: product._id.toString(),
      name: product.name,
      category: product.category,
      price: product.price
    };

    return res.status(200).json({
      success: true,
      data: response
    });
  } catch {
    return res.status(400).json({
      success: false,
      message: "Failed to update product"
    });
  }
}

  // DELETE
  async delete(req: Request, res: Response) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Product deleted successfully"
      });
    } catch {
      return res.status(400).json({
        success: false,
        message: "Failed to delete product"
      });
    }
  }
}

export const productController = new ProductController();
