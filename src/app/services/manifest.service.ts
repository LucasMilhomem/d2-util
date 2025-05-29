import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { openDB, IDBPDatabase } from 'idb';
import { firstValueFrom } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ManifestService {
  private db!: IDBPDatabase;

  constructor(private http: HttpClient) {}

  async init(): Promise<void> {
    this.db = await openDB('d2-manifest', 1, {
      upgrade(db) {
        db.createObjectStore('items');
      }
    });

    const count = await this.db.count('items');
    if (count > 0) {
      console.log(`[Manifest] ${count} Records where found in db`);
    } else {
      console.log('[Manifest] Empty db...');
      const manifest: any = await firstValueFrom(this.http.get('https://www.bungie.net/Platform/Destiny2/Manifest'));    
      const itemPath = manifest.Response.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition;
      const itemUrl = `/manifest${itemPath}`;
  
      console.log('[Manifest] Downloading item definitions...');
      const itemDefs = await firstValueFrom(this.http.get<Record<string, Item>>(itemUrl));
  
      const tx = this.db.transaction('items', 'readwrite');
      const store = tx.objectStore('items');
      
      for (const [hash, def] of Object.entries(itemDefs!)) {
        await store.put(def, hash);
      }
  
      await tx.done;
      console.log('[Manifest] Item definitions loaded');
    }
  }

  async getItemDef(itemHash: number): Promise<Item | null> {
    await this.init(); // Ensure DB is initialized

    if (!this.db) {
      console.warn('[Manifest] DB not initialized yet');
      return null;
    }

    return await this.db.get('items', itemHash.toString());
  }

  async getItemDefs(itemHashes: number[]): Promise<Item[]> {
    await this.init(); // Ensure DB is initialized

    if (!this.db) {
      console.warn('[Manifest] DB not initialized yet');
      return [];
    }

    const tx = this.db.transaction('items', 'readonly');
    const store = tx.objectStore('items');

    const results: Item[] = [];

    for (const hash of itemHashes) {
      const item = await store.get(hash.toString());
      if (item) {
        results.push(item);
      }
    }

    return results;
  }
}