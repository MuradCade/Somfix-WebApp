          // Import the functions you need from the SDKs you need
          import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
          import {getFirestore,addDoc,collection,getDocs,deleteDoc,doc,getDoc,updateDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
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
       
            // display form
       
            let serviceimage = document.getElementById('img');
            let servicename = document.getElementById('servicename');
            let serviceprice = document.getElementById('serviceprice');
            let servicediscount = document.getElementById('servicediscount');
            let servicestatus = document.getElementById('servicestatus');
            let servicetypes = document.getElementById('servicetypes');
            let serviceaddress = document.getElementById('serviceaddress');
            let servicecategory = document.getElementById('servicecategory');
            let serviceduration = document.getElementById('serviceduration');
            let description = document.getElementById('description');
            let optiondata = document.getElementById('optiondata');
            let loading = document.getElementById('loading');
            let submit = document.getElementById('submit');
            let error = document.getElementById('error');
            let success = document.getElementById('success');
            
    //  get url data id
            let url = window.location.search;
            let check = url.search('update');
            //   get the id from url by slicing it  (uid is company id)
            let uid = url.slice(8,29);




 
            loading.innerHTML = 'loading please wait';
            async function displaysingleservice(){
                let docref = doc(db,'service',uid);
                let docsnap = await getDoc(docref);

                if (docsnap.exists()) {
                    
                    // servicename.innerHTML =`Service Name: ${docs.data().servicename}`;
                    serviceimage.src = `${docsnap.data().Service_image}`;
                    servicename.value = `${docsnap.data().Service_name}`;
                    serviceprice.value = `${docsnap.data().Service_price}`;
                    servicediscount.value = `${docsnap.data().Service_discount}`;
                    servicestatus.value = `${docsnap.data().Service_status}`;
                    servicetypes.value = `${docsnap.data().Service_type}`;
                    serviceaddress.value = `${docsnap.data().Service_address}`;
                    optiondata.text = `${docsnap.data().Service_category}`;
                    serviceduration.value = `${docsnap.data().Service_duration}`;
                    description.value = `${docsnap.data().Service_description}`;
                    loading.innerHTML =  ``;
                }
                else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                  } 
            }
            // call the function
            displaysingleservice();

            // when update btn is clicked
            submit.addEventListener('click',function (e) {
                e.preventDefault();
                if(serviceimage.value == ''){
                  alert('data updated successfully');
                    updatedatawithoutimg();
                }else{
                    // console.log('not empty');
                    updatedatawithimg();
                }
                // updatedata();
            })

        // addimage to firebase storeage
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

    // update data form function
    async function updatedatawithimg(){
        let value =   uploadimagetofirebasestorage();
        // call the function that gets the returned value(downloaded imageurl from the function uploadimagetofirebasestorage  to this functions)
        let urlofimg = await  getdownloadedurlafteruploadimage(value);
        //   get the id from url by slicing it  (uid is company id)
        const ref = doc(db, "service", uid.toString());
        let date = new Date();
        await updateDoc(
            ref,{
                Service_name:servicename.value,
                Service_image:urlofimg,
                Service_price:serviceprice.value,
                Service_status:servicestatus.value,
                Service_address:serviceaddress.value,
                Service_category:optiondata.text,
                Service_duration:serviceduration.value,
                Service_discount:servicediscount.value,
                Service_type:servicetypes.value,
                Service_description:description.value,
                timestamp:date
            }
        ).then(()=>{
            error.style.display = 'none';
            success.style.display = 'block';
            success.innerHTML = 'Data Updated Successfully';
        }).catch((error)=>{
            error.style.display = 'block';
                success.style.display = 'none';
                error.innerHTML = error;
        });
    
       
        }
    async function updatedatawithoutimg(){
    
        //   get the id from url by slicing it  (uid is company id)
        const ref = doc(db, "service", uid.toString());
        let date = new Date();
        await updateDoc(
            ref,{
                Service_name:servicename.value,
                // Service_image:serviceimage.src,
                Service_price:serviceprice.value,
                Service_status:servicestatus.value,
                Service_address:serviceaddress.value,
                Service_category:optiondata.text,
                Service_duration:serviceduration.value,
                Service_discount:servicediscount.value,
                Service_type:servicetypes.value,
                Service_description:description.value,
                timestamp:date
            }
        ).then(()=>{
            error.style.display = 'none';
            success.style.display = 'block';
            success.innerHTML = 'Data Updated Successfully';
        }).catch((error)=>{
            error.style.display = 'block';
                success.style.display = 'none';
                error.innerHTML = error;
        });
    
       
        }


