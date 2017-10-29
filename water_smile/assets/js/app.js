

  var animal = {
    run:true
  };


  var Dog = function(){
    this.name = 'dog';
  };
  

  var Grey = function (){
    this.collor = 'grey';
  };

  var Black = function (){
    this.collor = 'black';
  };
 
  Dog.prototype = animal;
  Dog.prototype.speak = function(){console.log('gaw');};


  var dogMater = new Dog();
  Grey.prototype = dogMater;
  Black.prototype = dogMater;


  
  var dog1 = new Grey();
  var dog2 = new Black();

  console.dir(dogMater);
  console.dir(dog1);
  console.dir(dog2);


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4gIHZhciBhbmltYWwgPSB7XG4gICAgcnVuOnRydWVcbiAgfTtcblxuXG4gIHZhciBEb2cgPSBmdW5jdGlvbigpe1xuICAgIHRoaXMubmFtZSA9ICdkb2cnO1xuICB9O1xuICBcblxuICB2YXIgR3JleSA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMuY29sbG9yID0gJ2dyZXknO1xuICB9O1xuXG4gIHZhciBCbGFjayA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMuY29sbG9yID0gJ2JsYWNrJztcbiAgfTtcbiBcbiAgRG9nLnByb3RvdHlwZSA9IGFuaW1hbDtcbiAgRG9nLnByb3RvdHlwZS5zcGVhayA9IGZ1bmN0aW9uKCl7Y29uc29sZS5sb2coJ2dhdycpO307XG5cblxuICB2YXIgZG9nTWF0ZXIgPSBuZXcgRG9nKCk7XG4gIEdyZXkucHJvdG90eXBlID0gZG9nTWF0ZXI7XG4gIEJsYWNrLnByb3RvdHlwZSA9IGRvZ01hdGVyO1xuXG5cbiAgXG4gIHZhciBkb2cxID0gbmV3IEdyZXkoKTtcbiAgdmFyIGRvZzIgPSBuZXcgQmxhY2soKTtcblxuICBjb25zb2xlLmRpcihkb2dNYXRlcik7XG4gIGNvbnNvbGUuZGlyKGRvZzEpO1xuICBjb25zb2xlLmRpcihkb2cyKTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
