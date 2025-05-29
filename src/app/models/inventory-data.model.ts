import { RawItem } from "./raw-item.model";

export enum ClassType {
  Titan = 0,
  Hunter = 1,
  Warlock = 2,
  Any = 3
}

export class InventoryData {
  characters?: {
    [characterId: string]: {
      inventory: RawItem[];
      equipment: RawItem[];
      classType?: ClassType; // 0 = Titan, 1 = Hunter, 2 = Warlock, 3 = Any
    };
  };
  profileInventory?: RawItem[];
}