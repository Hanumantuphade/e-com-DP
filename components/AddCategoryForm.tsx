"use client";

import React, { useEffect, useState } from "react";
import toastr from "toastr";

interface Props {
  onSuccess?: () => void;
}

export default function AddCategoryForm({ onSuccess }: Props) {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    toastr.options = {
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      positionClass: "toast-top-right",
      timeOut: 3000,
    } as any;
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) {
      toastr.warning("Category name is required");
      return;
    }
    if (!file) {
      toastr.warning("Category image is required");
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("name", n);
      fd.append("image", file);
      const res = await fetch("/api/admin/categories", { method: "POST", body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        const msg = j?.errors?.name || j?.errors?.image || j?.error || `Failed: ${res.status}`;
        toastr.error(msg, "Add category failed");
        return;
      }
      await res.json();
      toastr.success("Category added successfully.");
      setName("");
      setFile(null);
      window.dispatchEvent(new CustomEvent("categories:updated"));
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toastr.error("Unexpected error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label htmlFor="category-name" className="block text-sm font-medium text-gray-700">
          Add Category
        </label>
        <div className="mt-1 flex flex-col gap-3">
          <input
            id="category-name"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
              }
            }}
            className="flex-1 outline-none p-2 text-sm rounded-md shadow-sm"
          />
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Add Image
            </label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="text-sm mt-2"
            />
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
