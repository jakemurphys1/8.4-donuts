var React = require("react");
var ReactDOM=require("react-dom");
var Backbone = require("backbone");
var $ = require("jquery")
var Input = require("react-bootstrap/lib/Input")
var Parse = require("parse")


var Review = React.createClass({
  getInitialState:function(){
  return {
    "properties": {}
  }
},
componentDidMount(){
  Parse.initialize("jakeappid");
Parse.serverURL = 'http://tiny-jakes.herokuapp.com'

var recipe = Parse.Object.extend("Recipes");
  var query = new Parse.Query(recipe);
  var tempObject={};
query.get(localStorage.getItem("CurrentId"),{
success: function(results) {
   tempObject = {
    "Creator":results.get("Creator"),
    "RecipeName": results.get("RecipeName"),
    "Type":results.get("Type"),
    "PrepTime":results.get("PrepTime"),
    "CookTime":results.get("CookTime"),
    "CookTemp":results.get("CookTemp"),
    "Quantity":results.get("Quantity"),
    "QuantityType":results.get("QuantityType"),
  };

},
error: function(error) {
  console.log("Server not find")
}
}).done(function(){
  this.setState({"properties":tempObject});
 }.bind(this));
},
  render:function(){
    var recipeName = this.state.properties.RecipeName;
    var creator = this.state.properties.Creator;
    var type = this.state.properties.Type;
    var prepTime = this.state.properties.PrepTime;
    var cookTime=this.state.properties.CookTime;
    var cookTemp = this.state.properties.CookTemp;
    var qty = this.state.properties.Quantity;
    var unit = this.state.properties.QuantityType;

    return(
    <div className="Total review">

      <div className="row heading"><h1>{recipeName}</h1><p>By {creator}</p></div>
    <div className="row">
      <div className="col-md-3 reviewInfo">
        <div className="row"><span>Type</span></div>
        <div className="row"><p>{type}</p></div>
      </div>
      <div className="col-md-3 reviewInfo">
        <div className="row"><span>Prep Time</span></div>
        <div className="row"><p>{prepTime}</p></div>
      </div>
      <div className="col-md-3 reviewInfo">
        <div className="row"><span>Cook Time</span></div>
        <div className="row"><p>{cookTime}</p></div>
      </div>
      <div className="col-md-3 reviewInfo">
        <div className="row"><span>Cook Temp</span></div>
        <div className="row"><p>{cookTemp}</p></div>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 col-md-offset-3 quantity">
        <div className="row"><span>{qty} {unit}</span><button className="btn btn-secondary">Adjust</button></div>
        <div className="row ingredients"><div className="col-md-2"><b>1/2 Cup</b></div><div className="col-md-10"><span>Sugar</span></div></div>
        </div>
    </div>

    <div className="row steps">
      <div className="col-md-6 col-md-offset-3">
        <div className="row">Step 1</div>
        <div className="row">
          <div className="col-md-6">Stuff</div>
          <div className="col-md-2 ">
            <div className="row ingreQty">1/2 cup</div>
            <div className="row ingreQty">1 cup</div>
            <div className="row ingreQty">2 tb</div>
          </div>
          <div className="col-md-4 ">
            <div className="row ingreItem">Sugar</div>
            <div className="row ingreItem">All purpose flour</div>
            <div className="row ingreItem">Cinnamon</div>
          </div>
        </div>
      </div>
    </div>

    <div className="row personal">
      <div className="col-md-6 col-md-offset-3">
        <div className="row">Personal Notes</div>
        <div className="row text">
            <p>Stuff that are personal</p>
          </div>
        </div>
      </div>


    </div>
    )

  }
})


module.exports = Review;
