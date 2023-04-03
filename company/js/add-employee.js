   // Import the functions you need from the SDKs you need
   import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import {getFirestore,addDoc,collection} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
   import {firebaseConfig} from './firebase.js';

        // firebase intialization
    const app = initializeApp(firebaseConfig);
    
        // call the  get database method
    const db = getFirestore();



    // get form data
    let fullname = document.getElementById('fullname');
    let img = document.getElementById('img');
    let age = document.getElementById('age');
    let gender = document.getElementById('gender');
    let dob = document.getElementById('dob');
    let phone = document.getElementById('phone');
    let address = document.getElementById('address');
    let country = document.getElementById('country');
    let servicecategory = document.getElementById('service_category');
    let certificate = document.getElementById('certificate');
    let experience = document.getElementById('experience');
    let company_associated = document.getElementById('company-associated');
    // company respose success or failed message
    let successmsg = document.querySelector('#success-msg');
    let errormsg = document.querySelector('#error-msg');
    // submit btn
    let submitbtn = document.getElementById('submit');



    submitbtn.addEventListener('click',(e)=>{
        e.preventDefault();
    
         // check input field  its filled
         if(fullname.value !='' && img.value != '' && age.value != '' && gender.value != '' && dob.value != '' && 
         phone.value != '' && address.value !='' && country.value !='' && servicecategory.value !='' && certificate.value !=''
         && experience.value !='' && company_associated.value !=''){
            AddEmployeeData();
         }
         else{
             successmsg.style.display = 'none';
             errormsg.style.display = 'block';
             errormsg.innerHTML = 'Please Fill The  Entire Form';
         }
    });

    // function that  add employee inforation to cloud firestore
 async function AddEmployeeData(){
        var ref = collection(db,'employee');

        const docRef = await addDoc(
            ref,{

                fullname:fullname.value,
                profile_image:img.value,
                age:age.value,
                gender:gender.value,
                dob:dob.value,
                phone:phone.value,
                country:country.value,
                address:address.value,
                serivce_category:servicecategory.value,
                certificate:certificate.value,
                experience:experience.value,
                company_associated:company_associated.value,
            }
        ).then(()=>{
            errormsg.style.display = 'none';
            successmsg.style.display = 'block';
            successmsg.innerHTML = 'Data Added Successfully';
        }).catch((error)=>{
            errormsg.style.display = 'block';
            successmsg.style.display = 'none';
            errormsg.innerHTML = error;
        });
        

    }