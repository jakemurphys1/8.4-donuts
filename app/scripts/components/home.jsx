var React = require("react");
var ReactDOM=require("react-dom");
var Backbone = require("backbone");
var $ = require("jquery")
var Input = require("react-bootstrap/lib/Input")
var Parse = require("parse")


var Home = React.createClass({
  render:function(){
    Parse.initialize("jakeappid");
  Parse.serverURL = 'http://tiny-jakes.herokuapp.com'
    var query = new Parse.Query("Recipes");
    var theResult;
query.find({
  success: function(results) {
    console.log(results)
    theResult=results;
  },
  error: function(error) {
    console.log("Server not find")
  }
});
    return(
    <div className="Total">

        <div className="myRecipes row listRow">
          <div className="row headerPart"><span className="left">My Recipes</span><span className="right">view all</span></div>
          <div className="row items">
        {theResult}
          </div>
        </div>

        <div className="publicRecipes row listRow">
          <div className="row headerPart"><span className="left">Public Recipes</span><span className="right">view all</span></div>
          <div className="row items">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
        </div>

        <div className="popularRecipes row listRow">
          <div className="row headerPart"><span className="left">Popular Recipes</span><span className="right">view all</span></div>
          <div className="row items">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
        </div>

        <div className="favoriteRecipes row listRow">
          <div className="row headerPart"><span className="left">My Favorite Recipes</span><span className="right">view all</span></div>
          <div className="row items">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
        </div>

        <div className="myPantry row listRow">
          <div className="row headerPart"><span className="left">My Pantry</span><span className="right">view all</span></div>
          <div className="row items">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
        </div>
    </div>
    )

  }
})


module.exports = Home;