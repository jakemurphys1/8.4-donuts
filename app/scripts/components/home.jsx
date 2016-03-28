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
var mealType=this.props.model.get("Type");
var imgUrl = "images/Breakfast.jpg"
if(mealType=="Lunch"){
imgUrl="images/Lunch.jpg"
} else if(mealType=="Dinner"){
imgUrl="images/Dinner.jpg"
} else if(mealType=="Dessert"){
imgUrl="images/Dessert.jpg"
}

var mealImage = {
  backgroundImage: 'url(' + imgUrl + ')',
}
    return(<div style={mealImage} onClick={this.handleReview} id={this.props.model.id} className="item col-md-3">
    <h2 className="homeName" >{this.props.model.get("RecipeName")}</h2><p>{mealType}</p>
    </div>)
  },
})

var Home = React.createClass({

  getInitialState:function(){
    return {
      "theList": [],
      "Shorten":true
    }
  },
  startFunction:function(){
    Parse.initialize("jakeappid");
    Parse.serverURL = 'http://tiny-jakes.herokuapp.com'

    var recipe = Parse.Object.extend("Recipes");
      var query = new Parse.Query(recipe);
      var theResult;
    query.find({
    success: function(results) {
      theResult=results;
    },
    error: function(error) {
      console.log("Server not connected")
    }
    }).done(function(){

    var theList = theResult.map(function(model){
        return <ItemSelect model={model} key = {model.id} />
        });
        if(theList.length>4 && this.state.Shorten ==true){
          theList = theList.slice(0,4)
        }
        this.setState({"theList":theList})
    }.bind(this));
  },
    componentDidMount(){
    this.startFunction();
    },
handleViewall:function(){
  if(this.state.Shorten){
    this.state.Shorten=false
  }else{
    this.state.Shorten=true;
  }
  this.startFunction();
},
  render:function(){
    var otherSection;
if(this.state.Shorten){
  otherSection = <div className="otherSection"><div className="publicRecipes row listRow">
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
}


    return(
    <div className="Total">

        <div className="myRecipes row listRow">
          <div className="row headerPart"><span className="left">My Recipes</span><span onClick={this.handleViewall} className="right">view all</span></div>
          <div className="row items">
        {this.state.theList}
          </div>
        </div>

      {otherSection}
    </div>
    )

  }
})


module.exports = Home;
