"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import toastr from "toastr";
import { getCategories } from "@/services/category-service";
import { CategoryWithImage } from "@/types";
import { formatPrice } from "@/utils/format";
import { Plus, Trash2 } from "lucide-react";

export default function FeaturedListsView() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submittingIds, setSubmittingIds] = useState<Set<string>>(new Set());

  const [categories, setCategories] = useState<CategoryWithImage[]>([]);
  const categoryNameById = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach(c => map.set(c.id, c.name));
    return map;
  }, [categories]);

  useEffect(() => {
    toastr.options = {
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      positionClass: "toast-top-right",
      timeOut: 3000,
    } as any;
  }, []);

  const loadInitial = async () => {
    try {
      setLoading(true);
      setError(null);
      const [prodRes, cats] = await Promise.all([
        fetch("/api/admin/products", { cache: "no-store" }),
        getCategories(),
      ]);
      if (!prodRes.ok) throw new Error(`Failed to load products: ${prodRes.status}`);
      const prods: Product[] = await prodRes.json();
      setAllProducts(prods);
      setCategories(cats);
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Failed to load data");
      toastr.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitial();
  }, []);

  const featured = allProducts.filter(p => p.isFeatured);
  const unfeatured = allProducts.filter(p => !p.isFeatured);

  const markSubmitting = (id: string, on: boolean) => {
    setSubmittingIds(prev => {
      const ns = new Set(prev);
      if (on) ns.add(id); else ns.delete(id);
      return ns;
    });
  };

  const addToFeatured = async (productId: string) => {
    if (submittingIds.has(productId)) return;
    markSubmitting(productId, true);
    const prev = allProducts.slice();
    setAllProducts(prev.map(p => p.id === productId ? { ...p, isFeatured: true } : p));
    try {
      const res = await fetch("/api/admin/featured-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (!res.ok) {
        throw new Error(`Failed: ${res.status}`);
      }
      toastr.success("Added to Featured");
    } catch (e) {
      console.error(e);
      setAllProducts(prev);
      toastr.error("Failed to add to Featured");
    } finally {
      markSubmitting(productId, false);
    }
  };

  const removeFromFeatured = async (productId: string) => {
    if (submittingIds.has(productId)) return;
    markSubmitting(productId, true);
    const prev = allProducts.slice();
    setAllProducts(prev.map(p => p.id === productId ? { ...p, isFeatured: false } : p));
    try {
      const res = await fetch(`/api/admin/featured-products/${productId}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error(`Failed: ${res.status}`);
      }
      toastr.success("Removed from Featured");
    } catch (e) {
      console.error(e);
      setAllProducts(prev);
      toastr.error("Failed to remove from Featured");
    } finally {
      markSubmitting(productId, false);
    }
  };

  const renderTable = (rows: Product[], action: "add" | "remove") => (
    <div className="bg-white shadow-sm rounded-lg p-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{action === "add" ? "Add" : "Remove"}</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-red-600">{error}</td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">No products</td>
            </tr>
          ) : (
            rows.map((p) => {
              const img = p.images?.[0]?.url || "/placeholder.png";
              const catName = p.category?.name || categoryNameById.get(p.categoryId) || "-";
              const isBusy = submittingIds.has(p.id);
              return (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="relative h-12 w-12 rounded overflow-hidden border">
                      <Image src={img} alt={p.name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{p.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{catName}</td>
                  <td className="px-4 py-3">
                    {action === "add" ? (
                      <button
                        onClick={() => addToFeatured(p.id)}
                        disabled={isBusy}
                        className="p-2 rounded hover:bg-green-50 disabled:opacity-50"
                        title="Add to Featured"
                        aria-label="Add to Featured"
                      >
                        <Plus className="h-5 w-5 text-green-600" />
                      </button>
                    ) : (
                      <button
                        onClick={() => removeFromFeatured(p.id)}
                        disabled={isBusy}
                        className="p-2 rounded hover:bg-red-50 disabled:opacity-50"
                        title="Remove from Featured"
                        aria-label="Remove from Featured"
                      >
                        <Trash2 className="h-5 w-5 text-red-600" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold mb-3">Featured Products</h3>
        {renderTable(featured, "remove")}
      </section>
      <section>
        <h3 className="text-lg font-semibold mb-3">Add to Featured Products</h3>
        {renderTable(unfeatured, "add")}
      </section>
    </div>
  );
}
