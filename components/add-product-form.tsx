'use client';

import { useState } from 'react';
import Image from 'next/image';

type FormData = {
  artistName: string;
  slug: string;
  title: string;
  description: string;
  genre: string;
  price: string;
  color: string;
  spotifyLink: string;
  category: string;
  bestseller: boolean;
  sizes: string[];
  colors: string[];
  frontImage: string;
  backImage: string;
  closeupImage: string;
};

export function AddProductForm() {
  const [formData, setFormData] = useState<FormData>({
    artistName: '',
    slug: '',
    title: '',
    description: '',
    genre: '',
    price: '$68',
    color: '#000000',
    spotifyLink: '',
    category: 'tee',
    bestseller: false,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [],
    frontImage: '',
    backImage: '',
    closeupImage: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newColorInput, setNewColorInput] = useState('');

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  }

  function handleArtistNameChange(value: string) {
    setFormData({
      ...formData,
      artistName: value,
      slug: generateSlug(value),
    });
  }

  function handleImageUpload(field: 'frontImage' | 'backImage' | 'closeupImage', file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setFormData({
          ...formData,
          [field]: e.target.result as string,
        });
      }
    };
    reader.readAsDataURL(file);
  }

  function addColor() {
    if (newColorInput.trim() && !formData.colors.includes(newColorInput.trim())) {
      setFormData({
        ...formData,
        colors: [...formData.colors, newColorInput.trim()],
      });
      setNewColorInput('');
    }
  }

  function removeColor(color: string) {
    setFormData({
      ...formData,
      colors: formData.colors.filter((c) => c !== color),
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.artistName || !formData.title) {
      setError('Artist name and title are required');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create product');
      }

      const newProduct = await response.json();
      setSuccess(`Product "${formData.artistName}" created successfully!`);

      // Reset form
      setFormData({
        artistName: '',
        slug: '',
        title: '',
        description: '',
        genre: '',
        price: '$68',
        color: '#000000',
        spotifyLink: '',
        category: 'tee',
        bestseller: false,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [],
        frontImage: '',
        backImage: '',
        closeupImage: '',
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl grid gap-6 border-t border-line pt-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="font-mono text-[10px] uppercase tracking-widest text-grey">Artist Name *</span>
          <input
            type="text"
            value={formData.artistName}
            onChange={(e) => handleArtistNameChange(e.target.value)}
            placeholder="e.g., Frank Ocean"
            required
            className="mt-2 w-full border-b border-line bg-transparent px-0 py-2 text-paper placeholder-grey/50 focus:border-signal focus:outline-none"
            disabled={loading}
          />
        </label>

        <label>
          <span className="font-mono text-[10px] uppercase tracking-widest text-grey">Slug (auto-generated)</span>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="mt-2 w-full border-b border-line bg-transparent px-0 py-2 text-paper placeholder-grey/50 focus:border-signal focus:outline-none"
            disabled={loading}
          />
        </label>
      </div>

      <label>
        <span className="font-mono text-[10px] uppercase tracking-widest text-grey">Title *</span>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., Frank Ocean Tee"
          required
          className="mt-2 w-full border-b border-line bg-transparent px-0 py-2 text-paper placeholder-grey/50 focus:border-signal focus:outline-none"
          disabled={loading}
        />
      </label>

      <label>
        <span className="font-mono text-[10px] uppercase tracking-widest text-grey">Description</span>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Product description..."
          rows={3}
          className="mt-2 w-full border border-line bg-transparent px-3 py-2 text-paper placeholder-grey/50 focus:border-signal focus:outline-none"
          disabled={loading}
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <label>
          <span className="font-mono text-[10px] uppercase tracking-widest text-grey">Genre</span>
          <input
            type="text"
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            placeholder="e.g., alternative / r&b"
            className="mt-2 w-full border-b border-line bg-transparent px-0 py-2 text-paper placeholder-grey/50 focus:border-signal focus:outline-none"
            disabled={loading}
          />
        </label>

        <label>
          <span className="font-mono text-[10px] uppercase tracking-widest text-grey">Price</span>
          <input
            type="text"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="$68"
            className="mt-2 w-full border-b border-line bg-transparent px-0 py-2 text-paper placeholder-grey/50 focus:border-signal focus:outline-none"
            disabled={loading}
          />
        </label>

        <label>
          <span className="font-mono text-[10px] uppercase tracking-widest text-grey">Signature Color</span>
          <input
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="mt-2 h-10 w-full border border-line cursor-pointer"
            disabled={loading}
          />
        </label>
      </div>

      <label>
        <span className="font-mono text-[10px] uppercase tracking-widest text-grey">Spotify Link</span>
        <input
          type="url"
          value={formData.spotifyLink}
          onChange={(e) => setFormData({ ...formData, spotifyLink: e.target.value })}
          placeholder="https://open.spotify.com/..."
          className="mt-2 w-full border-b border-line bg-transparent px-0 py-2 text-paper placeholder-grey/50 focus:border-signal focus:outline-none"
          disabled={loading}
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="font-mono text-[10px] uppercase tracking-widest text-grey">Category</span>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-2 w-full border border-line bg-ink px-3 py-2 text-paper focus:border-signal focus:outline-none"
            disabled={loading}
          >
            <option value="tee">T-shirt</option>
            <option value="long-sleeve">Long sleeve</option>
            <option value="hoodie">Hoodie</option>
          </select>
        </label>

        <label className="flex items-end gap-2">
          <input
            type="checkbox"
            checked={formData.bestseller}
            onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
            className="h-5 w-5 cursor-pointer border border-line"
            disabled={loading}
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-grey">Mark as bestseller</span>
        </label>
      </div>

      {/* Colors */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-grey mb-2">Available Colors</p>
        <div className="flex gap-2 mb-2 flex-wrap">
          {formData.colors.map((color) => (
            <div key={color} className="flex items-center gap-2 bg-ink-2 px-3 py-1 rounded border border-line">
              <span className="text-sm">{color}</span>
              <button
                type="button"
                onClick={() => removeColor(color)}
                className="text-signal hover:text-paper transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newColorInput}
            onChange={(e) => setNewColorInput(e.target.value)}
            placeholder="Add color (e.g., Black)"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())}
            className="flex-1 border-b border-line bg-transparent px-0 py-2 text-paper placeholder-grey/50 focus:border-signal focus:outline-none"
            disabled={loading}
          />
          <button
            type="button"
            onClick={addColor}
            className="font-mono text-[10px] uppercase tracking-widest text-signal hover:text-paper transition"
            disabled={loading}
          >
            Add
          </button>
        </div>
      </div>

      {/* Images */}
      <div className="border-t border-line pt-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-signal mb-4">Upload Images</p>

        <div className="grid gap-4 md:grid-cols-3">
          <label>
            <span className="font-mono text-[10px] uppercase tracking-widest text-grey">Front Image</span>
            <div className="mt-2 border border-line p-4 hover:bg-ink-2 transition cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageUpload('frontImage', e.target.files[0])}
                className="hidden"
                disabled={loading}
              />
              {formData.frontImage ? (
                <div className="relative aspect-square">
                  <Image
                    src={formData.frontImage}
                    alt="Front"
                    fill
                    className="object-cover rounded"
                  />
                </div>
              ) : (
                <div className="aspect-square flex items-center justify-center text-grey">
                  <span className="text-[10px] uppercase">Click to upload</span>
                </div>
              )}
            </div>
          </label>

          <label>
            <span className="font-mono text-[10px] uppercase tracking-widest text-grey">Back Image</span>
            <div className="mt-2 border border-line p-4 hover:bg-ink-2 transition cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageUpload('backImage', e.target.files[0])}
                className="hidden"
                disabled={loading}
              />
              {formData.backImage ? (
                <div className="relative aspect-square">
                  <Image
                    src={formData.backImage}
                    alt="Back"
                    fill
                    className="object-cover rounded"
                  />
                </div>
              ) : (
                <div className="aspect-square flex items-center justify-center text-grey">
                  <span className="text-[10px] uppercase">Click to upload</span>
                </div>
              )}
            </div>
          </label>

          <label>
            <span className="font-mono text-[10px] uppercase tracking-widest text-grey">Closeup Image</span>
            <div className="mt-2 border border-line p-4 hover:bg-ink-2 transition cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageUpload('closeupImage', e.target.files[0])}
                className="hidden"
                disabled={loading}
              />
              {formData.closeupImage ? (
                <div className="relative aspect-square">
                  <Image
                    src={formData.closeupImage}
                    alt="Closeup"
                    fill
                    className="object-cover rounded"
                  />
                </div>
              ) : (
                <div className="aspect-square flex items-center justify-center text-grey">
                  <span className="text-[10px] uppercase">Click to upload</span>
                </div>
              )}
            </div>
          </label>
        </div>
      </div>

      {error && (
        <p className="font-mono text-[10px] uppercase tracking-widest text-signal">{error}</p>
      )}

      {success && (
        <div className="border border-signal p-4 bg-signal/10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-signal">{success}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full bg-signal px-6 py-4 text-left font-mono text-[11px] font-bold uppercase tracking-widest text-paper transition hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Creating product...' : 'Create product'} <span className="float-right">↗</span>
      </button>
    </form>
  );
}
