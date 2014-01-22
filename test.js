var A = require('./index.js');

var obj = {
  user:{
      name:"Alex",
      nickname:"FOfan"
  },
  locations:[
      {x:1,y:21},
      {x:2,y:22},
      {x:3,y:23},
      {x:4,y:24},
      {x:5,y:25},
      {x:6,y:26},
      {x:7,y:27},
      {x:8,y:28},
      {x:9,y:29},
      {x:10,y:30},
      {x:11,y:31},
      {x:12,y:32}
  ],
  uuid:'ffffffff-aaaaaaaa-c0c0afafc1c1fefe0-cfcf1234'
};

console.log('input:',obj);

var data1  = A.schema({
    uuid:"uuid",
    user_name:"user.name",
    nick:"user.nickname",
    xs:["locations", A.map("x")]
})(obj);

var schema1 = {
    uuid:"uuid",
    user_name:"user.name",
    nick:"user.nickname",
    xs:["locations", 'A.map("x")']
};

console.log( '\nschema1:\n', schema1 );
console.log( '\nresult1:\n', data1);

var data2 = A.schema({
    uuid:"uuid",
    user_name:"user.name",
    nick:"user.nickname",
    xs: A.ch(A.getVal("locations"), A.map(A.getVal("x")))
})(obj);

var schema2 = {
    uuid:"uuid",
        user_name:"user.name",
    nick:"user.nickname",
    xs: 'A.ch(A.getVal("locations"), A.map(A.getVal("x")))'
};


console.log( '\nschema2:\n', schema2 );
console.log( '\nresult2:\n', data1);

console.log('\nresult1 and result2 Must be:\n',{
    uuid: 'ffffffff-aaaaaaaa-c0c0afafc1c1fefe0-cfcf1234',
    user_name: 'Alex',
    nick: 'FOfan',
    xs: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
});


var data3  = A.schema({
    uuid:"uuid",
    user_name:"user.name",
    nick:"user.nickname",
    tplstr: function(input){
        if (A.getVal("user.name")(input)){
            return A.helpers.template("siski {user.name}, piski {locations.0.x}")(input)
        }
    },
    xs:{
        zero_x:"locations.0.x",
        zero_y:"locations.0.y"
    }
})(obj);

console.log('\n\n Data3:',data3);