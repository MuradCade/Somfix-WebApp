// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,collection,getDocs,doc,updateDoc,deleteDoc,getDoc,addDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {firebaseConfig} from './firebase.js';

     // firebase intialization
 const app = initializeApp(firebaseConfig);
 
     // call the  get database method
 const db = getFirestore();
















let companyname = document.getElementById('companyname');
let companyphone = document.getElementById('companyphone');
let companyemail = document.getElementById('companyemail');
let subscription_duration = document.getElementById('subscription_duration');
let payment_method = document.getElementById('payment_method');
let  payment_amount= document.getElementById('payment_amount');
let dateandtime = document.getElementById('dateandtime');
let subscription_status = document.getElementById('subscription_status');
let loading = document.getElementById('loading');

 
loading.innerHTML = 'Loading please wait';
 // display subscription data in table
 async function displaysubscriptiondata(){
    var ref = collection(db,"subscription");
    const displayselectedcompany = await getDocs(ref);
  try {
displayselectedcompany.forEach((doc)=>{
    displayselectedcompany.forEach(doc => {
        companyname.innerHTML = 'Company Name: '+ doc.data().company_name;
        companyphone.innerHTML = 'Company Phone: '+  doc.data().company_phone;
        companyemail.innerHTML = 'Company Email: '+ doc.data().company_email;
        subscription_duration.innerHTML = 'Subscription Duration: '+ doc.data().subscription_duration + ' Days';
        payment_method.innerHTML = 'Payment Method: '+ doc.data().payment_mthod;
        payment_amount.innerHTML ='Payment Amount: '+  '$'+doc.data().subscription_amount;
        dateandtime.innerHTML ='Added Date & Time :'+  doc.data().dateandtime;
        subscription_status.innerHTML = 'Subscription Status: '+ doc.data().subscription_status;

});
         loading.innerHTML = '';
  
          });
  } catch (error) {
   console.log(error);
  }
           //   console.log(result.includes(uid)? true : false);
           // console.log(result.valueOf());
       }


window.onload = displaysubscriptiondata();