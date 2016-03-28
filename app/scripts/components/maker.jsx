var React = require("react");
var ReactDOM=require("react-dom");
var Backbone = require("backbone");
var $ = require("jquery")
var Input = require("react-bootstrap/lib/Input")
var Parse = require("parse")

var IngredientItem = React.createClass({
  handleRemove:function(e){
    var curId = e.currentTarget.id;
  //ReactDOM.unmountComponentAtNode(document.getElementById('steps'));
  },
  render:function(){
    console.log(this.props.list)
    return(<div id={"div" + this.props.name}><input id = {"amount" + this.props.name} className="inputs1 ingreInput" type="text" placeholder="Amount" />
  <input id = {"unit" + this.props.name} className="inputs1 ingreInput" type="text" placeholder="Unit" /><input id = {"ingredient" + this.props.name} className="inputs2 ingreInput" type="text" placeholder="Ingredient" />
    </div>
    )
  },
});



var Steps = React.createClass({
  getInitialState:function(){
    return {
      "ingredients": [<IngredientItem name={"Ingre-1"} key={"Ingre-1"}/>],
    };
  },
  handleReset:function(){

    this.replaceState(this.getInitialState())
$(".ingreInput").val("");
  },
  handleAdd:function(){
      var newingredient = this.state.ingredients;
      newingredient.push(<IngredientItem List = {this.state.ingredients} name={"Ingre-"+(newingredient.length+1)} key={"Ingre-"+(newingredient.length+1)}/>)
             this.setState({"ingredients": newingredient})
  },
  render:function(){

    return(
      <div id="steps">{this.state.ingredients}
        <button onClick={this.handleAdd} className = "btn btn-primary">Add</button><button onClick={this.handleReset} className = "reset btn btn-secondary">Reset</button>
        <textarea className="ingreInput" id="Description"></textarea>
      </div>
    )
  }
});





var Maker = React.createClass({
    getInitialState:function(){
      return {
        "allSteps":[],

        "steps":[<Steps key={Date.now()}/>],
      }
    },
  handleCreate:function(){
    if($("#recipeName").val()==""){
      return;
    }
      Parse.initialize("jakeappid");
    Parse.serverURL = 'http://tiny-jakes.herokuapp.com'
    var username = localStorage.getItem("userName")
    if(username==undefined){
      alert("Please make an account and log in to create recipes.")
      return
    }

    var Recipe = Parse.Object.extend("Recipes");
    var recipe = new Recipe();


    var stepList = {"RecipeName": $("#recipeName").val()}
    var data = ({"UserName":username,"Creator":$("#CreatorName").val(),"RecipeName":$("#recipeName").val(),
    "Type":$("#recipeType option:selected").text(),"PrepTime": $("#prepTime").val(),"CookTime": $("#cookTime").val(),
    "TempType":$("#Temptype option:selected").text(),"CookTemp": $("#cookTemp").val(),
    "Quantity": $("#Quantity").val(),"QuantityType": $("#QuantityType").val(),
    "PersonalNotes": $("#PersonalNotes").val()})

    recipe.save(data).then(function(object) {
      var Steps = Parse.Object.extend("Steps");
      var steps = new Steps();
      stepList.RecipeID=object.id;
      localStorage.setItem("CurrentId",object.id)
      for(var i =0;i<this.state.allSteps.length;i++){



        for(var j = 0;j<this.state.allSteps[i].ingredients.length;j++){
          var Ingredient = Parse.Object.extend("Ingredients");
          var ingredient = new Ingredient();
            var ingrdata ={
              "Name":this.state.allSteps[i].ingredients[j].Ingredient,
              "Amount":this.state.allSteps[i].ingredients[j].Amount,
              "Unit":this.state.allSteps[i].ingredients[j].Unit,
              "Step":(i+1),
              "RecipeID":object.id,
              "RecipeName": $("#recipeName").val()
            }
          ingredient.save(ingrdata).then(function(object){

          })
        }

        var curStep = "Step"+(i+1);
        stepList[curStep]=this.state.allSteps[i].Description;
      };

      steps.save(stepList).then(function(object){
  Backbone.history.navigate("Review",{trigger:true})
      })


  }.bind(this));


  },
  handleNewStep:function(){
    var allIngredients=[];
    var ingredientCount=1;
     while($("#amountIngre-" + ingredientCount).val()!="" && $("#amountIngre-" + ingredientCount).val()!=undefined){
        allIngredients.push({"Amount":$("#amountIngre-" + ingredientCount).val(),"Unit":$("#unitIngre-" + ingredientCount).val(),"Ingredient":$("#ingredientIngre-" + ingredientCount).val()})
  ingredientCount+=1;
     }
    var newStep = {
      "id":this.state.allSteps.length,
      "ingredients":allIngredients,
      "Description":$("#Description").val(),
    }
    this.state.allSteps.push(newStep)
    this.setState({"steps":[<Steps key={Date.now()}/>]})
  },

render:function(){



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
        <option value="F" placeholder="F">F</option>
        <option value="C">C</option>
      </select>
</div>

<div className="row info">
  <span>This recipe will make</span>
  <input id="Quantity" className="inputs1" type="text" placeholder="Amount" />
  <input id="QuantityType" className="inputs2" type="text" placeholder="Cookies, loaves, ect." />
</div>

<div className="row info">
    {this.state.steps}
  <button id="NextStep" onClick={this.handleNewStep} className="btn btn-primary">Log this Step</button>
</div>

<div className="row info">
    Personal Notes
    <textarea id="PersonalNotes"></textarea>
</div>

<div className="row info">
  <button id="Save" onClick={this.handleCreate} className="btn btn-primary">Save this recipe</button>
</div>


  </div>
)
}
})

module.exports = Maker;
