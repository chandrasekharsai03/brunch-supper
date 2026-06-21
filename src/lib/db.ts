import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const useSupabase = !!(supabaseUrl && supabaseServiceKey);

let supabaseClient: ReturnType<typeof createClient> | null = null;
function sb() {
  if (!useSupabase) return null;
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    });
  }
  return supabaseClient;
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getFilePath(collection: string): string {
  ensureDir(DATA_DIR);
  return path.join(DATA_DIR, `${collection}.json`);
}

function readData<T>(collection: string): T[] {
  const filePath = getFilePath(collection);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
    return [];
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function writeData<T>(collection: string, data: T[]): void {
  const filePath = getFilePath(collection);
  ensureDir(DATA_DIR);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getAll<T>(collection: string): Promise<T[]> {
  const client = sb();
  if (client) {
    const { data } = await client.from(collection).select('*').order('createdAt', { ascending: false });
    return (data || []) as T[];
  }
  return readData<T>(collection);
}

export async function getById<T extends { id: string }>(collection: string, id: string): Promise<T | null> {
  const client = sb();
  if (client) {
    const { data } = await client.from(collection).select('*').eq('id', id).single();
    return data as T | null;
  }
  const items = readData<T>(collection);
  return items.find(item => item.id === id) || null;
}

export async function create<T extends { id: string }>(collection: string, item: T): Promise<T> {
  const client = sb();
  if (client) {
    await (client.from(collection) as any).insert(item);
    return item;
  }
  const items = readData<T>(collection);
  items.push(item);
  writeData(collection, items);
  return item;
}

export async function update<T extends { id: string }>(collection: string, id: string, updates: Partial<T>): Promise<T | null> {
  const client = sb();
  if (client) {
    const { data } = await (client.from(collection) as any).update(updates).eq('id', id).select().single();
    return data as T | null;
  }
  const items = readData<T>(collection);
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...updates };
  writeData(collection, items);
  return items[index];
}

export async function remove<T extends { id: string }>(collection: string, id: string): Promise<boolean> {
  const client = sb();
  if (client) {
    const { error } = await client.from(collection).delete().eq('id', id);
    return !error;
  }
  const items = readData<T>(collection);
  const filtered = items.filter(item => item.id !== id);
  if (filtered.length === items.length) return false;
  writeData(collection, filtered);
  return true;
}

export async function saveFile(buffer: Buffer, filename: string): Promise<string> {
  const client = sb();
  if (client) {
    const uniqueName = `${Date.now()}-${filename}`;
    const { data } = await client.storage.from('uploads').upload(uniqueName, buffer, {
      contentType: filename.endsWith('.png') ? 'image/png' : 'image/jpeg',
      upsert: true,
    });
    if (data) {
      const { data: urlData } = client.storage.from('uploads').getPublicUrl(uniqueName);
      return urlData.publicUrl;
    }
  }
  ensureDir(UPLOADS_DIR);
  const uniqueName = `${Date.now()}-${filename}`;
  const filePath = path.join(UPLOADS_DIR, uniqueName);
  fs.writeFileSync(filePath, buffer);
  return `/uploads/${uniqueName}`;
}

export async function deleteFile(url: string): Promise<void> {
  if (!url || url.startsWith('http')) return;
  const client = sb();
  if (client && url.includes('/')) {
    const filename = url.split('/').pop();
    if (filename) {
      await client.storage.from('uploads').remove([filename]);
      return;
    }
  }
  const filePath = path.join(process.cwd(), 'public', url);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}
