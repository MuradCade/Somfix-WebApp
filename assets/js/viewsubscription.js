// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,collection,getDocs,doc,updateDoc,deleteDoc,getDoc,addDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {firebaseConfig} from './firebase.js';

     // firebase intialization
 const app = initializeApp(firebaseConfig);
 
     // call the  get database method
 const db = getFirestore();




 let tr = document.getElementById('data');

 
 
 // display subscription data in table
 async function displaysubscriptiondata(){
     tr.innerHTML= 'Loading Please Wait';
     var ref = collection(db,"subscription");
   try {
    const displayselectedcompany = await getDocs(ref);
    let num = 1;
    tr.innerHTML = '';
           displayselectedcompany.forEach(doc => {
              
               tr.innerHTML +=`
               <tr>
               <td>${num}</td>
               <td>${doc.data().company_name}</td>
               <td>${doc.data().company_phone}</td>
               <td>${doc.data().company_email}</td>
               <td>${doc.data().subscription_duration} Days</td>
               <td>${doc.data().payment_mthod}</td>
               <td>$${doc.data().subscription_amount}</td>
               <td>${doc.data().dateandtime}</td>
               <td>${doc.data().subscription_status == 'Active'? `<p style="font-weight:bold; color:green;">Active</p>`:doc.data().subscription_status == 'Expire'? `<p color="text-danger" style="font-weight:bold;color:red;">Expire</p>`:doc.data().subscription_status == 'Disable' ? `<p color="text-danger" style="font-weight:bold;color:red;">Disable</p>`:doc.data().subscription_status == 'Free_trail' ? `<p color="text-danger" style="font-weight:bold;color:green;">Free_trail</p>`:''}</td>
               <td class='d-flex'><a href='single_subcription.html' class='btn btn-primary'>View</a> &numsp; <a href='update_subscription.html?update=${doc.id}' class='btn btn-success'>Update</a> &numsp; <a href='view_subscription.html?del=${doc.id}' class='btn btn-danger'>Delete</a></td>
               </tr>
               
               `;

   
   
               num++;
           });
   } catch (error) {
    
   }
            //   console.log(result.includes(uid)? true : false);
            // console.log(result.valueOf());
        }
        

window.onload = displaysubscriptiondata();






 
// delete the data 


    // get the last of the url start from ? symbol
    let url = window.location.search;

let delcheck = url.search('del');
let delurl = window.location.search;
let deluid = delurl.slice(5,28);

// if the url ==delete then delete selected data
if(delcheck == 1){
    deletesinglecompany(deluid);


}


async function deletesinglecompany(deluid){
     //delete function , deletes the item selected from firestore
     

      
        const docRef  = doc(db,'subscription',deluid);
        deleteDoc(docRef).then(() =>{
                alert('Subscription data  deleted successfully');
                window.location.href = 'view_subscription.html';
        }).catch((e)=>{
            alert('failed to delete Subscription data',e);
            window.location.href = 'view_subscription.html';
        });


}