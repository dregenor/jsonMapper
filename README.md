jsonMapper
==========

simple json mapper


how to use
----------

wery simple case



var converter =  require('jsonMapper').schema({
    name:function(input){
        if (!input.user){
            return;
        } else {
            return input.user.name
        }
    }
})