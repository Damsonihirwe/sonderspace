import fs from 'fs';
import path from 'path';
import type { Product, TeeRequest } from '@/lib/types';

const dataDir = path.join(process.cwd(), 'data');
const productsFile = path.join(dataDir, 'products.json');
const requestsFile = path.join(dataDir, 'requests.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Initialize files if they don't exist
function initializeFiles() {
  ensureDataDir();

  if (!fs.existsSync(productsFile)) {
    fs.writeFileSync(productsFile, JSON.stringify([], null, 2));
  }

  if (!fs.existsSync(requestsFile)) {
    fs.writeFileSync(requestsFile, JSON.stringify([], null, 2));
  }
}

export function getAllProducts(): Product[] {
  try {
    initializeFiles();
    const data = fs.readFileSync(productsFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
}

export function addProduct(product: Product): Product {
  try {
    initializeFiles();
    const products = getAllProducts();

    // Check for duplicate slug
    if (products.some((p) => p.slug === product.slug)) {
      throw new Error('Product with this slug already exists');
    }

    products.push(product);
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
    return product;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

export function getAllRequests(): TeeRequest[] {
  try {
    initializeFiles();
    const data = fs.readFileSync(requestsFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading requests:', error);
    return [];
  }
}

export function addRequest(request: TeeRequest): TeeRequest {
  try {
    initializeFiles();
    const requests = getAllRequests();
    requests.push(request);
    fs.writeFileSync(requestsFile, JSON.stringify(requests, null, 2));
    return request;
  } catch (error) {
    console.error('Error adding request:', error);
    throw error;
  }
}
