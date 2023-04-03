   // Import the functions you need from the SDKs you need
   import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import {getFirestore,addDoc,collection} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
   import {firebaseConfig} from './firebase.js';

        // firebase intialization
    const app = initializeApp(firebaseConfig);
    
        // call the  get database method
    const db = getFirestore();

 
    

    

   
    // get form inputs
    let companyname = document.querySelector('#companyname');
    let companylogo = document.getElementById('companylogo');
    let companyaddress = document.getElementById('companyaddress');
    let ceoname = document.getElementById('ceoname');
    let companyphone = document.getElementById('companyphone');
    let employeamount = document.getElementById('employeamount');
    let companydesc = document.getElementById('companydesc');
    // company respose success or failed message
    let successmsg = document.querySelector('#success-msg');
    let errormsg = document.querySelector('#error-msg');
    // submit btn
    let submitbtn = document.getElementById('submitbtn');



        // onclick addEventListener
        submitbtn.addEventListener('click',(e)=>{
            e.preventDefault();

            // check input field if its filled
            if(companylogo.value !='' && companyname.value != '' && companyaddress.value != '' && ceoname.value != '' && companyphone.value != '' && 
            employeamount.value != '' && companydesc.value !='' ){
                AddCompanytodb();
            }
            else{
                successmsg.style.display = 'none';
                errormsg.style.display = 'block';
                errormsg.innerHTML = 'Please Fill The  Entire Form';
            }
        });


    // insert (add) company data to cloudfirestore
     async function AddCompanytodb(){
        var ref = collection(db,'company');

        const docRef = await addDoc(
            ref,{

                companyname:companyname.value,
                companylogo:companylogo.value,
                companyaddress:companyaddress.value,
                ceoname:ceoname.value,
                companyphone:companyphone.value,
                employeamount:employeamount.value,
                companydesc:companydesc.value,
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

