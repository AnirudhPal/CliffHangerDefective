/** Boardspace Object & Functions **/
const STABLE = 0;
const UNSTABLE = 1;
const FALLEN = 2;

class Boardspace {


  // Constructor for Boardspace Object
  constructor(position, player, trap, loot, fallStage) {
    this.position = position; // integer 0-99
    this.player = player; // player object
    this.trap = trap; // item object
    this.loot = loot; // item object
    this.fallStage = fallStage; // 0,1,2 => stable, unstable, fallen
  }

  // Set player to this boardspace. True or False on success or failure.
  setPlayer(player) {
    if (player instanceof Player && this.playerCanEnter()) {
      this.player = player;
      player.position = this.position;
      return true;
    } else {
      return false;
    }
  }

  // Set a trap to this boardspace. True or False on success or failure.
  setTrap(trap) {
    if (trap instanceof Item && this.trap == null) {
      this.trap = trap;
      return true;
    } else {
      return false;
    }
  }

  // Set loot to this boardspace. True or False on success or failure.
  setLoot(loot) {
    if (loot instanceof Item && this.loot == null) {
      this.loot = loot;
      return true;
    } else {
      return false;
    }
  }

  // Remove player from this boardspace
  removePlayer() {
    this.player = null;
  }

  // Remove a trap from this boardspace.
  removeTrap() {
    this.trap = null;
  }

  // Remove loot from this boardspace.
  removeLoot() {
    this.loot = null;
  }

  // Check if Boardspace is occupied
  hasPlayer() {
    return (this.player != null);
  }

  // Check if Boardspace has a trap
  hasTrap() {
    return (this.trap != null);
  }

  // Check if Boardspace has loot
  hasLoot() {
    return (this.loot != null);
  }

  // Increment the fallStage
  incrementFallStage() {
    if (this.fallStage < FALLEN) {
      this.fallStage += 1;
    }
  }

  // Check if boardspace can be moved on to
  playerCanEnter() {
    return (this.position >= 0 && this.position <= 99);
  }

  static get STABLE() { return STABLE; }
  static get UNSTABLE() { return UNSTABLE; }
  static get FALLEN() { return FALLEN; }

}
