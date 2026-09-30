
window.onload = function () {

  // Definitions
  var canvas = document.getElementById("positioning-texts-canvas");
  var context = canvas.getContext("2d");

  // Drawing
  // Vertical Reference Line
  context.strokeStyle = "red";
  context.moveTo(300, 0);
  context.lineTo(300, innerHeight);
  context.stroke();

  /*
     <div class="parent">
    <canvas id="positioning-texts-canvas" width="600" height="50">

      YOUR BROWSER IS NOT SUPPORTING CANVAS

    </canvas>
   </div>
   */
  
}
