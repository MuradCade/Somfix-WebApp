   // Import the functions you need from the SDKs you need
   import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import {getFirestore,addDoc,collection,getDocs} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
   import {firebaseConfig} from './firebase.js';

        // firebase intialization
    const app = initializeApp(firebaseConfig);
    
        // call the  get database method
    const db = getFirestore();


// get data from the service form
let servicename = document.getElementById('servicename');
let serviceprovider = document.getElementById('serviceprovider');
let servicetype = document.getElementById('servicetype');
let customer_name = document.getElementById('customer_name');
let Requesteddate = document.getElementById('Requesteddate');
let error = document.getElementById('error');
let success = document.getElementById('success');
let submit = document.getElementById('submit');

//* submit click
submit.addEventListener('click',function(event){
        event.preventDefault();
        // * check the fields if its empty
        if(servicename.value != '' && serviceprovider.value != ''
        && servicetype.value != '' && customer_name.value != '' &&
        Requesteddate.value != ''){
            // store the data in service colection
            store_service_data();
        }else{
            success.style.display = "none";
            error.style.display = 'block';
            error.innerHTML = 'Empty Fieds please fill the form correctly';
        }
});

 // *! display service category in service form
    async function displayservicecategorynames(){
        let Docref = collection(db,'servicecategory');
        let Docsnap = await getDocs(Docref);
        
        Docsnap.forEach(docs => {
            var option = document.createElement('option');
            option.text = docs.data().servicename;
            servicetype.options.add(option)
        });
        

    }
//  *! display employee fullname in add service form
async function displayemployedata(){
    let docRefdata = collection(db,'employe');
    let docSnapdata = await getDocs(docRefdata)

    docSnapdata.forEach(documents => {
        var option = document.createElement('option');
        option.text = documents.data().fullname;
        serviceprovider.options.add(option);
        
    });
}
//? display service category name in  service category in service collection
    displayservicecategorynames();
// ?dispay fullname of employee from employee collection
    displayemployedata();



//? function that stores data in service collection

async function store_service_data(){
    let date = new Date();
    let created_date = date.toLocaleDateString();
    let docref = collection(db,'service');
    let docsnap = await addDoc( docref,{
        servicename:servicename.value,
        service_provider:serviceprovider.value,
        servicetype:servicetype.value,
        serviceprice:serviceprice.value,
        customername:customer_name.value,
        requested_date:Requesteddate.value, 
        created_date:created_date,
        updated_status:"false",
        delete_status:"false",
    }).then(()=>{
        error.style.display = 'none';
        success.style.display = "block";
        success.innerHTML = "successfull Saved Data";
        console.log('saved successfull');
    }).catch((error)=>{
      
        
        console.log('error name: ',error);
    });
}