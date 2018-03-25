// Makes Piece Fall
function fallPiece(index) {
  // Local Vars
  var obj = obj3DArray[index];
  var initalP = obj.position.z;
  var finalP = initalP - (CAM_FAR_PLANE + FP_BUF);

  // Test
  var accel = (2 * (CAM_FAR_PLANE + FP_BUF)) / (FP_DUR * FP_DUR);

  // Console Print
  console.log("Falling Object");
  console.log("Index:", index);
  console.log("From: ", initalP, " To: ", finalP);
  if(DEEP_VERBOSE){
    console.log(obj3DArray[index]);
  }

  // Start Timer
  var start = clock.getElapsedTime();

  // Animation Frame
  function fallPieceAnimate() {
    // Efficient FPS Call
    var childID = requestAnimationFrame(fallPieceAnimate);

    // Exit Call
    if(obj.position.z <= finalP) {
      // Fix Final
      obj.position.z = finalP;

      // Console Print
      if(DEEP_VERBOSE){
      }

      // Exit
      cancelAnimationFrame(childID);
    }

    // Looping Call
    if(obj.position.z > finalP) {
      // Compute
      var pos = initalP - FP_EXP * (0.5 * (accel * (clock.getElapsedTime() - start) * (clock.getElapsedTime() - start)));

      // Move
      obj.position.z = pos;

      // Console Print
      if(DEEP_VERBOSE){
        console.log("Postion: ", obj.position.z);
      }
    }
  }
  fallPieceAnimate();
}
