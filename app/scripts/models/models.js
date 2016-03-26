var Backbone=require("backbone");
var $ = require("jquery");
var react = require("react");
var reactDOM=require("react-dom");

var Model = Backbone.Model.extend({

});

var Collection = Backbone.Model.extend({
  url:"http://tiny-parse-server.herokuapp.com",
  model:Model
})

module.exports={
  "Model":Model,
  "Collection":Collection
}
