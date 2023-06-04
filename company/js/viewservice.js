   // Import the functions you need from the SDKs you need
   import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import {getFirestore,addDoc,collection,getDocs,deleteDoc,doc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
   import {getAuth , 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
    import {getStorage,ref,uploadBytes,getDownloadURL} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";
    import {firebaseConfig} from './firebase.js';

   
        // firebase intialization
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    // call the  get database method
const db = getFirestore();
const storage = getStorage();


   let tr = document.querySelector('#data');
   let msg = document.querySelector('#msg');


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


 





// get the url
let url = window.location.search;
let check = url.search('view');
//   get the id from url by slicing it  (uid is company id)
let uid = url.slice(6,26);
console.log(uid);
if(check != '' && check != 1){
    msg.innerHTML = 'data is loading please wait';
    async function Displayservicedata(){
     let docref  = collection(db,'service');
     let docsnap = await getDocs(docref);
     let number = 1;
     docsnap.forEach(doc => {
        if(doc.data().person_created_service == companyemail){

            tr.innerHTML = `
            <tr>
            <td>${number}</td>
            <td><img src="${doc.data().Service_image}" width=80/></td>
            <td>${doc.data().Service_name}</td>
            <td>${doc.data().Service_status}</td>
            <td>${doc.data().Service_address}</td>
            <td>${doc.data().Service_category}</td>
            <td>${doc.data().Service_duration}</td>
            <td>${doc.data().person_created_service}</td>
            <td>${doc.data().Service_price}</td>
            <td>${doc.data().Service_discount}</td>
            <td>${doc.data().Service_type}</td>
            <td>${doc.data().Service_description}</td>
            <td>
            <a href='display_single_service.html?view=${doc.id}' class='btn btn-primary'>View</a>
            <br>
            <a href='update_single_service.html?update=${doc.id}' class='btn btn-success'>Update</a>
            <br>
            <a href='view_service.html?delete=${doc.id}' class='btn btn-danger'>Delete</a>
            <br>
            </td>
            </tr>
            `;
        }else{
                // console.log('data not found');
        }
       
         
         number ++;
         msg.innerHTML = '';
         
     });
    }

    window.onload = Displayservicedata();
}else{
   


}

 
// delete single service from collection 
let deleteurl = url.search('delete');

if(deleteurl == 1){
    
let deluid = url.slice(8,29);

    //delete function , deletes the item selected from firestore
    async function delete_service(uid){

      
            const docRef  = doc(db,'service',deluid);
            deleteDoc(docRef).then(() =>{
                    console.log('deleted successfully');
                    window.location.href = 'view_service.html';
            }).catch((e)=>{
                console.log('failed to delete data ',e);
            });
    
    }
    delete_service(deluid);
}
