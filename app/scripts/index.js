var Backbone=require("backbone");
var $ = require("jquery");
var React = require("react");
var ReactDOM=require("react-dom");
var HomeForm=require("./components/home.jsx")
var MakerForm=require("./components/maker.jsx")
var SignupForm=require("./components/signin.jsx")
var Parse = require("parse")

//local
var models = require("./models/models.js");
var myCollection = new models.Collection();
var myModel = new models.Model()

var RecipeRouter = Backbone.Router.extend({
  routes:{
    "":"home",
    "home":"home",
    "addRecipe":"addRecipe",
    "Login":"Login",
  },
  home:function(){
ReactDOM.render(<HomeForm collection={myCollection} router={this} />,document.getElementById("itemList"))
  },
  addRecipe:function(){
ReactDOM.render(<MakerForm collection={myCollection} router={this}/>,document.getElementById("itemList"))
  },
  Login:function(){
ReactDOM.render(<SignupForm collection={myCollection} router={this}/>,document.getElementById("itemList"))
  },
})

var router = new RecipeRouter();
Backbone.history.start();


$("#headerPlus").click(function(){
    router.navigate("addRecipe",{trigger:true})
})

$("#headerUser").click(function(){
  console.log("user")
    router.navigate("Login",{trigger:true})
})
