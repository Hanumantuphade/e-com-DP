// app/allproducts/page.tsx
import React, { Suspense } from 'react'
import AllProductsPage from './AllProductsClient';




export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading products…</div>}>
      <AllProductsPage/>
    </Suspense>
  );
}
