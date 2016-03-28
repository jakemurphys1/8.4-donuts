var React = require("react");
var ReactDOM=require("react-dom");
var Backbone = require("backbone");
var $ = require("jquery")
var Input = require("react-bootstrap/lib/Input")
var Parse = require("parse")


var Review = React.createClass({
getInitialState:function(){
  return {
    "properties": {},
    "steps":[],
    "Ingre":[],
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
      "TempType":results.get("TempType"),
      "Quantity":results.get("Quantity"),
      "QuantityType":results.get("QuantityType"),
      "PersonalNotes":results.get("PersonalNotes"),
    };
    },
    error: function(error) {
      console.log("Server not find")
    }
    }).done(function(){
      this.setState({"properties":tempObject});
     }.bind(this));

  var Step = Parse.Object.extend("Steps");
  var stepQuery = new Parse.Query(Step);
  var stepArray=[];
    stepQuery.equalTo("RecipeID", localStorage.getItem("CurrentId"));

    stepQuery.find({
    success: function(results) {
      var count = 1;
      while(results[0].get("Step" + count) != undefined){
        stepArray.push(results[0].get("Step" + count))
        count+=1
      }
    },
    error: function(error) {
      console.log("Step Server not find")
    }
    }).done(function(){
      this.setState({"steps":stepArray});
     }.bind(this));

     var Ingre = Parse.Object.extend("Ingredients");
     var ingreQuery = new Parse.Query(Ingre);
     var ingreArray=[];
     ingreQuery.equalTo("RecipeID", localStorage.getItem("CurrentId"));
     ingreQuery.find({
     success: function(results) {
        ingreArray=results;

       },
       error: function(error) {
         console.log("Ingre Server not find")
       }
       }).done(function(){
         this.setState({"Ingre":ingreArray});
        }.bind(this));


},
handleAdjust:function(){
    var newQty = $("#batchSize").val();
    var oldQty = this.state.properties.Quantity;
    this.state.properties.Quantity=newQty;
    var Adjustment = newQty/oldQty;
    var newIngreList = this.state.Ingre
    for(var i =0;i<this.state.Ingre.length;i++){
      var newValue = eval(newIngreList[i].get("Amount"))

      newValue=newValue*Adjustment;
      newIngreList[i].set("Amount",newValue.toFixed(2))
    };
 this.setState({"Ingre":newIngreList})
},
  render:function(){
        var count = 0;
        var allIngredients=this.state.Ingre;
        var theseSteps = this.state.steps.map(function(item){
          count+=1
            var ingreQty=[];
            var ingreName=[];
            for(var i = 0;i<allIngredients.length;i++){
              if(allIngredients[i].get("Step")==count){
                var newQty = <div className="row ingreQty">{eval(allIngredients[i].get("Amount")).toFixed(2).replace(/[.,]00$/, "") + " " + allIngredients[i].get("Unit")}</div>
                var newName =   <div className="row ingreItem">{allIngredients[i].get("Name")}</div>
              ingreQty.push(newQty)
              ingreName.push(newName)
              }
            };
            return(
              <div key={Date.now() + count} className="col-md-6 col-md-offset-3 TotalStep">
                <div className="row"><h3>Step {count}</h3></div>
                <div className="row">
                  <div className="col-md-6 ingreDescription"><span>{item}</span></div>
                  <div className="col-md-2 ">
                  {ingreQty}
                  </div>
                  <div className="col-md-4 ">
                    {ingreName}
                  </div>
                </div>
              </div>
            )
        })

        allIngredients=allIngredients.map(function(item){
          var ingreName=item.get("Name");
          var ingreQty = eval(item.get("Amount")).toFixed(2).replace(/[.,]00$/, "") ;
          var ingreType = item.get("Unit");

          return(<div className="col-md-3 col-xs-12"><b><p>{ingreName}:</p></b><p>{ingreQty} {ingreType} </p></div>)
        })


    return(
    <div className="Total review">

      <div className="row heading"><h1>{this.state.properties.RecipeName}</h1><p>By {this.state.properties.Creator}</p></div>
    <div className="row">
      <div className="col-md-3 reviewInfo">
        <div className="row"><span>Type</span></div>
        <div className="row"><p>{this.state.properties.Type}</p></div>
      </div>
      <div className="col-md-3 reviewInfo">
        <div className="row"><span>Prep Time</span></div>
        <div className="row"><p>{this.state.properties.PrepTime}</p></div>
      </div>
      <div className="col-md-3 reviewInfo">
        <div className="row"><span>Cook Time</span></div>
        <div className="row"><p>{this.state.properties.CookTime}</p></div>
      </div>
      <div className="col-md-3 reviewInfo">
        <div className="row"><span>Cook Temp</span></div>
        <div className="row"><p>{this.state.properties.CookTemp} {this.state.properties.TempType}</p></div>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 col-md-offset-3 quantity">
        <div className="row"><span>{this.state.properties.Quantity} {this.state.properties.QuantityType}</span><span className="floatright"><input id="batchSize" type="text" placeholder="Adjust batch Size"/>
        <button onClick={this.handleAdjust} className="btn btn-secondary">Adjust</button></span></div>
        <div className="row"><h3>Ingredients:</h3>{allIngredients}</div>
        <div className="row ingredients"><div className="col-md-2"></div></div>
        </div>
    </div>

    <div className="row steps">
      {theseSteps}
    </div>

    <div className="row personal">
      <div className="col-md-6 col-md-offset-3">
        <div className="row">Personal Notes</div>
        <div className="row text">
            <p>{this.state.properties.PersonalNotes}</p>
          </div>
        </div>
      </div>


    </div>
    )

  }
})


module.exports = Review;
