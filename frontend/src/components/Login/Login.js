import React, {Component} from 'react';

import './Login.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from '../NavBar/NavBar';
import {BACKEND_HOST} from '../host_config';

//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            errorFlag : false
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            errorFlag : false
        })
    }
    // //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value,
            errorFlag : false
        })
    }
    // //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value,
            errorFlag : false
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
       
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
      // console.log("Sending Login Request", data);
        axios.post(BACKEND_HOST + '/login',data)   
        .then(response => {
                console.log("Status Code : ",response);
                if(response.status === 200){
                    this.setState({
                        errorFlag : false
                    });
                    
                    
                    console.log("Login Request Completed");
                }else{
                    
                    console.log("Login Error ");
                    this.setState({
                        errorFlag : true
                    })
                }
            
                
            
            })
            .catch((error) => {
                // Error
                if (error.response) {

                    this.setState({
                        errorFlag : true
                    })
                    
                } else if (error.request) {
                    this.setState({
                        errorFlag : true
                    })
                    
                    console.log(error.request);
                } else {
                    this.setState({
                        errorFlag : true
                    })
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
                this.setState({
                    errorFlag : true
                })
            });
           
 }

    render(){
        //redirect based on successful login
        //console.log("Rendering Login Page") 
        let redirectVar = null;
        let errorlog = null;
        if(cookie.load('cookie')){
            console.log("Valid Cookie, Redirect to Home");
            redirectVar = <Redirect to= {{  
                 pathname: '/SearchResultPage',      
                 state: { referrer: this.state.username }        
             }}/>
           
        }
        if(this.state.errorFlag){

            errorlog = <div className="alert-danger" > 
                       The username or password you entered is incorrect
                       
                        </div>
        }

        return(
            <div>
                <NavBar />
             <div className="jumbotron jumbotron-fluid">
             {redirectVar}
            
             
            {/* <div className="container"> */}
            {/* <div className="panel"> */}
            
            

                {/* <h2 style={{"text-align": 'center'}}>Login </h2>
                <p>Need an account? <Link to="/register" style={{color: 'blue'}}>SignUp</Link></p>
                        </div> */}
                <div className="login-form">
                    <div className="main-div" style={{"maxWidth": '35%'}}>
                        
                            <h2 style={{textAlign: 'center'}}>Flora Account Login</h2>
                            {/* <h2 style={{"text-align": 'center'}}>Login </h2> */}
                      <p>Need an account? <Link to="/signup" style={{color: 'blue'}}>SignUp</Link></p>
                
                             
                              {errorlog}
                              <br/>
                            
                            <div className="form-group">
                                <input onChange = {this.usernameChangeHandler} type="text" className="form-control" name="username" required="true" placeholder="Username"/>
                            </div>
                            <br/>
                            <div className="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" required="true" placeholder="Password"/>
                                <br/>
                            </div>
                            <div style={{"textAlign": 'center'}}>
                            <button onClick = {this.submitLogin} className="btn btn-primary">Login</button>                 
                            </div>
                    </div>
                </div>
            </div>   
                 
                 
            {/* </div>       */}
            </div>
        )
    }
}

export default Login;