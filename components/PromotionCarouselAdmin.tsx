"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import toastr from "toastr";
import { Pencil, Trash2, X } from "lucide-react";

type Item = {
  id: string;
  name: string;
  description: string;
  offer: string;
  imageUrl: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function PromotionCarouselAdmin() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [editingId, setEditingId] = useState<string | null>(null);
  const editingItem = useMemo(() => items.find((i) => i.id === editingId) || null, [items, editingId]);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editOffer, setEditOffer] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    toastr.options = {
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      positionClass: "toast-top-right",
      timeOut: 3000,
    } as any;
  }, []);

  const resetForm = () => {
    setName("");
    setDescription("");
    setOffer("");
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFieldErrors({});
  };

  const onSelectFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const validateClient = (data: { name: string; description: string; offer: string; file: File | null; }) => {
    const errs: Record<string, string> = {};
    const t = (s: string) => s.trim();
    const n = t(data.name);
    if (!n) errs.name = "Name is required"; else if (n.length < 2 || n.length > 100) errs.name = "2-100 chars";
    const d = t(data.description);
    if (!d) errs.description = "Description is required"; else if (d.length < 1 || d.length > 500) errs.description = "1-500 chars";
    const o = t(data.offer);
    if (!o) errs.offer = "Offer is required"; else if (o.length < 1 || o.length > 50) errs.offer = "1-50 chars";
    if (!data.file) errs.image = "Image is required";
    return errs;
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/uploads", { method: "POST", body: fd });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      throw new Error(j?.error || `Upload failed: ${res.status}`);
    }
    const j = await res.json();
    return String(j.url);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    const errs = validateClient({ name, description, offer, file });
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    try {
      setSubmitting(true);
      const imageUrl = await uploadImage(file as File);
      const res = await fetch("/api/admin/promotion-carousel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim(), offer: offer.trim(), imageUrl })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        if (j?.errors) setFieldErrors(j.errors);
        throw new Error(j?.error || `Failed: ${res.status}`);
      }
      const created: Item = await res.json();
      setItems((prev) => [created, ...prev]);
      toastr.success("Added to carousel");
      resetForm();
    } catch (err: any) {
      toastr.error(err?.message || "Failed to add item");
    } finally {
      setSubmitting(false);
    }
  };

  const markBusy = (id: string, on: boolean) => {
    setBusyIds((prev) => {
      const ns = new Set(prev);
      if (on) ns.add(id); else ns.delete(id);
      return ns;
    });
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this carousel product?")) return;
    markBusy(id, true);
    const prev = items.slice();
    setItems((p) => p.filter((x) => x.id !== id));
    try {
      const res = await fetch(`/api/admin/promotion-carousel/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      toastr.success("Deleted");
    } catch (e) {
      setItems(prev);
      toastr.error("Failed to delete");
    } finally {
      markBusy(id, false);
    }
  };

  const openEdit = (item: Item) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditDescription(item.description);
    setEditOffer(item.offer);
    setEditFile(null);
    if (editPreview) URL.revokeObjectURL(editPreview);
    setEditPreview(null);
  };

  const onSelectEditFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0] || null;
    setEditFile(f);
    if (editPreview) URL.revokeObjectURL(editPreview);
    setEditPreview(f ? URL.createObjectURL(f) : null);
  };

  const onUpdate = async () => {
    if (!editingItem) return;
    try {
      setSaving(true);
      let imageUrl: string | undefined = undefined;
      if (editFile) imageUrl = await uploadImage(editFile);
      const body: any = {};
      if (editName.trim() !== editingItem.name) body.name = editName.trim();
      if (editDescription.trim() !== editingItem.description) body.description = editDescription.trim();
      if (editOffer.trim() !== editingItem.offer) body.offer = editOffer.trim();
      if (imageUrl) body.imageUrl = imageUrl;
      const res = await fetch(`/api/admin/promotion-carousel/${editingItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        toastr.error(j?.error || `Failed: ${res.status}`);
        return;
      }
      const updated: Item = await res.json();
      setItems((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
      toastr.success("Updated");
      closeEdit();
    } catch (e: any) {
      toastr.error(e?.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const closeEdit = () => {
    setEditingId(null);
    if (editPreview) URL.revokeObjectURL(editPreview);
    setEditPreview(null);
  };

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/promotion-carousel", { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const data: Item[] = await res.json();
      setItems(data);
    } catch (e: any) {
      setError(e?.message || "Failed to load");
      toastr.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold mb-4">Add Carousel Product</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Offer</label>
              <input value={offer} onChange={(e) => setOffer(e.target.value)} placeholder="Offer" className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {fieldErrors.offer && <p className="text-sm text-red-600 mt-1">{fieldErrors.offer}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {fieldErrors.description && <p className="text-sm text-red-600 mt-1">{fieldErrors.description}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onSelectFile} className="mt-1 block w-full" />
              {fieldErrors.image && <p className="text-sm text-red-600 mt-1">{fieldErrors.image}</p>}
            </div>
          </div>
          {preview && (
            <div className="mt-2">
              <div className="relative h-40 w-60 border rounded overflow-hidden">
                <Image src={preview} alt="Preview" fill className="object-cover" />
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <button type="submit" disabled={submitting} className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50">
              {submitting ? "Adding..." : "Add"}
            </button>
            <button type="button" onClick={resetForm} className="inline-flex items-center rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200">
              Reset
            </button>
          </div>
        </form>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">Current Products</h3>
        <div className="bg-white shadow-sm rounded-lg p-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-red-600">{error}</td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">No promoted products yet. Add your first one above.</td>
                </tr>
              ) : (
                items.map((it) => {
                  const isBusy = busyIds.has(it.id);
                  return (
                    <tr key={it.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="relative h-12 w-12 rounded overflow-hidden border">
                          <Image src={it.imageUrl} alt={it.name} fill className="object-cover" />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{it.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-md truncate" title={it.description}>{it.description}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{it.offer}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => openEdit(it)} className="p-2 rounded hover:bg-blue-50" aria-label="Edit">
                          <Pencil className="h-5 w-5 text-blue-600" />
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => onDelete(it.id)} disabled={isBusy} className="p-2 rounded hover:bg-red-50 disabled:opacity-50" aria-label="Delete">
                          <Trash2 className="h-5 w-5 text-red-600" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeEdit} />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Edit Carousel Product</h4>
              <button onClick={closeEdit} aria-label="Close" className="p-1 rounded hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input value={editName} onChange={(e) => setEditName(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Offer</label>
                <input value={editOffer} onChange={(e) => setEditOffer(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-24 border rounded overflow-hidden">
                    <Image src={editPreview || editingItem.imageUrl} alt={editingItem.name} fill className="object-cover" />
                  </div>
                  <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onSelectEditFile} />
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button onClick={closeEdit} className="inline-flex items-center rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200">Cancel</button>
                <button onClick={onUpdate} disabled={saving} className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50">
                  {saving ? "Saving..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
