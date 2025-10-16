 # Admin > Promoted Carousel (5th Tab)

 Plan to add a new admin tab that manages items shown on the homepage "Promotion Carousel". The admin tab contains two sections: "Add Carousel Product" and "Current Products". The homepage carousel displays only items present in "Current Products".

 ## Scope & Goals
 - Add the 5th tab in `/admin` named "Promoted Carousel".
 - Provide two sections: "Add Carousel Product" (form) and "Current Products" (table).
 - Remove static items from `components/PromotionCarousel.tsx` and render from backend.
 - Ensure homepage carousel reflects admin changes (add, edit, delete).

 ## UI/UX (Admin)
 ### Section 1: Add Carousel Product (Form)
 - Fields (placeholders):
   - Name → "Name" (required)
   - Description → "Description" (required)
   - Offer → "Offer" (required; short text e.g., "20% OFF")
   - Image → file input (required) with preview visible before submit
 - Actions:
   - Add (primary submit)
   - Reset (secondary) clears fields and preview
 - Behavior:
   - Client-side validation with inline errors
   - On submit success: show toast and append to "Current Products" (optimistic update, then reconcile)
   - On error: show toast; keep inputs intact

 ### Section 2: Current Products (Table)
 - Columns: Image (thumbnail), Name, Description, Offer, Edit (icon), Delete (red trash icon)
 - Sort: newest first (createdAt desc)
 - Actions per row:
   - Edit → opens modal with fields: Name, Description, Offer, Image (current preview + replace option). Buttons: Update, Cancel. On success: toast + update row.
   - Delete → confirmation dialog ("Delete this carousel product?") then remove row on success with toast.
 - Empty state: message "No promoted products yet. Add your first one above."
 - Loading: table skeleton; modal shows saving spinner during update.

 ## Homepage Integration (Promotion Carousel)
 - File: `components/PromotionCarousel.tsx`.
 - Delete static items currently hardcoded.
 - Fetch items from public endpoint and render only those returned.
 - States: loading skeleton, error fallback, empty hides the section (or show tasteful empty message).
 - Display: image, name/description, and offer badge on each slide; autoplay with pause-on-hover.

 ## Data Model
 - Entity: PromotionCarouselItem
   - id (string/UUID)
   - name (string, 2–100)
   - description (string, 1–500)
   - offer (string, 1–50)
   - imageUrl (string)
   - active (boolean, default true)
   - createdAt, updatedAt (timestamps)
   - Optional: productId (string) for future linkage to catalog

 ## API Endpoints
 Public (read-only):
 - GET `/api/promotion-carousel` → returns array of active PromotionCarouselItem sorted by createdAt desc

 Admin (auth required):
 - GET `/api/admin/promotion-carousel` → list all items
 - POST `/api/admin/promotion-carousel` → create item
   - Body: { name, description, offer, imageUrl } or multipart when uploading image inline
 - PATCH `/api/admin/promotion-carousel/:id` → update partial fields { name?, description?, offer?, imageUrl? }
 - DELETE `/api/admin/promotion-carousel/:id` → 204 No Content on success

 Image uploads:
 - POST `/api/admin/uploads` (multipart) → { url } used as `imageUrl`
 - Alternative: signed URL flow; client uploads to storage, then submit `imageUrl` to item endpoints

 ## Validation Rules
 - Name: required, trim, 2–100 chars
 - Description: required, trim, 1–500 chars
 - Offer: required, trim, 1–50 chars (e.g., "20% OFF")
 - Image: required; mime types [jpeg, png, webp]; max 2 MB
 - Server errors: 400 (validation), 413 (payload too large), 415 (unsupported type)

 ## Image Handling & Preview
 - Local preview using object URL; revoke on unmount/reset
 - Submit flow:
   1) User selects image → preview shown
   2) Upload image (uploads endpoint or signed URL) → receive `imageUrl`
   3) Create/Update item using `imageUrl`
 - Optional: future responsive variants & WebP generation

 ## State Management & UX
 - Optimistic updates for create/update/delete with rollback on failure
 - Toast notifications for success/error; inline field messages for validation problems
 - Accessibility: labeled inputs, modal focus trap, keyboard navigation, contrast checks

 ## Security
 - Admin endpoints protected by admin-only access control
 - Public endpoint is read-only and safe for homepage consumption

 ## Performance & Caching
 - Client cache (e.g., SWR) for homepage, with revalidation
 - CDN/cache headers for public GET; purge/invalidate after admin mutations

 ## Acceptance Criteria
 - Admin tab appears as the 5th tab in `/admin` with two sections as described.
 - Add form creates an item; it appears immediately in "Current Products".
 - Edit modal updates any field (including image) and row reflects saved changes.
 - Delete removes the item after confirmation.
 - `components/PromotionCarousel.tsx` no longer uses static data and shows only items from the backend.
 - Removing an item in admin removes it from the homepage on next fetch.
 - Validation and image constraints enforced with clear feedback.

 ## Testing Checklist
 - Create: success + validation failures + invalid/oversized image
 - Update: change each field; replace image; cancel behavior; update conflicts
 - Delete: confirm dialog + removal; error handling
 - Homepage: empty/loading/error states; offer badge renders; images lazy-load
 - Accessibility: modal focus handling; keyboard navigation works in carousel

 ## Rollout Plan
 - Step 1: Implement admin endpoints and UI
 - Step 2: Implement public GET endpoint
 - Step 3: Replace static data in `components/PromotionCarousel.tsx` with live fetch
 - Step 4: QA pass using the testing checklist; fix issues; deploy
