// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,collection,getDocs,doc,updateDoc,deleteDoc,getDoc,addDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {firebaseConfig} from './firebase.js';

     // firebase intialization
 const app = initializeApp(firebaseConfig);
 
     // call the  get database method
 const db = getFirestore();







 let profile = document.getElementById('profile-img');
 let fullname = document.getElementById('fullname');
 let subname = document.getElementById('subname');



 async function getprofilefortopbar(){

    let dRef = collection(db,'Admin');
    let docRef = await getDocs(dRef);

    docRef.forEach(doc => {
        profile.src = `${doc.data().img}`;
        console.log(doc.data().fullname);
        fullname.innerHTML = doc.data().fullname;
        subname.innerHTML = doc.data().fullname;
    });

 }

 window.onload = getprofilefortopbar();