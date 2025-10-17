"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice, truncateText } from "@/utils/format";
import { getCategories } from "@/services/category-service";
import { CategoryWithImage } from "@/types";
import toastr from "toastr";
import { Pencil, Trash2, Search, X } from "lucide-react";

interface EditFormState {
  id: string;
  name: string;
  description: string;
  price: string;
  categoryId: string;
  imageFile: File | null;
}

export default function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const searchDebounce = useRef<NodeJS.Timeout | null>(null);

  const [categories, setCategories] = useState<CategoryWithImage[]>([]);
  const categoryNameById = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach(c => map.set(c.id, c.name));
    return map;
  }, [categories]);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<EditFormState | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);

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
    let isMounted = true;
    const load = async () => {
      try {
        const cats = await getCategories();
        if (isMounted) setCategories(cats);
      } catch (e) {
        console.error("Failed to load categories", e);
      }
    };
    load();
    const handler = () => load();
    window.addEventListener("categories:updated", handler as EventListener);
    return () => {
      isMounted = false;
      window.removeEventListener("categories:updated", handler as EventListener);
    };
  }, []);

  const fetchProducts = async (q = "") => {
    try {
      setLoading(true);
      const qTrim = q.trim();

      const endpoints: string[] = [];
      if (qTrim) {
        endpoints.push(`/api/products?search=${encodeURIComponent(qTrim)}`);
      } else {
        endpoints.push("/api/products");
      }

      if (qTrim && categories.length > 0) {
        const qLower = qTrim.toLowerCase();
        const matchedCategoryIds = categories
          .filter((c) => c.name.toLowerCase().includes(qLower))
          .map((c) => c.id);
        for (const catId of matchedCategoryIds) {
          endpoints.push(`/api/products?categoryId=${encodeURIComponent(catId)}`);
        }
      }

      const responses = await Promise.all(endpoints.map((u) => fetch(u, { cache: "no-store" })));
      for (const r of responses) {
        if (!r.ok) throw new Error(`Failed to load products: ${r.status}`);
      }
      const arrays: Product[][] = await Promise.all(responses.map((r) => r.json()));

      const combined = arrays.flat();
      const map = new Map<string, Product>();
      combined.forEach((p) => map.set(p.id, p));
      const deduped = Array.from(map.values());

      setProducts(deduped);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to load products");
      toastr.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchDebounce.current) clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      fetchProducts(search);
    }, 350);
    return () => {
      if (searchDebounce.current) clearTimeout(searchDebounce.current);
    };
  }, [search]);

  useEffect(() => {
    if (search.trim()) {
      fetchProducts(search);
    }
  }, [categories]);

  const openEdit = (p: Product) => {
    setEditForm({
      id: p.id,
      name: p.name,
      description: p.description || "",
      price: p.price,
      categoryId: p.categoryId,
      imageFile: null,
    });
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setEditForm(null);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!editForm) return;
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editForm) return;
    const file = e.target.files?.[0] ?? null;
    setEditForm({ ...editForm, imageFile: file });
  };

  const submitEdit = async () => {
    if (!editForm) return;

    try {
      let res: Response;
      if (editForm.imageFile) {
        const fd = new FormData();
        fd.append("name", editForm.name.trim());
        fd.append("description", editForm.description.trim());
        fd.append("price", String(Number(editForm.price)));
        fd.append("categoryId", editForm.categoryId);
        fd.append("image", editForm.imageFile);
        res = await fetch(`/api/admin/products/${editForm.id}`, { method: "PATCH", body: fd });
      } else {
        res = await fetch(`/api/admin/products/${editForm.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editForm.name.trim(),
            description: editForm.description.trim(),
            price: Number(editForm.price),
            categoryId: editForm.categoryId,
          }),
        });
      }

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        const msg = j?.error || `Failed: ${res.status}`;
        toastr.error(msg, "Update failed");
        return;
      }

      toastr.success("Product updated successfully.");
      closeEdit();
      fetchProducts(search);
    } catch (e) {
      console.error(e);
      toastr.error("Unexpected error");
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
  };

  const cancelDelete = () => setDeleteId(null);

  const doDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/products/${deleteId}`, { method: "DELETE" });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        toastr.error(j?.error || `Failed: ${res.status}`);
        return;
      }
      toastr.success("Product deleted successfully.");
      setDeleteId(null);
      fetchProducts(search);
    } catch (e) {
      console.error(e);
      toastr.error("Unexpected error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-red-600">{error}</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">No products found</td>
              </tr>
            ) : (
              products.map((p) => {
                const img = p.images?.[0]?.url || "/placeholder.png";
                const desc = truncateText(p.description || "", 100);
                const categoryName = p.category?.name || categoryNameById.get(p.categoryId) || "-";
                return (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="relative h-12 w-12 rounded overflow-hidden border">
                        <Image src={img} alt={p.name} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{p.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs">{desc}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatPrice(p.price)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{categoryName}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-2 rounded hover:bg-gray-100"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4 text-gray-700" />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => confirmDelete(p.id)}
                        className="p-2 rounded hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditOpen && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Product</h3>
              <button onClick={closeEdit} className="p-2 rounded hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    name="price"
                    type="number"
                    min={0}
                    step="0.01"
                    value={editForm.price}
                    onChange={handleEditChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="categoryId"
                    value={editForm.categoryId}
                    onChange={handleEditChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditFile}
                  className="mt-1 w-full text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button onClick={closeEdit} className="px-4 py-2 rounded-md border">Cancel</button>
                <button
                  onClick={submitEdit}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Delete Product</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this product?</p>
            <div className="flex items-center justify-end gap-3">
              <button onClick={cancelDelete} className="px-4 py-2 rounded-md border">Cancel</button>
              <button onClick={doDelete} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
