import { Component, OnInit } from '@angular/core';
import { ClassType, InventoryData } from 'src/app/models/inventory-data.model';
import { Item } from 'src/app/models/item.model';
import { BuildAssistantService } from './build-assistant.service';
import { RawItem } from 'src/app/models/raw-item.model';

@Component({
  selector: 'app-build-assistant',
  templateUrl: './build-assistant.component.html',
  styleUrls: ['./build-assistant.component.scss']
})
export class BuildAssistantComponent implements OnInit {

  inventoryData : InventoryData = {
    characters: {},
    profileInventory: []
  };

  equippedItems: RawItem[] = [];
  selectedCharacterId: string | null = null;
  characterOptions: { id: string; classType?: ClassType }[] = [];

  statOrder = [
    2996146975, // Mobility
    392767087,  // Resilience
    1943323491, // Recovery
    1735777505, // Discipline
    144602215,  // Intellect
    4244567218  // Strength
  ];

  constructor(
    private buildAssistantService: BuildAssistantService
  ) { }

  async ngOnInit() {
    await this.buildAssistantService.loadInventoryData(async (data) => {
      this.inventoryData = data;
      console.log('Inventory Data:', this.inventoryData.characters);
  
      this.characterOptions = Object.entries(this.inventoryData.characters || {}).map(
        ([id, data]) => ({
          id,
          classType: data.classType
        })
      );
  
      // Selecionar automaticamente o Caçador se existir
      const hunter = this.characterOptions.find(c => c.classType === ClassType.Hunter);
      if (hunter) {
        this.selectedCharacterId = hunter.id;
        await this.loadEquippedItems(hunter.id);
      }
    });

  }

  getTotalStats(): number[] {
    const total = [0, 0, 0, 0, 0, 0]; // mob, res, rec, dis, int, str

    for (const item of this.equippedItems) {
      const row = this.getItemStatRow(item.definition!);
      row.forEach((val, idx) => total[idx] += val);
    }

    return total;
  }

  getItemStatRow(def: Item): number[] {
    const stats = def.stats?.stats || {};
    const orderedHashes = [
      2996146975, // Mobility
      392767087,  // Resilience
      1943323491, // Recovery
      1735777505, // Discipline
      144602215,  // Intellect
      4244567218  // Strength
    ];

    return orderedHashes.map(hash => stats[hash]?.value ?? 0);
  }

  async loadEquippedItems(characterId: string) {
    this.equippedItems = await this.buildAssistantService.getEquippedItemsByCharacter(this.inventoryData, characterId);
  }

  getItemIcon(item: Item): string {
    return `https://www.bungie.net${item.displayProperties?.icon}`;
  }

  getItemStats(item: Item): { name: string; value: number }[] {
    const stats = item.stats?.stats || {};
    const statMap = {
      2996146975: 'Mobility',
      392767087: 'Resilience',
      1943323491: 'Recovery',
      1735777505: 'Discipline',
      144602215: 'Intellect',
      4244567218: 'Strength'
    };

    return Object.entries(statMap).map(([hash, name]) => ({
      name,
      value: stats[+hash]?.value ?? 0
    }));
  }

  getClassLabel(classType: ClassType): string {
    return ['Titan', 'Hunter', 'Warlock'][classType] || '';
  }

  async onCharacterChange(characterId: string) {
    this.selectedCharacterId = characterId;
    await this.loadEquippedItems(characterId);
  }

}
