import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'

class FbLogin extends React.Component{
    state = {
        isLoggedIn: false,
        userID: "",
        name: "",
        email: "",
        picture: ""
      };

    responseFacebook = response => {
          console.log("response", response);
          
        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
          });
      }

      componentClicked = () =>{
          console.log('clicked');
          
      }


    render(){
        let fbContent;
        
        if(this.state.isLoggedIn){
            // fbContent = (
            //    window.location.href='/'
            //   );
        }else{
        fbContent = (
        <FacebookLogin
        //   appId="468465107359578"
          appId="468465107359578"
          autoLoad={false}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />)
        }

        return(
            <>
                {fbContent}
            </>
        )
    }
}

export default FbLogin