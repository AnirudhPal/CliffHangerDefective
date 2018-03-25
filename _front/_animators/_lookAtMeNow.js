function lookAtMeNow(index) {
  // Local Vars
  var obj = obj3DArray[index];

  // Animation Frame
  function lookAtAnimate() {
    // Efficient FPS Call
    var childID = requestAnimationFrame(lookAtAnimate);
    
    // Look At
    obj.lookAt(cam.position);
  }
  lookAtAnimate();
}
