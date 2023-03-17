   // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import {getAuth , 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
 import {firebaseConfig} from './firebase.js';
 
// get id names from the form
const email = document.querySelector('#email');
const password = document.querySelector('#pwd');
const loginbtn = document.querySelector('#login');
const logout = document.querySelector('#logout');
const errormsg = document.querySelector('#errormsg');

   // Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

   const Signup = async() =>{
       const loginwithemail = email.value;
       const loginwithpassword = password.value;

       createUserWithEmailAndPassword(auth,loginwithemail,loginwithpassword).then((usercredential)=>{
           const user = usercredential.user;
           console.log(user);
       }).catch((error) =>{
           
           console.log('Error Code'+ errorcode);
           console.log('Error Message'+ errormessage);

       });

   }
   // Login user
   const Login = async() =>{
       const loginwithemail = email.value;
       const loginwithpassword = password.value;

       signInWithEmailAndPassword(auth,loginwithemail,loginwithpassword).then((usercredential)=>{
           const user = usercredential.user;
           console.log(user.email);
       }).catch((error) =>{
        //    const errorcode = error.code;
           const errormessage = error.message;
           errormsg.style.display = 'block';
           errormsg.innerHTML = errormessage;
          
        
         
        

       });

   }



//    check user state of login (if user login redirect to dashboard or loginpage)
   const checkAuthState = async() =>{
    onAuthStateChanged(auth,user =>{
            if(user){
                window.location = 'dashboard.html';
            }
            else{
                errormsg.innerHTML = 'Wrong Email or Password';

            }
    });
   }

   checkAuthState();
   loginbtn.addEventListener('click',Login);