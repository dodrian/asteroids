Asteroid.prototype.createElement = function(r)
{
  var asteroid = svgDocument.createElementNS("http://www.w3.org/2000/svg", "circle");
  asteroid.setAttribute("r", r);
  asteroid.setAttribute("style", "fill:none; stroke:white; stroke-width:3");
  svgRoot.appendChild(asteroid);
  return asteroid;
}

function Asteroid(x, y, vx, vy, r)
{
  this.asteroid = this.createElement(r);
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.r = r;
}

Asteroid.prototype.hit = function()
{
  new Explosion(svgRoot, this.x, this.y, this.r * 4, this.r * 4);
  svgRoot.removeChild(this.asteroid);
}

Asteroid.prototype.collisionDetect = function(circle)
{
  var distance = Math.pow(this.x - circle.x,2) + Math.pow(this.y - circle.y, 2);
  return (distance <= Math.pow(this.r + circle.r,2));
  
}

Asteroid.prototype.isPointWithin = function(x, y)
{
  var distance = Math.pow(this.x - x, 2) + Math.pow(this.y - y,2);
  return (distance <= this.r * this.r);
}

// this code should not be here!
Asteroid.prototype.collisionDetectShip = function(ship)
{
  var x = - 15 * Math.sin(ship.rot);
  var y = 15 * Math.cos(ship.rot);
  if (this.isPointWithin(ship.x + x, ship.y + y))
    return true;
  x = -5 * Math.cos(ship.rot)
      - 10 * Math.sin(ship.rot);
  y = -5 * Math.sin(ship.rot)
      + 10 * Math.cos(ship.rot);
  if (this.isPointWithin(ship.x + x, ship.y + y))
    return true;
  x = 5 * Math.cos(ship.rot)
    - 10 * Math.sin(ship.rot);
  y = 5 * Math.sin(ship.rot)
    + 10 * Math.cos(ship.rot);
  if (this.isPointWithin(ship.x + x, ship.y + y))
    return true;
}

Asteroid.prototype.step = function()
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
  this.asteroid.setAttribute("cx", this.x);
  this.asteroid.setAttribute("cy", this.y);
  
}