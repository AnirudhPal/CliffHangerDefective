// Implementation of double linked List
function node(player)
{
  this.data = player;
  this.previous = null;
  this.next = null;
}

function doubleList()
{
  this.length = 0;  // we could use this to keep track of players alive!
  this.head = null;
  this.tail = null;
}

// function to add a player to the linked list
doubleList.prototype.addPlayer = function(player)
{
  var newPlayer = new node(player);

  if(this.length == 0)
  {
    this.head = newPlayer;
    this.tail = newPlayer;
    this.head.next = newPlayer;
    this.head.previous = newPlayer;
    this.tail.next = newPlayer;
    this.tail.previous = newPlayer;  // I think we need to set all of these to make it a double linked list and to loop around?

  }
  else
  {
    this.tail.next = newPlayer;
    newPlayer.previous = this.tail;
    newPlayer.next = this.head;
    this.tail = newPlayer;
    this.head.previous = newPlayer;
  }

  this.length++;

  return this.length;  // We can change this if we need to
};  // idk why there is a ; here?


// function to remove a player from the linked list
doubleList.prototype.removePlayer = function(id)  // we can search for the player's id to remove them?
{
  var message1 = {failure: 'Error: List is empty!'};
  var message2 = {failure: 'Error: Player not found!'};
  var nodeToRemove = null;
  var currentNode = this.head;
  var count = 0;

  if(this.length == 1)
  {
    throw new Error(message1.failure);
  }
  else
  {
    while(count < this.length)   // loop through the whole list
    {
      if(currentNode.data.id == id)
      {
        nodeToRemove = currentNode;   // if player found, set it to nodeToRemove
      }
      currentNode = currentNode.next;
      count++;
    }

    if(nodeToRemove == null)    // if not found
    {
      throw new Error(message2.failure);
    }
    else    // if found
    {
      if(nodeToRemove == this.head && this.length == 2)   // it is the only node ( with the sentinel )
      {
        this.head = null;   // empty the list
        this.tail = null;
        this.length = 1;
      }
      else    // this should work for any other case since I made it a double linked list that loops.
      {
        nodeToRemove.previous.next = nodeToRemove.next;
        nodeToRemove.next.previous = nodeToRemove.previous;
        this.head = this.tail.next;
        this.head.previous = this.tail;
        this.length--;
      }
    }
  }

  return this.length;  // We can change this if we need to
};


// module.exports =
class Gameplay {

  //TODO Figure out turn timer.
  // Timer function. Check if player state is still Active after ten seconds
  // Would need to figure out how to track old and current position

  // Const. Linked List (Players), Array for all Items, # Alive, Turn Timer, currPlayer, currItem, fullTurnCount
  constructor(p1, p2, p3, p4) {
    // Linked list of players
    var sentinel = new Player(-1, -1, -1, null, null, null);
    this.playerList = new doubleList();

    this.playerList.addPlayer(p1);
    this.playerList.addPlayer(p2);
    this.playerList.addPlayer(p3);
    this.playerList.addPlayer(p4);
    this.playerList.addPlayer(sentinel);
    // this.playerList = list;

    this.basicAttack = new Item("Basic", 0, 0, 1, 10, 1.00, "The most basic attack. Can hit players above, below, or to the sides for 10 damage.");
    this.pushAttack = new Item("Push", 0, 0, 1, 0, 1.00, "Push your opponents away from you. You can even push them off the edge!");
    // Trackers and counters for various properties of the current game
    this.currPlayer = null, this.currItem = null, this.fullTurnCount = 0;
    this.topBounds = 99, this.lowerBounds = 0, this.leftOffset = 0, this.rightOffset = 9;
    this.size = 100, this.width = 10;

    // Array of boardspaces and positions
    this.board = [];        // Array of Boardspaces representing the game board
    this.attackSpaces = []; // List of spaces that the current attack will hit
    this.moveSpaces = [];   // List of spaces the current player can move to

    // Musket - low damage ranged basic
    // Bolt Action - high damage ranged basic
    // Broadsword - low damage radius
    // Fart - high damage radius
    // Big Fart - low damage ranged radius
    // Nuke - high damage ranged radius
    // Sawed-Off - basic (high damage)
    // Beartrap - trap
    // Landmine - trap (more damage)
    // Minor Potion - defensive, heals 10
    // Major Potion - defensive, heals 30
    // Move Again - defensive, allows player to move again instead of attack
    // Teleport - defensive, allows player to move to any valid boardspace

    this.items = [];
    this.items.push(new Item("Musket", 0, 0, 2, 15, 8, "Musket has 15 damage and radius of 2."));            // 0
    this.items.push(new Item("Bolt Action", 0, 0, 2, 30, 4, "Bolt Action sniper has 30 damage and radius of 2."));  // 1
    this.items.push(new Item("Broadsword", 0, 1, 1, 10, 7, "Broadsword has 10 damage and radius of 1."));    // 2
    this.items.push(new Item("Fart", 0, 1, 1, 0, 4, "Fart has 25 damage and radius of 1."));                // 3
    this.items.push(new Item("Big Fart", 0, 1, 2, 0, 5, "Big Fart has 15 damage and radius of 2."));        // 4
    this.items.push(new Item("Nuke", 0, 1, 2, 25, 2, "Nuke has 25 damage and radius of 2."));                // 5
    this.items.push(new Item("Sawed-Off", 0, 0, 1, 30, 4, "Sawed-off shotgun has 30 damage and radius of 1."));      // 6
    this.items.push(new Item("Beartrap", 0, 2, 0, 15, 5, "Place the trap on any available spot. Trapped player can not move for one full turn. Damage trapped player by 15 HP!"));        // 7
    this.items.push(new Item("Landmine", 0, 2, 0, 30, 3, "Place the trap on any available spot. Damage trapped player by 30 HP!"));        // 8
    this.items.push(new Item("Minor Potion", 1, 0, 0, 0, 8, "Heal by 10 HP!"));// 9
    this.items.push(new Item("Major Potion", 0, 0, 0, 30, 4, "Heal by 30 HP!"));// 10
    this.items.push(new Item("Move Again", 1, 0, 0, 0, 4, "Move again instead of attacking an opponent."));     // 11
    this.items.push(new Item("Teleport", 1, 1, 0, 0, 2, "Teleport to any available spot."));        // 12
    this.items.push(new Item("Push", 0, 0, 1, 0, 4, "Push your opponents away from you. You can even push them off the edge!"));        // 13

    // Array of item drops based on the rarity of each item
    this.drops = [];
    for (var i = 0; i < this.items.length; i++) { // Index of item in items array
      for(var j = 0; j < this.items[i].rarity; j++) { // How many of [i] item to add to drops array
        this.drops.push(i);
      }
    }

    // Shuffle the drops array
    var currIndex = this.drops.length, temp, randIndex;
    while(currIndex)
    {
      randIndex = Math.floor(Math.random() * currIndex);
      currIndex--;
      temp = this.drops[currIndex];
      this.drops[currIndex] = this.drops[randIndex];
      this.drops[randIndex] = temp;
    }
  }

  // Creates Board. Places players and items on board
  // NOTE: TESTED!
  createBoard() {
    // Push the boardspaces onto the the board array
    for(var i = 0; i < 100; i++)
    {
      this.board.push(new Boardspace(i, null, null, null, 0));
    }

    // Put players in starting corners
    var temp = this.playerList.head;

    this.board[0].setPlayer(temp.data);
    temp = temp.next;
    this.board[9].setPlayer(temp.data);
    temp = temp.next;
    this.board[90].setPlayer(temp.data);
    temp = temp.next;
    this.board[99].setPlayer(temp.data);

    initScreen();
    buildStage(10);
    moveAbsolute(0, 0, 0, 0);
    moveAbsolute(1, 220-22, 0, 0);
    moveAbsolute(2, 0, -(220-22), 0);
    moveAbsolute(3, 220-22, -(220-22), 0);
    rotateAbsolute(0, 0, 0, 135);		// - for clockwise
    rotateAbsolute(1, 0, 0, 45);
    rotateAbsolute(2, 0, 0, -135);
    rotateAbsolute(3, 0, 0, -45);
    setColorHex(0, 0xFFFF00);
    setColorHex(1, 0xFFFF00);
    setColorHex(2, 0xFFFF00);
    setColorHex(3, 0xFFFF00);

    // place items on board
    this.initialDrop();
    this.currItem = this.basicAttack;

    // updateCamera();

  }

  // Starts turn timer, calculate possible moves, set currentPlayer, change player state to Active. Disable "end turn"
  // NOTE: TESTED!
  startTurnFor(player) {
    // TODO Start turn timer
    player.status = Player.MOVING;  // Change player status to moving
    setColorHex(0, 0xFFFF00);
    setColorHex(1, 0xFFFF00);
    setColorHex(2, 0xFFFF00);
    //setColorHex(3, 0xFFFF00);
    setColorRGB(3, 500, 500, 0);
    setColorHex(player.id, 0x00FF00);
    this.currPlayer = player;
    this.moveSpaces = this.possibleMovesFrom(this.board[player.position]); // Calculate possible moves
    for(var i = 0; i < this.moveSpaces.length; i++) {
      setColorHex(this.moveSpaces[i]+4, 0x00FF00);
    }
  }

  // Update Linked List, change player state to Idle
  // NOTE: TESTED!
  endTurnFor(player) {
    // TODO Reset turn timer?
    this.clearMoveSpaces();
    this.clearAttackSpaces();
    player.status = Player.IDLE;  // Change player status to idle
    setColorHex(player.id, 0xFFFF00);
    this.currPlayer = null;
    this.currItem = this.basicAttack;
  }

  // Update currPlayer position, apply effects of any trap or add item, set currItem to Basic Attack and call possible attacks.
  // Enable "end turn" button
  // NOTE: TESTED!
  // NOTE: WHEN WE PUSH AN ITEM, IF THE PLAYER USED AN ITEM TO GET TO THIS SPACE, THE ITEM WE PUSHED IS REMOVED, NOT THE ORIGINAL
  moveTo(boardspace) {
    // Move the player
    this.board[this.currPlayer.position].removePlayer(); // Remove player from current boardspace
    boardspace.setPlayer(this.currPlayer);  // Move the player to the requested boardspace
    this.currPlayer.status = Player.READY;             // Set the player ready to attack or defend
    this.clearMoveSpaces();

    // Check for Traps
    if (boardspace.hasTrap()) {
      boardspace.player.status = Player.IDLE;               // "Stun" the trapped player
      this.attack(boardspace.trap, boardspace);  // Apply effects of the trap to the player
      boardspace.removeTrap();
    }

    // Check for Items
    if (boardspace.hasLoot()) {
      if (boardspace.loot.itemType == Item.OFFENSE) {  // Offensive
        if (this.currPlayer.pushOffensiveItem(boardspace.loot) == true) { // Player has room in inventory
          boardspace.removeLoot();
          setColorHex(boardspace.position+4, 0xD7DFE5);
        } else {  // Inventory full
          //TODO UI Change
        }
      } else if (boardspace.loot.itemType == Item.DEFENSE) { // Defensive
        if (this.currPlayer.pushDefensiveItem(boardspace.loot) == true) { // Player has room in inventory
          boardspace.removeLoot();
          setColorHex(boardspace.position+4, 0xD7DFE5);
        } else {  // Inventory full
          //TODO UI Change
        }
      }
    }

    // Set the currItem to basicAttack
    this.chooseItem(this.basicAttack);
  }

  pushPlayer(boardspace, direction) {
   var newBoardspace = this.board[boardspace.position + direction];
   if (boardspace.hasPlayer() && newBoardspace.hasPlayer() == false) {
     var playerToPush = boardspace.player;
     boardspace.removePlayer();
     newBoardspace.setPlayer(playerToPush);
     if(direction == -10) {
       moveRelative(playerToPush.id, 0, 22, 0);
       movePiece(playerToPush.id, "Y+");
     }
     else if(direction == 10) {
       moveRelative(playerToPush.id, 0, -22, 0);
       movePiece(playerToPush.id, "Y-");
     }
     else if(direction == -1) {
       moveRelative(playerToPush.id, -22, 0, 0);
       movePiece(playerToPush.id, "X-");
     }
     else if(direction == 1) {
       moveRelative(playerToPush.id, 22, 0, 0);
       movePiece(playerToPush.id, "X+");
     }

     if (newBoardspace.fallStage == Boardspace.FALLEN) {
       // this.killPlayer(playerToPush);
       // fallPiece(playerToPush.id);
     }
   }
 }

  // Check if player, apply effects to player.
  // NOTE: TESTED!
  attack(item, boardspace) {
    if (boardspace.hasPlayer()) {
      boardspace.player.damageHealthBy(item.damage);
      growPiece(boardspace.player.id);
      if (boardspace.player.getHealth() <= 0) {
        this.killPlayer(boardspace.player);
      }
    }
  }

  // Sets the current players item to the currentItem (basic on first call). Waits for user input to select other item.
  // Check if Offensive or Defensive, calc possibleAttacks if applicable.
  // TODO: Test
  chooseItem(item) {
    this.currItem = item;
    if (item.itemType == Item.OFFENSE) { // Offensive
      this.attackSpaces = this.possibleAttacksBy(item);
      for(var i = 0; i < this.attackSpaces.length; i++)
      {
        setColorHex(this.attackSpaces[i]+4, 0xFF0000);
      }
    } else if (item.itemType == Item.DEFENSE) { // Defensive
      if (item.name == "Move Again") {
        this.moveSpaces = this.possibleMovesFrom(this.board[this.currPlayer.position]);
        for(var i = 0; i < this.moveSpaces.length; i++)
        {
          setColorHex(this.moveSpaces[i]+4, 0x00FF00);
        }
      } else if (item.name == "Teleport") {
        this.attackSpaces = this.possibleMovesFrom(null);
        for(var i = 0; i < this.attackSpaces.length; i++)
        {
          setColorHex(this.attackSpaces[i]+4, 0x00FF00);
        }
      } else if (item.name == "Minor Potion" || item.name == "Major Potion") {
        this.attackSpaces = this.possibleAttacksBy(item);
        for(var i = 0; i < this.attackSpaces.length; i++)
        {
          setColorHex(this.attackSpaces[i]+4, 0xFF0000);
        }
      }
    }
    // Display current item as selected in UI
  }

  // Called when user activates item. Checks if Offensive or Defensive. Attack if offens. Apply effects if defens.
  // remove item from player inventory.
  useItem(item, dir) {
    this.clearMoveSpaces();
    this.clearAttackSpaces();
    var index = 0;
    var isRadius = (item.attackType == Item.RADIUS);
    var isTrap = (item.attackType == Item.TRAP);
    var isAttack = (item.itemType == Item.OFFENSE);

    if (isAttack) {
      if (item !== this.basicAttack) {
        this.currPlayer.popOffensiveItem();
      }
      if (isRadius) { // Radius attack
        for (var i = 0; i < this.attackSpaces.length; i++) {
          this.attack(item, this.board[this.attackSpaces[i]]);
        }
      } else if (isTrap && this.attackSpaces.includes(dir)) {  // Setting a trap
          this.board[dir].setTrap(item);
      } else if (dir == -10 || dir == -1 || dir == 1 || dir == 10) {
        for (var i = 1; i <= item.range; i++) {
          if (this.attackSpaces.includes(this.currPlayer.position + (dir * i))) {
           // if (item === this.pushAttack) {
           if (item.name == "Push") {
             this.pushPlayer(this.board[this.currPlayer.position + (dir * i)], dir);
           } else {
             this.attack(item, this.board[this.currPlayer.position + (dir * i)]);
           }
         }
       }
     }
    } else if (!isAttack) {
      this.currPlayer.popDefensiveItem();
      if (item.name == "Minor Potion") {  // Minor Potion
        this.currPlayer.healHealthBy(10);
      } else if (item.name == "Major Potion") { // Major Potion
        this.currPlayer.healHealthBy(30);
      } else if (item.name == "Teleport") { // Teleport
        if (this.attackSpaces.includes(dir)) {
          setColorHex(this.currPlayer.position + 4, LAMBERT_COLOR);
          this.moveTo(this.board[dir]);
          telePiece(this.currPlayer.id, dir + 4);

        }
      } else if (item.name == "Move Again") { // Move Again
        if (this.moveSpaces.includes(this.currPlayer.position + dir)) {
          this.moveTo(this.board[this.currPlayer.position + dir]);
          if(dir == -10) {movePiece(this.currPlayer.id, "Y+");}
          else if(dir == 10) {movePiece(this.currPlayer.id, "Y-");}
          else if(dir == -1) {movePiece(this.currPlayer.id, "X-");}
          else if(dir == 1) {movePiece(this.currPlayer.id, "X+");}
        }
      }
    }
  }

  selectBlock(tileNumber, color) {
    setColorHex(tileNumber+4, color);
  }

  // Randomly drop an item on a random (valid) boardspace.
  // NOTE: TESTED!
  dropItem() {
    var itemPos = 0;
    var item = null;
    itemPos = Math.floor(Math.random() * this.size + this.lowerBounds);

    while(this.board[itemPos].fallStage != Boardspace.STABLE || this.board[itemPos].hasPlayer() || this.board[itemPos].hasLoot())
    {
      itemPos = Math.floor(Math.random() * this.size + this.lowerBounds);
    }

    item = this.randomItem();

    // Apply changes
    this.board[itemPos].setLoot(item);
    setColorHex(itemPos+4, 0x00FFFF);

    // Error - Anirudh
    lookAtMeNow(itemPos+4);

    // Call UI
    return itemPos;
  }

  // Shrink the board. For each dropped, check if player is there, kill player if they are.
  // NOTE: TESTED!
  shrinkBoard() {
    var top = this.topBounds, lower = this.lowerBounds, right = this.rightOffset, left = this.leftOffset;
    // change outer blocks to FALLEN and kill any players found
    for(var i = lower + left; i <= lower + this.width; i++)   // lower row
    {
      this.board[i].fallStage = Boardspace.FALLEN;
      //setColorHex(i+4, 0xFF0000);
      // invisible(i + 4);
      fallPiece(i+4);
      if(this.board[i].hasPlayer())
      {
        // fallPiece(this.board[i].player.id);
        // this.killPlayer(this.board[i].player);
      }

      this.board[99 - i].fallStage = Boardspace.FALLEN;
      // invisible(99 - i + 4);
      fallPiece(99 - i + 4);
      // setColorHex(99 - i + 4, 0xFF0000);
      if(this.board[99 - i].hasPlayer())
      {
        // fallPiece(this.board[99 - i].player.id);
        // this.killPlayer(this.board[99 - i].player);
      }
    }

    for(var i = lower + left; i <= top - right; i+=10)   // left column
    {
      this.board[i].fallStage = Boardspace.FALLEN;
      // setColorHex(i+4, 0xFF0000);
      // invisible(i + 4);
      fallPiece(i+4);
      if(this.board[i].hasPlayer())
      {
        // fallPiece(this.board[i].player.id);
        // this.killPlayer(this.board[i].player);
      }

      this.board[99 - i].fallStage = Boardspace.FALLEN;
      // setColorHex(99 - i + 4, 0xFF0000);
      // invisible(99 - i + 4);
      fallPiece(99 - i + 4);

      if(this.board[99 - i].hasPlayer())
      {
        // fallPiece(this.board[99 - i].player.id);
        // this.killPlayer(this.board[99 - i].player);
      }
    }


    // change boundaries
    this.width -= 2;
    this.size = this.width * this.width;
    this.lowerBounds += 10;
    this.topBounds -= 10;
    this.rightOffset--;
    this.leftOffset++;
    // call UI

  }



  // Remove player from linked list. Call any animations
  // NOTE: TESTED!
  killPlayer(player) {
    this.board[player.position].removePlayer();  // Remove player from Board
    this.playerList.removePlayer(player.id);    // Remove player from List
    setColorHex(player.id, 0xFF0000);
    fallPiece(player.id);
    //IDEA should we set the player to null?
    // call any animations
  }

  // Check attributes of boardspace
  // NOTE: TESTED!
  canMoveTo(boardspace) {
    return boardspace.playerCanEnter();
  }

  // Check boardspaces around currPlayer's boardspace. Display in UI
  // NOTE: TESTED!
  possibleMovesFrom(boardspace) {
    this.moveSpaces = [];
    if(boardspace == null)  // Teleport
    {
      for(var i = 0; i < 100; i++)
      {
        if(this.board[i].fallStage < Boardspace.FALLEN && !this.board[i].hasPlayer())
        {
          this.moveSpaces.push(i);
        }
      }
      return this.moveSpaces; //moves;
    }

    var pos = boardspace.position;

    if(pos + 10 <= this.topBounds && this.canMoveTo(this.board[pos + 10]))
    {
      // can move up
      this.moveSpaces.push(pos+10);
    }
    if((pos % 10) != this.rightOffset && this.canMoveTo(this.board[pos + 1]))
    {
      // can move right
      this.moveSpaces.push(pos + 1);
    }
    if(pos - 10 >= this.lowerBounds && this.canMoveTo(this.board[pos - 10]))
    {
      // can move down
      this.moveSpaces.push(pos - 10);
    }
    if((pos % 10) != this.leftOffset && this.canMoveTo(this.board[pos - 1]))
    {
      // can move left
      this.moveSpaces.push(pos - 1);
    }

    return this.moveSpaces; //moves;
  }

  // Use currPlayer pos. and item to display possible attacks. Display in UI
  // Maybe return an array of the possible boardspace positions?
  // NOTE: TESTED!
  possibleAttacksBy(item) {
    var pos = this.currPlayer.position;
    var upOrDown = 10, leftOrRight = 1;
    this.attackSpaces = []; // Reset attackSpaces


    if (item.attackType == Item.TRAP) { // Traps can be placed at any valid boardspace
      for (var i = 0; i < 100; i++) {
        if (this.board[i].playerCanEnter() && this.board[i].hasTrap() == false) {
          this.attackSpaces.push(i);
        }
      }
      return this.attackSpaces;
    } else if (item.name == "Minor Potion" || item.name == "Major Potion") { // Potions will be used on the player using it
        this.attackSpaces.push(pos);
        return this.attackSpaces;
    }

    for (var i = 0; i < 100; i++) {
      if (i % 10 < this.leftOffset || i % 10 > this.rightOffset ||
          i < this.lowerBounds || i > this.topBounds) {
        continue;
      }
      var leftBound = (i % 10 <= pos % 10);
      var rightBound = (i % 10 >= pos % 10);
      var horiRange = Math.abs(i % 10 - pos % 10);
      var vertRange = Math.abs((i-(i % 10) - (pos - (pos % 10)))) / 10;
      if ((leftBound || rightBound) && horiRange <= item.range) {
        if (vertRange <= item.range && i != pos) {
          if (item.attackType == Item.BASIC && (i % 10 ==  pos % 10 || (i-(i%10) == pos-(pos%10)))) {
            this.attackSpaces.push(i);
          } else if (item.attackType == Item.RADIUS) {
            this.attackSpaces.push(i);
          }
        }
      }
    }
    // console.log("Starting at: " + pos + "\n" + positions);
    return this.attackSpaces;
  }

  // Check full-turn count. Change fallStage before blocks should fall.
  // NOTE: TESTED!
  shouldShrinkBoard() {
    var count = this.fullTurnCount;
    if(count == 6 || count == 9 || count == 12)
    {
      var top = this.topBounds, lower = this.lowerBounds, right = this.rightOffset, left = this.leftOffset;

      // change outer blocks to UNSTABLE
      for(var i = lower + left; i <= lower + this.width; i++)   // lower row
      {
        this.board[i].fallStage = Boardspace.UNSTABLE;
        setColorHex(i+4, 0xFFFF00);
        this.board[99 - i].fallStage = Boardspace.UNSTABLE;
        setColorHex(99 - i + 4, 0xFFFF00);
      }

      for(var i = lower + left; i <= top - right; i+=10)   // left column
      {
        this.board[i].fallStage = Boardspace.UNSTABLE;
        setColorHex(i+4, 0xFFFF00);
        this.board[99 - i].fallStage = Boardspace.UNSTABLE;
        setColorHex(99 - i + 4, 0xFFFF00);
      }

    }
    if(count == 7 || count == 10 || count == 13)    // After 7 - 10 - 13 turns
    {
      // call shrinkBoarb
      this.shrinkBoard();
    }

  }

  // Check if only one player alive.
  // TODO: Test
  hasEnded() {
    // if(this.playerList.length == 2)   // one for player, one for sentinel?
    // {
    //   // Last player has won
    //   return true;
    // }
    // if(this.playerList.length == 1)
    // {
    //   // All players fell and died? No one wins
    //   return true;
    // }
    // return false;
    return this.playerList.length;
  }

  // if currPlayer reached sentinel, Increment fullTurnCount and currPlayer.next
  // TODO: Test
  nextTurn() {
    var player = this.currPlayer;
    if(player != null && player.id == -1)
    {
      this.fullTurnCount++;
      this.currPlayer = this.currPlayer.next;
    }
  }

  // calculate moves required to go from a to b (only works at the beginning of the game when the players are at the initial positions - Generally faulty logic)
  // used to drop items at the beginning of the game
  // NOTE: TESTED!
  movesFrom(a, b)
  {
    var diff = Math.abs(a - b);
    var moves = 0;
    moves = moves + Math.floor(diff / 10) + (diff % 10);
    return moves;
  }

  // Drops 10 random items at random positions not occupied and at least 2 moves away from every players, at the beginning of the game.
  // NOTE: TESTED!
  initialDrop()
  {
    var count = 0;
    var itemPos = 0;
    var item = null;
    while(count < 40)
    {
      // item = call amjad's algorithm
      item = this.randomItem();
      itemPos = Math.floor(Math.random() * this.size + this.lowerBounds);
      // makes sure no item is dropped less than 2 moves away from all players
      while(this.board[itemPos].hasLoot() || this.movesFrom(0, itemPos) < 2 || this.movesFrom(9, itemPos) < 2 || this.movesFrom(90, itemPos) < 2 || this.movesFrom(99, itemPos) < 2)
      {
        itemPos = Math.floor(Math.random() * this.size + this.lowerBounds);
      }
      this.board[itemPos].setLoot(item);
      setColorHex(itemPos+4, 0x00FFFF);
      // Error - Anirudh
      lookAtMeNow(itemPos+4);

      count++;
    }
  }

  clearMoveSpaces() {
    if(this.moveSpaces.length > 0) {
      for(var i = 0; i < this.moveSpaces.length; i++)
      {
        if(this.board[this.moveSpaces[i]].fallStage == 1) {
          setColorHex(this.moveSpaces[i]+4, 0xFFFF00);
        }
        else if(this.board[this.moveSpaces[i]].hasLoot()) {
          setColorHex(this.moveSpaces[i]+4, 0x00FFFF);
        }
        else {
          setColorHex(this.moveSpaces[i]+4, 0xD7DFE5);
        }
      }
    }
  }

  clearAttackSpaces() {
    if(this.attackSpaces.length > 0) {
      for(var i = 0; i < this.attackSpaces.length; i++)
      {
        if(this.board[this.attackSpaces[i]].fallStage == 1) {
          setColorHex(this.attackSpaces[i]+4, 0xFFFF00);
        }
        else if(this.board[this.attackSpaces[i]].hasLoot()) {
          setColorHex(this.attackSpaces[i]+4, 0x00FFFF);
        }
        else {
        setColorHex(this.attackSpaces[i]+4, 0xD7DFE5);
        }
      }
    }
  }

  // Returns a random item from the items list
  // NOTE: TESTED!
  randomItem()
  {
    return this.items[Math.floor(Math.random() * this.items.length)];
  }
}
