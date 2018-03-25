// Makes Piece Fall
function growPiece(index) {
  // Local Vars
  var obj = obj3DArray[index];
  var size = SP_MIN;

  // Console Print
  console.log("Growing Object");
  console.log("Index:", index);
  if(DEEP_VERBOSE){
    console.log(obj3DArray[index]);
  }

  // Animation Frame
  function growPieceAnimate() {
    // Efficient FPS Call
    var childID = requestAnimationFrame(growPieceAnimate);

    // Exit Call
    if(size >= 1) {
      // Fix Final
      scaleRigid(index, 1);

      // Exit
      cancelAnimationFrame(childID);
    }

    // Looping Call
    if(size < 1) {
      // Compute
      size += SP_RED;

      // Scale
      scaleRigid(index, size);
    }
  }
  growPieceAnimate();
}
