import React, {Component} from 'react';
import './HomePage.css';
import {Redirect} from 'react-router';

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Artist from "../images/artists.jpg"
import Athletics from "../images/athletics.jpg"
import Audi from "../images/auditorium.jpg"
import Art from "../images/Art-Gallery.jpg"
import NavBar from '../NavBar/NavBar';


//Define a Login Component
class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect : false,
        }
        this.handleclicks = this.handleclicks.bind(this);
    }
    
 handleclicks = () => {
    
     this.setState({redirect:true});
 }

    render(){
        let redirectVar = null;

    if (this.state.redirect){
        redirectVar = <Redirect to= "/login"/>
    }
    return (
             <div>
             <NavBar />
             {redirectVar}
            <Carousel  onClickItem={this.handleclicks} infiniteLoop autoPlay interval={3000} showArrows={false} 
            showStatus={false} showIndicators={false} showThumbs={false}>
            
            <div className="imagestyle" style={{backgroundImage:`url(${Artist})`}}>
            <h1 className="heading">Concerts </h1>
            
            </div>

            <div className="imagestyle" style={{backgroundImage:`url(${Athletics})`}}>
            <h1 className="heading">Sports</h1>
            
            </div>

            <div className="imagestyle" style={{backgroundImage:`url(${Audi})`}}> 
            <h1 className="heading">Talks</h1>
            
            </div>

            <div className="imagestyle" style={{backgroundImage:`url(${Art})`}}>
            <h1 className="heading">Art Gallery</h1>
            
            </div>
            
           
            
          </Carousel>

            
            
            </div> 

       
        
       
        )
    }
}

export default HomePage;