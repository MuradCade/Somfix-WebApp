   // Import the functions you need from the SDKs you need
   import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import {getFirestore,addDoc,collection,getDocs} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
   import {getAuth , 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
    import {getStorage,ref,uploadBytes,getDownloadURL} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";
    import {firebaseConfig} from './firebase.js';

   
    // firebase intialization
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
        // call the  get database method
    const db = getFirestore();
    const storage = getStorage();


// get data from the service form
let servicename = document.getElementById('servicename');
let img = document.getElementById('img');
let serviceprice = document.getElementById('serviceprice');
let servicediscount = document.getElementById('servicediscount');
let servicestatus = document.getElementById('servicestatus');
let servicetypes = document.getElementById('servicetypes');
let serviceaddress = document.getElementById('serviceaddress');
let servicecategory = document.getElementById('servicecategory');
let serviceduration = document.getElementById('serviceduration');
let description = document.getElementById('description');
let error = document.getElementById('error');
let success = document.getElementById('success');
let submit = document.getElementById('submit');

//* submit click
submit.addEventListener('click',function(event){
        event.preventDefault();
        // * check the fields if its empty
        var e = document.getElementById("servicetypes");
        var value = e.options[e.selectedIndex].value;
        var text = e.options[e.selectedIndex].text;
        if(value == 'Free'){
          serviceprice.setAttribute('readonly',true );
          servicediscount.setAttribute('readonly', true);
          serviceprice.value = '0';
          servicediscount.value = '0';
            store_service_data();
        }
        else{
            console.log('not found the match');
        }
        if(value == 'Free'){
            console.log(text)
        }else{
            console.log('not detected');
        }
        if(servicename.value != '' && serviceprice.value != ''
        && servicediscount.value != '' && servicestatus.value != '' &&
        servicetypes.value != '' && servicecategory.value != '' &&
        serviceduration.value != '' 
         && description.value != ''){
            // store the data in service colection
            store_service_data();
        }else{
            success.style.display = "none";
            error.style.display = 'block';
            error.innerHTML = 'Empty Fieds please fill the form correctly';
        }
});

 // *! display service category in service form
    async function displayservicecategorynames(){
        let Docref = collection(db,'servicecategory');
        let Docsnap = await getDocs(Docref);
        
        Docsnap.forEach(docs => {
            var option = document.createElement('option');
            option.text = docs.data().servicename;
            servicecategory.options.add(option)
        });
        

    }
//  *! display employee fullname in add service form
// async function displayemployedata(){
//     let docRefdata = collection(db,'employe');
//     let docSnapdata = await getDocs(docRefdata)

//     docSnapdata.forEach(documents => {
//         var option = document.createElement('option');
//         option.text = documents.data().fullname;
//         serviceprovider.options.add(option);
        
//     });
// }
//? display service category name in  service category in service collection
    displayservicecategorynames();
// ?dispay fullname of employee from employee collection
    // displayemployedata();


     // check the auth change status then get the email of the user
     let useremail = '';
     let userid;
     auth.onAuthStateChanged((user)=>{
         if(user){
            // console.log(user.uid);
            useremail = user.email;
            userid = user.uid;
            
            
           
         }
        });

//? function that stores data in service collection

async function store_service_data(){
    let date = new Date();
    let created_date = date.toLocaleDateString();
     // call the function that uploads the ikmage to firebase storage
     let value =   uploadimagetofirebasestorage();
     // call the function that gets the returned value(downloaded imageurl from the function uploadimagetofirebasestorage  to this functions)
     let urlofimg =  await getdownloadedurlafteruploadimage(value);
    let docref = collection(db,'service');
    let docsnap = await addDoc( docref,{
        Service_name:servicename.value,
        Service_image:urlofimg,
        Service_price:serviceprice.value,
        Service_status:servicestatus.value,
        Service_address:serviceaddress.value,
        Service_category:servicecategory.value,
        Service_duration:serviceduration.value,
        person_created_service:useremail,
        Service_discount:servicediscount.value,
        Service_type:servicetypes.value,
        Service_description:description.value,
        timestamp:date
       
    }).then(()=>{
        error.style.display = 'none';
        success.style.display = "block";
        success.innerHTML = "successfull Saved Data";
        console.log('saved successfull');
    }).catch((error)=>{
      
        
        console.log('error name: ',error);
    });
}


 //  addimage to firebase storeage
 async function uploadimagetofirebasestorage(){
    // const ref= app.storage().ref()
    const file  =  img.files[0];
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



       // check the change of the value in select element
       servicetypes.addEventListener('change',(event)=>{
        // getcurrentcompanyinfo(event.target.value)
        console.log(event.target.value);

        if(event.target.value == 'Free'){
            serviceprice.setAttribute('readonly',true);
            servicediscount.setAttribute('readonly',true);
            serviceprice.value = '0';
            servicediscount.value = '0';
        }else{
            serviceprice.removeAttribute('readonly');
            servicediscount.removeAttribute('readonly');
            serviceprice.value = '';
            servicediscount.value = '';
        }
    });