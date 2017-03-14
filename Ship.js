var shipCounter = 0;

function createShipElement()
{
  var ship = svgDocument.createElementNS("http://www.w3.org/2000/svg", "g");
    ship.setAttribute("id", "ship" + shipCounter);
    var polygon = svgDocument.createElementNS("http://www.w3.org/2000/svg", "polygon");
      polygon.setAttribute("id", "innership" + shipCounter);
      polygon.setAttribute("points", "0,5 -5,10 0,-15 5,10");
      polygon.setAttribute("style", "fill:none; stroke:white; stroke-width:2");    
    ship.appendChild(polygon);
    var flame = svgDocument.createElementNS("http://www.w3.org/2000/svg", "polyline");
      flame.setAttribute("id", "flame" + shipCounter);
      flame.setAttribute("points", "-3,7 0,13 3,7");
      flame.setAttribute("style", "stroke:white; stroke-width:1; visibility:hidden;");    
    ship.appendChild(flame);
  svgRoot.appendChild(ship);
  shipCounter++;
  return ship;
  
}

function Ship(x, y)
{
  this.ship = createShipElement();
  this.polygon = this.ship.firstChild;
  this.flame = this.ship.lastChild;
  this.ghosts = [createShipElement(),createShipElement(),createShipElement(),createShipElement(),createShipElement(),createShipElement(),createShipElement(),createShipElement()];
  this.live = true;
  this.x = x;
  this.y = y;
  this.rot = 0;
  this.vx = 0;
  this.vy = 0;
}
Ship.prototype.explode = function()
{
  this.live = false;
  new Explosion(this.ship, 0, 0, 50, 20);
  this.polygon.style.setProperty("visibility", "hidden");
  
  this.flame.style.setProperty("visibility", "hidden");

}


Ship.prototype.updateShip = function()
{ 
  if(this.live){
    if(upArrow)
    {
      this.flame.style.visibility = 'visible';
      for(var i = 0; i < this.ghosts.length; i++)
        this.ghosts[i].lastChild.style.visibility = 'visible';
    }
    else
    {
      this.flame.style.visibility = 'hidden';
      for(var i = 0; i < this.ghosts.length; i++)
        this.ghosts[i].lastChild.style.visibility = 'hidden';
    }
  }
  
  
  if(this.x < 0 && this.vx < 0) // off left edge
    this.x += innerWidth;  
  if(this.x > innerWidth && this.vx > 0) // off right edge
    this.x -= innerWidth; 
  if(this.y < 0 && this.vy < 0) // off top edge
    this.y += innerHeight;  
  if(this.y > innerHeight && this.vy > 0) // off bottom edge
    this.y -= innerHeight; 
  this.ship.setAttribute("transform", "translate(" + this.x + " " + this.y + ") rotate(" + this.rot + ")");
  this.ghosts[0].setAttribute("transform", "translate(" + (this.x + innerWidth) + " " + this.y + ") rotate(" + this.rot + ")");
  this.ghosts[1].setAttribute("transform", "translate(" + (this.x - innerWidth) + " " + this.y + ") rotate(" + this.rot + ")");
  this.ghosts[2].setAttribute("transform", "translate(" + this.x + " " + (this.y + innerHeight) + ") rotate(" + this.rot + ")");
  this.ghosts[3].setAttribute("transform", "translate(" + this.x + " " + (this.y - innerHeight) + ") rotate(" + this.rot + ")");
  this.ghosts[4].setAttribute("transform", "translate(" + (this.x + innerWidth) + " " + (this.y + innerHeight) + ") rotate(" + this.rot + ")");
  this.ghosts[5].setAttribute("transform", "translate(" + (this.x + innerWidth) + " " + (this.y - innerHeight) + ") rotate(" + this.rot + ")");
  this.ghosts[6].setAttribute("transform", "translate(" + (this.x - innerWidth) + " " + (this.y + innerHeight) + ") rotate(" + this.rot + ")");
  this.ghosts[7].setAttribute("transform", "translate(" + (this.x - innerWidth) + " " + (this.y - innerHeight) + ") rotate(" + this.rot + ")");
}
