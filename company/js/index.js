   // Import the functions you need from the SDKs you need
      // Import the functions you need from the SDKs you need
      import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
      import {getFirestore,addDoc,collection} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
      import {firebaseConfig} from './firebase.js';

   export class Firestoredb{
    
       async Addnewdata(collectionname,servicename,addeddate,){
        app = getFirestore();
        db = initializeApp(firebaseConfig);
        var ref = collection(db,'servicecategory');
        const docRef = await addDoc(
            ref,{
                servicename: servicename,
                createddate:addeddate,


        }).then(()=>{
            errormsg.style.display = 'none';
            successmsg.style.display = 'block';
            successmsg.innerHTML = 'Service Category Added Successfully';
        }).catch((error)=>{
            errormsg.style.display = 'block';
            successmsg.style.display = 'none';
            errormsg.innerHTML = error;

        });
    }
}

