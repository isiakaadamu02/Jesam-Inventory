import { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "../(components)/Header";

type ProductFormData = {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
};

type CreateProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (FormData: ProductFormData) => void;
}

const CreateProductModal = ({ isOpen, onClose, onCreate }: CreateProductModalProps) => {
    const [formData, setFormData] = useState({
        productId: v4(),
        name: "",
        price: 0,
        stockQuantity: 0,
        rating: 0,
    });

     const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: name === "price" || name === "stockQuantity" || name === "rating" ? parseFloat(value) : value,
        })
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setImageFile(file);
        // Revoke previous preview URL to avoid memory leaks
        if (preview) URL.revokeObjectURL(preview);
        setPreview(file ? URL.createObjectURL(file) : null);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCreate(formData);
        onClose();

        // Reset form
        setFormData({ productId: v4(), name: "", price: 0, stockQuantity: 0, rating: 0 });
        setImageFile(null);
        setPreview(null);
    }

    if(!isOpen) return null;

     const labelCssStyles = "block text-sm font-medium text-gray-700";
     const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product"/>

        <form onSubmit={handleSubmit} className="mt-5">
            {/* PRODUCT NAME */}
            <label htmlFor="productName" className={labelCssStyles}>Product Name</label>
            <input 
                type="text" 
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={formData.name}
                className={inputCssStyles}
                required
            />

            {/* PRICE */}
          <label htmlFor="productPrice" className={labelCssStyles}>
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            className={inputCssStyles}
            required
          />

          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputCssStyles}
            required
          />

           {/* RATING */}
          <label htmlFor="rating" className={labelCssStyles}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating}
            className={inputCssStyles}
            required
          />

           {/* IMAGE UPLOAD */}
                    <label className={labelCssStyles}>Product Image</label>
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageChange}
                        className={inputCssStyles}
                    />
                    {/* PREVIEW */}
                    {preview && (
                        <div className="mb-2 relative">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-40 object-cover rounded-md border border-gray-300"
                            />
                            <button
                                type="button"
                                onClick={() => { setImageFile(null); setPreview(null); }}
                                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded hover:bg-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    )}

           {/* CREATE ACTIONS */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Create
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 cursor-pointer"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProductModal
