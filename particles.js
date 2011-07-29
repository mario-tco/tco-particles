

function Explosion(canvasId, startX, startY)
{
    this.startX = startX;
    this.startY = startY;
    this.color = new Array(255, 144, 0);
    this.size = 1;
    this.gravity = 0.5;
    this.friction = .9;
    this.particles = new Array();
    this.maxParticles = 200;
    this.maxBlastParticles = 80;
    this.canvasContext = document.getElementById(canvasId).getContext("2d")

    this.createParticle = function()
    {
        if(this.particles.length > this.maxParticles)
        {
            this.particles[0].lifeSpan = 1;
            this.particles[0].velocityX = (Math.random() * 40) - 20;
            this.particles[0].velocityY = (Math.random() * 30) - 15;
            this.particles[0].x = this.startX;
            this.particles[0].y = this.startY;
            this.particles.push(this.particles.shift());
        }
        else
        {
            var particle = new Particle();
            particle.x = this.startX;
            particle.y = this.startY;
            particle.velocityX = (Math.random() * 45) - 22;
            particle.velocityY = (Math.random() * 5);
            
            this.particles.push(particle);
        }
    }
    
    this.step = function()
    {
        for(i = 0; i < this.particles.length; i++)
        {           
            this.particles[i].x -= this.particles[i].velocityX;
            this.particles[i].y -= this.particles[i].velocityY;
            this.particles[i].velocityX *= this.friction;
            this.particles[i].velocityY *= this.friction;
            this.particles[i].velocityY -= this.gravity;
            this.particles[i].lifeSpan -= .02;  
            
            if(this.particles[i].lifeSpan < 0) 
            {
                this.particles.splice(i, 1);
            }
        }
    }
    
    this.draw = function()
    {
        this.canvasContext.clearRect(0, 0, 800, 600);
        
        for(i = 0; i < this.particles.length; i++)
        {
            this.canvasContext.fillStyle = 'rgba('+this.color[0]+','+this.color[1]+','+this.color[2]+','+this.particles[i].lifeSpan+')'; 
            this.canvasContext.beginPath();
            this.canvasContext.arc(this.particles[i].x, this.particles[i].y, this.size*this.particles[i].lifeSpan, 0, Math.PI*2, true); 
            this.canvasContext.fill();
        }
    }
    
    
}

function Particle()
{   
    this.x = 0;
    this.y = 0;
    this.velocityY = 0;
    this.velocityX = 0;
    this.lifeSpan = 3;
}


//Globals
var explosion;
var maxBlastParticles = 10;

function createExplosion()
{
    explosion = new Explosion('explosion-canvas', 0, 0);
    //global loop
    setInterval('stepExplosion()', 10);
    
	var canvas = document.getElementById('explosion-canvas');
	canvas.addEventListener('click', fireParticle, false);
}

function onWindowMouseClick(e) 
{
	if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
}

function stepExplosion()
{
    explosion.step();
    explosion.draw();
}

function fireParticle(e)
{	
	if(e.offsetX) {
		explosion.startX = e.offsetX;
		explosion.startY = e.offsetY;
    }
    else if(e.layerX) {
        explosion.startX = e.layerX;
        explosion.startY = e.layerY;
    }
    for(i = 0; i < maxBlastParticles; i++) { 
        explosion.createParticle(); 
    }
}