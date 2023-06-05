import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,addDoc,collection,getDocs} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
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

      let tr = document.getElementById('data');



      
      async function viewpaymentdata(){
          var ref = collection(db,"subscription");
          try {
              const docSnap = await getDocs(ref);

// check if collection that we are fetching if its empty excute the else statement
   if(docSnap.empty){
       // console.log("db isn't empty");
       tr.innerHTML = `<p class='text-center'>There is no data to fetched , please add new data to be displayed</p>`;
    
   }
   // if its not empty  log this message
   else{
   // console.log('Database is not empty');
   let number = 1;
   docSnap.forEach(doc => {
      
    
       tr.innerHTML += `

       <tr>
       <td>${number}</td>
       <td>${doc.data().company_name}</td>
       <td>$${doc.data().subscription_amount}</td>
       <td>${doc.data().dateandtime}</td>
       <td>${doc.data().subscription_duration} Days</td>
      
     
       </tr>
       
   `;
      
       number ++;
       

      
   }); 
  }
   } catch (error) {
       // tr.innerHTML = '<p class="text-center">Error accoured while display data please refresh the page</p>';
   }
       

   
     
}


window.onload = viewpaymentdata();

    