var snd = new Audio("sound/coin.mp3");
var snd1 = new Audio("sound/challenger.mp3");
let dotList = [];


function setup() {
	
  let cnv = createCanvas(windowWidth - 25, windowHeight - 25);
  function create(_number){
	let i = 0;
	while(i != _number){
		let randomX = random(0 , windowWidth-25);
		let randomY = random(0, windowHeight-25);
		let randomXsp = random(-1, 1);
		let randomYsp = random(-1, 1);
		new dot(randomX, randomY, 130, randomXsp, randomYsp)
		i++;
	}
	}
	create(25);
}

class dot{
	constructor(_x, _y, _r, _xsp, _ysp){
		this.x = _x;
		this.y = _y;
		this.r = _r;
		this.xsp = _xsp;
		this.ysp = _ysp;
		this.buttonClick = false;
		dotList.push(this);
	}
	update(){
		this.x += this.xsp;
		this.y += this.ysp;
		//collisions
		//hits right wall reverse x
		if (this.x + this.r > windowWidth - 25 || this.x - this.r < 0){
			this.xsp = this.xsp * -1;
		}
		if (this.y + this.r > windowHeight - 25 || this.y - this.r < 0){
			this.ysp = this.ysp * -1;
		}

	}
	draw(){
		circle(this.x, this.y, this.r*2);
	}
	destroy(){
		snd.currentTime = 0;
		snd.play();
		dotList.splice(dotList.indexOf(this),1);
		//increase speed and decrease size
		for(let i of dotList){
			if(i.xsp > 0 || i.ysp > 0){
				i.xsp += 1;
				i.ysp += 1;
			}
			if(i.xsp < 0 || i.ysp < 0){
				i.xsp = i.xsp - 1;
				i.ysp = i.ysp - 1;
			}
			i.r = i.r - 5;
		}
		if(dotList.length == 0){
			snd1.play();
		}
	}
}

function mouseClicked(){
	for(let i of dotList){
		let distanceFromMouse = Math.sqrt(Math.pow(mouseX - i.x,2) + Math.pow(mouseY - i.y,2))
		if(distanceFromMouse < i.r){
			i.buttonClick = true; //change to destroy
			i.destroy();
			
			console.log(i.buttonClick);
		}
		else{
			console.log(i.buttonClick)
		}
	}

}

function draw() {
  background(220);
  fill(255, 204, 0);
  for( let i of dotList){
  	i.update();
  }
  for(let i of dotList){
  	i.draw();
  }
}