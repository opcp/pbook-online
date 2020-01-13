import React from 'react'
import { Captcha } from 'reactjs-captcha'

class Capecha extends React.Component{


    checkCaptcha(event) {
        console.log(1);
        
        // the user-entered captcha code value to be validated at the backend side
        let userEnteredCaptchaCode = this.captcha.getUserEnteredCaptchaCode();
       
        // the id of a captcha instance that the user tried to solve
        let captchaId = this.captcha.getCaptchaId();
       
        let postData = {
          userEnteredCaptchaCode: userEnteredCaptchaCode,
          captchaId: captchaId
        };
       
        let self = this;
       console.log(2);
       
        // post the captcha data to the /your-app-backend-path on your backend.
        // make sure you import the axios in this view with: import axios from 'axios';
        // axios.post(
        //   'https://your-app-backend-hostname.your-domain.com/your-app-backend-path',
        //   postData, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
        //     .then(response => {
        //         console.log(response[0]);
                
        //       if (response.data.success == false) {
        //         // captcha validation failed; reload image
        //         self.captcha.reloadImage();
        //         // TODO: maybe display an error message, too
        //       } else {
        //         // TODO: captcha validation succeeded; proceed with your workflow
        //       }
        //     });
       
        event.preventDefault();
      }


    render(){
        return(
            <>
            <Captcha ref={(captcha) => {this.captcha = captcha}}/>
            <input
              className="login_input"
              type="text"
              placeholder="輸入驗證碼"
              onClick={this.checkCaptcha}
            />
            </>
        )
    }

}

// export default Capecha