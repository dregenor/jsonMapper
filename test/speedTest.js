/**
 * Created by dreg on 26.06.14.
 */
var JM = require('../');

var describe = function(msg,cb){
        console.time(msg);
        cb();
        console.timeEnd(msg);
    },
    it = describe;



describe('speed test', function(){
    var data = {
        items:[]
    };
    it('generate data',function(){
        for(var i = 0;i<1000000;i++){
            data.items.push({
                uuid:'id'+i,
                name:'name'+i,
                params:{
                    param1:1,
                    param2:'tst',
                    param3:[1,2,3],
                    param4:{type:'obj'},
                    param5:null
                }
            })
        }
    });
    
    var schema = null;
    it('generate schema',function(){
        schema = JM.makeConverter({
            convertedItems:['items',JM.map({
                id:'uuid',
                n:'name',
                p1:'params.param1',
                p2l:'params.param2.length',
                p2:'params.param2',
                p3l:'params.param3.length',
                p3_2:'params.param3.2',
                p4:'params.param4',
                p5:'params.param5'
            })]
        });
        //schema.should.to.be.a('function');
    });
    
    it('run convert',function(){
        var result = schema(data);
        //result.should.to.be.an('object');
    });
    schema = JM.makeConverter({
        convertedItems:['items',JM.map('params.param5')]
    });    

    it('test getter',function(){
        var result = schema(data);
        //result.should.to.be.an('object');
    })
    
});