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
                if(doc.data().deleted_status == "false"){
                    tr.innerHTML += `
                    <tr>
                    <td>${number}</td>
                    <td><img src='${doc.data().service_image}' width=30></td>
                    <td>${doc.data().servicename}</td>
                    <td>${doc.data().createddate}</td>
                    <td><a href='singleservicecategorydata.html?view=${doc.id}' class='btn btn-primary'>View</a>&numsp;<a href='update-service-category.html?update=${doc.id}' class='btn btn-success'>Update</a>&numsp;<a href='viewservicecategory.html?delete=${doc.id}' class='btn btn-danger'>Delete</a></td>
                    </tr>                    
                `;
                }
                
                
                number ++;
            });
        }
    } catch (error) {
        console.log(error);
    }

    
}

window.onload = viewservicecategory();