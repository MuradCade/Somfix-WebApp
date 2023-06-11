// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,collection,getDocs,doc,updateDoc,deleteDoc,getDoc,addDoc,query,where} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {firebaseConfig} from './firebase.js';

     // firebase intialization
 const app = initializeApp(firebaseConfig);
 
     // call the  get database method
 const db = getFirestore();







 let profile = document.getElementById('profile-img');
 let fullname = document.getElementById('fullname');
 let subname = document.getElementById('subname');



 async function getprofilefortopbar(){

 
    const docRef = query(collection(db, "Admin"), where("id", "==", 'OZR1MK1v3NcroWos8ukIDbznd8m'));
    const result = await getDocs(docRef);

    result.forEach(doc => {
        profile.src = `${doc.data().img}`;
        // console.log(doc.data().fullname);
        fullname.innerHTML = doc.data().fullname;
        subname.innerHTML = doc.data().fullname;
    });

 }

 window.onload = getprofilefortopbar();