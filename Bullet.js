function createBulletElement()
{
  var bullet = svgDocument.createElementNS("http://www.w3.org/2000/svg", "circle");
  bullet.setAttribute("r", "3");
  bullet.setAttribute("style", "fill:none; stroke:white; stroke-width:1");
  svgRoot.appendChild(bullet);
  return bullet;
}

function Bullet(x, y, vx, vy, deconstructFunction)
{
  this.bullet = createBulletElement();
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.r = 3;
  this.timer = 200;
  this.deconstructFunction = deconstructFunction;
}

Bullet.prototype.deconstruct = function()
{
  svgRoot.removeChild(this.bullet);
  this.deconstructFunction(this);
  
}

Bullet.prototype.step = function()
{
  this.x += this.vx / 100;
  this.y += this.vy / 100;
  if(this.x < 0 && this.vx < 0) // off left edge
    this.x += innerWidth;  
  if(this.x > innerWidth && this.vx > 0) // off right edge
    this.x -= innerWidth; 
  if(this.y < 0 && this.vy < 0) // off top edge
    this.y += innerHeight;  
  if(this.y > innerHeight && this.vy > 0) // off bottom edge
    this.y -= innerHeight; 
  this.bullet.setAttribute("cx", this.x);
  this.bullet.setAttribute("cy", this.y);
  this.timer--;
  if(this.timer < 0)
  {
    this.deconstruct();
  }
  
}