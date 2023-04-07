   // Import the functions you need from the SDKs you need
   import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import {getFirestore,collection,getDocs,doc,updateDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
   import {firebaseConfig} from './firebase.js';

        // firebase intialization
    const app = initializeApp(firebaseConfig);
    
        // call the  get database method
    const db = getFirestore();

   let tr = document.querySelector('#data');
   let msg = document.getElementById('msg');



// get the url
let url = window.location.search;
let check = url.search('view');
//   get the id from url by slicing it  (uid is company id)
let uid = url.slice(6,26);

if(check != 1){
    msg.innerHTML = 'data is loading please wait';
    async function Displayservicedata(){
     let docref  = collection(db,'service');
     let docsnap = await getDocs(docref);
     let number = 1;
     docsnap.forEach(doc => {
        if(doc.data().delete_status == "false"){
            tr.innerHTML = `
            <tr>
            <td>${number}</td>
            <td>${doc.data().servicename}</td>
            <td>${doc.data().servicetype}</td>
            <td>${doc.data().service_provider}</td>
            <td>${doc.data().customername}</td>
            <td>${doc.data().requested_date}</td>
            <td>
            <a href='display_single_service.html?view=${doc.id}' class='btn btn-primary'>View</a>
            <a href='#' class='btn btn-success'>Update</a>
            <a href='view_service.html?delete=${doc.id}' class='btn btn-danger'>Delete</a>
            </td>
            </tr>
            `;
        }else{
            tr.innerHTML = 'Empty Table Please Enter Data'

        }
         
         number ++;
         msg.innerHTML = '';
         
     });
    }

    window.onload = Displayservicedata();
}else{
   
// display form

let servicename = document.getElementById('servicename');
let servicetype = document.getElementById('servicetype');
let serviceprovider = document.getElementById('serviceprovider');
let customername = document.getElementById('customername');
let assigned_date = document.getElementById('assigned_date');
let loading = document.getElementById('loading');



loading.innerHTML = 'loading please wait';
async function displaysingleservice(){
    let docref = collection(db,'service');
    let docsnap = await getDocs(docref);
    docsnap.forEach(docs => {
        if(docs.id == uid){
            servicename.innerHTML =`Service Name: ${docs.data().servicename}`;
            servicetype.innerHTML =`Service Type: ${docs.data().servicetype}`
            serviceprovider.innerHTML = `Service Provider: ${docs.data().service_provider}`
            customername.innerHTML = `Customer Name: ${docs.data().customername}`
            assigned_date.innerHTML =  `Assigned Date: ${docs.data().requested_date}`
        }
        loading.innerHTML = '';
    });
}
// call the function
displaysingleservice();
}

 

let deleteurl = url.search('delete');

if(deleteurl == 1){
let deluid = url.slice(8,29);

    // this function changes the delete status in the service collection but don't delete it permenetly
    async function delete_service(uid){

       await updateDoc(doc(db,'service',uid),{
            delete_status:"true",
            }).then(()=>{
                console.log('Deleted Successfully');
            }).catch((error)=>{
                    console.log(error);
            });
            
            // console.log(uid);
    
    }
    delete_service(deluid);
}
