var JM = require('../');

describe('execution.simple', function(){
    it('should make converter with chain',function(){
        JM.makeConverter({
            'uuid':JM.ch(function(){})
        }).should.be.a('function');
    });
    
    
    it('should call next function and send uuid',function(){
        var input = {
            uuid:'ffffffff-aaaaaaaa-c0c0afafc1c1fefe0-cfcf1234'
        };
        
        var converter = JM.makeConverter({
            'uuid':JM.ch(function(input){
                return input.uuid;
            },function(uuid){
                uuid.should.equal('ffffffff-aaaaaaaa-c0c0afafc1c1fefe0-cfcf1234');
            })
        });
            
        converter(input);
    });
    
    it('should return undefined and not call next function');
});