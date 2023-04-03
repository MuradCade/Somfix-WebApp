// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,collection,getDocs,doc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
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
    let fullname = document.getElementById("fullname");
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
    // notify user that data is loading please wait msg
    let dataloading = document.getElementById("loading");
    //   get the id from url by slicing it  (uid is company id)
    let uid = url.slice(6,26);




    // function that populates or passes data from db to html element
    async function ViewData(){
        dataloading.innerText = 'data is loading please wait';
        var ref = collection(db,"employee");
        const displayselectedcompany = await getDocs(ref);
        
            displayselectedcompany.forEach(doc => {
                // companylogo.innerHTML = `${doc.data()}`;
                // check if doc.id  from firestore collection equals the uid or(company id)
                if(doc.id == uid){
                    img.innerHTML = `${doc.data().profile_image}`
                    fullname.innerHTML = `${doc.data().fullname}`
                    age.innerHTML = `${doc.data().age}`
                    gender.innerHTML = `${doc.data().gender}`
                    dob.innerHTML = `${doc.data().dob}`
                    phone.innerHTML = `${doc.data().phone}`
                    Country.innerHTML = `${doc.data().country}`
                    address.innerHTML = `${doc.data().address}`
                    servicetype.innerHTML = `${doc.data().serivce_category}`
                    certificate.innerHTML = `${doc.data().certificate}`
                    expreince.innerHTML = `${doc.data().experience}`
                    companyassociatedwith.innerHTML = `${doc.data().company_associated}`
                }
                else{
                    console.log('error');
                }
                
                dataloading.innerText ='';

    
            });
       

            
        }
        ViewData();
}
    displaysignleemployedata();