
  // Import the functions you need from the SDKs you need
  import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
  import {getFirestore,collection,getDocs,doc,updateDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
  import {getAuth , 
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
  import {firebaseConfig} from './firebase.js';

       // firebase intialization
   const app = initializeApp(firebaseConfig);
   
       // call the  get database method
   const db = getFirestore();
   const auth = getAuth(app);
  let tr = document.querySelector('#data');




















   
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

async function veiwbookedserviceses(){
    var ref = collection(db,"bookedservices");
    tr.innerHTML= "<p class='d-flex'>Loading Please Wait...</p>";
    
   try {
   const docSnap = await getDocs(ref);
// check if collection that we are fetching if its empty excute the else statement
   if(docSnap.empty){
       // console.log("db isn't empty");
       tr.innerHTML = `<p class='text-center'>There is no data to fetched , please add new data to be displayed</p>`;
    
   }
   // if its not empty  log this message
   else{
    tr.innerHTML = '';
   // console.log('Database is not empty');
   let number = 1;
   docSnap.forEach(doc => {
      
       
      if(doc.data().provideremail == companyemail){
        tr.innerHTML += `

        <tr>
        <td>${number}</td>
        <td><img src='${doc.data().service_img}' width='80'></td>
        <td>${doc.data().service_name}</td>
        <td>${doc.data().address}</td>
        <td>${doc.data().client_id}</td>
        <td>${doc.data().description}</td>
        <td>${doc.data().price}</td>
        <td>${doc.data().discount}</td>
        <td>${doc.data().totalamount} </td>
        <td> 
            ${doc.data().servicestatus == 'Pending'?  
            `<a href="viewbooking.html?accept=${doc.id}">Accepted</a><br><a href="viewbooking.html?calcelled=${doc.id}">Decline</a>`
            :doc.data().servicestatus  == 'Accepted' ? `<p class='text-success'>${doc.data().servicestatus}</p>`: doc.data().servicestatus == 'Cancelled'?
            `<p class='text-danger'>${doc.data().servicestatus}</p>`:doc.data().servicestatus  == 'Completed'?`<p class='text-success'>Completed</p>`:doc.data().servicestatus  == 'Verified'?`<p class='text-success'>Verified</p>`:console.log()
            }             

         
        <td>${doc.data().payment_method}</td>
        <td>${doc.data().payment_status}</td>
        <td>${doc.data().date}</td>
        <td>${doc.data().time}</td>
        <td>${doc.data().provideremail}</td>
        <td class="d-flex">
        ${doc.data().servicestatus == 'Completed' || doc.data().servicestatus == 'Verified' ? `<p class='text-danger'>Already Assigned</p>`:`<a href='displaysinglebookinginfo.html?id=${doc.data().service_id}' class="btn btn-primary">Assing</a>`}
        </br>
        </td>
        </tr>
        
    `;
    

      }else{
        // tr.innerHTML = 'Empty Table Please Enter Data'

      }
      
       number ++;
    }); 
}
    

} catch (error) {
    tr.innerHTML = `<p class="text-center">${error}</p>`;
   }
       
     
}

window.onload = veiwbookedserviceses();



// check if the booked service status is accepted or declinw
 // get the last of the url start from ? symbol
 let url = window.location.search;
 // get the url to verify if that should be displayed or not 
 let check = url.search('accept');
 let uid = url.slice(8,28);

//  check if the url container word accept with id 
 if(check == 1){
  
  // update the bookes services db of service status  field to accepted
  updatebookedassigned(uid);
  async function updatebookedassigned(id){
    const ref = doc(db, "bookedservices", id.toString());
    await updateDoc(
        ref,{
          servicestatus:'Accepted',
            // assignstatus:'true',
        }
    ).then(()=>{
        console.log('Service status change to accepted');
        window.location.href = 'viewbooking.html';
    }).catch((error)=>{
        console.log('error occur wwhile changin the service status '+ error);
    });
    }


 }




//  check for decline (rejecte) service from url id

let cancelurl = window.location.search;
let checkurl = cancelurl.search('calcelled');
let canceluid = cancelurl.slice(11,31);

if(checkurl == 1){
  updatebookedassigned(canceluid);
  async function updatebookedassigned(id){
    const ref = doc(db, "bookedservices", id.toString());
    await updateDoc(
        ref,{
          servicestatus:'Cancelled',
            // assignstatus:'true',
        }
    ).then(()=>{
        console.log('Service status change to Cancelled');
        window.location.href = 'viewbooking.html';
    }).catch((error)=>{
        console.log('error occur wwhile changin the service status '+ error);
    });
    }


 }

