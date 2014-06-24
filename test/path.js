var JM = require('../');

describe('path tests', function(){
    var input = {
            user:{
                name:"Alex",
                nickname:"FOfan"
            },
            uuid:'ffffffff-aaaaaaaa-c0c0afafc1c1fefe0-cfcf1234',
            nullVar:null
    };
    
    it('should equal uuid',function(){
        
        JM.getValByPath("uuid",input).should.equal(input.uuid)
    });    
    
    it('should equal user.name',function(){
        JM.getValByPath("user.name",input).should.equal(input.user.name);
    });
    
    it('unaviablePath should equal undefined',function(){
        should.not.exist(JM.getValByPath("unaviablePath",input));        
    });
        
    it('deep.Unaviable is equal undefined',function(){
        should.not.exist(JM.getValByPath("deep.Unaviable.Path",input));
    });
        
    it('$root is equal input',function(){
        JM.getValByPath("$root",input).should.equal(input);
    });
    
    it('nullVar is equal null',function(){
        should.equal(JM.getValByPath("nullVar",input),null);
    });
       
    it('nullVar.somepath is equal undefined',function(){
        should.equal(JM.getValByPath("nullVar.somepath",input),undefined);
    });
    
    it('nullVar.$root is equal null',function(){
        should.equal(JM.getValByPath("nullVar.$root",input),null);
    });
    
    it('uuid.length is aviable and equal input.uuid.length',function(){
        should.equal(JM.getValByPath("uuid.length",input),input.uuid.length);
    });
});