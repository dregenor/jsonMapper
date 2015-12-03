//var JM = require('json-mapper');

global.assert = require('chai').assert;
global.should = require('chai').should();
global.expect = require('chai').expect;

require('./path');
require('./makeConverter');
require('./makeMapConverter');
require('./chain');
require('./map');
require('./helpers');