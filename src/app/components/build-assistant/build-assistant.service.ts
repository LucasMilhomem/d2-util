import { Injectable } from '@angular/core';
import { BungieApiService } from 'src/app/services/bungie-api.service';
import { ManifestService } from 'src/app/services/manifest.service';
import { ClassType, InventoryData } from 'src/app/models/inventory-data.model';

@Injectable({
  providedIn: 'root'
})
export class BuildAssistantService {
  constructor(
    private manifestService: ManifestService,
    private bungieApiService: BungieApiService,
  ) {}

  loadInventoryData(callback: (data: InventoryData) => void): void {
    this.bungieApiService.getProfileInventory().subscribe({
      next: (data: InventoryData) => {
        // Processa os personagens do tipo Hunter e busca definições dos itens
        callback(data);
      },
      error: (error) => {
        console.error('Error fetching profile inventory:', error);
        callback({
          characters: {},
          profileInventory: []
        });
      }
    });
  }

  getEquippedItemsByCharacter(inventoryData: InventoryData, characterId: string): any[] {
    const character = inventoryData.characters![characterId];
    if (!character || !character.equipment) {
      return [];
    }

    inventoryData.characters![characterId].equipment.forEach(item => {
      this.manifestService.getItemDef(item.itemHash!).then((definition) => {
        console.log(`Fetched definition for item: ${item.itemHash}`, definition);
        item.definition = definition;
      });
    });

    return character.equipment;
  }
}