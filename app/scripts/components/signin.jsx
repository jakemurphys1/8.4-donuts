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
  handleExit:function(){
    $(".signFloat").addClass("hidden");
  },
  login:function(e){
    e.preventDefault();
    Parse.User.logIn($("#loginEmail").val(), $("#loginPassword").val(), {
      success: function(user) {
        console.log("You logged in as " , user)
        localStorage.setItem("userName",$("#loginEmail").val());
      },
      error: function(user, error) {
        console.log("You failed to log in as ",user,error)
      }
    });
    $(".signFloat").addClass("hidden");
  },
  signup:function(event){
    var user = new Parse.User();

    event.preventDefault();
    if($("#signupPassword1").val()!=$("#signupPassword2").val()){
      alert("Your passwords did not match.")
      return;
    }
    var $form = $(this);
    var data = {"username":$("#signupUsername").val(),"password":$("#signupPassword1").val(),"Fname":$("#signupFname").val(),
    "Lname":$("#signupLname").val(),"email":$("#signupEmail").val()};
user.set(data);

  user.signUp(null, {
    'success':function(results){
      console.log("results: ",results)
    },
    "error": function(user,error){
      console.log(user,error);
    }
  });
  localStorage.setItem("userName",$("#signupEmail").val());
$(".signFloat").addClass("hidden");

  },
  render:function(){

    return(
      <div className="TotalSignup row">
        <div className="row heading">Log In</div>
          <div className="row">
            <div className="col-md-6 col-xs-offset-1">
                <form onSubmit={this.login} id="login" action="" className="form-login">
                    <h2>Please login</h2>
                    <input id="loginEmail" type="text" name="email" placeholder="Username"/>
                    <input id="loginPassword" type="password" name="password" placeholder="Password"/>
                    <button type="submit" className="btn btn-lg btn-block btn-primary">Login</button>
                </form>
                </div>
              </div>
            <div className="row">
                <div className="col-md-6 col-xs-offset-1">
                  <form onSubmit={this.signup}  id="signin" action="" className="form-login">
                    <h2>...Or Sign Up</h2>
                    <div className="inputContainer">
                        <input id="signupFname" type="text" name="Fname" placeholder="First Name"/>
                        <input id="signupLname" type="text" name="Lname" placeholder="Last Name"/>
                      <input id="signupUsername" type="text" name="Username" placeholder="Username"/>
                    <input id="signupEmail" type="text" name="email" placeholder="Email"/>
                    <input id="signupPassword1" type="password" name="password1" placeholder="Password"/>
                    <input id="signupPassword2" type="password" name="password2" placeholder="Confirm Password"/>
                    </div>
                    <button type="submit" className="btn btn-lg btn-block btn-primary signinbutton">Sign Up</button>
                  </form>
                </div>
          </div>
          <button onClick={this.handleExit} className="btn btn-secondary">Exit</button>
    </div>
    )

  }
})

module.exports=SignUp;
