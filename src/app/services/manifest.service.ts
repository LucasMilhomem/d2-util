import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { openDB, IDBPDatabase } from 'idb';
import { firstValueFrom } from 'rxjs';

interface DestinyItemDefinition {
  displayProperties: {
    name: string;
    description: string;
    icon: string;
  };
  itemTypeDisplayName: string;
  inventory?: {
    tierTypeName: string;
    bucketTypeHash: number;
  };
  stats?: any;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class ManifestService {
  private db!: IDBPDatabase;
  private isInitialized = false;

  constructor(private http: HttpClient) {}

  async init(): Promise<void> {
    if (this.isInitialized) return;
    
    this.db = await openDB('d2-manifest', 1, {
      upgrade(db) {
        db.createObjectStore('items');
      }
    });

    const manifest: any = await firstValueFrom(this.http.get('https://www.bungie.net/Platform/Destiny2/Manifest'));    
    const itemPath = manifest.Response.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition;
    const itemUrl = `/manifest${itemPath}`;

    console.log('[Manifest] Baixando item definitions...');
    const itemDefs = await firstValueFrom(this.http.get<Record<string, DestinyItemDefinition>>(itemUrl));

    const tx = this.db.transaction('items', 'readwrite');
    const store = tx.objectStore('items');
    
    for (const [hash, def] of Object.entries(itemDefs!)) {
      await store.put(def, hash);
    }

    await tx.done;
    this.isInitialized = true;
    console.log('[Manifest] Item definitions carregadas no IndexedDB');
  }

  async getItemDef(itemHash: number): Promise<DestinyItemDefinition | null> {
    if (!this.db) {
      console.warn('[Manifest] DB não inicializado ainda');
      return null;
    }

    return await this.db.get('items', itemHash.toString());
  }
}