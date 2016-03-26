var React = require("react");
var ReactDOM=require("react-dom");
var Backbone = require("backbone");
var $ = require("jquery")
var Input = require("react-bootstrap/lib/Input")
var Parse = require("parse")



var SignUp = React.createClass({
  componentDidMount:function(){
    Parse.initialize("jakeappid");
  Parse.serverURL = 'http://tiny-jakes.herokuapp.com'
  },
  login:function(e){
    e.preventDefault();
    Parse.User.logIn($("#loginEmail").val(), $("#loginPassword").val(), {
      success: function(user) {
        console.log("You logged in as " , user)
        localStorage.setItem("userName",$("#loginEmail").val());
        console.log(localStorage.getItem("userName"))
      },
      error: function(user, error) {
        console.log("You failed to log in as ",user,error)
      }
    });
  },
  signup:function(event){
    var user = new Parse.User();

    event.preventDefault();
    var $form = $(this);
    var data = {"username":$("#signupEmail").val(),"password":$("#signupPassword").val()};
user.set(data);

  user.signUp(null, {
    'success':function(results){
      console.log("results: ",results)
    },
    "error": function(user,error){
      console.log(user,error);
    }
  });
  $("#signupEmail").val("");
  $("#signupPassword").val("")
  },
  render:function(){

    return(
      <div className="TotalSignup row">
          <div className="col-md-6">
                <form onSubmit={this.login} id="login" action="" className="form-login">
                    <h2>Please login</h2>
                    <input id="loginEmail" type="text" name="email" placeholder="Email"/>
                    <input id="loginPassword" type="password" name="password" placeholder="Password"/>
                    <button type="submit" className="btn btn-lg btn-block btn-primary">Login</button>
                </form>
              </div>
            <div className="col-md-6">
              <form onSubmit={this.signup}  id="signin" action="" className="form-login">
                <h2>...Or Sign Up</h2>
                <div className="inputContainer">
                <input id="signupEmail" type="text" name="email" placeholder="Email"/>
                <input id="signupPassword" type="password" name="password" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-lg btn-block btn-primary signinbutton">Sign Up</button>
              </form>
          </div>
    </div>
    )

  }
})

module.exports=SignUp;
