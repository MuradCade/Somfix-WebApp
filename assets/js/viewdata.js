// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,collection,getDocs,doc,updateDoc,deleteDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
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
        <td><img src='${doc.data().company_logo}' width=80/></td>
        <td>${doc.data().company_name}</td>
        <td>${doc.data().email}</td>
        <td>${doc.data().company_ceo}</td>
        <td>${doc.data().company_address}</td>
        <td>${doc.data().company_phone}</td>
        <td>${doc.data().company_country}</td>
        <td>${doc.data().company_description}</td>
        <td class='d-flex'><a href="../../singlecompanydetail.html?view=${doc.id}" class='btn btn-primary'>View</a>&numsp;</td>
        </tr>
        
    `;
       
        number ++;
        

       
    }); 
   }
    } catch (error) {
        // tr.innerHTML = '<p class="text-center">Error accoured while display data please refresh the page</p>';
    }
        
      
 }



//  load website  or run this function when page is loaded
window.onload = ViewData();



//  check url if its equals view pass data to the view form



    // get the last of the url start from ? symbol
    let url = window.location.search;

    // check if the url contains word view and have id
    let check = url.search('view');
    // check if the url contains word update and have id
    let updateurl = url.search('update');
      // intialize input model variables comes fomt view
      let companyname = document.getElementById('companyname')
    //   let email = document.getElementById('email')
      let companylogo = document.getElementById('logo')
      let companyaddress = document.getElementById('address')
      let ceoname = document.getElementById('ceoname')
      let companyphone = document.getElementById('phone')
      let companycountry = document.getElementById('country')
      let companydesc = document.getElementById('desc')
      let update = document.getElementById('update')

      



    //   get the id from url by slicing it  (uid is company id)
      let uid = url.slice(6,29);

    

    
    
   
      
    //   console.log('id'+uid);
    
       // read the company collection for particular clicked id (company id)
    async function ViewDatainsideupdateform(){
        var ref = collection(db,"company");
        const displayselectedcompany = await getDocs(ref);
        displayselectedcompany.forEach(doc => {
            // companylogo.innerHTML = `${doc.data()}`;
            // check if doc.id  from firestore collection equals the uid or(company id)
            if(doc.id == uid){
                        companyname.innerHTML = `${doc.data().company_name}`
                        // email.innerHTML = `${doc.data().email}`
                        companylogo.innerHTML =   `<img  src='${doc.data().company_logo}' width="80"/>` 
                        companyaddress.innerHTML = `${doc.data().company_address}`
                        ceoname.innerHTML = `${doc.data().company_ceo}`
                        companyphone.innerHTML = `${doc.data().company_phone}`
                        companycountry.innerHTML = `${doc.data().company_country}`
                        companydesc.innerHTML = `${doc.data().company_description}`
                // displaycompanylogo.src = `${doc.data().company_logo}`;
                // companyname.innerHTML = `${doc.data().company_name}`;
                // ceoname.innerHTML = `${doc.data().company_ceo}`;
                // companyaddress.innerHTML = `${doc.data().company_address}`;
                // companyphone.innerHTML = `${doc.data().company_phone}`;
                // employeeamount.innerHTML = `${doc.data().email}`;
                // employeeamount.innerHTML = `${doc.data().company_country}`;
                // companydescription.innerHTML = `${doc.data().company_description}`;
            }
            


        });
    //   console.log(result.includes(uid)? true : false);
    // console.log(result.valueOf());


    }
    
    // run functions based on web browser
    if(updateurl == 1){
        // console.log(uid);
        ViewDatainsideupdateform();
        update.addEventListener('click',function(e){
            e.preventDefault();
            if(companylogo.src == ''){
                updatesinglecompanydetailswithoutimg(uid);
                console.log('company data updated successfully');
                // window.location.href = 'view_company.html'
            }else{
                updatesinglecompanydetailswithimg(uid);
                console.log('company data updated successfully');
                // window.location.href = 'view_company.html'
            }
            
        });
        
    }
  
    
    
    // update singlecompany details
  async  function updatesinglecompanydetailswithimg()
    {

             // call the function that uploads the ikmage to firebase storage
             let value =   uploadimagetofirebasestorage();
             // call the function that gets the returned value(downloaded imageurl from the function uploadimagetofirebasestorage  to this functions)
             let urlofimg =  await getdownloadedurlafteruploadimage(value);
        updateDoc(doc(db,'company',uid),{
            company_name:companyname.value,
            company_logo:urlofimg,
            company_address:companyaddress.value,
            company_phone:companyphone.value,
            company_country:companycountry.value,
            company_desc:companydesc.value,
            company_ceo:ceoname.value,
            email:email.value,
        }).then(()=>{

        }).catch((error)=>{
            console.log(error);
        });
        // put update logic here
       
    }

    async  function updatesinglecompanydetailswithoutimg(uio)
    {

         updateDoc(doc(db,'company',uid),{
            company_name:companyname.value,
            // company_logo:urlofimg,
            company_address:companyaddress.value,
            company_phone:companyphone.value,
            company_country:companycountry.value,
            company_desc:companydesc.value,
            company_ceo:ceoname.value,
            email:email.value,
        }).then(()=>{

        }).catch((error)=>{
            console.log(error);
        });
       
    }


    //  addimage to firebase storeage
    async function uploadimagetofirebasestorage(uid){
        let companylogo = document.getElementById('companylogo')
        // const ref= app.storage().ref()
        const file  =  companylogo.files[0];
        const name = new Date() + '-' + file.name;
        let downloadedimageurl= [];
        let getdata;
        let result;
        // /create child refrence
        const imageref = ref(storage,`images/${name}`);
        // file metadata
        const metadata = {
            contentType: 'image/jpeg',
          };
          
        // 'file' comes from the Blob or File API
             await uploadBytes(imageref, file,metadata).then((snapshot) => {
            

                // const downloadurl = ref().getDownloadURL();
                console.log('Image Uploaded Successfully');
            getdata =  getDownloadURL(ref(storage, `images/${name}`))
                        .then((url) =>  {
                            // `url` is the download URL for 'images/stars.jpg'
                           
                           

                             return downloadedimageurl[0] = url;
                        })
                        .catch((error) => {
                            // Handle any errors
                             console.log(`error message: ${error}`);
                        });

                        return downloadedimageurl[0]
                        
                    });
                    
                   
                    
                   result = await getdata;

                  return result
    }



async function getdownloadedurlafteruploadimage(result){
    const a = await result;
    console.log('from below function ',a);
    return a;
}



// delete the data 

let delcheck = url.search('del');
let delurl = window.location.search;
let deluid = delurl.slice(5,28);
console.log(deluid);


// if the url ==delete then delete selected data
if(delcheck == 1){
    deletesinglecompany(deluid);


}


async function deletesinglecompany(deluid){
     //delete function , deletes the item selected from firestore
     

      
        const docRef  = doc(db,'company',deluid);
        deleteDoc(docRef).then(() =>{
                alert('company data  deleted successfully');
                window.location.href = 'view_company.html';
        }).catch((e)=>{
            alert('failed to delete company data',e);
        });


}
ViewDatainsideupdateform();