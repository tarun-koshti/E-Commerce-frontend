import { catchAndAlert } from '@/shared/utils/ExceptionUtil';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CategoryService } from '../classes/category.service';
import { ICreateCategory } from '../interfaces/create-category.interface';

interface CreateCategoryFormProps {
  onSuccess?: () => void;
  onRefresh?: () => void;
}

export function CreateCategoryForm({ onSuccess, onRefresh }: CreateCategoryFormProps) {
  const [formData, setFormData] = useState<ICreateCategory>({
    name: '',
    description: '',
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    catchAndAlert(async () => {
      setIsLoading(true);
      try {
        await CategoryService.createCategory(formData);
        router.refresh();
        onRefresh?.();
        setFormData({ name: '', description: '', isActive: true });
        onSuccess?.();
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Category Name
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
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          required
        />
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

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? 'Creating...' : 'Create Category'}
      </button>
    </form>
  );
}
