// Makes Piece Fall
function shrinkPiece(index) {
  // Local Vars
  var obj = obj3DArray[index];
  var size = 1;

  // Console Print
  console.log("Shrinking Object");
  console.log("Index:", index);
  if(DEEP_VERBOSE){
    console.log(obj3DArray[index]);
  }

  // Animation Frame
  function shrinkPieceAnimate() {
    // Efficient FPS Call
    var childID = requestAnimationFrame(shrinkPieceAnimate);

    // Exit Call
    if(size <= SP_MIN) {
      // Fix Final
      scaleRigid(index, SP_MIN);

      // Exit
      cancelAnimationFrame(childID);
    }

    // Looping Call
    if(size > SP_MIN) {
      // Compute
      size -= SP_RED;

      // Scale
      scaleRigid(index, size);
    }
  }
  shrinkPieceAnimate();
}
