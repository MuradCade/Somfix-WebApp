   // Import the functions you need from the SDKs you need
   import {initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import {getFirestore,addDoc,collection,getDocs} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
   import {getStorage,ref,uploadBytes,getDownloadURL} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";
   import {getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

   const firebaseConfig = {
    apiKey: "AIzaSyCf6rxgmGh0x1T4XeG3O5YLgm9RFJhVNDs",
    authDomain: "finalproject-ccdba.firebaseapp.com",
    projectId: "finalproject-ccdba",
    storageBucket: "finalproject-ccdba.appspot.com",
    messagingSenderId: "33547640272",
    appId: "1:33547640272:web:a03b24e8b0bba98327edd5",  
    measurementId: "G-51LXG9LEBM"
};
        // firebase intialization
        const app = initializeApp(firebaseConfig);
        // console.log(app)
    
        // call the  get database method
    const db = getFirestore();

   const auth = getAuth(app);
   const storage = getStorage();
    // get form input
    let serviceimg = document.getElementById('serviceimg');
    let servicename = document.getElementById('servicename');
    let added_date = document.getElementById('added-date');
        // company respose success or failed message
        let successmsg = document.querySelector('#success-msg');
        let errormsg = document.querySelector('#error-msg');
    let submit = document.querySelector('#submit');

    // check the auth change status then get the email of the user
    let useremail = '0';
    auth.onAuthStateChanged((user)=>{
        if(user){
           // console.log(user.uid);
           useremail = user.email;
          
        }else{
           console.log(user);
        }
       });

    //    console.log(uid);
    // when submitbtn clicked run the following function

     submit.addEventListener('click',function(e){
        e.preventDefault();

        
       
        
        // check input field  its filled
        if(servicename.value != '' && added_date.value != ''){
                // let imageurls  = printAddress();
                // call the firestore function that stores the values in service category
            addservicecategory();
            }
        else{
            successmsg.style.display = 'none';
            errormsg.style.display = 'block';
            errormsg.innerHTML = 'Please Fill The  Entire Form';
        }
      
    });



    // add new service category to firestore
     async function addservicecategory(){
        // call the function that uploads the ikmage to firebase storage
        let value =   uploadimagetofirebasestorage();
        // call the function that gets the returned value(downloaded imageurl from the function uploadimagetofirebasestorage  to this functions)
        let urlofimg =  await getdownloadedurlafteruploadimage(value);
        var ref = await collection(db,'servicecategory');
        const docRef = await addDoc(
            ref,{
                
                service_image:urlofimg,
                servicename: servicename.value,
                createddate:added_date.value,
                update_date:'false',
                deleted_status:"false",
                create_by: useremail,


        }).then(()=>{
            errormsg.style.display = 'none';
            successmsg.style.display = 'block';
            successmsg.innerHTML = 'Service Category Added Successfully';
        }).catch((error)=>{
            errormsg.style.display = 'block';
            successmsg.style.display = 'none';
            errormsg.innerHTML = error;

        });
        let result = await urlofimg;
        console.log('from the addservice function',urlofimg);
     };






    
//  addimage to firebase storeage
        async function uploadimagetofirebasestorage(){
            // const ref= app.storage().ref()
            const file  =  serviceimg.files[0];
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
       