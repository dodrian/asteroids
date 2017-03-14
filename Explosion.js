var ID = 0;

function Explosion(root, x, y, r, num)
{
  var dots = new Array();
  
  for(var i = 0; i < num; i++)
  {
    var dot = svgDocument.createElementNS("http://www.w3.org/2000/svg", "rect");
    var name = "dot" + ID;
    ID++;
    dot.setAttribute("width", 1);  // x and y should auto be zero
    dot.setAttribute("height", 1);
    dot.setAttribute("style", "fill:white; stroke:white;");
    dot.setAttribute("id", name);
 
    
    var dur = 4 * Math.random() + "s";
    var animex = svgDocument.createElementNS("http://www.w3.org/2000/svg", "animate");
    animex.setAttribute("attributeName", "x");
    animex.setAttribute("from", x);
    animex.setAttribute("to", x + Math.floor(2 * r * Math.random() - r));
    animex.setAttribute("dur", dur);
    animex.setAttribute("fill", "remove");
    animex.setAttribute("begin", "freeze");
    
    var animey = svgDocument.createElementNS("http://www.w3.org/2000/svg", "animate");
    animey.setAttribute("attributeName", "y");
    animey.setAttribute("from", y);
    animey.setAttribute("to", y + Math.floor(2 * r * Math.random() - r));
    animey.setAttribute("dur", dur);
    animey.setAttribute("fill", "remove");
    animey.setAttribute("begin", "indefinite");
    
    
    var animeFade = svgDocument.createElementNS("http://www.w3.org/2000/svg", "animate");
    animeFade.setAttribute("attributeName", "opacity");
    animeFade.setAttribute("begin", "indefinite");
    animeFade.setAttribute("to", 0);
    animeFade.setAttribute("fill", "freeze");
    animeFade.setAttribute("dur", dur);
    
    
    dot.appendChild(animex);
    dot.appendChild(animey);
    dot.appendChild(animeFade);
    root.appendChild(dot);
    animex.beginElement();
    animey.beginElement();
    animeFade.beginElement();
    dots.push(dot);

  }
  function deconstructdots()  // this gives root proper scope
  {
    foreach(dots, function(dot) { root.removeChild(dot) });
    //for(var ii = 0; ii < dots.length; ii++)
    //  root.removeChild(dots[ii]);
  }
  setTimeout(deconstructdots, 4000);
}


