// Copyright Dorian 2010
// Email (reversed): moc )tod( nairdod )ta( nairdod
var leftArrow, rightArrow, upArrow, spacebar;
var timer;
var timerRunning;
var myShip;
var bullets = new Array();
var asteroids = new Array();

function keyDown(event)
{
  switch(event.keyCode)
  {
    case 13: // enter

      break;
    case 32:
      spacebar = true;
      if(myShip.live){
        var bullet = new Bullet(myShip.x, 
                                myShip.y, 
                                myShip.vx + 200 * Math.sin(myShip.rot * Math.PI / 180), 
                                myShip.vy - 200 * Math.cos(myShip.rot * Math.PI / 180),
                                deconstructBullet);
        bullets.push(bullet);
      }
      break;
    case 37:   // left arrow
      leftArrow = true;
      break;
      
    case 38:   // up arrow
      upArrow = true;
      break;
      
    case 39:   // right arrow
      rightArrow = true;
      break;
    
    case 80: // escape
      if(timerRunning)
        stop();
      else start();
      
    break;
  }
}

function keyUp(event)
{
  switch(event.keyCode)
  {
    case 32:
      
      spacebar = false;
      break;
      
      
    case 37:   // left arrow
      leftArrow = false;
      break;
      
    case 38:   // up arrow
      upArrow = false;
      break;
      
    case 39:   // right arrow
      rightArrow = false;
      break;
  }
}

function deconstruct(deconstructArray, item)
{
  var b;
  while((b = deconstructArray.shift()) != item)
    deconstructArray.push(b);

}
function deconstructBullet(item)
{
  deconstruct(bullets, item);
}

function keyPress(event)
{
  switch(event.keyCode)
  {
    case 32:

      break;
      
      
  }
}

function init(evt) {
  if ( window.svgDocument == null )
    svgDocument = evt.target.ownerDocument;
  svgDocument.onkeyup = keyUp;
  svgDocument.onkeydown = keyDown;
  svgDocument.onkeypress = keyPress;
  svgRoot = svgDocument.rootElement;
  myShip = new Ship(innerWidth / 2, innerHeight / 2);
  myShip.updateShip();
  for(var i = 0; i < 5; i++)
  asteroids.push(new Asteroid(Math.floor(Math.random() * innerWidth),
                              Math.floor(Math.random() * innerHeight),
                              Math.floor(Math.random() * 100),
                              Math.floor(Math.random() * 100),
                              36));
  start();

}

function foreach(array, f)
{
  for(var jj = 0; jj < array.length; jj++)
  {
    if(f(array[jj]))
      break;
    
  }
}


function timeStep()
{
  if(myShip.live)
  {
    if(leftArrow)
      myShip.rot -= 2;
    if(rightArrow)
      myShip.rot += 2;
    if(upArrow)
    {
      myShip.vx += 1 * Math.sin(myShip.rot * Math.PI / 180);
      myShip.vy -= 1 * Math.cos(myShip.rot * Math.PI / 180);
    }
  }

  foreach(asteroids, function(ele){ ele.step(); });
  foreach(bullets, function(ele){ ele.step(); });
  foreach(asteroids, function(ast){
                      if(myShip.live && ast.collisionDetectShip(myShip)) 
                         {
                         myShip.explode();
                         }
                      foreach(bullets, function(bullet){
                          if(ast.collisionDetect(bullet))
                              { asteroidHit(ast); 
                                bullet.deconstruct();
                              return true;  /// return true to break
                               // if this asteroid is destroyed, no need to compare agaist remaining bullets
                              }
                      });
          });

  
  myShip.x += myShip.vx / 100;
  myShip.y += myShip.vy / 100;
  myShip.updateShip();
  timer = setTimeout("timeStep()", 10);
}

function asteroidHit(asteroid)
{
  if(asteroid.r > 9)
  {
    asteroids.push(new Asteroid(asteroid.x + Math.floor(Math.random() * asteroid.r),
                                asteroid.y + Math.floor(Math.random() * asteroid.r),
                                asteroid.vx + (Math.floor(Math.random() * 100) - 100),
                                asteroid.vy + (Math.floor(Math.random() * 100) - 100),
                                asteroid.r - 9));
    asteroids.push(new Asteroid(asteroid.x + Math.floor(Math.random() * asteroid.r),
                                asteroid.y + Math.floor(Math.random() * asteroid.r),
                                asteroid.vx + (Math.floor(Math.random() * 100) - 100),
                                asteroid.vy + (Math.floor(Math.random() * 100) - 100),
                                asteroid.r - 9));
  }
  
  
  asteroid.hit();
  deconstruct(asteroids, asteroid);
  
}

function stop()
{
  clearTimeout(timer);
  timerRunning=false;
}
  
function start()
{
  timerRunning=true;
  timeStep();
}
