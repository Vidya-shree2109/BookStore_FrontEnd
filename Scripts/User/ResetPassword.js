window.addEventListener('DOMContentLoaded', () => {
 
    //Declaration of regex Pattern varaible
    const regexPass = RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$_])[a-zA-Z0-9@#$_]{8,}$');
   
    const Newpswd = document.getElementById('Newpswd');
    const Cpswd = document.getElementById('Cpswd');
    const Resetpswd = document.querySelector('#resetpswd');
    let np = 0, cp = 0;

    const showError = (inputId, spanId, errMsg, beforeinput, afterinput) => {
       console.log(errMsg);
       document.getElementById(inputId).classList.remove(beforeinput);
       document.getElementById(inputId).classList.add(afterinput);
       document.getElementById(spanId).classList.add('Errmsg');
       document.getElementById(spanId).classList.remove('form-hint');
       document.getElementById(spanId).innerHTML = errMsg;
       return false;
     };
   
     const showSuccess = (inputId, spanId, sucessMsg, beforeinput, afterinput) => {
       document.getElementById(inputId).classList.add(beforeinput);
       document.getElementById(inputId).classList.remove(afterinput);
       document.getElementById(spanId).classList.remove('Errmsg');
       document.getElementById(spanId).classList.add('form-hint');
       document.getElementById(spanId).textContent = sucessMsg;
       return true;
    };
   
    Newpswd.addEventListener('keyup', () => {
       console.log(Newpswd.id);
       np = check(Npass, 'beforeinput', 'afterinput', 'NPHint', "Enter Valid password | Eg. Jay@1234", "", regexPass)
    });

    Cpswd.addEventListener('keyup', () => {
        console.log(Cpswd.id);
        cp = matchpassword(Cpass, 'beforeinput', 'afterinput', 'CPHint', "New Password and Confirm Password must match", "")
    });
   
    function matchpassword(Cpass, beforeinput, afterinput, spanId, errMsg, sucessMsg) {
    if (Newpswd.value != Cpswd.value) {
      a = showError(Cpswd.id, spanId, errMsg, beforeinput, afterinput);
      return 0;
    }
    else {
      a = showSuccess(Cpswd.id, spanId, sucessMsg, beforeinput, afterinput);
      return 1;
    }
    };
    
    function check(input, beforeinput, afterinput, spanId, errMsg, sucessMsg, regex) {
       if (!regex.test(input.value)) {
         a = showError(input.id, spanId, errMsg, beforeinput, afterinput);
         return 0;
       } else {
         a = showSuccess(input.id, spanId, sucessMsg, beforeinput, afterinput);
         return 1;
       }
    };
   
    Resetpswd.addEventListener('click', () => {
       $.ajax({
         url: `https://localhost:44372/User/ForgotPassword/${emailId.value}`,
         type: "POST",
         success: function (result) {
           console.log(result);
           alert('Password Reset Link Sent Sucessfully...');
           ResetPageField();
         },
         error: function (error) {
           console.log(error);
         }
       })
    })
   
    function ResetPageField(){
       emailId.value='';
    };

})