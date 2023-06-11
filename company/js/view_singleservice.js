   // Import the functions you need from the SDKs you need
   import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import {getFirestore,addDoc,collection,getDocs,deleteDoc,doc,getDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
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
const user = auth.currentUser;

let  loading = document.getElementById('loading')
let  serviceimage = document.getElementById('serviceimage')
let  servicename = document.getElementById('servicename')
let  serviceprice = document.getElementById('serviceprice')
let  servicestatus = document.getElementById('servicestatus')
let  serviceaddress = document.getElementById('serviceaddress')
let  servicecategory = document.getElementById('servicecategory')
let  serviceduration = document.getElementById('serviceduration')
let  personcreatedservice = document.getElementById('personcreatedservice')
let  servicediscount = document.getElementById('servicediscount')
let  servicedescription = document.getElementById('servicedescription')



async function viewdata(){
    // get the url
let url = window.location.search;
let check = url.search('view');
//   get the id from url by slicing it  (uid is company id)
let uid = url.slice(6,26);

let docref = doc(db,'service',uid);
let ref = await getDoc(docref);

loading.innerHTML= 'data is Loading';
if(ref.empty){
        loading.innerHTML= 'db is empty'
    }else{
        // console.log('not empty');
            loading.innerHTML = '';
        serviceimage.innerHTML  =`Service Image: <img src='${ref.data().Service_image}' width="80"/>`;
        servicename.innerHTML = `Service Name: ${ref.data().Service_name}`;
        serviceprice.innerHTML = `Service Price: $${ref.data().Service_price}`;
        servicestatus.innerHTML = `Service Status: ${ref.data().Service_status}`;
        serviceaddress.innerHTML = `Service Address: ${ref.data().Service_address}`;
        servicecategory.innerHTML = `Service Category: ${ref.data().Service_category}`;
        serviceduration.innerHTML = `Service Duration: ${ref.data().Service_duration}`;
        // serviceduration.innerHTML = `Ser${ref.data().Service_duration}`;
        personcreatedservice.innerHTML = `Person_Creted_Service: ${ref.data().person_created_service}`;
        servicediscount.innerHTML = `Service Discount: $${ref.data().Service_discount}`;
        servicedescription.innerHTML = `Service Description: ${ref.data().Service_description}`;

        // personcreatedservice
}

}


window.onload= viewdata();
