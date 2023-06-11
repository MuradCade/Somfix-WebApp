 // Import the functions you need from the SDKs you need
 import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
 import {getFirestore,collection,getDocs,query,where,doc, updateDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

 import {firebaseConfig} from './firebase.js';
      // firebase intialization
  const app = initializeApp(firebaseConfig);
  
      // call the  get database method
  const db = getFirestore(app);



// get the last of the url start from ? symbol
let url = window.location.search;

// check if the url contains word update and have id
let delurl = url.search('delete');


let uid = url.slice(8,28).toString();



if(delurl == 1){

  // delete data from firestore(not actually deleting data but you chnage the delete status)
  updateDoc(doc(db,'servicecategory',uid),{
    deleted_status:"true",
});

}



    
