   // Import the functions you need from the SDKs you need
   import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import {getFirestore,addDoc,collection,getDocs} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
   import {getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

   import {firebaseConfig} from './firebase.js';
        // firebase intialization
    const app = initializeApp(firebaseConfig);
    
        // call the  get database method
    const db = getFirestore();

   const auth = getAuth(app);
    // get form input
    let servicename = document.getElementById('servicename');
    let added_date = document.getElementById('added-date');
        // company respose success or failed message
        let successmsg = document.querySelector('#success-msg');
        let errormsg = document.querySelector('#error-msg');
    let submit = document.querySelector('#submit');

    // check the auth change status then get the email of the user
    let useremail = '0';
    auth.onAuthStateChanged((user)=>{
        if(user){
           // console.log(user.uid);
           useremail = user.email;
          
        }else{
           console.log('user not found');
        }
       });

    //    console.log(uid);
    // when submitbtn clicked run the following function

    submit.addEventListener('click',function(e){
        e.preventDefault();
        // check input field  its filled
        if(servicename.value != '' && added_date.value != ''){
            addservicecategory();
            }
        else{
            successmsg.style.display = 'none';
            errormsg.style.display = 'block';
            errormsg.innerHTML = 'Please Fill The  Entire Form';
        }
    });



    // add new service category to firestore
     async function addservicecategory(){
        var ref = collection(db,'servicecategory');
        const docRef = await addDoc(
            ref,{
                servicename: servicename.value,
                createddate:added_date.value,
                update_date:'false',
                deleted_status:"false",
                create_by: useremail,


        }).then(()=>{
            errormsg.style.display = 'none';
            successmsg.style.display = 'block';
            successmsg.innerHTML = 'Service Category Added Successfully';
        }).catch((error)=>{
            errormsg.style.display = 'block';
            successmsg.style.display = 'none';
            errormsg.innerHTML = error;

        });
     };






    



