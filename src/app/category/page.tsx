'use client';
import { catchAndAlert } from '@/shared/utils/ExceptionUtil';
import { useEffect, useState } from 'react';
import { CategoryService } from './classes/category.service';
import { CreateCategoryForm } from './components/CreateCategoryForm';
import { UpdateCategoryForm } from './components/UpdateCategoryForm';
import { ICategory } from './interfaces/category.interface';

export default function CategoryPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const loadCategories = catchAndAlert(async () => {
    const data = (await CategoryService.getAllCategories()) as ICategory[];
    setCategories(data);
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDeleteCategory = (id: string) => {
    catchAndAlert(async () => {
      await CategoryService.deleteCategory(id);
      await loadCategories();
    })();
  };

  const handleUpdateSuccess = () => {
    setSelectedCategoryId(null);
    loadCategories();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <button
        onClick={() => {
          setIsCreating(true);
          setSelectedCategoryId(null);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Create New Category
      </button>

      {isCreating && (
        <div className="mb-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Create Category</h2>
          <CreateCategoryForm onSuccess={() => setIsCreating(false)} onRefresh={loadCategories} />
          <button onClick={() => setIsCreating(false)} className="mt-2 text-gray-600 hover:text-gray-800">
            Cancel
          </button>
        </div>
      )}

      {selectedCategoryId && (
        <div className="mb-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Update Category</h2>
          <UpdateCategoryForm categoryId={selectedCategoryId} onSuccess={handleUpdateSuccess} />
          <button onClick={() => setSelectedCategoryId(null)} className="mt-2 text-gray-600 hover:text-gray-800">
            Cancel
          </button>
        </div>
      )}

      <div className="grid gap-4">
        {categories.map((category) => (
          <div key={category._id} className="border p-4 rounded">
            <h3 className="text-lg font-semibold">{category.name}</h3>
            <p className="text-gray-600">{category.description}</p>
            <div className="flex items-center mt-2">
              <span
                className={`px-2 py-1 rounded text-sm ${
                  category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {category.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setSelectedCategoryId(category._id);
                  setIsCreating(false);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCategory(category._id)}
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
