import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const brand = searchParams.get('brand');
  const search = searchParams.get('search')?.toLowerCase();
  const sort = searchParams.get('sort');

  let filteredProducts = [...PRODUCTS];

  if (category && category !== 'All') {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (brand && brand !== 'All') {
    filteredProducts = filteredProducts.filter(p => p.brand.name === brand);
  }

  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(search) || 
      p.description.toLowerCase().includes(search)
    );
  }

  if (sort === 'price-low') filteredProducts.sort((a, b) => a.priceInr - b.priceInr);
  if (sort === 'price-high') filteredProducts.sort((a, b) => b.priceInr - a.priceInr);
  if (sort === 'newest') filteredProducts = filteredProducts.reverse();

  return NextResponse.json(filteredProducts);
}
