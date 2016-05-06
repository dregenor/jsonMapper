module.exports.debugLog = function(){};
/**
 * take the path and try solve this, if it is impossible return undefined
 *
 * @example
 *  var obj = {
 *      user:{
 *          name:'Jon',
 *          speed:100
 *      },
 *      place:{
 *          distance: '100km'
 *      }
 *  }
 *
 *  var name = getValByPath('user.name',obj);
 *  var distance = getValByPath('place.distance',obj);
 * @param {string|string[]} path Path to search
 * @param {Object} obj object for search
 * @returns {*}
 */
var getValByPath = module.exports.getValByPath = function (path,obj){
    var trg = obj,
        arr = typeof path == 'string'?path.split('.'):path,
        l = arr.length -1,
        i=-1;
    while(i++<l){
        if (arr[i] !== '$root'){
            if (typeof trg === "undefined" || trg === null){
                module.exports.debugLog('path ' + path.toString() + ' has unavailable chunk' + arr[i]);
                return void 0;
            }
            trg = trg[arr[i]];
        }
    }
    return trg;
};

/**
 * take some functions and call is one by one 
 * @example
 * var chain = ch(function(a){return a + 1},function(b){return b / 2});
 * chain(3); // return 2 because (3 + 1) /2 = 2
 * @returns {Function}
 */
var ch = module.exports.ch = function(){
    var chain = [].slice.call(arguments);
    chain = chain.map(makeCb);

    return function(input){
        return chain.reduce(function(tail,cb){
            return cb(tail)
        },input);
    }
};

/**
 *
 * @param {object} input object to transform
 * @param {object} schema schema for transform
 * @returns {object}
 */
var applySchema = module.exports.applySchema = function(input,schema){
    var output = {};

    for (var par in schema ){
        if (schema.hasOwnProperty(par)){

            var val = schema[par](input);

            if ( typeof val !== "undefined" ){
                output[par] = val;
            }
        }
    }
    return output;
};

/**
 * generate factory for transform object
 * @param schema
 * @returns {Function}
 */
var makeConverter = module.exports.makeConverter = function(schema){

    var schemaConverter = {};

    if (Object.prototype.toString.call(schema) !== "[object Object]" && !(schema instanceof Array) ){
        throw new Error("schema must be Object or Array");
    }
    // generate callbacks for the scheme
    for (var par in schema ){
        if (schema.hasOwnProperty(par)){
            schemaConverter[par] =  makeCb(schema[par]);
        }
    }

    return function(input){
        return applySchema(input,schemaConverter)
    }
};

/**
 * generate a converter to map a converter to an array
 * @param  convert
 * @return {Function}
 */
module.exports.makeMapConverter = function(convert){

    return function(input){
        var result = [];
        input.forEach(function(obj){
            result.push(convert(obj));
        });
        return result;
    };
};

/**
 * make getVal factory
 * @param pth
 * @returns {Function}
 */
var getVal = module.exports.getVal = function(pth){
    var pt = pth.split('.');
    return function(input){
        return getValByPath(pt,input);
    }
};


/**
 * make factory to make map with fn
 * @param {Function|String} fn
 * @returns {Function}
 */
module.exports.map = function(fn){

    var cb = makeCb(fn);

    return function(input){
        if (input instanceof Array){
            return input.map(cb);
        }
        return void 0;
    }
};

/**
 * make factory to transform
 * @type {makeCb}
 */
var makeCb = module.exports.makeCb = function(fn){
    if (typeof fn === "string"){
        return getVal(fn);
    } else if (typeof fn === "function"){
        return fn;
    } else if (fn instanceof Array){
        return ch.apply(null,fn);
    } else if ((typeof fn == "object") && (fn !== null)){
        return makeConverter(fn);
    } else {
        return function(){};
    }
};

var filterUndefined = function(converter){
    return function(input){
        if (typeof input !== 'undefined'){
            return converter(input);
        }
    }
};

module.exports.helpers = {
    /**
     * Template factory replace {key} to value from input[key]
     * @param {string} tpl
     * @returns {Function}
     */
    template:function(tpl,strong){

        // parce template
        var finder = /\{([^\}]+\})/g,
            paths =  tpl.match(finder);

        if ((paths === null) || (paths.length == 0)){
            paths = [];
        }

        //make getters to placeholder
        paths = paths.map(function(pth){
            return {
                pth : pth,
                cb  : makeCb(pth.slice(1,pth.length-1))
            }
        });

        return function(input){
            return paths.reduce(function(tail,itm){
                var val = itm.cb(input);
                if (typeof  tail !== "undefined" && !(strong && typeof val === "undefined")){
                   return tail.replace( itm.pth, val );
                } else {
                    return void 0; //undefined
                }
            },tpl);
        }
    },

    templateStrong:function(tpl){
        return module.exports.helpers.template(tpl,true);
    },

    def:function(val){
        return function(){
            return val;
        }
    },

    valOrDef:function(def){
        return function(input){
            return input || def;
        }
    },

    dict:function(dictionary){
        return function(key){
            return dictionary[key]
        }
    },

    filterUndefined:filterUndefined,
    toBoolean:filterUndefined(Boolean),
    toNumber:filterUndefined(Number),
    toUndefined:function(input){
        if (isNaN(input) || input === null || typeof input === 'undefined'){
            return void 0;
        }
        return input;
    }

};
