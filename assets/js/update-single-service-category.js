   // Import the functions you need from the SDKs you need
   import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import {getFirestore,collection,getDocs,query,where,doc, updateDoc,getDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
   import {getStorage,ref,uploadBytes,getDownloadURL} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

   import {firebaseConfig} from '../../company/js/firebase.js';
        // firebase intialization
    const app = initializeApp(firebaseConfig);
    
        // call the  get database method
    const db = getFirestore(app);

    const storage = getStorage();

// get the last of the url start from ? symbol
let url = window.location.search;

// check if the url contains word update and have id
let updateurl = url.search('update');


let uid = url.slice(8,28).toString();


// console.log(updateurl);


// get input element

let servicename = document.getElementById('servicename');
let added_date = document.getElementById('added-date');
let loading = document.getElementById('loading');
let serviceimage = document.getElementById('serviceimage');
let submit = document.getElementById('submit');
let images = [];



// added_date.value= '2014-02-09';



   // view all service category
   async function displaydatainupdateform(){
    var ref = doc(db,'servicecategory',uid);
    loading.innerHTML = 'data is loading please wait';
    
    try {
        const docSnap = await getDoc(ref);
        if(docSnap.empty){
        }
        else{
           
            loading.innerHTML ='';
            // docSnap.forEach(document => {
                servicename.value = docSnap.data().servicename;
                added_date.value= docSnap.data().createddate;
                images[0] = docSnap.data().service_image;
            // });
        }
    } catch (error) {
        console.log(error);
    }

    
}




// current date and time
var dateandtime = new Date();
var date = dateandtime.toLocaleDateString();
var time = dateandtime.toLocaleTimeString();
// console.log();

// update data (collection) service category function 

async function update_service_categorywithout(uid){
               // call the function that uploads the ikmage to firebase storage
         let value =   uploadimagetofirebasestorage();
         // call the function that gets the returned value(downloaded imageurl from the function uploadimagetofirebasestorage  to this functions)
         let urlofimg = await  getdownloadedurlafteruploadimage(value);
    updateDoc(doc(db,'servicecategory',uid),{
            servicename:servicename.value,
            update_date: date+'-'+time,
            // service_image:urlofimg
        });
        
        // console.log(uid);

}
async function update_service_categorywithimg(uid){
               // call the function that uploads the ikmage to firebase storage
         let value =   uploadimagetofirebasestorage();
         // call the function that gets the returned value(downloaded imageurl from the function uploadimagetofirebasestorage  to this functions)
         let urlofimg = await  getdownloadedurlafteruploadimage(value);
    updateDoc(doc(db,'servicecategory',uid),{
            servicename:servicename.value,
            update_date: date+'-'+time,
            service_image:urlofimg
        });
        
        // console.log(uid);

}

  //  addimage to firebase storeage
  async function uploadimagetofirebasestorage(){
    // const ref= app.storage().ref()
    const file  =  serviceimage.files[0];
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


// check if the url is equal to update
if(updateurl == 1){

    submit.addEventListener('click',function(e){
        e.preventDefault();
        if(serviceimage.value == ''){
            alert('data update successfully');
            update_service_categorywithout(uid);
        }else{
            // console.log('not empty');
            update_service_categorywithimg(uid);
            alert('data update successfully');

        }
    });
} 
window.onload = displaydatainupdateform();