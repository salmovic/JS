//Se encierra el codigo en una funcion anonima para no contaminar el scope de JavasCript
//modelo
(function(){
	//pizarron
	//self == window se puede acceder globalmente
	 self.Board = function(width,height) {
		this.width=width;
		this.height=height;
		//variable que determina si alguien esta jugando
		this.playing = false;
		//varibale que determinar si el juego se termino
		this.game_over = false;

		this.bars= [];
		this.ball=null;
		this.playing = false;
	}
	self.Board.prototype = {
		get elements(){
			// indexar cada uno de los elementos
			var elements = this.bars.map(function(boar){return boar;});
			elements.push(this.ball);
			return elements;
		}
	}	
})();
//Barras mvc parte 2
(function(){
	self.Bar = function(x,y,width,height,board){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.board = board;		
		this.board.bars.push(this); //llenar el arreglo board
		this.kind = "rectangulo";	
		this.speed = 10; //velocidad para mover las barras
	}
	//Modigicando el prototype de esta fucion
	self.Bar.prototype={		
		//Bajar la velocidad
		down: function() {
			this.y += this.speed;
		},
		// reducir la velocidad
		up: function() {
			this.y -= this.speed;
		},
		//Retorna la posicion del bar
		toString: function(){
			return "x: "+this.x+" y: "+this.y;
		}
	}	
})();
//end video 2
//Funcion Pelota
(function(){
	self.Ball = function(x,y,radius,board){
		this.x=x;
		this.y=y;
		this.radius = radius;
		this.board=board;
		this.speed_y = 0;
		this.spedd_x = 3;
		this.board = board;
		this.direction=1;

		board.ball = this;
		this.kind="circle";
	}
	self.Ball.prototype = {
			move: function(){
				this.x += (this.spedd_x * this.direction);
				this.y += this.speed_y;
			}
		}
})();
// vista
(function(){
	self.BoardView = function(canvas,board){	
		this.canvas = canvas;
		this.canvas.width = board.width;
		this.canvas.height = board.height;
		this.board = board;
		this.ctx = canvas.getContext("2d");
	}
	//modificando prototype de esta clase
	self.BoardView.prototype= {
		clean: function(){
			this.ctx.clearRect(0,0,this.board.width,this.board.height);
		},
		draw: function(){
			for (var i = this.board.elements.length - 1; i >= 0; i--) {
				var el = this.board.elements[i];
				draw(this.ctx,el);
			}
		},
		//Inicar
		play:function(){
			if (this.board.playing) {
				this.clean();
				this.draw();
				this.board.ball.move();
			}
		}
	}
	//helper metods
	function draw(ctx,element){		
			switch(element.kind){			
				case "rectangulo":
				ctx.fillRect(element.x,element.y,element.width,element.height);
				break;
				case "circle":
				ctx.beginPath();
				ctx.arc(element.x,element.y,element.radius,0,7);
				ctx.fill();
				ctx.closePath();
				break;
			}		
	}
})();

var board = new Board(800,400);
	var bar = new Bar(20,100,40,100,board);
	//derecha
	var bar_2 = new Bar(740,100,40,100,board);
	var canvas = document.getElementById("canvas");
	var board_view = new BoardView(canvas,board);
	var ball = new Ball(350, 100,10,board);
	//Animacion en el frame
	board_view.draw();
	window.requestAnimationFrame(controller);
	setTimeout(function(){
		ball.direction=-1;
	},4000);
self.document.addEventListener("keydown",function(ev){
	ev.preventDefault();
	if( ev.keyCode === 38 ){
		ev.preventDefault();
		bar.up();
	} else if ( ev.keyCode === 40) {
		ev.preventDefault();
		bar.down();
	}else if( ev.keyCode === 87 ) {
		ev.preventDefault();
		//w
		bar_2.up();
	}else if( ev.keyCode === 83 ) {
		ev.preventDefault();
		//s
		bar_2.down();
	}else if (ev.keyCode === 32) {
		ev.preventDefault();
		board.playing = !board.playing;
	}
	//console.log(ev.keyCode);
	//console.log(bar.toString());
	console.log(""+bar);	
});

self.addEventListener("load",controller);
//Ejecuta todos los elementos 
function controller() {	
	board_view.play();
	window.requestAnimationFrame(controller)
	
}
//endo parte 1

