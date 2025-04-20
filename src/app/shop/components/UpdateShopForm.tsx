'use client';
import { catchAndAlert } from '@/shared/utils/ExceptionUtil';
import { useEffect, useState } from 'react';
import { ShopService } from '../classes/shop.service';
import { IShop } from '../interfaces/shop.interface';

interface UpdateShopFormProps {
  shopId: string;
  onSuccess?: () => void;
}

export function UpdateShopForm({ shopId, onSuccess }: UpdateShopFormProps) {
  const [formData, setFormData] = useState<Partial<IShop>>({
    name: '',
    email: '',
    phone: '',
    address: {
      address: '',
      city: '',
      state: '',
      pincode: '',
      isPrimary: true,
    },
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadShop = catchAndAlert(async () => {
      const shop = await ShopService.getShopById(shopId);
      setFormData({
        name: shop.name,
        email: shop.email,
        phone: shop.phone,
        address: shop.address,
        isActive: shop.isActive,
      });
      setIsLoading(false);
    });
    loadShop();
  }, [shopId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    catchAndAlert(async () => {
      setIsSubmitting(true);
      try {
        await ShopService.updateShop(shopId, formData);
        onSuccess?.();
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  const handleAddressChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [field]: value,
      },
    });
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Shop Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          autoFocus
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="space-y-4 border p-4 rounded-md">
        <h3 className="text-lg font-medium text-gray-700">Address</h3>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Street Address
          </label>
          <input
            id="address"
            type="text"
            value={formData.address?.address}
            onChange={(e) => handleAddressChange('address', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            id="city"
            type="text"
            value={formData.address?.city}
            onChange={(e) => handleAddressChange('city', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            id="state"
            type="text"
            value={formData.address?.state}
            onChange={(e) => handleAddressChange('state', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
            Pincode
          </label>
          <input
            id="pincode"
            type="text"
            value={formData.address?.pincode}
            onChange={(e) => handleAddressChange('pincode', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="isActive"
          type="checkbox"
          checked={formData.isActive}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
          Active
        </label>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Updating...' : 'Update Shop'}
        </button>
      </div>
    </form>
  );
}
