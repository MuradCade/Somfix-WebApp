// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,getDoc,doc,deleteDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {firebaseConfig} from './firebase.js';

     // firebase intialization
 const app = initializeApp(firebaseConfig);
 
     // call the  get database method
 const db = getFirestore();


 // get the last of the url start from ? symbol
 let url = window.location.search;
 // get the url to verify if that should be displayed or not 
 let getdeletewordfromurl = url.search('delete');





if(getdeletewordfromurl == 1){
deletesignleemployee()


}
else{
 console.log('item to be deleted not selected');
}


// this function delete select employee
 async function deletesignleemployee(){
    // get id from url 
    let uid = url.slice(8,30);

    var ref = doc(db,'employee',uid);
    const documentsnapshot = await getDoc(ref); 
    
    if(!documentsnapshot){
        alert("Document doesn't exist");
    }
      await deleteDoc(ref).then(()=>{
        alert('Data deleted successfully');
        window.location.href = 'view_employee.html';
      }).catch(()=>{
        alert('Unsucessfull operation, errorr:' + error);
      });
 }
//  deletesignleemployee();