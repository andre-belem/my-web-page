


window.onload = function () {

  // Definitions
  var canvas = document.getElementById("images-canvas");
  var context = canvas.getContext("2d");
  // Variables
  var a_flor = 1;
  var a_roof = 50;
  var b_flor = 1;
  var b_roof = 6;
  var a_dimension = 6;
  var b_dimension = 2;
  // drawImage(img, dx, dy)
  // drawImage(img, dx, dy, dw, dh)
  // drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)

  var img = new Image()

  img.src = "regularshow.png";


  img.onload = function () {
    context.drawImage(img, 40, 100, 150, 250, 250, 50, 250, 400);
  };




  //creating a default Array constructor
  var a_defaultConstructorArray=new Array();
  var b_defaultConstructorArray=new Array();

  //iterating array elements with for loop
  for (var i = 0; i < a_dimension; i++) {
    a_defaultConstructorArray.push( Math.floor(Math.random()*(a_roof-a_flor+1))+a_flor  );
    //defaultConstructorArray.push("teste");
  }


  //iterating array elements with for loop
  for (var i = 0; i < b_dimension; i++) {
    b_defaultConstructorArray.push( Math.floor(Math.random()*(b_roof-b_flor+1))+b_flor  );
    //defaultConstructorArray.push("teste");
  }

/*
  //iterating array elements with for loop
  for (var i = 0; i < defaultConstructorArray.length; i++) {
    document.write("Array element of index defaultConstructorArray["+i+"] is :"+defaultConstructorArray[i]+"<br>");
  }
*/
  //show the variables in console
  console.log(a_defaultConstructorArray);
  console.log(b_defaultConstructorArray);
}
