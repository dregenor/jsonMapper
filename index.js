/**
 * получает значение для пути из объекта в случае если по указанному пути ничего нету то возвращает undrfined
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
 * @param {string} path Путь для поиска
 * @param {Object} obj Объект в котором ищем
 * @returns {*}
 */
var getValByPath = module.exports.getValByPath = function (path,obj){
    var trg = obj;
    var arr = path.split('.');
    arr.forEach(function(pthChunk){
        if (typeof trg === "undefined" || typeof trg === "string" || typeof trg === "number"){
            return;
        }
        trg = trg[pthChunk];
    });
    return trg;
};

/**
 * принимает некоторое количество функций и выполняет их последовательно
 * передавая результат из одной функции в другую
 * @example
 * var chain = ch(function(a){return a + 1},function(b){return b / 2});
 * chain(3); // выведет 2 потомучто (3 + 1) /2 = 2
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
 * @param {object} input Объект для преобразования
 * @param {object} schema схема для преобразования
 * @returns {object}
 */
var applySchema = module.exports.applySchema = function(input,schema){
    var output = {};

    for (var par in schema ){
        if (schema.hasOwnProperty(par)){
            var pth = schema[par];

            var val = makeCb(pth)(input);

            if ( typeof val !== "undefined" ){
                output[par] = val;
            }
        }
    }
    return output;
};

/**
 * генерирует фабрику для преобразования объекта согласно схеме
 * @param schema
 * @returns {Function}
 */
var schema = module.exports.schema = function(schema){
    return function(input){
        return applySchema(input,schema)
    }
};

/**
 * генерирует фабрику получающую значение по заранее заданному пути
 * @param pth
 * @returns {Function}
 */
var getVal = module.exports.getVal = function(pth){
    return function(input){
        return getValByPath(pth,input);
    }
};


/**
 * генерирует фабрику делающую map с приминением заранее заданноко кэллбека
 * @param {Function|String} cb
 * @returns {Function}
 */
module.exports.map = function(fn){

    var cb = makeCb(fn);

    return function(input){
        if (input instanceof Array){
            return input.map(cb)
        }
    }
};

var makeCb = module.exports.makeCb = function(fn){
    if (typeof fn === "string"){
        return getVal(fn);
    } else if (typeof fn === "function"){
        return fn;
    } else if (fn instanceof Array){
        return ch.apply(null,fn);
    } else if ((typeof fn == "object") && (fn !== null)){
        return schema(fn);
    } else {
        return function(){};
    }
};

module.exports.helpers = {
    /**
     * Фабрика шаблонизатор подменяет {ключ} на соответствующее значение из input[ключ]
     * TODO длинные пути для шаблонизации key1.subkey2.subsubkey3
     * @param tpl
     * @returns {Function}
     */
    template:function(tpl){
        return function(input){
            var result = tpl;
            for ( var key in input){
                if (input.hasOwnProperty(key)){
                    result = result.replace( '{' + key + '}' , input[ key ] );
                }
            }
            return result;
        }
    }
};