'use client';

import { catchAndAlert } from '@/shared/utils/ExceptionUtil';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ProductService } from './classes/product.service';
import { IProduct } from './interfaces/product.interface';

export default function ProductPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = catchAndAlert(async () => {
    try {
      const data = await ProductService.getAllProducts();
      setProducts(data || []);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  if (products.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        No products available at the moment.
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/products/${product._id}`} key={product._id}>
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              {product.images && product.images[0] && (
                <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${product.price}</span>
                  <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
