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
const errormsg = document.querySelector('#errormsg');

   // Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


   // Login user
   const Loginfunction = async() =>{
       const loginwithemail = email.value;
       const loginwithpassword = password.value;

       signInWithEmailAndPassword(auth,loginwithemail,loginwithpassword).then((usercredential)=>{
           const user = usercredential.user;
        //    console.log(user.email);
           window.location = 'dashboard.html';
      
       }).catch((error) =>{
        //    const errorcode = error.code;
           const errormessage = error.message;
           errormsg.style.display = 'block';
           errormsg.innerHTML = errormessage;
          
        
         
        

       });

   }
   
  

//    setInterval(checkAuthState(), 120000);

   

//    loginbtn.addEventListener('click',Login);
loginbtn.addEventListener('click',function(e){
    e.preventDefault();
    Loginfunction();
});


