'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProductService } from '../classes/product.service';
import { IProduct } from '../interfaces/product.interface';

export default function ProductDetailComponent() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getProductById(id as string);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  if (!product) return <div className="flex justify-center items-center min-h-screen">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {product.images && product.images[0] && (
              <img src={product.images[0]} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
            )}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1).map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} - ${index + 2}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold text-green-600">${product.price}</p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Stock:</span>
              <span className="font-medium">{product.stock}</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
