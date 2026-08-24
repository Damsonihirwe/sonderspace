'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  slug: string;
  genre: string;
  price: string;
  image: string;
  frontImage: string;
  backImage: string;
  closeupImage: string;
  category: string;
  bestseller: boolean;
  featured: boolean;
  createdAt: string;
};

type EditForm = {
  name: string;
  slug: string;
  genre: string;
  price: string;
  category: string;
  bestseller: boolean;
  featured: boolean;
  frontImage: string;
  backImage: string;
  closeupImage: string;
};

export function AdminProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [saving, setSaving] = useState(false);

  const [editForm, setEditForm] = useState<EditForm>({
    name: '',
    slug: '',
    genre: '',
    price: '',
    category: 'tee',
    bestseller: false,
    featured: false,
    frontImage: '',
    backImage: '',
    closeupImage: '',
  });

  // =========================
  // DELETE PRODUCT
  // =========================

  async function handleDelete(id: string, name: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"? This cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(id);
    setError('');

    try {
      const response = await fetch(
        `/api/admin/products/${id}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Failed to delete product'
        );
      }

      setProducts((current) =>
        current.filter((product) => product.id !== id)
      );

      if (editingProduct?.id === id) {
        setEditingProduct(null);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to delete product'
      );
    } finally {
      setDeletingId(null);
    }
  }

  // =========================
  // START EDITING
  // =========================

  function startEditing(product: Product) {
    setEditingProduct(product);

    setEditForm({
      name: product.name,
      slug: product.slug,
      genre: product.genre,
      price: product.price,
      category: product.category,
      bestseller: product.bestseller,
      featured: product.featured,

      frontImage:
        product.frontImage ||
        product.image ||
        '',

      backImage:
        product.backImage ||
        '',

      closeupImage:
        product.closeupImage ||
        '',
    });

    setError('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // =========================
  // CANCEL EDIT
  // =========================

  function cancelEditing() {
    setEditingProduct(null);

    setEditForm({
      name: '',
      slug: '',
      genre: '',
      price: '',
      category: 'tee',
      bestseller: false,
      featured: false,
      frontImage: '',
      backImage: '',
      closeupImage: '',
    });
  }

  // =========================
  // IMAGE UPLOAD
  // =========================

  function handleImageUpload(
    field:
      | 'frontImage'
      | 'backImage'
      | 'closeupImage',
    file: File
  ) {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setEditForm((current) => ({
          ...current,
          [field]: reader.result as string,
        }));
      }
    };

    reader.readAsDataURL(file);
  }

  // =========================
  // SAVE EDIT
  // =========================

  async function handleSaveEdit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!editingProduct) return;

    setSaving(true);
    setError('');

    try {
      const response = await fetch(
        `/api/admin/products/${editingProduct.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Failed to update product'
        );
      }

      setProducts((current) =>
        current.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                ...data,
              }
            : product
        )
      );

      cancelEditing();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to update product'
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================
  // LOAD PRODUCTS
  // =========================

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(
          '/api/admin/products'
        );

        if (!response.ok) {
          throw new Error(
            'Failed to load products'
          );
        }

        const data = await response.json();

        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load products'
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="border border-line p-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
          Loading products...
        </p>
      </div>
    );
  }

  // =========================
  // NO PRODUCTS
  // =========================

  if (products.length === 0) {
    return (
      <div className="border border-line p-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
          No products yet
        </p>

        {error && (
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-signal">
            {error}
          </p>
        )}
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 border border-signal p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
            {error}
          </p>
        </div>
      )}

      {/* =========================
          EDIT FORM
      ========================= */}

      {editingProduct && (
        <div className="mb-8 border border-signal p-6">

          {/* Header */}

          <div className="mb-8 flex items-center justify-between">

            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
                Editing product
              </p>

              <h2 className="mt-2 font-display text-4xl uppercase">
                {editingProduct.name}
              </h2>
            </div>

            <button
              type="button"
              onClick={cancelEditing}
              disabled={saving}
              className="border border-line px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-grey transition hover:border-signal hover:text-signal disabled:opacity-50"
            >
              Cancel
            </button>

          </div>

          <form
            onSubmit={handleSaveEdit}
            className="grid gap-6"
          >

            {/* NAME */}

            <label>
              <span className="font-mono text-[10px] uppercase tracking-widest text-grey">
                Product Name
              </span>

              <input
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    name: e.target.value,
                  })
                }
                disabled={saving}
                className="mt-2 w-full border-b border-line bg-transparent px-0 py-2 text-paper focus:border-signal focus:outline-none"
              />
            </label>

            {/* SLUG */}

            <label>
              <span className="font-mono text-[10px] uppercase tracking-widest text-grey">
                Slug
              </span>

              <input
                type="text"
                value={editForm.slug}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    slug: e.target.value,
                  })
                }
                disabled={saving}
                className="mt-2 w-full border-b border-line bg-transparent px-0 py-2 text-paper focus:border-signal focus:outline-none"
              />
            </label>

            {/* GENRE + PRICE */}

            <div className="grid gap-4 md:grid-cols-2">

              <label>
                <span className="font-mono text-[10px] uppercase tracking-widest text-grey">
                  Genre
                </span>

                <input
                  type="text"
                  value={editForm.genre}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      genre: e.target.value,
                    })
                  }
                  disabled={saving}
                  className="mt-2 w-full border-b border-line bg-transparent px-0 py-2 text-paper focus:border-signal focus:outline-none"
                />
              </label>

              <label>
                <span className="font-mono text-[10px] uppercase tracking-widest text-grey">
                  Price
                </span>

                <input
                  type="text"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      price: e.target.value,
                    })
                  }
                  disabled={saving}
                  className="mt-2 w-full border-b border-line bg-transparent px-0 py-2 text-paper focus:border-signal focus:outline-none"
                />
              </label>

            </div>

            {/* CATEGORY */}

            <label>
              <span className="font-mono text-[10px] uppercase tracking-widest text-grey">
                Category
              </span>

              <select
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    category: e.target.value,
                  })
                }
                disabled={saving}
                className="mt-2 w-full border border-line bg-ink px-3 py-2 text-paper focus:border-signal focus:outline-none"
              >
                <option value="tee">
                  T-shirt
                </option>

                <option value="long-sleeve">
                  Long sleeve
                </option>

                <option value="hoodie">
                  Hoodie
                </option>
              </select>
            </label>

            {/* CHECKBOXES */}

            <div className="flex flex-wrap gap-6">

              <label className="flex items-center gap-2">

                <input
                  type="checkbox"
                  checked={editForm.bestseller}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      bestseller: e.target.checked,
                    })
                  }
                  disabled={saving}
                  className="h-4 w-4"
                />

                <span className="font-mono text-[10px] uppercase tracking-widest text-grey">
                  Bestseller
                </span>

              </label>

              <label className="flex items-center gap-2">

                <input
                  type="checkbox"
                  checked={editForm.featured}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      featured: e.target.checked,
                    })
                  }
                  disabled={saving}
                  className="h-4 w-4"
                />

                <span className="font-mono text-[10px] uppercase tracking-widest text-grey">
                  Featured
                </span>

              </label>

            </div>

            {/* =========================
                IMAGES
            ========================= */}

            <div className="border-t border-line pt-6">

              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-signal">
                Product Images
              </p>

              <div className="grid gap-6 md:grid-cols-3">

                {/* FRONT */}

                <div>

                  <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
                    Front Image
                  </p>

                  <div className="mt-3 border border-line p-3">

                    {editForm.frontImage && (
                      <div className="relative mb-3 aspect-square overflow-hidden bg-ink-2">

                        <Image
                          src={editForm.frontImage}
                          alt="Front image"
                          fill
                          className="object-cover"
                          sizes="300px"
                          unoptimized
                        />

                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      disabled={saving}
                      onChange={(e) => {
                        const file =
                          e.target.files?.[0];

                        if (file) {
                          handleImageUpload(
                            'frontImage',
                            file
                          );
                        }
                      }}
                      className="w-full font-mono text-[9px] text-grey"
                    />

                  </div>

                </div>

                {/* BACK */}

                <div>

                  <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
                    Back Image
                  </p>

                  <div className="mt-3 border border-line p-3">

                    {editForm.backImage && (
                      <div className="relative mb-3 aspect-square overflow-hidden bg-ink-2">

                        <Image
                          src={editForm.backImage}
                          alt="Back image"
                          fill
                          className="object-cover"
                          sizes="300px"
                          unoptimized
                        />

                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      disabled={saving}
                      onChange={(e) => {
                        const file =
                          e.target.files?.[0];

                        if (file) {
                          handleImageUpload(
                            'backImage',
                            file
                          );
                        }
                      }}
                      className="w-full font-mono text-[9px] text-grey"
                    />

                  </div>

                </div>

                {/* CLOSEUP */}

                <div>

                  <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
                    Closeup Image
                  </p>

                  <div className="mt-3 border border-line p-3">

                    {editForm.closeupImage && (
                      <div className="relative mb-3 aspect-square overflow-hidden bg-ink-2">

                        <Image
                          src={editForm.closeupImage}
                          alt="Closeup image"
                          fill
                          className="object-cover"
                          sizes="300px"
                          unoptimized
                        />

                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      disabled={saving}
                      onChange={(e) => {
                        const file =
                          e.target.files?.[0];

                        if (file) {
                          handleImageUpload(
                            'closeupImage',
                            file
                          );
                        }
                      }}
                      className="w-full font-mono text-[9px] text-grey"
                    />

                  </div>

                </div>

              </div>
            </div>

            {/* SAVE */}

            <button
              type="submit"
              disabled={saving}
              className="mt-2 w-full bg-signal px-6 py-4 text-left font-mono text-[10px] font-bold uppercase tracking-widest text-paper transition hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? 'Saving changes...'
                : 'Save changes'}

              <span className="float-right">
                ↗
              </span>
            </button>

          </form>
        </div>
      )}

      {/* =========================
          PRODUCTS
      ========================= */}

      <div className="grid gap-4">

        {products.map((product) => (

          <div
            key={product.id}
            className="border border-line p-4 transition hover:bg-ink-2 md:p-6"
          >

            <div className="grid gap-6 md:grid-cols-[140px_1fr_auto] md:items-center">

              {/* PRODUCT IMAGE */}

              <div className="relative aspect-square overflow-hidden bg-ink-2">

                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="140px"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="font-mono text-[9px] uppercase text-grey">
                      No image
                    </span>
                  </div>
                )}

              </div>

              {/* INFORMATION */}

              <div>

                <p className="font-mono text-[9px] uppercase tracking-widest text-signal">
                  {product.category}
                </p>

                <h2 className="mt-2 font-display text-3xl uppercase">
                  {product.name}
                </h2>

                {product.genre && (
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-grey">
                    {product.genre}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-widest text-paper-dim">

                  <span>
                    {product.price}
                  </span>

                  {product.bestseller && (
                    <span className="text-signal">
                      Bestseller
                    </span>
                  )}

                  {product.featured && (
                    <span className="text-signal">
                      Featured
                    </span>
                  )}

                </div>

              </div>

              {/* ACTIONS */}

              <div className="border-t border-line pt-4 md:border-t-0 md:border-l md:pl-6 md:pt-0">

                <p className="font-mono text-[9px] uppercase tracking-widest text-grey">
                  Slug
                </p>

                <p className="mt-2 break-all font-mono text-[10px] text-paper-dim">
                  {product.slug}
                </p>

                <div className="mt-5 flex gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      startEditing(product)
                    }
                    className="border border-line px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-grey transition hover:border-signal hover:text-signal"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    disabled={
                      deletingId === product.id
                    }
                    onClick={() =>
                      handleDelete(
                        product.id,
                        product.name
                      )
                    }
                    className="border border-signal px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-signal transition hover:bg-signal hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deletingId === product.id
                      ? 'Deleting...'
                      : 'Delete'}
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}