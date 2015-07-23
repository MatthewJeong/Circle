var x = 300;
var y = 100;
var x1 = 500;
var y1 = 0;
var radius = 50;
var color;
var circle={
	drawCircle: function(x,y,radius,color){
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.clearRect(0,0,c.width,c.height);
		var path = new Path2D();
		path.arc(x,y,radius,0,2*Math.PI);
		ctx.fillStyle=color;
		ctx.fill(path);
		ctx.stroke();
		square.drawSquare(x1,y1,150);
	}
}

var square={
	drawSquare: function(x,y,width){
		var canvas = document.getElementById("myCanvas");
		var context = canvas.getContext("2d");
		context.fillRect(x,y,width,width);
	}
}

function calcVector(){
	var deltaX = x-x1;
    var deltaY = y-y1;
	var unitVeloX = (deltaX/Math.sqrt((deltaX*deltaX)+(deltaY*deltaY)));
	var unitVeloY = (deltaY/Math.sqrt((deltaX*deltaX)+(deltaY*deltaY)));
	var moveX = unitVeloX*2;
	var moveY = unitVeloY*2;
	x1+=moveX;
	y1+=moveY;
}

function followCircle(){
	calcVector();
	circle.drawCircle(x,y,radius,color);
	square.drawSquare(x1,y1,150);
	var squareX = x1+5;
	var squareY = y1-75;
	var distance = Math.sqrt((x-squareX)*(x-squareX)+(y-squareY)*(y-squareY));
	if(distance<75+radius){
		alert("You Lose!");
	}
}

document.onkeydown = function(event) {
     if (!event)
          event = window.event;
     var code = event.keyCode;
     if (event.charCode && code == 0)
          code = event.charCode;
     switch(code) {
          case 37:
              x=x-8;
			  circle.drawCircle(x,y,radius,color);
              break;
          case 38:
             y=y-8;
			 circle.drawCircle(x,y,radius,color);
              break;
          case 39:
              x=x+8;
			  circle.drawCircle(x,y,radius,color);
              break;
          case 40:
              y=y+8;
			  circle.drawCircle(x,y,radius,color);
              break;
		   case 65:
			  color = Math.floor(Math.random()*16777215).toString(16);
			  color= "#"+color;
			  circle.drawCircle(x,y,radius,color);
			  break;
			case 66:
			  radius=radius+2;
			  circle.drawCircle(x,y,radius,color);
			  break;
			case 67:
			  if(radius>0){
				radius=radius-2;
			  }
			  circle.drawCircle(x,y,radius,color);
			  break;
     }
     event.preventDefault();
};

circle.drawCircle(x,y,radius,color);
square.drawSquare(x1,y1,150);
setInterval(followCircle,25);