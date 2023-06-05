// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,collection,getDocs,doc,updateDoc,deleteDoc,getDoc,addDoc,getCountFromServer} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {firebaseConfig} from './firebase.js';

     // firebase intialization
 const app = initializeApp(firebaseConfig);
 
     // call the  get database method
 const db = getFirestore();


 let payment_total = document.getElementById('payment_total');
 let total_serviceses = document.getElementById('total_serviceses');
 let companies_data = document.getElementById('companies_data');


 async function gettotalofpayment(){
    const collectionRef = collection(db,'subscription');
const snapshot = await getDocs(collectionRef);

snapshot.forEach(docs => {

    // total_amount
    payment_total.innerHTML = Number(docs.data().subscription_amount) +Number(docs.data().subscription_amount);
});
 }


 gettotalofpayment();



 async function getnumberofserviceses(){
    const coll = collection(db, "service");
const snapshot = await getCountFromServer(coll);
    total_serviceses.innerHTML = snapshot.data().count;
 }

 getnumberofserviceses();




 async function getnumberofcompanies(){
    const coll = collection(db, "company");
const snapshot = await getCountFromServer(coll);
companies_data.innerHTML = snapshot.data().count;
 }

 getnumberofcompanies();