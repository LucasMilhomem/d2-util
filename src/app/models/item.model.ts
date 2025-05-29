enum ClassType {
  Titan = 0,
  Hunter = 1,
  Warlock = 2,
  Unknown = 3 // ou “Any”
}

export class Item {
  displayProperties?: {
    name: string;
    description: string;
    icon: string; // exemplo: "/common/destiny2_content/icons/xyz.png"
    hasIcon: boolean;
  };
  itemTypeDisplayName?: string;     // Ex: "Auto Rifle"
  itemTypeAndTierDisplayName?: string; // Ex: "Legendary Auto Rifle"
  inventory?: {
    tierTypeName: string;          // Ex: "Legendary"
    tierType: number;              // Ex: 5 = Legendary
    stackUniqueLabel?: string;
  };
  stats?: {
    statGroupHash: number;
    stats: {
      [statHash: string]: {
        value: number;
        statHash: number;
      };
    };
  };
  equippable?: boolean;
  itemType?: number;
  itemSubType?: number;
  classType?: ClassType; // 0 = Titan, 1 = Hunter, 2 = Warlock, 3 = Any
  hash?: number;
  index?: number;
  redacted?: boolean;
}