   // Import the functions you need from the SDKs you need
   import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import {getFirestore,collection,getDocs,query,where,doc, updateDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

   import {firebaseConfig} from './firebase.js';
        // firebase intialization
    const app = initializeApp(firebaseConfig);
    
        // call the  get database method
    const db = getFirestore(app);



// get the last of the url start from ? symbol
let url = window.location.search;

// check if the url contains word update and have id
let updateurl = url.search('update');


let uid = url.slice(8,28).toString();


// console.log(updateurl);


// get input element

let servicename = document.getElementById('servicename');
let added_date = document.getElementById('added-date');
let loading = document.getElementById('loading');

let submit = document.getElementById('submit');




// added_date.value= '2014-02-09';



   // view all service category
   async function displaydatainupdateform(){
    var ref = collection(db,'servicecategory');
    loading.innerHTML = 'data is loading please wait';
    
    try {
        const docSnap = await getDocs(ref);
        if(docSnap.empty){
        }
        else{
           
            loading.innerHTML ='';
            docSnap.forEach(document => {
                servicename.value = document.data().servicename;
                added_date.value= document.data().createddate;
            });
        }
    } catch (error) {
        console.log(error);
    }

    
}




// current date and time
var dateandtime = new Date();
var date = dateandtime.toLocaleDateString();
var time = dateandtime.toLocaleTimeString();
// console.log();

// update data (collection) service category function 

async function update_service_category(uid){

    updateDoc(doc(db,'servicecategory',uid),{
            servicename:servicename.value,
            update_date: date+'-'+time,
        });
        
        // console.log(uid);

}



// check if the url is equal to update
if(updateurl == 1){
    submit.addEventListener('click',function(e){
        e.preventDefault();
        update_service_category(uid);
    });
} 
window.onload = displaydatainupdateform();