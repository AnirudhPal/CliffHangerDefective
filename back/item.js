/** Item Object & Functions **/
const OFFENSE = 0;
const DEFENSE = 1;
const BASIC = 0;
const RADIUS = 1;
const TRAP = 2;

class Item {

  // Constructor for Item Object
  constructor(name, itemType, attackType, range, damage, rarity, description) {
    this.name = name; // String
    this.itemType = itemType; // 0-offensive, 1-defensive
    this.attackType = attackType; // 0-basic, 1-radius, 2-trap
    this.range = range; // 1, 2
    this.damage = damage; // number
    this.rarity = rarity; //
    this.description = description  // String

  }

  static get OFFENSE() { return OFFENSE; }
  static get DEFENSE() { return DEFENSE; }
  static get BASIC()   { return BASIC;   }
  static get RADIUS()  { return RADIUS;  }
  static get TRAP()    { return TRAP;    }

}
