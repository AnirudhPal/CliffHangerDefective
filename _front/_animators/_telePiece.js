function telePiece(index, target){
  // Local Vars
  var obj = obj3DArray[index];
  var tobj = obj3DArray[target];
  var size = 1;

  // Console Print
  console.log("Teleporting Object");
  console.log("Index:", index);
  if(DEEP_VERBOSE){
    console.log(obj3DArray[index]);
  }

  // Animation Frame
  function telePieceAnimate() {
    // Efficient FPS Call
    var childID = requestAnimationFrame(telePieceAnimate);

    // Exit Call
    if(size <= SP_MIN) {
      // Fix Final
      scaleRigid(index, SP_MIN);

      // Move
      moveAbsolute(index, tobj.position.x, tobj.position.y, obj.position.z);

      // Grow
      //growPiece(index);

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
  telePieceAnimate();
}
