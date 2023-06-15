// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,collection,getDocs,doc,updateDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {firebaseConfig} from './firebase.js';
import {getAuth , 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
     // firebase intialization
 const app = initializeApp(firebaseConfig);
 
     // call the  get database method
 const db = getFirestore();

 const auth = getAuth(app);








 let assignservice = document.getElementById('assignservice');
//  update btn
 let updatebookedservicebtn = document.getElementById('updatebookedservicebtn');



// display data inside the form in order to be updated
function displaybookedsingleservicese (){

    // get the last of the url start from ? symbol
    let url = window.location.search;
   // get the url to verify if that should be displayed or not 
   let check = url.search('id');
   let uid = url.slice(4,6);

     // intialize input model variables comes fomt view
  // form data from the html
let image = document.getElementById('img-container');
let servicename = document.getElementById('servicename');
let serviceaddresss = document.getElementById('serviceaddresss');
let client_id = document.getElementById('client_id');
let description = document.getElementById('description');
let price = document.getElementById('price');
let discount = document.getElementById('discount');
let totalamount = document.getElementById('totalamount');
let servicestatus = document.getElementById('servicestatus');
let paymentmethod = document.getElementById('paymentmethod');
let paymenstatus = document.getElementById('paymenstatus');
let date = document.getElementById('date');
let time = document.getElementById('time');
let serviceprovider = document.getElementById('serviceprovider');




   // notify user that data is loading please wait msg
   let dataloading = document.getElementById("loading");
   //   get the id from url by slicing it  (uid is company id)
 




   // function that populates or passes data from db to html element
   async function ViewData(){
    let collectionid ;
       dataloading.innerText = 'data is loading please wait';
       var ref = collection(db,"bookedservices");
       const displayselectedcompany = await getDocs(ref);
       
       displayselectedcompany.forEach(doc => {
           // companylogo.innerHTML = `${doc.data()}`;
           // check if doc.id  from firestore collection equals the uid or(company id)
           if(doc.data().service_id == uid.toString()){
                   collectionid = doc.id;
                image.innerHTML = `<img src="${doc.data().service_img}" width=80>`
                   servicename.value = `${doc.data().service_name}`
                   serviceaddresss.value = `${doc.data().address}`
                   client_id.value = `${doc.data().client_id}`
                   description.value = `${doc.data().description}`
                   price.value = `${doc.data().price}`
                   discount.value = `${doc.data().discount}`
                   totalamount.value = `${doc.data().totalamount}`
                   servicestatus.value = `${doc.data().servicestatus}`
                   paymentmethod.value = `${doc.data().payment_method}"`
                   paymenstatus.value = `${doc.data().payment_status}`
                   date.value = `${doc.data().date}`
                   time.value = `${doc.data().time}`
                   serviceprovider.value = `${doc.data().provideremail}`
                   var option = document.createElement('option');
                    
               }
               else{
                   console.log('error');
               }
               
               dataloading.innerText ='';

   
           });
           console.log(collectionid);
           updatebookedservicebtn.addEventListener('click',function(e){
            e.preventDefault();
            
                    if(servicestatus.value =='Cancelled' || servicestatus.value == 'Completed' || servicestatus.value == 'Pending'| servicestatus.value == 'Verified'){
                        alert('You are not allowed to assign  this Booked service beacause the status is either still Pending or Booked service already assigned ')
                        window.location.href = 'viewbooking.html';
                    }else{

                        updatebookedassigned(collectionid);
                    }

            
            });
            
        }
    ViewData();
     
}
displaybookedsingleservicese();
dispayemployeedatainassignforservice();

  // check the auth change status then get the email of the user
  let companyemail = '';
  let userid;
  auth.onAuthStateChanged((user)=>{
      if(user){
         // console.log(user.uid);
         companyemail = user.email;
         userid = user.uid;
         
         
        
      }
     });


async function dispayemployeedatainassignforservice(){
    let employedata;
    let Docref = collection(db,'employe');
    let Docsnap = await getDocs(Docref);
    
    Docsnap.forEach(docs => {
        var option = document.createElement('option');
        // var option2 = document.createElement('option2');
        if(docs.data().company_associated == companyemail){
            option.text = docs.data().email ;
            // option2 = docs.data().email
            
            assignservice.options.add(option)
            employedata = assignservice.value;
        }
    });
    return employedata;
    
    
}


// dispayemployeedatainassignforservice();

                    // this function assign employee to booked service - service that create by company and comppany assigned to one of this employees
            
                    async function updatebookedassigned(id){
                        let data = await dispayemployeedatainassignforservice();
                        const ref = doc(db, "bookedservices", id.toString());
                        await updateDoc(
                            ref,{
                                assignedtoemail:data.toString(),
                                assignstatus:'true',
                                
                            }
                        ).then(()=>{
                            console.log('Data Updated Successfully');
                            window.location.href = 'viewbooking.html';
                        }).catch((error)=>{
                            console.log('error occur while updating data '+ error);
                        });
                        }

