
window.onload = function () {

  // Get Objects
  var canvas = document.getElementById("canvas-id");
  var context = canvas.getContext("2d");
  var txtSelected = document.getElementById("id-txt-selected");
  var txtArea = document.getElementById("id-txt-area");
  var txtVolume = document.getElementById("id-txt-volume");


  // Target to colors
  var button = 'off';

  
  // Create Grow
  var growbox = new GrowBox(135, 80, 60, 20);
  growbox.context = context;
  growbox.draw();
  txtSelected.innerHTML = 'None';
  txtArea.innerHTML = growbox.area / 10000;
  txtVolume.innerHTML = growbox.volume / 1000000; 



  // Handle Colors
  var colors = document.getElementsByClassName('colors')[0];
  colors.addEventListener('click', function(event) {
    //context.strokeStyle = event.target.value || 'black';
    var color = event.target.value || 'black';

    switch(button){
      case 'Interior':
        growbox.changeInteriorColor(color);     
      break;
      case 'Exterior':
        growbox.changeExteriorColor(color);
      break;
      case 'Scale':
        growbox.changeScaleColor(color);
      break;
    };

  });
  
  // Handle Save Button
  var saveButton = document.getElementById('save');
  saveButton.addEventListener('click', function() {
    var imageName = prompt('Please enter image name');
    var canvasDataURL = canvas.toDataURL();
    var a = document.createElement('a');
    a.href = canvasDataURL;
    a.download = imageName || 'drawing';
    a.click();
  });

  // Handle Interior Button
  var interiorButton = document.getElementById('interior');
  interiorButton.addEventListener('click', function() {
    button = 'Interior';
    txtSelected.innerHTML = button;
  });

  // Handle Exterior Button
  var exteriorButton = document.getElementById('exterior');
  exteriorButton.addEventListener('click', function() {
    button = 'Exterior';
    txtSelected.innerHTML = button;
  });

  // Handle Scale Button  
  var scaleButton = document.getElementById('scale');
  scaleButton.addEventListener('click', function() {
    button = 'Scale';
    txtSelected.innerHTML = button;
  });

  // slider Angle
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  // Display the default value
  output.innerHTML = slider.value; 
  slider.oninput = function() {
    output.innerHTML = this.value;
    growbox.changeAngle(this.value);
  }

  // slider Height
  var sliderHeight = document.getElementById("id-slide-height");
  var txtHeight = document.getElementById("id-txt-height");
  // Default value
  txtHeight.innerHTML = sliderHeight.value; 
  sliderHeight.oninput = function() {
    txtHeight.innerHTML = this.value;
    growbox.changeHeight(this.value);
    txtArea.innerHTML = growbox.area / 10000;
    txtVolume.innerHTML = growbox.volume / 1000000; 
  }

  // slider Width
  var sliderWidth = document.getElementById("id-slide-width");
  var txtWidth = document.getElementById("id-txt-width");
  // Default value
  txtWidth.innerHTML = sliderWidth.value; 
  sliderWidth.oninput = function() {
    txtWidth.innerHTML = this.value;
    growbox.changeWidth(this.value);
    txtArea.innerHTML = growbox.area / 10000;
    txtVolume.innerHTML = growbox.volume / 1000000; 
  }

  // slider Depth
  var sliderDepth = document.getElementById("id-slide-depth");
  var txtDepth = document.getElementById("id-txt-depth");
  // Default value
  txtDepth.innerHTML = sliderDepth.value; 
  sliderDepth.oninput = function() {
    txtDepth.innerHTML = this.value;
    txtArea.innerHTML = growbox.area / 10000;
    txtVolume.innerHTML = growbox.volume / 1000000; 
    growbox.changeDepth(this.value);
  }

};