import { Item } from "./item.model";

export class RawItem {
  itemHash?: number;               // ID do item (usado para buscar no Manifest)
  itemInstanceId?: string;         // ID único da instância (útil para perks, mods, etc.)
  quantity?: number;               // Sempre 1 para equipamentos
  bindStatus?: number;
  location?: number;               // Ex: 1 = Character, 2 = Vault, etc.
  bucketHash?: number;            // Tipo de slot (Helmet, Kinetic, Chest etc.)
  transferStatus?: number;
  lockable?: boolean;
  state?: ItemState;                 // Flags (equipado, masterworked, travado, etc.)
  dismantlePermission?: number;
  isWrapper?: boolean;
  tooltipNotificationIndexes?: number[];
  versionNumber?: number;
  overrideStyleItemHash?: number;
  definition?: Item | null; // Item definition fetched from the manifest
}

export enum ItemState {
  None = 0,
  Equipped = 1 << 0,  // 1
  Locked = 1 << 1,    // 2
  Masterwork = 1 << 2 // 4
  // Add more states as needed
}