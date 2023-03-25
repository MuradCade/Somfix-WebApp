// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,collection,getDocs,doc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {firebaseConfig} from './firebase.js';

     // firebase intialization
 const app = initializeApp(firebaseConfig);
 
     // call the  get database method
 const db = getFirestore();


let tr = document.querySelector('#displaydata');


 async function ViewData(){
     var ref = collection(db,"company");
    try {
    const docSnap = await getDocs(ref);

// check if collection that we are fetching if its empty excute the else statement
    if(docSnap.empty){
        // console.log("db isn't empty");
        tr.innerHTML = `<p class='text-center'>There is no data to fetched , please add new data to be displayed</p>`;
     
    }
    // if its not empty  log this message
    else{
    // console.log('Database is not empty');
    let number = 1;
    docSnap.forEach(doc => {
       
        
        tr.innerHTML += `

        <tr>
        <td>${number}</td>
        <td>${doc.data().companyname}</td>
        <td>${doc.data().companylogo}</td>
        <td>${doc.data().ceoname}</td>
        <td>${doc.data().companyaddress}</td>
        <td>${doc.data().companyphone}</td>
        <td>${doc.data().employeamount}</td>
        <td><a href="../../view_company.html?view=${doc.id}" class='btn btn-primary'>View</a></td>
        </tr>
        
    `;
       
        number ++;
        

       
    }); 
   }
    } catch (error) {
        tr.innerHTML = '<p class="text-center">Error accoured while display data please refresh the page</p>';
    }
        
      
 }



//  load website  or run this function when page is loaded
window.onload = ViewData();



//  check url if its equals view pass data to the view form

function displayselectdata () {

    // get the last of the url start from ? symbol
    let url = window.location.search;

    // check if the url contains world view
    let check = url.search('view');
      // intialize input model variables comes fomt view
      let displaycompanylogo = document.getElementById('logo');
      let companyname = document.getElementById('companyname');
      let ceoname = document.getElementById('ceoname');
      let companyaddress = document.getElementById('address');
      let companyphone = document.getElementById('phone');
      let employeeamount = document.getElementById('employee');
      let companydescription = document.getElementById('desc');
    //   get the id from url by slicing it  (uid is company id)
      let uid = url.slice(6,26);

      // view data of particular company
      let viewdata = document.querySelector('#viewdata');
        
      // display data means when view company page gets visit we should display the table of data
      let displaydata = document.querySelector('#viewtable')   

      if(check == 1){
        viewdata.style.display='block';
        // console.log(uid);
        displaydata.style.display='none'
    }
    else if(check == -1){
        viewdata.style.display='none'
        displaydata.style.display='block'
        // console.log(check);
    }
    else{
        viewdata.style.display='none'
        // console.log(check);

      }

      
    
       // read the company collection for particular clicked id (company id)
    async function ViewData(){
        var ref = collection(db,"company");
        const displayselectedcompany = await getDocs(ref);
        displayselectedcompany.forEach(doc => {
            // companylogo.innerHTML = `${doc.data()}`;
            // check if doc.id  from firestore collection equals the uid or(company id)
            if(doc.id == uid){
                displaycompanylogo.innerHTML = `${doc.data().companylogo}`;
                companyname.innerHTML = `${doc.data().companyname}`;
                ceoname.innerHTML = `${doc.data().ceoname}`;
                companyaddress.innerHTML = `${doc.data().companyaddress}`;
                companyphone.innerHTML = `${doc.data().companyphone}`;
                employeeamount.innerHTML = `${doc.data().employeamount}`;
                employeeamount.innerHTML = `${doc.data().employeamount}`;
                companydescription.innerHTML = `${doc.data().companydesc}`;
            }
            


        });
    //   console.log(result.includes(uid)? true : false);
    // console.log(result.valueOf());


    }


    ViewData();

    
  }
  displayselectdata();