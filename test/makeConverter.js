var JM = require('../');

describe('execution.simple', function(){
    
    it('should make function converter',function(){
       
       var converter  = JM.makeConverter({
            uuid:"uuid"
        }); 
        
        converter.should.to.be.a('function');
    });
    
    
    it('should fill all path',function(){
        
        var input = {
            uuid:'ffffffff-aaaaaaaa-c0c0afafc1c1fefe0-cfcf1234'
        };
    
        var data1  = JM.makeConverter({
            uuid:"uuid",
            uuid2:function(input){
                return input.uuid + '!!!';
            },
            uuid3:JM.getVal('uuid')
        })(input);
        
        data1.should.to.deep.equal({
            uuid:input.uuid,
            uuid2:input.uuid + '!!!',
            uuid3:input.uuid
        });
        
    });
    
})
    

