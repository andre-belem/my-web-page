'use strict';

function Frame(L, E, H, points, angle){
    // Base
    var frame = this;
    frame.context = null;

    // Definitions
    frame.l = L;
    frame.e = E;
    frame.h = H;
    frame.Bt = [ points[0], [0,0], [0,0], [0,0], [0,0], [0,0] ];
    frame.Ct = [ points[1], [0,0], [0,0], [0,0], [0,0], [0,0] ];
    frame.Et = [ points[2], [0,0], [0,0], [0,0], [0,0], [0,0] ];
    frame.Gt = [ points[3], [0,0], [0,0], [0,0], [0,0], [0,0] ];
    frame.angle = angle;

    // Calc
    frame.initCalc();
  };
Frame.prototype.CalcPoints = function (point, Matrix) {
    // Base
    var frame = this;
    var x;
    console.log(Matrix);
    for (x in Matrix) {
        point[x][0] = Matrix[x][0] + point[0][0];
        point[x][1] = Matrix[x][1] + point[0][1];
    };
};
Frame.prototype.drawTop = function (points) {
    // Base 
    var frame = this;

    // Draw
    frame.context.beginPath();
    frame.context.moveTo(points[0][0], points[0][1]);
    for(var x = 1; x < points.length; x++) {
        frame.context.lineTo( points[x][0], points[x][1] );
    };
    frame.context.closePath();
    frame.context.fill();
    frame.context.stroke();
};
Frame.prototype.drawSides = function () {
    // Base 
    var frame = this;

    frame.context.lineWidth = 0;
    frame.context.strokeStyle = 'black';
    frame.context.fillStyle = '#E5E7E9';
    frame.context.translate(0.5,0.5);
    // C
    frame.context.beginPath();
    frame.context.moveTo( frame.Ct[3][0], frame.Ct[3][1] );
    frame.context.lineTo( frame.Ct[3][0], frame.Ct[3][1] + frame.h );
    frame.context.lineTo( frame.Ct[2][0], frame.Ct[2][1] + frame.h );
    frame.context.lineTo( frame.Ct[2][0], frame.Ct[2][1] ); 
    frame.context.moveTo( frame.Ct[2][0], frame.Ct[2][1] );
    frame.context.lineTo( frame.Ct[1][0], frame.Ct[1][1] );
    frame.context.lineTo( frame.Ct[1][0], frame.Ct[1][1] + frame.h );
    frame.context.lineTo( frame.Ct[2][0], frame.Ct[2][1] + frame.h );  
    frame.context.closePath();
    frame.context.fill();
    frame.context.stroke();

    // B
    frame.context.beginPath();
    frame.context.moveTo( frame.Bt[3][0], frame.Bt[3][1] );
    frame.context.lineTo( frame.Bt[3][0], frame.Bt[3][1] + frame.h );
    frame.context.lineTo( frame.Bt[4][0], frame.Bt[4][1] + frame.h );
    frame.context.lineTo( frame.Bt[4][0], frame.Bt[4][1] ); 
    frame.context.moveTo( frame.Bt[3][0], frame.Bt[3][1] );
    frame.context.lineTo( frame.Bt[3][0], frame.Bt[3][1] + frame.h );
    frame.context.lineTo( frame.Bt[2][0], frame.Bt[2][1] + frame.h );
    frame.context.lineTo( frame.Bt[2][0], frame.Bt[2][1] );  
    frame.context.closePath();
    frame.context.fill();
    frame.context.stroke();

    // E
    frame.context.beginPath();
    frame.context.moveTo( frame.Et[5][0], frame.Et[5][1] );
    frame.context.lineTo( frame.Et[5][0], frame.Et[5][1] + frame.h );
    frame.context.lineTo( frame.Et[4][0], frame.Et[4][1] + frame.h );
    frame.context.lineTo( frame.Et[4][0], frame.Et[4][1] ); 
    frame.context.moveTo( frame.Et[3][0], frame.Et[3][1] );
    frame.context.lineTo( frame.Et[3][0], frame.Et[3][1] + frame.h );
    frame.context.lineTo( frame.Et[4][0], frame.Et[4][1] + frame.h );
    frame.context.lineTo( frame.Et[4][0], frame.Et[4][1] );  
    frame.context.closePath();
    frame.context.fill();
    frame.context.stroke();

    // G
    frame.context.beginPath();
    frame.context.moveTo( frame.Gt[2][0], frame.Gt[2][1] );
    frame.context.lineTo( frame.Gt[2][0], frame.Gt[2][1] + frame.e * Math.sin(frame.angle) * 2 );
    frame.context.lineTo( frame.Gt[1][0], frame.Gt[1][1] );
    frame.context.moveTo( frame.Gt[4][0], frame.Gt[4][1] );
    frame.context.lineTo( frame.Gt[4][0], frame.Gt[4][1] + frame.e * Math.sin(frame.angle) * 2);
    frame.context.lineTo( frame.Gt[5][0], frame.Gt[5][1] );
    //frame.context.closePath();
    frame.context.fill();
    frame.context.stroke();

};
Frame.prototype.initCalc = function () {
    // Base
    var frame = this;

    // Definitions
    var x = 0;
    var y = 1;
    var tMatrixB = [ [0,0], [0,0], [0,0], [0,0], [0,0], [0,0] ];
    var tMatrixC = [ [0,0], [0,0], [0,0], [0,0], [0,0], [0,0] ];
    var tMatrixE = [ [0,0], [0,0], [0,0], [0,0], [0,0], [0,0] ];
    var tMatrixG = [ [0,0], [0,0], [0,0], [0,0], [0,0], [0,0] ];

    // Projections
    var xpj = Math.cos(frame.angle);
    var ypj = Math.sin(frame.angle);
    var lix = (frame.l - frame.e) * xpj;
    var liy = (frame.l - frame.e) * ypj;
    var lex = frame.e * xpj;
    var ley = frame.e * ypj;
    var llx = frame.l * xpj;
    var lly = frame.l * ypj;

    // Matrix
    tMatrixC[0] = [ 0, 0 ];
    tMatrixC[1] = [ lix, liy ] ;
    tMatrixC[5] = [ lix, -liy ];
    tMatrixC[2] = [ tMatrixC[1][x] - lex, tMatrixC[1][y] + ley ];
    tMatrixC[4] = [ tMatrixC[5][x] - lex, tMatrixC[5][y] - ley ];   
    tMatrixC[3] = [ tMatrixC[2][x] - llx, tMatrixC[2][y] - lly ];
    
    tMatrixB[0] = [ 0, 0 ];
    tMatrixB[1] = [ lix, -liy ] ;
    tMatrixB[5] = [ -lix, -liy ];
    tMatrixB[2] = [ tMatrixB[1][x] + lex, tMatrixB[1][y] + ley ];
    tMatrixB[4] = [ tMatrixB[5][x] - lex, tMatrixB[5][y] + ley ];   
    tMatrixB[3] = [ tMatrixB[2][x] - llx, tMatrixB[2][y] + lly ];

    tMatrixE[0] = [ 0, 0 ];
    tMatrixE[1] = [ -lix, -liy ] ;
    tMatrixE[5] = [ -lix, liy ];
    tMatrixE[2] = [ tMatrixE[1][x] + lex, tMatrixE[1][y] - ley ];
    tMatrixE[4] = [ tMatrixE[5][x] + lex, tMatrixE[5][y] + ley ];   
    tMatrixE[3] = [ tMatrixE[2][x] + llx, tMatrixE[2][y] + lly ];
    
    tMatrixG[0] = [ 0, 0 ];
    tMatrixG[1] = [ -lix, liy ] ;
    tMatrixG[5] = [ lix, liy ];
    tMatrixG[2] = [ tMatrixG[1][x] - lex, tMatrixG[1][y] - ley ];
    tMatrixG[4] = [ tMatrixG[5][x] + lex, tMatrixG[5][y] - ley ];   
    tMatrixG[3] = [ tMatrixG[2][x] + llx, tMatrixG[2][y] - lly ];
    
    // Points ;
    frame.CalcPoints(frame.Ct, tMatrixC );
    frame.CalcPoints(frame.Bt, tMatrixB );
    frame.CalcPoints(frame.Et, tMatrixE );
    frame.CalcPoints(frame.Gt, tMatrixG );



};
Frame.prototype.draw = function () {
    // Base
    var frame = this;

    // Styles
    //frame.context.translate(0.5,0.5);
    frame.context.lineWidth = 1;
    frame.context.strokeStyle = 'black';
    frame.context.fillStyle = '#E5E7E9';

    // DrawTop
    frame.drawTop(frame.Ct);
    frame.drawTop(frame.Bt);
    frame.drawTop(frame.Et);
    frame.drawTop(frame.Gt); 
    frame.drawSides();

    //frame.drawBottom(frame.Gt);

    // Restore Canvas Property
    //frame.context.setTransform(1, 0, 0, 1, 0, 0);
};