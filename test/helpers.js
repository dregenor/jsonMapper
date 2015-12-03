var JM = require('../');
var H = JM.helpers;

describe('helpers', function(){
    
    
    it('should be an object',function(){
        expect(H).to.be.an('object');    
    });
    
    
    describe('helpers.template', function(){
        it('should make template',function(){
            
            var input = {
                name:'John',
                nickname:'Jonny Connor'
            };
            
            var converter = JM.makeConverter({
                user: H.template('{name} aka {nickname}')
            });
            
            converter(input).should.to.deep.equal({
                user:'John aka Jonny Connor'
            });
        });
        
        it('should make static template',function(){
            
            var input = {};
            
            var converter = JM.makeConverter({
                text: H.template('static template text')
            });
            
            converter(input).should.to.deep.equal({
                text:'static template text'
            });
        });
    });
    
    describe('helpers.templateStrong', function(){
        it('should make template',function(){
             var input = {
                name:'John',
                nickname:'Jonny Connor'
            };
            
            var converter = JM.makeConverter({
                user: H.templateStrong('{name} aka {nickname}')
            });
            
            converter(input).should.to.deep.equal({
                user:'John aka Jonny Connor'
            });
        });
        
        it('should return undefined if path unaviable',function(){
            var input = {};
            should.equal(H.templateStrong('{unaviablePath}')(input),void 0);
        })
    });
    
    
    describe('helpers.def', function(){
        it('should return def value',function(){
            should.equal(H.def(123)(817246),123);
        });
    });
    
    describe('helpers.valOrDef', function(){
        it('should return def value',function(){
            should.equal(H.valOrDef(123)(null),123);
        });
        it('should return def value',function(){
            should.equal(H.valOrDef(123)(undefined),123);
        });
        it('should return def value',function(){
            should.equal(H.valOrDef(123)(''),123);
        });
        it('should return def value',function(){
            should.equal(H.valOrDef(123)(0),123);
        });
        it('should return val value',function(){
            should.equal(H.valOrDef(123)(432),432);
        });
    });
    
    describe('helpers.dict', function(){
        it('should return key of dict',function(){
            var dictionary = {
                en:'english',
                fr:'france',
                de:'germany'
            };
            
            H.dict(dictionary)('en').should.equal('english');
        });
    });
    
    describe('helpers.filterUndefined', function(){
        it('should call fn',function(){
            var testvar = 0;
            H.filterUndefined(function(input){
                testvar = 1;    
            })(1);
            
            testvar.should.equal(1);
        });
        
        it('should NOT call fn',function(){
            var testvar = 0;
            H.filterUndefined(function(input){
                testvar = 1;    
            })(undefined);
            
            testvar.should.equal(0);
        });
    });
    
    describe('helpers.toUndefined', function(){
        it('should be equal undefined',function(){
            should.equal(H.toUndefined(parseInt('asdfa',10)),void 0);
        });
        it('should be equal undefined',function(){
            should.equal(H.toUndefined(null),void 0);
        });
        it('should be equal undefined',function(){
            should.equal(H.toUndefined(undefined),void 0);
        });
        it('should be not undefined',function(){
            should.equal(H.toUndefined(123),123);
        });
    });
    
    describe('helpers.toNumber', function(){
      it('should be 12',function(){
            should.equal(H.toNumber(12),12);
      });  
      it('should be 12',function(){
            should.equal(H.toNumber('12'),12);
      });  
      it('should be NaN',function(){
            should.equal(isNaN(H.toNumber('asd')),true);
      });  
    
      it('should be undefined',function(){
            should.equal(H.toNumber(undefined),void 0);
      });  
    });
    
    describe('helpers.toBoolean', function(){
      it('should be true',function(){
            should.equal(H.toBoolean(true),true);
      });  
      it('should be true',function(){
            should.equal(H.toBoolean('true'),true);
      });  
      it('should be false',function(){
            should.equal(H.toBoolean(''),false);
      });  
    
      it('should be undefined',function(){
            should.equal(H.toBoolean(undefined),void 0);
      });  
    });
    
    
});