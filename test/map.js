var JM = require('../');

describe('map', function(){
   it('should map all items',function(){
       
       var input = {
           arr:[
               {x:1},
               {x:2},
               {x:3},
               {x:4}
           ]
       };
       
       var converter = JM.makeConverter({
           numbers:['arr',JM.map(function(input){
               return input.x;
           })]
       });
       
       converter(input).should.to.deep.equal({
           numbers:[1,2,3,4]
       });
       
   }); 
    
   it('should calc summ',function(){
       
       var input = {
           arr:[
               {x:1},
               {x:2},
               {x:3},
               {x:4}
           ]
       };
       
       var converter = JM.makeConverter({
           summ:['arr',JM.map(function(input){
               return input.x;
           }),function(arr){
               return arr.reduce(function(tail,val){return tail + val});
           }]
       });
       
       converter(input).should.to.deep.equal({
           summ:1+2+3+4
       });
        
   });
    
   it('should return undefined',function(){
       should.equal(JM.map('tst')({}), void 0);
   });
    
});