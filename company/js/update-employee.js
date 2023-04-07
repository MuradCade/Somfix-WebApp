// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,getDoc,doc,updateDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {firebaseConfig} from './firebase.js';

     // firebase intialization
 const app = initializeApp(firebaseConfig);
 
     // call the  get database method
 const db = getFirestore();




  // intialize input model variables comes from db
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
// submitbtn
let submitbtn = document.getElementById('submit');


  // get the last of the url start from ? symbol
  let url = window.location.search;
  // get the url to verify if that should be displayed or not 
  let check = url.search('update');


   
if(check == 1){
viewdatainupdateform();
   
}
else{
   alert('Error Occur While Displaying The Data Please Try Again....');
}



// displaydata in update form function
async function viewdatainupdateform(){
    
    //   get the id from url by slicing it  (uid is company id)
    let uid = url.slice(8,28);
    const docRef = doc(db, "employe", uid);
    const result = await getDoc(docRef);
    var option = document.createElement('option');
    // option.text = docs.data().servicename;
    if (result.exists()) {
        fullname.value= result.data().fullname;
        // img.name ='helo';
        age.value = result.data().age;
        gender.value = result.data().gender;
        dob.value = result.data().dob;
        phone.value = result.data().phone;
        address.value = result.data().address;
        country.value = result.data().country;
        servicecategory.value = result.data().serivce_category;
        // certificate.value = result.data().certificate;
        experience.value = result.data().experience;
        company_associated.value = result.data().company_associated

        // console.log("Document data:", result.data().fullname);
      }
      else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      } 
    }
    


   
    // update data form function
    async function updatedata(){
    
        //   get the id from url by slicing it  (uid is company id)
        let uid = url.slice(8,28);
        const ref = doc(db, "employe", uid.toString());
        await updateDoc(
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
            }
        ).then(()=>{
            errormsg.style.display = 'none';
            successmsg.style.display = 'block';
            successmsg.innerHTML = 'Data Updated Successfully';
        }).catch((error)=>{
            errormsg.style.display = 'block';
                successmsg.style.display = 'none';
                errormsg.innerHTML = error;
        });
    
       
        }
        


    submitbtn.addEventListener('click',function(e){
        e.preventDefault();
        updatedata();
    });