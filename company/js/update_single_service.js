import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,getDoc,doc,updateDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {firebaseConfig} from './firebase.js';

     // firebase intialization
 const app = initializeApp(firebaseConfig);
 
     // call the  get database method
 const db = getFirestore();







// update form variable
let servicename = document.getElementById('servicename');
let img = document.getElementById('img');
let serviceprice = document.getElementById('serviceprice');
let servicediscount = document.getElementById('servicediscount');
let servicestatus = document.getElementById('servicestatus');
let servicetypes = document.getElementById('servicetypes');
let serviceaddress = document.getElementById('serviceaddress');
let servicecategory = document.getElementById('servicecategory');
let serviceduration = document.getElementById('serviceduration');
let serviceaddeddate = document.getElementById('serviceaddeddate');
let Requesteddate = document.getElementById('Requesteddate');
let submit = document.getElementById('submit');




// displaydata in update form function
async function viewsrviceformdatainsideupdateform(){
    
    //   get the id from url by slicing it  (uid is company id)
    let uid = url.slice(8,28);
  
    const docRef = doc(db, "service", uid);
    const result = await getDoc(docRef);
    var option = document.createElement('option');
    // option.text = docs.data().servicename;
    if (result.exists()) {
        fullname.value= result.data().fullname;
        // img.name ='helo';
        servicename.value = result.data().Service_name;
        serviceprice.value = result.data().Service_price;
        servicediscount.value = result.data().Service_discount;
        servicestatus.value = result.data().Service_status;
        servicetypes.value = result.data().Service_type;
        serviceaddress.value = result.data().Serivce_category;
        serviceduration.value = result.data().Serivce_duration;
        // serviceaddeddate.value = result.data().Serivce_;
        option.append(result.data().serivce_category)
        let optionText = document.createTextNode(result.data().serivce_category);

        servicecategory.appendChild(option);
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