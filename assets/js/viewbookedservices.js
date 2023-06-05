// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,collection,getDocs,doc,updateDoc,deleteDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {firebaseConfig} from './firebase.js';

     // firebase intialization
 const app = initializeApp(firebaseConfig);
 
     // call the  get database method
 const db = getFirestore();


let tr = document.querySelector('#data');


async function Viewservicecategory(){
    var ref = collection(db,"servicecategory");
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
       <td><img src='${doc.data().service_image}' width=60/></td>
       <td>${doc.data().servicename}</td>
       <td>${doc.data().createddate}</td>
       <td>${doc.data().create_by}</td>
       </tr>
       
       `;
    //    <td class='d-flex'><a href="../../singlecompanydetail.html?view=${doc.id}" class='btn btn-primary'>View</a>&numsp;<a href='updatesignlecompanydetails.html?update=${doc.id}' class='btn btn-success'>Update</a>&numsp; <a href='view_company.html?del=${doc.id}' class='btn btn-danger'>Delete</a></td>
      
       number ++;
       

      
   }); 
  }
   } catch (error) {
       // tr.innerHTML = '<p class="text-center">Error accoured while display data please refresh the page</p>';
   }
       
     
}



//  load website  or run this function when page is loaded
window.onload = Viewservicecategory();
