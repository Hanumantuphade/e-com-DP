"use client";

import React, { useEffect, useMemo, useState } from "react";
import toastr from "toastr";
import { Pencil, Trash2, X } from "lucide-react";

interface CategoryRow {
  id: string;
  name: string;
  imageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export default function ManageCategoriesTable() {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit modal state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  // Delete confirm state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    toastr.options = {
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      positionClass: "toast-top-right",
      timeOut: 3000,
    } as any;
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories", { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const data = await res.json();
      setCategories(data);
      setError(null);
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Failed to load categories");
      toastr.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Listen to global category updates
  useEffect(() => {
    const handler = () => fetchCategories();
    window.addEventListener("categories:updated", handler as EventListener);
    return () => window.removeEventListener("categories:updated", handler as EventListener);
  }, []);

  const openEdit = (row: CategoryRow) => {
    setEditId(row.id);
    setEditName(row.name);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setEditId(null);
    setEditName("");
  };

  const submitEdit = async () => {
    if (!editId) return;
    const n = editName.trim();
    if (!n) {
      toastr.warning("Name is required");
      return;
    }
    setSavingEdit(true);
    try {
      const res = await fetch(`/api/admin/categories/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        const msg = j?.errors?.name || j?.error || `Failed: ${res.status}`;
        toastr.error(msg, "Update failed");
        return;
      }
      toastr.success("Category updated successfully.");
      closeEdit();
      await fetchCategories();
      window.dispatchEvent(new CustomEvent("categories:updated"));
    } catch (e) {
      console.error(e);
      toastr.error("Unexpected error");
    } finally {
      setSavingEdit(false);
    }
  };

  const confirmDelete = (id: string) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);

  const doDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/categories/${deleteId}`, { method: "DELETE" });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        if (res.status === 409) {
          toastr.warning(j?.error || "Category is in use and cannot be deleted");
        } else {
          toastr.error(j?.error || `Failed: ${res.status}`);
        }
        return;
      }
      toastr.success("Category deleted successfully.");
      setDeleteId(null);
      await fetchCategories();
      window.dispatchEvent(new CustomEvent("categories:updated"));
    } catch (e) {
      console.error(e);
      toastr.error("Unexpected error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-red-600">{error}</td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">No categories found</td>
              </tr>
            ) : (
              categories.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="h-10 w-10 rounded overflow-hidden border bg-white">
                      <img
                        src={c.imageUrl || "/logo1.png"}
                        alt={c.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{c.name}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openEdit(c)}
                      className="p-2 rounded hover:bg-gray-100"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4 text-gray-700" />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => confirmDelete(c.id)}
                      className="p-2 rounded hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Category</h3>
              <button onClick={closeEdit} className="p-2 rounded hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button onClick={closeEdit} className="px-4 py-2 rounded-md border">Cancel</button>
                <button
                  onClick={submitEdit}
                  disabled={savingEdit}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {savingEdit ? "Saving..." : "Save"}
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
            <h3 className="text-lg font-semibold mb-2">Delete Category</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this category?</p>
            <div className="flex items-center justify-end gap-3">
              <button onClick={cancelDelete} className="px-4 py-2 rounded-md border">Cancel</button>
              <button onClick={doDelete} disabled={deleting} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50">
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
