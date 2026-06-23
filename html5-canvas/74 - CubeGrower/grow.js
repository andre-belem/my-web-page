 'use strict';

 function GrowBox(height, width, depth, angle){
    // Base
    var grow = this;

    // Grow in cm
    grow.h = height;
    grow.w = width;
    grow.d = depth;
    grow.context = null;

    // Frame in cm
    grow.frameSize_cm = 3;
    grow.frameThickness_cm = 2;
    grow.frameFoot_cm = 6;

    // Definitions
    grow.canvas_w = 800;
    grow.canvas_h = 600;
    grow.draw_margim = 50;
    grow.angle = angle * ( Math.PI / 180 );
    grow.styles();
    grow.initCalc();

  };
  GrowBox.prototype.changeDepth = function (value){
    // Base
    var grow = this;
    
    // Change values
    grow.d = parseInt(value);

    // Recalculate
    grow.initCalc();

    // Draw
    grow.draw();
  };
  GrowBox.prototype.changeHeight = function (value){
    // Base
    var grow = this;
    
    // Change values
    grow.h = parseInt(value);

    // Recalculate
    grow.initCalc();

    // Draw
    grow.draw();
  };
  GrowBox.prototype.changeWidth = function (value){
    // Base
    var grow = this;
    
    // Change values
    grow.w = parseInt(value);

    // Recalculate
    grow.initCalc();

    // Draw
    grow.draw();
  };
  GrowBox.prototype.changeAngle = function (angle){
    // Base
    var grow = this;

    // Change Angle
    grow.angle = angle * ( Math.PI / 180 );

    // Draw
    grow.draw();
  };
  GrowBox.prototype.changeExteriorColor = function (color){
    // Base
    var grow = this;

    // Change Color
    grow.color_exterior = color;
    grow.cover_color_side = color;
    grow.cover_color_top = color;

    // Redraw
    grow.draw();
  };
  GrowBox.prototype.changeInteriorColor = function (color){
    // Base
    var grow = this;

    // Change Color
    grow.color_interior = color;
    grow.cover_color_interior = color;

    // Redraw
    grow.draw();
  };
  GrowBox.prototype.changeScaleColor = function (color){
    // Base
    var grow = this;

    // Change Color
    grow.color_scale = color;

    // Redraw
    grow.draw();
  };
  GrowBox.prototype.clear = function (){
    // Base
    var grow = this;

    // Clear
    grow.context.clearRect(0, 0, grow.canvas_w, grow.canvas_h);
  };
  GrowBox.prototype.styles = function (){
    
    // Base
    var grow = this;

    // Definitions
    grow.title_text = 'Design tool';
    grow.color_exterior = 'black';
    grow.color_interior = 'grey';
    grow.color_scale = 'grey';
    grow.color_corner = '#BDC3C7';
    grow.color_corner_front = '#E5E7E9';
    grow.line_size_exterior = 3;
    grow.line_size_interior = 2;
    grow.line_size_scale = 1;
    grow.line_size_corner = 0;
    grow.title_color = 'black';
    grow.title_font = "25px Verdana";
    grow.scale_font = "10px Verdana";
    grow.tape_edge = 10;
    grow.tape_dis = 60;

    grow.frame_top = 'black';
    grow.cover_color_side = '#909497';
    grow.cover_color_top = '#909497';
    grow.cover_color_interior = '#F2F3F4';
  };
  GrowBox.prototype.initCalc = function () {
    // Base
    var grow = this;
 
    // Parameters
    grow.area = grow.d * grow.w;
    grow.volume = grow.area * grow.h;

    // Projections
    grow.xprojection = Math.cos(grow.angle);
    grow.yprojection = Math.sin(grow.angle);

    // Max Height in cm to calc scale
    var Q1x = grow.d * grow.xprojection;
    var Q1y = grow.d * grow.yprojection;
    var Q2x = grow.w * grow.xprojection;
    var Q2y = grow.w * grow.yprojection;

    // Total Height
    grow.total_height_cm = (grow.h + Q1y + Q2y);
    
    // Scale
    grow.scale = (grow.canvas_h - 2 * grow.draw_margim) / grow.total_height_cm;

    // Size in Pixels
    grow.height = grow.h * grow.scale;
    grow.width = grow.w * grow.scale;
    grow.depth = grow.d * grow.scale;

    // Frame in cm
    grow.frameSize = grow.frameSize_cm * grow.scale;
    grow.frameThickness = grow.frameThickness_cm * grow.scale;
    grow.frameFoot = grow.frameFoot_cm * grow.scale;

    // Triangles Qs
    grow.q1x = grow.depth * grow.xprojection;
    grow.q1y = grow.depth * grow.yprojection;
    grow.q2x = grow.width * grow.xprojection;
    grow.q2y = grow.width * grow.yprojection;

    // Drawing Space
    grow.draw_height = (grow.height + grow.q1y + grow.q2y);
    grow.draw_width = (grow.q1x + grow.q2x);

    // Offset to Center the Draw
    grow.xoffset = (grow.canvas_w - grow.draw_width) / 2 - 50;
    grow.yoffset = (grow.canvas_h - grow.draw_height) / 2;   

    // Vertices
    grow.A = [grow.xoffset + grow.q1x, grow.yoffset + grow.height + grow.q1y + grow.q2y];
    grow.B = [grow.xoffset + grow.q1x, grow.yoffset + grow.q1y + grow.q2y];
    grow.C = [grow.xoffset, grow.yoffset + grow.q2y];
    grow.D = [grow.xoffset, grow.yoffset + grow.q2y + grow.height];
    grow.E = [grow.xoffset + grow.q1x + grow.q2x, grow.yoffset + grow.q1y];
    grow.F = [grow.xoffset + grow.q1x + grow.q2x, grow.yoffset + grow.q1y + grow.height];
    grow.G = [grow.xoffset + grow.q2x, grow.yoffset];


  };
  GrowBox.prototype.draw = function (){
    // Base
    var grow = this;

    // Check Context
    if(!grow.context){return}

    // Clear Canvas
    grow.clear();

    // Initial Calculus
    grow.initCalc();

    grow.drawTitle();
    grow.drawScale();
    grow.drawPeople();
    grow.drawInterior();
    grow.drawExterior();
    grow.drawCover();
    grow.drawMeasures();

    // Corners
    // Frame
    var frame = new Frame(15, 5, grow.height, [ grow.B, grow.C, grow.E, grow.G ], grow.angle);
    frame.context = grow.context;
    frame.draw();
    //grow.drawFrame(grow.C);
    
  };
  GrowBox.prototype.drawTitle = function (){
    // Base
    var grow = this;
    
    // Draw
    grow.context.font = grow.title_font;
    grow.context.fillStyle = grow.title_color;
    grow.context.textAlign = "center";
    grow.context.fillText(grow.title_text, grow.canvas_w/2, 30);
  };
  GrowBox.prototype.drawMeasures = function () {
    // Base
    var grow = this;

    grow.context.beginPath();

    // Style
    grow.context.lineWidth = grow.line_size_scale;
    grow.context.strokeStyle = grow.color_scale;

    grow.context.font = grow.scale_font;
    grow.context.fillStyle = grow.color_scale;

    // Line
    grow.context.moveTo(grow.E[0] + grow.tape_dis , grow.E[1]);
    grow.context.lineTo(grow.F[0] + grow.tape_dis , grow.F[1]);
    grow.context.moveTo(grow.A[0] + grow.tape_dis  * grow.xprojection, grow.A[1] + grow.tape_dis  * grow.yprojection);
    grow.context.lineTo(grow.F[0] + grow.tape_dis  * grow.xprojection, grow.F[1] + grow.tape_dis  * grow.yprojection);
    grow.context.moveTo(grow.D[0] - grow.tape_dis  * grow.xprojection, grow.D[1] + grow.tape_dis  * grow.yprojection);
    grow.context.lineTo(grow.A[0] - grow.tape_dis  * grow.xprojection, grow.A[1] + grow.tape_dis  * grow.yprojection);
   
    // Tip
    grow.context.moveTo(grow.E[0] + grow.tape_dis  - grow.tape_edge, grow.E[1]);
    grow.context.lineTo(grow.E[0] + grow.tape_dis  + grow.tape_edge, grow.E[1]);
    grow.context.moveTo(grow.F[0] + grow.tape_dis  - grow.tape_edge, grow.F[1]);
    grow.context.lineTo(grow.F[0] + grow.tape_dis  + grow.tape_edge, grow.F[1]);
    grow.context.moveTo(grow.A[0] + (grow.tape_dis   - grow.tape_edge) * grow.xprojection, grow.A[1] + (grow.tape_dis  - grow.tape_edge) * grow.yprojection );
    grow.context.lineTo(grow.A[0] + (grow.tape_dis   + grow.tape_edge) * grow.xprojection, grow.A[1] + (grow.tape_dis  + grow.tape_edge) * grow.yprojection );
    grow.context.moveTo(grow.F[0] + (grow.tape_dis   - grow.tape_edge) * grow.xprojection, grow.F[1] + (grow.tape_dis  - grow.tape_edge) * grow.yprojection );
    grow.context.lineTo(grow.F[0] + (grow.tape_dis   + grow.tape_edge) * grow.xprojection, grow.F[1] + (grow.tape_dis  + grow.tape_edge) * grow.yprojection );
    grow.context.moveTo(grow.D[0] - (grow.tape_dis   - grow.tape_edge) * grow.xprojection, grow.D[1] + (grow.tape_dis  - grow.tape_edge) * grow.yprojection );
    grow.context.lineTo(grow.D[0] - (grow.tape_dis   + grow.tape_edge) * grow.xprojection, grow.D[1] + (grow.tape_dis  + grow.tape_edge) * grow.yprojection );
    grow.context.moveTo(grow.A[0] - (grow.tape_dis   - grow.tape_edge) * grow.xprojection, grow.A[1] + (grow.tape_dis  - grow.tape_edge) * grow.yprojection );
    grow.context.lineTo(grow.A[0] - (grow.tape_dis   + grow.tape_edge) * grow.xprojection, grow.A[1] + (grow.tape_dis  + grow.tape_edge) * grow.yprojection );
    
    // Draw
    grow.context.stroke();
    
    // Measure
    grow.context.save();
    grow.context.translate(grow.E[0] + grow.tape_dis  + 10, (grow.E[1] + grow.F[1]) / 2);
    grow.context.rotate(-Math.PI/2);
    grow.context.textAlign = "center";
    grow.context.fillText('height: ' + grow.h+ ' cm', 0, 0);
    grow.context.restore();

    grow.context.save();
    grow.context.translate( (grow.A[0] + grow.F[0]) / 2 + grow.tape_dis  * grow.xprojection - 3, (grow.A[1] + grow.F[1]) / 2 + grow.tape_dis  * grow.yprojection - 3);
    grow.context.rotate(-grow.angle);
    grow.context.textAlign = "center";
    grow.context.fillText('width: ' + grow.w + ' cm', 0, 0);
    grow.context.restore();

    grow.context.save();
    grow.context.translate( (grow.D[0] + grow.A[0]) / 2 - grow.tape_dis  * grow.xprojection + 3, (grow.D[1] + grow.A[1]) / 2 + grow.tape_dis  * grow.yprojection - 3);
    grow.context.rotate(grow.angle);
    grow.context.textAlign = "center";
    grow.context.fillText('depth: ' + grow.d + ' cm', 0, 0);
    grow.context.restore();
    
  };
  GrowBox.prototype.drawScale = function () {
    // Base
    var grow = this;




    grow.context.beginPath();
    grow.context.translate(0.5,0.5);

    
    // Style
    grow.context.lineWidth = grow.line_size_scale;
    grow.context.strokeStyle = grow.color_scale;

    // Definition
    var scale_numbers = [40, 80, 120, 160, 200];
    var scale_height = grow.canvas_h - 30;

    // Line
    grow.context.moveTo(grow.canvas_w - scale_numbers[0], scale_height - 5);
    grow.context.lineTo(grow.canvas_w - scale_numbers[4], scale_height - 5);

    // Steps
    for(let x in scale_numbers){
        grow.context.moveTo(grow.canvas_w - scale_numbers[x], scale_height);
        grow.context.lineTo(grow.canvas_w - scale_numbers[x], scale_height - 10);
    }

    // Draw
    grow.context.stroke();

    // Subtitle
    var area = (( grow.h * grow.w * 2 ) + ( grow.h * grow.d * 2 ) + ( grow.w * grow.d * 2 ))/10000;
    var text = 'Isometric ' + (grow.angle * (180 / Math.PI)).toFixed(0) + '° | ' + (40 / grow.scale).toFixed(1) + ' cm | ' + area.toFixed(1) + ' m2';
    grow.context.font = grow.scale_font;
    grow.context.fillStyle = grow.color_scale;
    grow.context.textAlign = "center";
    grow.context.fillText(text, grow.canvas_w - scale_numbers[2], scale_height + 10);
    grow.context.setTransform(1, 0, 0, 1, 0, 0);

  };
  GrowBox.prototype.drawFrame = function (corner) {
    // Base
    var grow = this;




    // Position
    var x = grow.C[0];
    var y = grow.C[1];

    // CORNER C
    var C1x = x + (grow.frameSize ) * grow.xprojection;
    var C1y = y + (grow.frameSize ) * grow.yprojection;
    var C2x = C1x - (grow.frameThickness ) * grow.xprojection;
    var C2y = C1y + (grow.frameThickness ) * grow.yprojection;
    var C5x = x + (grow.frameSize ) * grow.xprojection;
    var C5y = y - (grow.frameSize ) * grow.yprojection;
    var C4x = C5x - (grow.frameThickness ) * grow.xprojection;
    var C4y = C5y - (grow.frameThickness ) * grow.yprojection;
    var C3x = C4x - (grow.frameSize ) * grow.xprojection - (grow.frameThickness ) * grow.xprojection;
    var C3y = C4y + (grow.frameSize ) * grow.yprojection + (grow.frameThickness ) * grow.yprojection;  
    var D1x = C1x;
    var D1y = C1y + grow.height + grow.frameFoot ;
    var D2x = C2x;
    var D2y = C2y + grow.height + grow.frameFoot ;
    var D3x = C3x;
    var D3y = C3y + grow.height + grow.frameFoot ;

    // Style
    grow.context.lineWidth = grow.line_size_corner;
    grow.context.strokeStyle = 'black';
    grow.context.fillStyle = grow.frame_top;

    // Polygon
    grow.context.beginPath();
    grow.context.moveTo(x, y);
    grow.context.lineTo(C1x, C1y); 
    grow.context.lineTo(C2x, C2y);          
    grow.context.lineTo(C3x, C3y); 
    grow.context.lineTo(C4x, C4y);  
    grow.context.lineTo(C5x, C5y); 

    // Draw
    grow.context.closePath(); // to close paths manually
    grow.context.fill();
    grow.context.stroke();


    // Style
    grow.context.lineWidth = grow.line_size_corner;
    grow.context.strokeStyle = 'black';
    grow.context.fillStyle = grow.color_corner_front;

    // Polygon
    grow.context.beginPath();
    grow.context.moveTo(C1x, C1y);
    grow.context.lineTo(D1x, D1y); 
    grow.context.lineTo(D2x, D2y);          
    grow.context.lineTo(C2x, C2y); 

    // Draw
    grow.context.closePath(); // to close paths manually
    grow.context.fill();
    grow.context.stroke();


    // Style
    grow.context.lineWidth = grow.line_size_corner;
    grow.context.strokeStyle = 'black';
    grow.context.fillStyle = grow.color_corner;
    // Polygon
    grow.context.beginPath();
    grow.context.moveTo(C2x, C2y);
    grow.context.lineTo(D2x, D2y); 
    grow.context.lineTo(D3x, D3y);          
    grow.context.lineTo(C3x, C3y); 

    // Draw
    grow.context.closePath(); // to close paths manually
    grow.context.fill();
    grow.context.stroke();   



    // CORNER B

    // Position
    var x = grow.B[0];
    var y = grow.B[1];

    // Style
    grow.context.lineWidth = grow.line_size_corner;
    grow.context.strokeStyle = 'black';
    grow.context.fillStyle = grow.frame_top;

    // CORNER B
    var C1x = x - (grow.frameSize ) * grow.xprojection;
    var C1y = y - (grow.frameSize ) * grow.yprojection;
    var C2x = C1x - (grow.frameThickness ) * grow.xprojection;
    var C2y = C1y + (grow.frameThickness ) * grow.yprojection;

    var C4x = x + (grow.frameSize ) * grow.xprojection;
    var C4y = y - (grow.frameSize ) * grow.yprojection;

    var C5x = C4x + (grow.frameThickness ) * grow.xprojection;
    var C5y = C4y + (grow.frameThickness ) * grow.yprojection;
    var C3x = C2x + (grow.frameSize ) * grow.xprojection + (grow.frameThickness ) * grow.xprojection;
    var C3y = C2y + (grow.frameSize ) * grow.yprojection + (grow.frameThickness ) * grow.yprojection;  
    var D1x = C5x;
    var D1y = C5y + grow.height + grow.frameFoot ;
    var D2x = C2x;
    var D2y = C2y + grow.height + grow.frameFoot ;
    var D3x = C3x;
    var D3y = C3y + grow.height + grow.frameFoot ;

    // Polygon
    grow.context.beginPath();
    grow.context.moveTo(x, y);
    grow.context.lineTo(C1x, C1y); 
    grow.context.lineTo(C2x, C2y);          
    grow.context.lineTo(C3x, C3y); 
    grow.context.lineTo(C5x, C5y);
    grow.context.lineTo(C4x, C4y);  
    

    // Draw
    grow.context.closePath(); // to close paths manually
    grow.context.fill();
    grow.context.stroke();

    
    // Style
    grow.context.lineWidth = grow.line_size_corner;
    grow.context.strokeStyle = 'black';
    grow.context.fillStyle = grow.color_corner_front;

    // Polygon
    grow.context.beginPath();
    grow.context.moveTo(C5x, C5y);
    grow.context.lineTo(D1x, D1y); 
    grow.context.lineTo(D3x, D3y);          
    grow.context.lineTo(C3x, C3y); 

    // Draw
    grow.context.closePath(); // to close paths manually
    grow.context.fill();
    grow.context.stroke();


    // Style
    grow.context.lineWidth = grow.line_size_corner;
    grow.context.strokeStyle = 'black';
    grow.context.fillStyle = grow.color_corner;
    // Polygon
    grow.context.beginPath();
    grow.context.moveTo(C3x, C3y);
    grow.context.lineTo(D3x, D3y); 
    grow.context.lineTo(D2x, D2y);          
    grow.context.lineTo(C2x, C2y); 

    // Draw
    grow.context.closePath(); // to close paths manually
    grow.context.fill();
    grow.context.stroke();   

  };
  GrowBox.prototype.drawCover = function (){
    // Base
    var grow = this;

    // SIDE
    // Style
    grow.context.lineWidth = 1;
    grow.context.strokeStyle = 'black';
    grow.context.fillStyle = grow.cover_color_side;
    // Polygon
    grow.context.beginPath();
    grow.context.moveTo(grow.B[0], grow.B[1]);
    grow.context.lineTo(grow.A[0], grow.A[1]); 
    grow.context.lineTo(grow.D[0], grow.D[1]);          
    grow.context.lineTo(grow.C[0], grow.C[1]); 
    // Draw
    grow.context.closePath(); // to close paths manually
    grow.context.fill();
    grow.context.stroke();

    // TOP
    // Style
    grow.context.lineWidth = 1;
    grow.context.strokeStyle = 'black';
    grow.context.fillStyle = grow.cover_color_top;
    // Polygon
    grow.context.beginPath();
    grow.context.moveTo(grow.B[0], grow.B[1]);
    grow.context.lineTo(grow.C[0], grow.C[1]); 
    grow.context.lineTo(grow.G[0], grow.G[1]);          
    grow.context.lineTo(grow.E[0], grow.E[1]); 
    // Draw
    grow.context.closePath(); // to close paths manually
    grow.context.fill();
    grow.context.stroke();

  };
  GrowBox.prototype.drawInterior = function (){
    // Base
    var grow = this;

    // Draw Intern Lines
    grow.context.lineWidth = grow.line_size_interior;
    grow.context.strokeStyle = grow.color_interior;

    if(grow.q1x >= grow.q2x){
        // Background Not Seen
        var q3y = grow.q1y - (grow.q1y - grow.q2y)
         grow.H = [grow.xoffset + grow.q1x, grow.yoffset + grow.q1y + grow.height - q3y];

        // HF
        grow.context.beginPath();
        grow.context.moveTo(grow.H[0], grow.H[1]);
        grow.context.lineTo(grow.F[0], grow.F[1]);
        grow.context.stroke();

    }else{
        // Background visible
        var q4h = grow.q1x / Math.cos(grow.angle);
        var q4y = q4h * Math.sin(grow.angle);

        // GH
        grow.H = [grow.xoffset + grow.q2x, grow.yoffset + grow.height];
        const H1 = [grow.xoffset + grow.q2x, grow.yoffset + q4y + grow.q1y]
        const H2 = [grow.xoffset + grow.q1x, grow.yoffset + grow.height + grow.q2y - grow.q1y]
        grow.context.beginPath();
        grow.context.moveTo(grow.H[0], grow.H[1]);
        grow.context.lineTo(H1[0], H1[1]);
        grow.context.stroke();
        // HF
        grow.context.beginPath();
        grow.context.moveTo(grow.H[0], grow.H[1]);
        grow.context.lineTo(grow.F[0], grow.F[1]);
        grow.context.stroke();
        // DH
        grow.context.beginPath();
        grow.context.moveTo(grow.H[0], grow.H[1]);
        grow.context.lineTo(H2[0], H2[1]);
        grow.context.stroke();

    }


        // SIDE
        // Style
        grow.context.lineWidth = 1;
        grow.context.strokeStyle = 'black';
        grow.context.fillStyle = grow.cover_color_interior;
        // Polygon
        grow.context.beginPath();
        grow.context.moveTo(grow.E[0], grow.E[1]);
        grow.context.lineTo(grow.F[0], grow.F[1]); 
        grow.context.lineTo(grow.H[0], grow.H[1]);          
        grow.context.lineTo(grow.G[0], grow.G[1]); 
        // Draw
        grow.context.closePath(); // to close paths manually
        grow.context.fill();
        grow.context.stroke();
    
        // BOTTOM
        // Style
        grow.context.lineWidth = 1;
        grow.context.strokeStyle = 'black';
        grow.context.fillStyle = grow.cover_color_interior;
        // Polygon
        grow.context.beginPath();
        grow.context.moveTo(grow.F[0], grow.F[1]);
        grow.context.lineTo(grow.A[0], grow.A[1]); 
        grow.context.lineTo(grow.D[0], grow.D[1]);          
        grow.context.lineTo(grow.H[0], grow.H[1]); 
        // Draw
        grow.context.closePath(); // to close paths manually
        grow.context.fill();
        grow.context.stroke();
    
       // BACK
        // Style
        grow.context.lineWidth = 1;
        grow.context.strokeStyle = 'black';
        grow.context.fillStyle = grow.cover_color_interior;
        // Polygon
        grow.context.beginPath();
        grow.context.moveTo(grow.G[0], grow.G[1]);
        grow.context.lineTo(grow.H[0], grow.H[1]); 
        grow.context.lineTo(grow.D[0], grow.D[1]);          
        grow.context.lineTo(grow.C[0], grow.C[1]); 
        // Draw
        grow.context.closePath(); // to close paths manually
        grow.context.fill();
        grow.context.stroke();

  }
  GrowBox.prototype.drawExterior = function (){
    // Base
    var grow = this;

    grow.context.beginPath();

    // Style
    grow.context.lineWidth = grow.line_size_exterior;
    grow.context.strokeStyle = grow.color_exterior;

    // Lines Between Vertices
    grow.context.moveTo(grow.A[0], grow.A[1]);
    grow.context.lineTo(grow.B[0], grow.B[1]);
    grow.context.moveTo(grow.B[0], grow.B[1]);
    grow.context.lineTo(grow.C[0], grow.C[1]);
    grow.context.moveTo(grow.C[0], grow.C[1]);
    grow.context.lineTo(grow.D[0], grow.D[1]);
    grow.context.moveTo(grow.D[0], grow.D[1]);
    grow.context.lineTo(grow.A[0], grow.A[1]);
    grow.context.moveTo(grow.A[0], grow.A[1]);
    grow.context.lineTo(grow.F[0], grow.F[1]);
    grow.context.moveTo(grow.B[0], grow.B[1]);
    grow.context.lineTo(grow.E[0], grow.E[1]);
    grow.context.moveTo(grow.E[0], grow.E[1]);
    grow.context.lineTo(grow.F[0], grow.F[1]);
    grow.context.moveTo(grow.E[0], grow.E[1]);
    grow.context.lineTo(grow.G[0], grow.G[1]);
    grow.context.moveTo(grow.C[0], grow.C[1]);
    grow.context.lineTo(grow.G[0], grow.G[1]);

    // Draw
    grow.context.stroke();

  };
  GrowBox.prototype.drawPeople = function () {
    // Base
    var grow = this;

    // Draw
    var img = new Image();
    img.onload = function () {
        var imgScale = ( grow.scale * 175 ) / img.height;
        var imgCenter = ( img.width * imgScale ) / 2;
        var imgDistance = 150;
        var xPosition = grow.F[0] - imgCenter + imgDistance;
        var yPosition = grow.F[1] - (img.height * imgScale) + 5 ;
        grow.context.drawImage(img, xPosition, yPosition, img.width * imgScale, img.height * imgScale);       
    };
    img.src = 'img/people-grey.png';
  };