var JM = require('../');

describe('chain', function(){
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
    
    it('should call next function and send uuid (array syntax)',function(){
        var input = {
            uuid:'ffffffff-aaaaaaaa-c0c0afafc1c1fefe0-cfcf1234'
        };
        
        var converter = JM.makeConverter({
            'uuid':[function(input){
                return input.uuid;
            },function(uuid){
                uuid.should.equal('ffffffff-aaaaaaaa-c0c0afafc1c1fefe0-cfcf1234');
            }]
        });
            
        converter(input);
    });
    
    it('should call next function and send uuid (array syntax + string path)',function(){
        var input = {
            uuid:'ffffffff-aaaaaaaa-c0c0afafc1c1fefe0-cfcf1234'
        };
        
        var converter = JM.makeConverter({
            'uuid':[
                'uuid',
                function(uuid){
                    uuid.should.equal('ffffffff-aaaaaaaa-c0c0afafc1c1fefe0-cfcf1234');
                }
            ]
        });
            
        converter(input);
    });
    
    it('should use all shotcuts for makecb',function(){
        var input = {
            user:{
                name:'John',
                nickname:'JonnyConnor'
            }
        };
        
        var converter = JM.makeConverter({
            'anotherUser':[ 'user', {
                n:'name',
                NN:'nickname'
            }]
        });
            
        converter(input).should.to.deep.equal({
            anotherUser:{
                n:'John',
                NN:'JonnyConnor'
            }
        });
    });
    
});