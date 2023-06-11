// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,collection,getDocs,doc,getDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {firebaseConfig} from './firebase.js';

     // firebase intialization
 const app = initializeApp(firebaseConfig);
 
     // call the  get database method
 const db = getFirestore();





// function that  display singleemployeedata from firestore

function displaysignleemployedata (){

     // get the last of the url start from ? symbol
     let url = window.location.search;
    // get the url to verify if that should be displayed or not 
    let check = url.search('view');


      // intialize input model variables comes fomt view
    let img = document.getElementById("img");
    let fullname = document.getElementById("fullnames");
    let age = document.getElementById("age");
    let gender = document.getElementById("gender");
    let dob = document.getElementById("dob");
    let phone = document.getElementById("phone");
    let Country = document.getElementById("Country");
    let address = document.getElementById("address");
    let servicetype = document.getElementById("servicetype");
    let certificate = document.getElementById("certificate");
    let expreince = document.getElementById("expreince");
    let companyassociatedwith = document.getElementById("companyassociatedwith");
    let employeemail = document.getElementById('employeemail');
    // notify user that data is loading please wait msg
    let dataloading = document.getElementById("loading");
    //   get the id from url by slicing it  (uid is company id)
    let uid = url.slice(6,26);




    // function that populates or passes data from db to html element
    async function ViewData(){
        dataloading.innerText = 'data is loading please wait';
        var ref = doc(db,"employe",uid);
        const displayselectedemploye = await getDoc(ref);
        
            // displayselectedemploye.forEach(doc => {
                console.log(fullname);
                // companylogo.innerHTML = `${doc.data()}`;
                // check if doc.id  from firestore collection equals the uid or(company id)
                // if(doc.id == uid){
                    img.innerHTML = `<img src="${displayselectedemploye.data().profile_image}" width=80>`
                    fullname.innerHTML = 'jelp';
                    employeemail.innerHTML = `${displayselectedemploye.data().email}`
                    age.innerHTML = `${displayselectedemploye.data().age}`
                    gender.innerHTML = `${displayselectedemploye.data().gender}`
                    dob.innerHTML = `${displayselectedemploye.data().dob}`
                    phone.innerHTML = `${displayselectedemploye.data().phone}`
                    Country.innerHTML = `${displayselectedemploye.data().country}`
                    address.innerHTML = `${displayselectedemploye.data().address}`
                    servicetype.innerHTML = `${displayselectedemploye.data().service_category}`
                    certificate.innerHTML = `<img  src="${displayselectedemploye.data().certificate}"" width="80"/>`
                    expreince.innerHTML = `${displayselectedemploye.data().experience}`
                // }
                // else{
                    // console.log('error');
                // }
                
                dataloading.innerText ='';

    
            // });
       

            
        }
        ViewData();
}
    displaysignleemployedata();