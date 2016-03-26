var React = require("react");
var ReactDOM=require("react-dom");
var Backbone = require("backbone");
var $ = require("jquery")
var Input = require("react-bootstrap/lib/Input")
var Parse = require("parse")

var ItemSelect=React.createClass({
  handleReview:function(e){
    localStorage.setItem("CurrentId",e.currentTarget.id)
Backbone.history.navigate("Review",{trigger:true})

  },
  render:function(){
    return(<div onClick={this.handleReview} id={this.props.model.id} className="item col-md-3">
    <h2 >{this.props.model.get("RecipeName")}</h2>
    </div>)
  },
})

var Home = React.createClass({

  getInitialState:function(){
    return {
      "theList": []
    }
  },
    componentDidMount(){
      Parse.initialize("jakeappid");
      Parse.serverURL = 'http://tiny-jakes.herokuapp.com'

      var recipe = Parse.Object.extend("Recipes");
        var query = new Parse.Query(recipe);
        var theResult;
      query.find({
      success: function(results) {
        theResult=results;
        console.log("results" , results)
      },
      error: function(error) {
        console.log("Server not connected")
      }
      }).done(function(){

      var theList = theResult.map(function(model){
          return <ItemSelect model={model} key = {model.id} />
          });
          if(theList.length>4){
            theList = theList.slice(0,4)
          }
          this.setState({"theList":theList})
      }.bind(this));
    },
  render:function(){

    return(
    <div className="Total">

        <div className="myRecipes row listRow">
          <div className="row headerPart"><span className="left">My Recipes</span><span className="right">view all</span></div>
          <div className="row items">
        {this.state.theList}
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
