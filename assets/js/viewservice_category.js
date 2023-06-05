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
    var ref = collection(db,"bookedservices");
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
       <td>${doc.data().service_id}</td>
       <td><img src='${doc.data().service_img}' width=60/></td>
       <td>${doc.data().service_name}</td>
       <td>$${doc.data().price}</td>
       <td>${doc.data().servicestatus == 'Pending' ? `<p class='text-danger' style='font-weight:bold;'>Pending</p>`:doc.data().servicestatus == 'Cancelled' ? `<p class='text-danger' style='font-weight:bold;'>Cancelled</p>`:doc.data().servicestatus == 'Accepted'?`<p class='text-success' style='font-weight:bold;'>Accepted</p>`:doc.data().servicestatus == 'Completed' ? `<p class='text-success' style='font-weight:bold;'>Completed</p>`:doc.data().servicestatus == 'Verified'?`<p class='text-success' style='font-weight:bold;'>Verified</p>`:''}</td>
       <td>${doc.data().address}</td>
       <td>${doc.data().quantity}</td>
       <td>$${doc.data().discount}</td>
       <td>$${doc.data().totalamount}</td>
       <td>${doc.data().date}</td>
       <td>${doc.data().time}</td>
       <td>${doc.data().provideremail}</td>
       <td>${doc.data().client_id}</td>
       <td>${doc.data().description}</td>
       <td>${doc.data().payment_method}</td>
       <td>${doc.data().payment_status}</td>
       <td>${doc.data().assignedtoemail??'Freelancer'}</td>
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



