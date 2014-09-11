var JM = require('../');

describe('makeMapConverter', function(){

    it('should map a converter on an array',function(){

        var input = [
            {
                a: '1',
                b: '2'
            },
            {
                a: '3',
                b: '4'
            }
        ];

        var objConverter = JM.makeConverter({
            a: 'a'
        });

        var arrConverter = JM.makeMapConverter(objConverter);

        var output = arrConverter(input);

        output.should.be.an.Array;
        output.should.be.of.length(2);
        output.should.contain({ a: '1'});
        output.should.contain({ a: '3'});
    });
})
