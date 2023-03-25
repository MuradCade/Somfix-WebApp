// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,collection,getDocs} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {firebaseConfig} from './firebase.js';

     // firebase intialization
 const app = initializeApp(firebaseConfig);
 
     // call the  get database method
 const db = getFirestore();


let tr = document.querySelector('#displaydata');


 async function ViewData(){
     var ref = collection(db,"company")
    try {
    const docSnap = await getDocs(ref);

// check if collection that we are fetching if its empty excute the else statement
    if(docSnap.empty){
        console.log("db isn't empty");
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
        <td><a href="../../view_company.html?${doc.id}" class='btn btn-primary'>View</a></td>
        </tr>
        
    `;
       
            
        // function displayid(id){
            
        //     // alert(id);
        // }
        // console.log(doc.data().companyname);
        number ++;
        

       
    }); 
   }
    // foreach that fetches all collection in cloud firestore and display it in form formats
   
          
    } catch (error) {
        tr.innerHTML = '<p class="text-center">Error accoured while display data please refresh the page</p>';
    }
        
      
 }

//  load or run this function when page is loaded
 window.onload = ViewData();

