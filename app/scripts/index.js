var Backbone=require("backbone");
var $ = require("jquery");
var React = require("react");
var ReactDOM=require("react-dom");
var HomeForm=require("./components/home.jsx")
var MakerForm=require("./components/maker.jsx")
var SignupForm=require("./components/signin.jsx")
var ReviewForm=require("./components/review.jsx")
var Parse = require("parse")
var Input = require("react-bootstrap/lib/Input");
var ButtonInput= require("react-bootstrap/lib/ButtonInput")

var appContainer= document.getElementById("itemList")

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
    "Review":"Review"
  },
  home:function(){
    ReactDOM.unmountComponentAtNode(appContainer);
    $(function(){
      ReactDOM.render(<HomeForm collection={myCollection} router={this} />,appContainer)
    })

  },
  addRecipe:function(){
    ReactDOM.unmountComponentAtNode(appContainer);
ReactDOM.render(<MakerForm collection={myCollection} router={this}/>,appContainer)
  },
  Login:function(){
    ReactDOM.unmountComponentAtNode(appContainer);
ReactDOM.render(<SignupForm collection={myCollection} router={this}/>,appContainer)
  },
  Review:function(){
    ReactDOM.unmountComponentAtNode(appContainer);
    $(function(){
        ReactDOM.render(<ReviewForm collection={myCollection} router={this}/>,appContainer)
    })

  },
})

var router = new RecipeRouter();
Backbone.history.start();


$("#headerPlus").click(function(){
    router.navigate("addRecipe",{trigger:true})
})

$("#headerUser").click(function(){
    router.navigate("Login",{trigger:true})
});

$("#SBmyRecipes").click(function(){
  router.navigate("home",{trigger:true})
})
