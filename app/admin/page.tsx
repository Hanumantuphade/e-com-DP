"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import AddProductForm from "@/components/AddProductForm";
import ManageProducts from "@/components/ManageProducts";
import toastr from "toastr";
import { Eye, EyeOff } from "lucide-react";
import AddCategoryForm from "@/components/AddCategoryForm";
import ManageCategoriesTable from "@/components/ManageCategoriesTable";
import FeaturedListsView from "@/components/FeaturedListsView";
import PromotionCarouselAdmin from "@/components/PromotionCarouselAdmin";

export const dynamic = "force-dynamic";

export default function AdminPage() {
	const [activeTab, setActiveTab] = useState<"add" | "manage" | "categories" | "featured" | "promoted">("add");
	const [authed, setAuthed] = useState(false);
	const [password, setPassword] = useState("");
	const [showPwd, setShowPwd] = useState(false);
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

	const onSubmitPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		const pwd = password.trim();
		if (!pwd) {
			toastr.warning("Password is required");
			return;
		}
		setSubmitting(true);
		try {
			const res = await fetch("/api/admin/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ password: pwd }),
			});
			if (!res.ok) {
				const j = await res.json().catch(() => ({}));
				toastr.error(j?.error || `Failed: ${res.status}`);
				return;
			}
			toastr.success("Access granted");
			setAuthed(true);
		} catch (err) {
			console.error(err);
			toastr.error("Unexpected error");
		} finally {
			setSubmitting(false);
		}
	};

	if (!authed) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
				<div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
					<h1 className="text-xl font-semibold text-gray-900 mb-2">
						Admin Access
					</h1>
					<p className="text-sm text-gray-600 mb-6">
						Enter the admin password to continue.
					</p>

					<form onSubmit={onSubmitPassword} className="space-y-4">
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<div className="mt-1 relative">
								<input
									id="password"
									type={showPwd ? "text" : "password"}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="block w-full rounded-md border border-gray-300 p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Enter password"
									autoFocus
								/>
								<button
									type="button"
									onClick={() => setShowPwd((s) => !s)}
									className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
									aria-label={showPwd ? "Hide password" : "Show password"}>
									{showPwd ? (
										<EyeOff className="h-5 w-5" />
									) : (
										<Eye className="h-5 w-5" />
									)}
								</button>
							</div>
						</div>

						<button
							type="submit"
							disabled={submitting}
							className="w-full inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50">
							{submitting ? "Verifying..." : "Enter"}
						</button>
					</form>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Header />

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
				{/* Page Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
					<p className="text-gray-600 mt-1">
						Manage store products
					</p>
				</div>

				{/* Tabs */}
				<div className="border-b border-gray-200 mb-8">
					<nav className="-mb-px flex space-x-8" aria-label="Tabs">
						<button
							onClick={() => setActiveTab("add")}
							className={`whitespace-nowrap py-4 px-1 border-b-2 text-sm font-medium ${
								activeTab === "add"
									? "border-blue-600 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
							}`}> 
							Add Products
						</button>
						<button
							type="button"
							onClick={() => setActiveTab("manage")}
							className={`whitespace-nowrap py-4 px-1 border-b-2 text-sm font-medium ${
								activeTab === "manage"
									? "border-blue-600 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
							}`}> 
							Manage Products
						</button>
						<button
							type="button"
							onClick={() => setActiveTab("categories")}
							className={`whitespace-nowrap py-4 px-1 border-b-2 text-sm font-medium ${
								activeTab === "categories"
									? "border-blue-600 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
							}`}> 
							Categories
						</button>
						<button
							type="button"
							onClick={() => setActiveTab("featured")}
							className={`whitespace-nowrap py-4 px-1 border-b-2 text-sm font-medium ${
								activeTab === "featured"
									? "border-blue-600 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
							}`}> 
							Featured Lists
						</button>
						<button
							type="button"
							onClick={() => setActiveTab("promoted")}
							className={`whitespace-nowrap py-4 px-1 border-b-2 text-sm font-medium ${
								activeTab === "promoted"
									? "border-blue-600 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
							}`}> 
							Promoted Carousel
						</button>
					</nav>
				</div>

				{/* Content */}
				{activeTab === "add" ? (
					<section aria-labelledby="add-products">
						<h2 id="add-products" className="sr-only">
							Add Products
						</h2>
						<div className="bg-white shadow-sm rounded-lg p-6">
							<AddProductForm />
						</div>
					</section>
				) : activeTab === "manage" ? (
					<section aria-labelledby="manage-products">
						<h2 id="manage-products" className="sr-only">
							Manage Products
						</h2>
						<div className="bg-white shadow-sm rounded-lg p-6">
							<ManageProducts />
						</div>
					</section>
				) : activeTab === "featured" ? (
					<section aria-labelledby="featured-lists">
						<h2 id="featured-lists" className="sr-only">
							Featured Lists
						</h2>
						<div className="bg-white shadow-sm rounded-lg p-6">
							<FeaturedListsView />
						</div>
					</section>
				) : activeTab === "promoted" ? (
					<section aria-labelledby="promoted-carousel">
						<h2 id="promoted-carousel" className="sr-only">
							Promoted Carousel
						</h2>
						<div className="bg-white shadow-sm rounded-lg p-6">
							<PromotionCarouselAdmin />
						</div>
					</section>
				) : (
					<section aria-labelledby="manage-categories">
						<h2 id="manage-categories" className="sr-only">
							Manage Categories
						</h2>
						<div className="space-y-6">
							<div className="bg-white shadow-sm rounded-lg p-6">
								<AddCategoryForm />
							</div>
							<div className="bg-white shadow-sm rounded-lg p-6">
								<ManageCategoriesTable />
							</div>
						</div>
					</section>
				)}
			</main>
		</div>
	);
}
