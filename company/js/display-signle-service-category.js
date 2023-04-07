   // Import the functions you need from the SDKs you need
   import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import {getFirestore,addDoc,collection,getDocs} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
   import {getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

   import {firebaseConfig} from './firebase.js';
        // firebase intialization
    const app = initializeApp(firebaseConfig);
    
        // call the  get database method
    const db = getFirestore();

   const auth = getAuth(app);



// get element
let servicename = document.getElementById('servicename');
let service_added_date = document.getElementById('date');
let created_by_who = document.getElementById('created_by');
let loadingmsg = document.getElementById('loading');



   

   let url = window.location.search;
   let check = url.search('view');
 //   get the id from url by slicing it  (uid is company id)
 let uid = url.slice(6,26);
 

 loadingmsg.innerHTML = 'Please Wait Data Is Loading';
   async function displaysignleservicecategory(){
    var ref = collection(db,"servicecategory");
    const displayselectedcompany = await getDocs(ref);
    displayselectedcompany.forEach(doc => {
        // check if doc.id  from firestore collection equals the uid or(company id)
        if(doc.id == uid){
            servicename.innerHTML = `Service Name : ${doc.data().servicename}`;
            service_added_date.innerHTML = `Created Date : ${doc.data().createddate}`;
            created_by_who.innerHTML = `Created By : ${doc.data().create_by}`;
          
        }

             loadingmsg.innerHTML = '';



    });

}

   displaysignleservicecategory();