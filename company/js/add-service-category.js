   // Import the functions you need from the SDKs you need
   import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import {getFirestore,addDoc,collection,getDocs} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
   import {firebaseConfig} from './firebase.js';
   import { Firestoredb } from "./index.js";
        // firebase intialization
    const app = initializeApp(firebaseConfig);
    
        // call the  get database method
    const db = getFirestore();


    // get form input
    let servicename = document.getElementById('servicename');
    let added_date = document.getElementById('added-date');
        // company respose success or failed message
        let successmsg = document.querySelector('#success-msg');
        let errormsg = document.querySelector('#error-msg');
    let submit = document.querySelector('#submit');

    

    // when submitbtn clicked run the following function

    submit?.addEventListener('click',function(e){
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


        }).then(()=>{
            errormsg.style.display = 'none';
            successmsg.style.display = 'block';
            successmsg.innerHTML = 'Service Category Added Successfully';
        }).catch((error)=>{
            errormsg.style.display = 'block';
            successmsg.style.display = 'none';
            errormsg.innerHTML = error;

        });
    }




    // view all service category
    async function viewservicecategory(){
        let tr = document.querySelector('#servicecategorydata');
        var ref = collection(db,'servicecategory');
        tr.innerHTML = 'Loading Please Wait';

        try {
            const docSnap = await getDocs(ref);
            if(docSnap.empty){
                tr.innerHTML = 'There is no data to fetched , please add new data to be displayed';
            }
            else{
                tr.innerHTML = '';
                let number =1;
                docSnap.forEach(doc => {
                    tr.innerHTML += `
                        <tr>
                        <td>${number}</td>
                        <td>${doc.data().servicename}</td>
                        <td>${doc.data().createddate}</td>
                        <td><a href='#' class='btn btn-primary'>View</a>&numsp;<a href='#' class='btn btn-success'>Update</a>&numsp;<a href='#' class='btn btn-danger'>Delete</a></td>
                        </tr>                    
                    `;
                    
                });
            }
        } catch (error) {
            
        }

        
    }


    viewservicecategory()?'':"";