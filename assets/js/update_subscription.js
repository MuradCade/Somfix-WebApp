// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,collection,getDocs,doc,updateDoc,deleteDoc,getDoc,addDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {firebaseConfig} from './firebase.js';

     // firebase intialization
 const app = initializeApp(firebaseConfig);
 
     // call the  get database method
 const db = getFirestore();




// form values
 let companyname= document.getElementById('companyname');
 let companyemail= document.getElementById('companyemail');
 let companyphone= document.getElementById('companyphone');
 let subscriptionduration= document.getElementById('subscriptionduration');
 let payment_method= document.getElementById('payment_method');
 let paymentamount= document.getElementById('paymentamount');
 let dateandtime= document.getElementById('dateandtime');
 let subscription_status = document.getElementById('subscription_status');
 let submitbtn= document.getElementById('submit');
 



    // get the last of the url start from ? symbol
    let url = window.location.search;

    // check if the url contains word view and have id
    // check if the url contains word update and have id
    let updateurl = url.search('update');

    
    
    let uid = url.slice(8,28);
    //*! employee form needs service category names in service type field
    console.log(uid);
    async function displayservicecategorynames(uid){
     let Docref = doc(db,'subscription',uid);
     let result = await getDoc(Docref);
     
    var option = document.createElement('option');
    var option2 = document.createElement('option');
    var option3 = document.createElement('option');

    option.text = result.data().company_name;
    companyname.options.add(option)
    companyemail.value = result.data().company_email
    companyphone.value = result.data().company_phone
    subscriptionduration.value = result.data().subscription_duration
    option2.text= result.data().payment_mthod;
    option3.text= result.data().subscription_status;
    payment_method.options.add(option2)
    subscription_status.options.add(option3)
    paymentamount.value = result.data().subscription_amount
    dateandtime.value = result.data().dateandtime
    
  
   


 }

 displayservicecategorynames(uid);



//  update data 
   // update data form function
   async function updatedata(uid){
    

    const ref = doc(db, "subscription", uid.toString());
    await updateDoc(
        ref,{
        company_name:companyname.value,
     company_email:companyemail.value,
     company_phone:companyphone.value,
     subscription_duration:subscriptionduration.value,
     payment_mthod:payment_method.value,
     subscription_amount:paymentamount.value,
     dateandtime:dateandtime.value,
     added_by:'Admin',
     subscription_status:subscription_status.value,
        }
    ).then(()=>{
       
        alert('Data Updated Successfully');
        window.location.href = 'view_subscription.html'
    }).catch((error)=>{
        alert('error occur while updating'+error);

        window.location.href = 'view_subscription.html'

    });

   
    }




    submitbtn.addEventListener('click',function() {
        updatedata(uid);
    })