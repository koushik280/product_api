// Request DTO – when creating a product
export interface CreateProductDTO {
  name: string;
  category: string;
  price: number;
}

// Request DTO – when updating a product
export interface UpdateProductDTO {
  name?: string;
  category?: string;
  price?: number;
}

// Response DTO – what frontend receives
export interface ProductResponseDTO {
  id: string;
  name: string;
  category: string;
  price: number;
}
