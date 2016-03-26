var React = require("react");
var ReactDOM=require("react-dom");
var Backbone = require("backbone");
var $ = require("jquery")
var Input = require("react-bootstrap/lib/Input")
var Parse = require("parse")

var Steps = React.createClass({
  getInitialState:function(){
    return {
      "ingredients": [<div><input className="inputs1" type="text" placeholder="Amount" />
      <input className="inputs1" type="text" placeholder="Unit" /><input className="inputs2" type="text" placeholder="Ingredient" />
      <button onClick={this.handleRemove} className = "btn btn-secondary">remove</button></div>]
    }
  },
  handleRemove:function(){

  },
  handleAdd:function(){
      var newingredient = this.state.ingredients.push(<div><input className="inputs1" type="text" placeholder="Amount" />
      <input className="inputs1" type="text" placeholder="Unit" /><input className="inputs2" type="text" placeholder="Ingredient" />
      <button onClick={this.handleRemove} className = "btn btn-secondary">remove</button></div>)
        console.log(newingredient)
             this.setState({"ingredients": newingredient})
  },
  render:function(){


    return(
      <div>{this.state.ingredients}
    <button onClick={this.handleAdd} className = "btn btn-primary">Add</button>
      <textarea id="Description"></textarea>
    </div>
    )
  }
});

var Maker = React.createClass({
  handleCreate:function(){
      Parse.initialize("jakeappid");
    Parse.serverURL = 'http://tiny-jakes.herokuapp.com'
    var username = localStorage.getItem("userName")
    if(username==undefined){
      alert("Please make an account and log in to create recipes.")
      return
    }

    var TestObject = Parse.Object.extend("Recipes");
    var testObject = new TestObject();
    var data = ({"UserName":username,"Creator":$("#CreatorName").val(),"RecipeName":$("#recipeName").val(),
    "Type":$("#recipeType option:selected").text(),"PrepTime": $("#prepTime").val(),"CookTime": $("#cookTime").val(),
    "TempType":$("#Temptype option:selected").text(),"Quantity": $("#Quantity").val(),"QuantityType": $("#QuantityType").val(),
    "Steps": $("#Steps").val()})
    testObject.save(data).then(function(object) {
    console.log(object, " has been saved.")
    });
  },
  handleNewStep:function(){

  },
  componentDidMount(){

  },
render:function(){

  //var steps=[];
  var steps = [<Steps/>]


return(
  <div className="Total">

<div className="row recipeHead">
  Basic info
</div>

<div className="row recipeHead">
    <input id="recipeName" type="text" placeholder="Recipe Name" />
    <p><input id="CreatorName" type="text" placeholder="By" /></p>
</div>

<div className="row info">
    <select id="recipeType">
      <option value="Breakfast">Breakfast</option>
      <option value="Lunch">Lunch</option>
      <option value="Dinner">Dinner</option>
      <option value="Dessert">Dessert</option>
    </select>
    <input id="prepTime" className="inputs1" type="text" placeholder="Prep Time" />
    <input id="cookTime" className="inputs1" type="text" placeholder="Cook Time" />
        <input id="cookTemp" className="inputs1" type="text" placeholder="Cook Temp" />
      <select id="Temptype">
        <option value="Farenheit">Farenheit</option>
        <option value="Celsius">Celsius</option>
      </select>
</div>

<div className="row info">
  <span>This recipe will make</span>
  <input id="Quantity" className="inputs1" type="text" placeholder="Amount" />
  <input id="QuantityType" className="inputs2" type="text" placeholder="Cookies, loaves, ect." />
</div>

<div className="row info">
    {steps}
  <button id="Save" onClick={this.handleNewStep} className="btn btn-primary">Next Step</button>
</div>

<div className="row info">
  <button id="Save" onClick={this.handleCreate} className="btn btn-primary">Save this recipe</button>
</div>


  </div>
)
}
})

module.exports = Maker;
