'use client';
import { catchAndAlert } from '@/shared/utils/ExceptionUtil';
import { useEffect, useState } from 'react';
import { ShopService } from './classes/shop.service';
import { CreateShopForm } from './components/CreateShopForm';
import { UpdateShopForm } from './components/UpdateShopForm';
import { IShop } from './interfaces/shop.interface';

export default function ShopPage() {
  const [shops, setShops] = useState<IShop[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const loadShops = catchAndAlert(async () => {
    const data = (await ShopService.getAllShops()) as IShop[];
    setShops(data);
  });

  useEffect(() => {
    loadShops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteShop = (id: string) => {
    catchAndAlert(async () => {
      await ShopService.deleteShop(id);
      await loadShops();
    })();
  };

  const handleUpdateSuccess = () => {
    setSelectedShopId(null);
    loadShops();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shops</h1>
      <button
        onClick={() => {
          setIsCreating(true);
          setSelectedShopId(null);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Create New Shop
      </button>

      {isCreating && (
        <div className="mb-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Create Shop</h2>
          <CreateShopForm onSuccess={() => setIsCreating(false)} onRefresh={loadShops} />
          <button onClick={() => setIsCreating(false)} className="mt-2 text-gray-600 hover:text-gray-800">
            Cancel
          </button>
        </div>
      )}

      {selectedShopId && (
        <div className="mb-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Update Shop</h2>
          <UpdateShopForm shopId={selectedShopId} onSuccess={handleUpdateSuccess} />
          <button onClick={() => setSelectedShopId(null)} className="mt-2 text-gray-600 hover:text-gray-800">
            Cancel
          </button>
        </div>
      )}

      <div className="grid gap-4">
        {shops.map((shop) => (
          <div key={shop._id} className="border p-4 rounded">
            <h3 className="text-lg font-semibold">{shop.name}</h3>
            <p className="text-gray-600">{shop.description}</p>
            <p className="text-sm text-gray-500">Owner ID: {shop.owner}</p>
            <div className="flex items-center mt-2">
              <span
                className={`px-2 py-1 rounded text-sm ${
                  shop.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {shop.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setSelectedShopId(shop._id);
                  setIsCreating(false);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this shop?')) {
                    handleDeleteShop(shop._id);
                  }
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
