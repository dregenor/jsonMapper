json-mapper
==========

Simple json mapper

- [How to use](#how-to-use)
- [Shut up and show me SIMPLE convert](#shut-up-and-show-me-simple-convert)
- [Helpers](#helpers)


How to use
----------

Wery simple case


```js
var input = {
    user:{
        name:"John",
        nick:"C00lHacker"
    }
};

var JM = require('json-mapper');

var converter =  JM.makeConverter({
    name:function(input){
        if (!input.user){
            return;
        } else {
            return input.user.name
        }
    }
});

var result = converter(input);

console.log(result); // should be {name:"John"}
```

for add more sugar i have factory getVal(path)

```js



var converter =  JM.makeConverter({
    name:JV.getVal("user.name");
});
```

And if i write just "user.name" it is be synonym JM.getVal("user.name")


```js

var converter =  JM.makeConverter({
    name:"user.name";
});

```

If you wonna chain callbacks use `ch` factory


```js

var input = {
  user:{
      name:"Alex",
      nickname:"FOfan"
  },
  locations:[
      {x:1,y:21}, // i need this x
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


var JM = require('json-mapper');

var converter  = JM.makeConverter({
    val : JM.ch(
            function(input){ return input.locations; },
            function(input){ return input[0] },
            function(input){ return input.x}
            )

});

var result = converter(input); // should be {val:1}

```


for simplify JM.ch i use array

```js

var input = {
  user:{
      name:"Alex",
      nickname:"FOfan"
  },
  locations:[
      {x:1,y:21}, // i need this x
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


var JM = require('json-mapper');

var converter  = JM.makeConverter({
    val : [  function(input){ return input.locations; },
             function(input){ return input[0] },
             function(input){ return input.x}
          ]
});

var result = converter(input); // should be {val:1}

```


JM.ch function also can convert "some.path" to JM.getVal("some.path")

also for processing arrays present map factory

```js

var input = {
  user:{
      name:"Alex",
      nickname:"FOfan"
  },
  locations:[
      {x:1,y:21}, // i need this x
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


var JM = require('json-mapper');

var converter  = JM.makeConverter({
    val : JM.ch("locations", JM.map(function(input){ return input.x }))
});

var result = converter(input); // should be {val:[1,2,3,4,5,6,7,8,9,10,11,12]}

```

or

```js
    var converter  = JM.makeConverter({
        val : ["locations", JM.map("x")]
    });
```

for simple conver path to getVal callback i use JM.makeCb(val);

if val is function then it is just return.

if val is string then return getVal(val).

if val is array then return ch.apply(null,val); .

if val is hash then return schema(val); .



New feature is '$root' alias

```js

 var JM = require('json-mapper');

 var input = {
        uuid:"1233123123",
        user:{
            name:"sergey"
        },
        objects:[
            "atoken",
            "btoken",
            "ctoken",
            "dtoken",
            "etoken",
            "Fplane",
            "Splane",
            "nodejs",
            "memcache",
            "sql",
            "tpl",
            "ejs"
        ]
    };

    var converter = JM.makeConverter({
        originalObject:'$root',
        uuid:"uuid",
        link:[
            JM.helpers.templateStrong("http://127.0.0.1/users/?name={user.name}"),
            JM.helpers.templateStrong('<a href="{$root}">user</a>')
        ],
        objects:["objects",JM.map(JM.helpers.templateStrong("http://127.0.0.1/objects/{$root}"))]
    });

    console.log('\n\n\n\ convert with template & root',converter(input));
```

result

```json

{
    originalObject:  {
        uuid: '1233123123',
        user: { name: 'sergey' },
        objects: [
            'atoken',
            'btoken',
            'ctoken',
            'dtoken',
            'etoken',
            'Fplane',
            'Splane',
            'nodejs',
            'memcache',
            'sql',
            'tpl',
            'ejs'
        ]
    },

    uuid: '1233123123',
    link: '<a href="http://127.0.0.1/users/?name=sergey">user</a>',
    objects:  [
        'http://127.0.0.1/objects/atoken',
        'http://127.0.0.1/objects/btoken',
        'http://127.0.0.1/objects/ctoken',
        'http://127.0.0.1/objects/dtoken',
        'http://127.0.0.1/objects/etoken',
        'http://127.0.0.1/objects/Fplane',
        'http://127.0.0.1/objects/Splane',
        'http://127.0.0.1/objects/nodejs',
        'http://127.0.0.1/objects/memcache',
        'http://127.0.0.1/objects/sql',
        'http://127.0.0.1/objects/tpl',
        'http://127.0.0.1/objects/ejs'
    ]
}

```

Shut up and show me SIMPLE convert
--------

ok

```js
var input = {
  user:{
      name:"Alex",
      nickname:"FOfan"
  },
  locations:[
      {x:1,y:21}, // i need this x
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


var JM = require('json-mapper');

var converter  = JM.makeConverter({
    all_x : ["locations", JM.map("x")],
    all_y : ["locations", JM.map("y")],
    x_sum_y: ["locations", JM.map(function(input){
        return input.x + input.y
    })],
    locations_count:["locations",function(arr){
        return arr.length;
    }],
    locations_count_hack:"locations.length",
    just_mappet_name:"user.name",
    another_object:{
        nickname:"user.nickname",
        location_0_x:"locations.0.x"
    }
});

var result = converter(input);

console.log(result);

```

result is

```json
{
  "all_x":   [ 1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12 ],
  "all_y":   [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32 ],
  "x_sum_y": [ 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44 ],
  "locations_count": 12,
  "locations_count_hack": 12,
  "just_mappet_name": "Alex",
  "another_object": {
    "nickname": "FOfan",
    "location_0_x": 1
  }
}
```


Helpers
========


template and templateStrong
---------
just example

```js

var JM = require('json-mapper');

var input = {
    uuid:"1233123123",
    user:{
        name:"sergey"
    },
    objects:[
        {id:1001,name:"atoken"},
        {id:1002,name:"btoken"},
        {id:1003,name:"ctoken"},
        {id:1004,name:"dtoken"},
        {id:1005,name:"etoken"},
        {id:1006,name:"Fplane"},
        {id:1007,name:"Splane"},
        {id:1008,name:"nodejs"},
        {id:1009,name:"memcache"},
        {id:1010,name:"sql"},
        {id:1011,name:"tpl"},
        {id:1012,name:"ejs"}
    ]
};


var converter = JM.makeConverter({
    uuid:           "uuid",
    hrefStrong:     JM.helpers.templateStrong("http://127.0.0.1/users/?name={user.name}"),
    href:           JM.helpers.template("http://127.0.0.1/users/?name={user.name}"),
    hrefStrongFail: JM.helpers.templateStrong("http://127.0.0.1/users/?name={user.undefinedKey}"),
    hreffail:       JM.helpers.template("http://127.0.0.1/users/?name={user.undefinedKey}"),
    objects:["objects",JM.map({
        href:JM.helpers.templateStrong("http://127.0.0.1/objects/{id}")
    })]
});

console.log('\n\n\n convert with template \n\n', converter(input));

```

Result:

```json 
 {
   uuid:        '1233123123',
   hrefStrong:  'http://127.0.0.1/users/?name=sergey',
   href:        'http://127.0.0.1/users/?name=sergey',
   hreffail:    'http://127.0.0.1/users/?name=undefined',
   objects:
    [ { href: 'http://127.0.0.1/objects/1001' },
      { href: 'http://127.0.0.1/objects/1002' },
      { href: 'http://127.0.0.1/objects/1003' },
      { href: 'http://127.0.0.1/objects/1004' },
      { href: 'http://127.0.0.1/objects/1005' },
      { href: 'http://127.0.0.1/objects/1006' },
      { href: 'http://127.0.0.1/objects/1007' },
      { href: 'http://127.0.0.1/objects/1008' },
      { href: 'http://127.0.0.1/objects/1009' },
      { href: 'http://127.0.0.1/objects/1010' },
      { href: 'http://127.0.0.1/objects/1011' },
      { href: 'http://127.0.0.1/objects/1012' } ]
  }

```

templateStrong return undefined if one or more keys is undefined


def
----

```js


var JM = require('json-mapper');

var converter = JM.makeConverter({
    uuid:           JM.helpers.def("14")
});

console.log('\n\n\n convert with default \n\n', converter({}));

```

result
```

  {
    uuid: '14'
  }

```

JM.helpers.def(val) - always return val



valOrDef
-----

```js

    var JM = require('json-mapper');


    var converter = JM.makeConverter({
        uuid:  [ 'uuid' , JM.helpers.def("14") ],
        uuid2: [ 'uuid2', JM.helpers.valOrDef("15")]
    });

    console.log('\n\n\n convert with default \n\n', converter({
        "uuid":"15",
        "uuid2":"17"
    }));

```

result

```json

{
    uuid: '14',
    uuid2: '17'
}

```
if input in null or undefined valOrDef(val) return val else return input


dict
----


```js
var JM = require('json-mapper');


    var converter = JM.makeConverter({
        type:  [
            'type' ,
            JM.helpers.dict({
                1:"fit",
                2:"crop",
                3:"fit"
            })
        ]
    });

    console.log('\n\n\n convert with default \n\n', converter({
        "type":1
    }));

```


result

```json

 { type: 'fit' }

```

toBoolean, toNumber, toUndefined, filterUndefined
----------------------------------------------
```js
    var JM = require('json-mapper');
    var h = JM.helpers;

     var converter = JM.makeConverter({
            isGuest:['role', h.toBoolean],
            isUser:['user', h.toBoolean],
            userId:['userId', h.toNumber],
            catalogId:['catalogId', h.toNumber],
            catalogId2:['catalogId', h.toNumber, h.toUndefined],
            catalogId3:['catalogId',h.filterUndefined(function(input){
                // input always not undefined
                return input + '1';
            })],
            catalogId4:['UndefinedCatalogId',h.filterUndefined(function(input){
                // input always not undefined
                return input + '1';
            })]
        });


        console.log('\n\n\n convert to boolean and to number \n\n', converter({
            "role":2,
            "userId":'13',
            "catalogId":'somethingLiteral'
        }));
```

result

```json

{ isGuest: true,
  userId: 13,
  catalogId: NaN,
  catalogId3: 'somethingLiteral1'
}

```


dict make a dictionary and return value by key