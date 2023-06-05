// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,addDoc,collection,getDocs,getDoc,doc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {getAuth , 
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
 onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
 import {getStorage,ref,uploadBytes,getDownloadURL} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

import {firebaseConfig} from './firebase.js';

     // firebase intialization
 const app = initializeApp(firebaseConfig);
 
     // call the  get database method
 const db = getFirestore();
 // call firebase auth
 
const auth = getAuth(app);
const storage = getStorage();


// get variable from the table



let tr = document.getElementById('data');
let msg = document.getElementById('msg');



   // check the auth change status then get the email of the user
   let companyemail = '';
   let userid;
   auth.onAuthStateChanged((user)=>{
       if(user){
          // console.log(user.uid);
          companyemail = user.email;
          userid = user.uid;
          
          
         
       }
      });




async function viewpaymenttable(){
    var ref = collection(db,"payment");
    tr.innerHTML= "<p class='d-flex'>Loading Please Wait...</p>";
    
   try {
   const docSnap = await getDocs(ref);
// check if collection that we are fetching if its empty excute the else statement
   if(docSnap.empty){
       // console.log("db isn't empty");
       tr.innerHTML = `<p class='text-center'>There is no data to fetched , please add new data to be displayed</p>`;
    
   }
   // if its not empty  log this message
   else{
    tr.innerHTML = '';
   // console.log('Database is not empty');
   let number = 1;
   docSnap.forEach(doc => {
      
    //   if(doc.data().provideremail == companyemail){
        tr.innerHTML += `

        <tr>
        <td>${number}</td>
        <td>#${doc.data().serviceid}</td>
        <td>${doc.data().service_name}</td>
        <td>$${doc.data().total_amount}</td>
        <td>${doc.data().date +' At '+ doc.data().time}</td>
        <td>${doc.data().client_email}</td>
        <td>${doc.data().client_phone_number}</td>
        <td>${doc.data().service_provider}</td>
        <td>${doc.data().provider_phone_number}</td>
        <td>${doc.data().payment_method}</td>
        <td>${doc.data().payment_status}</td>
      
        <td><a  href='payment.html?view=${doc.id}' class='btn btn-primary'>View</a></td>
        </tr>
        
        
    `;
    

    //   }else{
    //     // tr.innerHTML = 'Empty Table Please Enter Data'

    //   }
      
       number ++;
    }); 
}
    

} catch (error) {
    tr.innerHTML = `<p class="text-center">${error}</p>`;
   }
       
     
}

window.onload = viewpaymenttable();



let tabledata= document.getElementById('tabledata');
let viewservicedata= document.getElementById('viewservicedata');




// get the url
let url = window.location.search;
let check = url.search('view');
//   get the id from url by slicing it  (uid is company id)
let uid = url.slice(6,26);


if(check == 1){

    let serviceid = document.getElementById('serviceid');
    let servicename = document.getElementById('servicename');
    let serviceamount = document.getElementById('serviceamount');
    let dateandtime = document.getElementById('dateandtime');
    let clientemail = document.getElementById('clientemail');
    let clientphone = document.getElementById('clientphone');
    let provideremail = document.getElementById('provideremail');
    let providerphone = document.getElementById('providerphone');
    let paymentmethod = document.getElementById('paymentmethod');
    let paymentstatus = document.getElementById('paymentstatus');
    let loading = document.getElementById('loading');
        tabledata.style.display = 'none';
        viewservicedata.style.display = 'block';
    async function displaysingledata(){
       try {
        loading.innerHTML = 'loading please wait';
        var ref = doc(db,"payment",uid);
        const docSnap = await getDoc(ref);

        serviceid.innerHTML =`Service Id: #${docSnap.data().serviceid}`;
        servicename.innerHTML =`Service Name: ${docSnap.data().service_name}`;
        serviceamount.innerHTML =`Service Amount: ${docSnap.data().total_amount}`;
        dateandtime.innerHTML =`Date & Time: ${docSnap.data().date} ' At ' ${docSnap.data().date}`;
        clientemail.innerHTML =`Client Email: ${docSnap.data().client_email}`;
        clientphone.innerHTML =`Client Phone: ${docSnap.data().client_phone_number}`;
        provideremail.innerHTML =`Provider Email: ${docSnap.data().provideremail}`;
        providerphone.innerHTML =`Provider Phone: ${docSnap.data().provider_phone_number}`;
        paymentmethod.innerHTML =`Payment Method: ${docSnap.data().payment_method}`;
        paymentstatus.innerHTML =`Payment Status: ${docSnap.data().payment_status}`;
            

       } catch (error) {
        console.log(error);
       }
       loading.innerHTML = '';
    }
    displaysingledata();

}