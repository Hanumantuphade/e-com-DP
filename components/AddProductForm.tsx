"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { getCategories } from "@/services/category-service";
import { CategoryWithImage } from "@/types";
import toastr from "toastr";

interface FormState {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  imageFile: File | null;
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
  categoryId?: string;
  imageFile?: string;
}

export default function AddProductForm() {
  const [categories, setCategories] = useState<CategoryWithImage[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    imageFile: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await getCategories();
        if (isMounted) setCategories(data);
      } catch (e) {
        console.error("Failed to load categories", e);
      } finally {
        if (isMounted) setLoadingCategories(false);
      }
    };
    load();

    const handler = () => {
      setLoadingCategories(true);
      load();
    };
    window.addEventListener("categories:updated", handler as EventListener);
    return () => {
      isMounted = false;
      window.removeEventListener("categories:updated", handler as EventListener);
    };
  }, []);

  useEffect(() => {
    toastr.options = {
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      positionClass: "toast-top-right",
      timeOut: 3000,
    } as any;
  }, []);

  useEffect(() => {
    if (!form.imageFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(form.imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [form.imageFile]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((f) => ({ ...f, imageFile: file }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};

    if (!form.name.trim()) next.name = "Required";
    if (!form.description.trim()) next.description = "Required";

    const priceNum = Number(form.price);
    if (form.price.trim() === "" || Number.isNaN(priceNum)) {
      next.price = "Enter a valid number";
    } else if (priceNum < 0) {
      next.price = "Must be greater than or equal to 0";
    }

    if (!form.categoryId) next.categoryId = "Required";


    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toastr.warning("Please fill all required fields and fix validation errors.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("description", form.description.trim());
      formData.append("price", String(Number(form.price).toFixed(2)));
      formData.append("categoryId", form.categoryId);
      if (form.imageFile) formData.append("image", form.imageFile);

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err?.errors ? JSON.stringify(err.errors) : (err?.error || `Request failed: ${res.status}`);
        toastr.error(msg, "Product creation failed");
        return;
      }

      await res.json();
      toastr.success("Product created successfully.");
      handleReset();
    } catch (err) {
      console.error("Submit error", err);
      toastr.error("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({ name: "", description: "", price: "", categoryId: "", imageFile: null });
    setErrors({});
  };

  const isValid = useMemo(() => {
    const priceNum = Number(form.price);
    return (
      form.name.trim() !== "" &&
      form.description.trim() !== "" &&
      form.categoryId !== "" &&
      form.price.trim() !== "" &&
      !Number.isNaN(priceNum) &&
      priceNum >= 0
    );
  }, [form]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name of the Product
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          required
          value={form.name}
          onChange={onChange}
          className="mt-1 block w-full outline-none p-2 text-sm rounded-md shadow-sm"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          required
          rows={4}
          value={form.description}
          onChange={onChange}
          className="mt-1 block w-full outline-none p-2 text-sm rounded-md shadow-sm"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      {/* Price & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Price"
            required
            min={0}
            step="0.01"
            value={form.price}
            onChange={onChange}
            className="mt-1 block w-full outline-none p-2 text-sm rounded-md shadow-sm"
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            required
            value={form.categoryId}
            onChange={onChange}
            className="mt-1 block w-full outline-none p-2 text-sm rounded-md bg-whiteblue-500"
          >
            <option value="" disabled>
              Category
            </option>
            {loadingCategories ? (
              <option value="" disabled>
                Loading...
              </option>
            ) : (
              categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))
            )}
          </select>
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>
          )}
        </div>
      </div>

      {/* Image */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          placeholder="Image"
          onChange={onFileChange}
          className="mt-1 block w-full outline-none p-2 text-sm text-sm file:mr-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {errors.imageFile && (
          <p className="mt-1 text-sm text-red-600">{errors.imageFile}</p>
        )}

        {/* Preview */}
        {previewUrl && (
          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-24 w-24 rounded overflow-hidden border">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            {form.imageFile?.name && (
              <p className="text-sm text-gray-700 truncate">{form.imageFile.name}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!isValid || submitting}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Reset/Clear
        </button>
      </div>
    </form>
  );
}
