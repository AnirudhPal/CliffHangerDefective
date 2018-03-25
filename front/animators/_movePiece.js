// Moves a piece on the board.
function movePiece(index, dir) {
  if(dir == "X+") {
    // Local Vars
    var obj = obj3DArray[index];
    var initalP = obj.position.x;
    var finalP = initalP + (PLATE_SIZE + PLATE_GAP) + MOV_ERR;
    var delta = finalP - initalP;

    // Test
    var accel = (2 * (PLATE_SIZE + PLATE_GAP)) / (MP_DUR * MP_DUR);

    // Console Print
    if(VERBOSE && !TESTING) {
      console.log("Moving Object");
      console.log("Index:", index);
      console.log("From: ", initalP, " To: ", finalP);
      if(DEEP_VERBOSE){
        console.log(obj3DArray[index]);
      }
    }

    // Start Timer
    var start = clock.getElapsedTime();

    // Animation Frame
    function movePieceXPAnimate() {
      // Efficient FPS Call
      var childID = requestAnimationFrame(movePieceXPAnimate);

      // Exit Call
      if(obj.position.x >= finalP) {
        // Fix Final
        obj.position.x = finalP;

        // Console Print
        if(DEEP_VERBOSE){
          console.log("Postion: ", obj.position.x);
        }

        // Exit
        cancelAnimationFrame(childID);
      }

      // Looping Call
      if(obj.position.x < finalP) {
        // Compute
        var pos = initalP + (0.5 * (accel * (clock.getElapsedTime() - start) * (clock.getElapsedTime() - start)));

        // Move
        obj.position.x = pos;

        // Console Print
        if(DEEP_VERBOSE){
          console.log("Postion: ", obj.position.x);
        }
      }
    }
    movePieceXPAnimate();
  }

  if(dir == "X-") {
    // Local Vars
    var obj = obj3DArray[index];
    var initalP = obj.position.x;
    var finalP = initalP - (PLATE_SIZE + PLATE_GAP);
    var delta = finalP - initalP;

    // Test
    var accel = (2 * (PLATE_SIZE + PLATE_GAP)) / (MP_DUR * MP_DUR);

    // Console Print
    if(VERBOSE && !TESTING) {
      console.log("Moving Object");
      console.log("Index:", index);
      console.log("From: ", initalP, " To: ", finalP);
      if(DEEP_VERBOSE){
        console.log(obj3DArray[index]);
      }
    }

    // Start Timer
    var start = clock.getElapsedTime();

    // Animation Frame
    function movePieceXMAnimate() {
      // Efficient FPS Call
      var childID = requestAnimationFrame(movePieceXMAnimate);

      // Exit Call
      if(obj.position.x <= finalP) {
        // Fix Final
        obj.position.x = finalP;

        // Console Print
        if(DEEP_VERBOSE){
          console.log("Postion: ", obj.position.x);
        }

        // Exit
        cancelAnimationFrame(childID);
      }

      // Looping Call
      if(obj.position.x > finalP) {
        // Compute
        var pos = initalP - (0.5 * (accel * (clock.getElapsedTime() - start) * (clock.getElapsedTime() - start)));

        // Move
        obj.position.x = pos;

        // Console Print
        if(DEEP_VERBOSE){
          console.log("Postion: ", obj.position.x);
        }
      }
    }
    movePieceXMAnimate();
  }

  if(dir == "Y+") {
    // Local Vars
    var obj = obj3DArray[index];
    var initalP = obj.position.y;
    var finalP = initalP + (PLATE_SIZE + PLATE_GAP) + MOV_ERR;
    var delta = finalP - initalP;

    // Test
    var accel = (2 * (PLATE_SIZE + PLATE_GAP)) / (MP_DUR * MP_DUR);

    // Console Print
    if(VERBOSE && !TESTING) {
      console.log("Moving Object");
      console.log("Index:", index);
      console.log("From: ", initalP, " To: ", finalP);
      if(DEEP_VERBOSE){
        console.log(obj3DArray[index]);
      }
    }

    // Start Timer
    var start = clock.getElapsedTime();

    // Animation Frame
    function movePieceYPAnimate() {
      // Efficient FPS Call
      var childID = requestAnimationFrame(movePieceYPAnimate);

      // Exit Call
      if(obj.position.y >= finalP) {
        // Fix Final
        obj.position.y = finalP;

        // Console Print
        if(DEEP_VERBOSE){
          console.log("Postion: ", obj.position.y);
        }

        // Exit
        cancelAnimationFrame(childID);
      }

      // Looping Call
      if(obj.position.y < finalP) {
        // Compute
        var pos = initalP + (0.5 * (accel * (clock.getElapsedTime() - start) * (clock.getElapsedTime() - start)));

        // Move
        obj.position.y = pos;

        // Console Print
        if(DEEP_VERBOSE){
          console.log("Postion: ", obj.position.y);
        }
      }
    }
    movePieceYPAnimate();
  }

  if(dir == "Y-") {
    // Local Vars
    var obj = obj3DArray[index];
    var initalP = obj.position.y;
    var finalP = initalP - (PLATE_SIZE + PLATE_GAP);
    var delta = finalP - initalP;

    // Test
    var accel = (2 * (PLATE_SIZE + PLATE_GAP)) / (MP_DUR * MP_DUR);

    // Console Print
    if(VERBOSE && !TESTING) {
      console.log("Moving Object");
      console.log("Index:", index);
      console.log("From: ", initalP, " To: ", finalP);
      if(DEEP_VERBOSE){
        console.log(obj3DArray[index]);
      }
    }

    // Start Timer
    var start = clock.getElapsedTime();

    // Animation Frame
    function movePieceYMAnimate() {
      // Efficient FPS Call
      var childID = requestAnimationFrame(movePieceYMAnimate);

      // Exit Call
      if(obj.position.y <= finalP) {
        // Fix Final
        obj.position.y = finalP;

        // Console Print
        if(DEEP_VERBOSE){
          console.log("Postion: ", obj.position.y);
        }

        // Exit
        cancelAnimationFrame(childID);
      }

      // Looping Call
      if(obj.position.y > finalP) {
        // Compute
        var pos = initalP - (0.5 * (accel * (clock.getElapsedTime() - start) * (clock.getElapsedTime() - start)));

        // Move
        obj.position.y = pos;

        // Console Print
        if(DEEP_VERBOSE){
          console.log("Postion: ", obj.position.y);
        }
      }
    }
    movePieceYMAnimate();
  }
}
