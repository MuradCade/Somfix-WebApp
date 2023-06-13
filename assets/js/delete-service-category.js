 // Import the functions you need from the SDKs you need
 import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
 import {getFirestore,collection,getDocs,query,where,doc, updateDoc,deleteDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

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


console.log(uid);
if(delurl == 1){

  // delete data from firestore(not actually deleting data but you chnage the delete status)
  async function delete_service(uid){

      
    const docRef  = doc(db,'servicecategory',uid);
    deleteDoc(docRef).then(() =>{
            alert('Single Service category    deleted successfully');
            window.location.href = '/viewservicecategory.html';
    }).catch((e)=>{
        alert('failed to delete company data',e);
    });
    
  }
  delete_service(uid);

}



    
