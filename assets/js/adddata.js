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
    
        // call the  get database method
    const db = getFirestore();

 
    
      // call firebase auth
      
     const auth = getAuth(app);
     const storage = getStorage();
    

   
    // get form inputs
   let email = document.getElementById('email');
    let companylogo = document.getElementById('companylogo')
   let  companyaddress = document.getElementById('companyaddress')
    let ceoname = document.getElementById('ceoname')
    let companyname = document.getElementById('companyname')
   let  companyphone = document.getElementById('companyphone')
    let companycountry = document.getElementById('companycountry')
    let companydesc = document.getElementById('companydesc')
    let submitbtn = document.getElementById('submitbtn')
    let uemail = document.getElementById('uemail')
    let upassword = document.getElementById('upassword')
    let createaccountbtn = document.getElementById('createaccountbtn')
    // company respose success or failed message
    let successmsg = document.querySelector('#success-msg');
    let errormsg = document.querySelector('#error-msg');
    let successmsg1 = document.querySelector('#success-msg1');
    let errormsg1 = document.querySelector('#error-msg1');
  

    // check the auth change status then get the email of the user
    let useremail = '';
    let userid;
    auth.onAuthStateChanged((user)=>{
        if(user){
           // console.log(user.uid);
           useremail = user.email;
           userid = user.uid;
           console.log(useremail);
           
           
          
        }else{
            console.log('user not found');
        }
       });

        // onclick addEventListener
        submitbtn.addEventListener('click',(e)=>{
            e.preventDefault();
            // check input field if its filled
            if(companylogo.value !='' && companyname.value != '' && companyaddress.value != '' && ceoname.value != '' && companyphone.value != '' && 
             companydesc.value !='' && companycountry.value != ''){
                AddCompanytodb();
                storemployedatain_userdata_collection(email.value);
            }
            else{
                successmsg.style.display = 'none';
                errormsg.style.display = 'block';
                errormsg.innerHTML = 'Please Fill The  Entire Form';
            }
        });

  // get the current date
  let c = new Date();
  let created_date = c.toLocaleDateString();

 
    // insert (add) company data to cloudfirestore
     async function AddCompanytodb(){
        var ref = collection(db,'company');
                // call the function that uploads the ikmage to firebase storage
                let value =   uploadimagetofirebasestorage();
                // call the function that gets the returned value(downloaded imageurl from the function uploadimagetofirebasestorage  to this functions)
                let urlofimg =  await getdownloadedurlafteruploadimage(value);
        const docRef = await addDoc(
            ref,{
                // companylogo
                // companyaddress
                // ceoname
                // companyname
                // companyphone
                // companycountry
                // companydesc
                // uemail
                company_name:companyname.value,
                company_logo:urlofimg,
                company_address:companyaddress.value,
                company_ceo:ceoname.value,
                company_phone:companyphone.value,
                // employeamount:employeamount.value,
                company_description:companydesc.value,
                email:email.value,
                created_by:useremail,
                company_country:companycountry.value,
                create_date:created_date,
                id:userid
            }
        ).then(()=>{
            errormsg.style.display = 'none';
            successmsg.style.display = 'block';
            successmsg.innerHTML = 'Data Added Successfully';
        }).catch((error)=>{
            errormsg.style.display = 'block';
            successmsg.style.display = 'none';
            errormsg.innerHTML = error;
        });
        

    }







    //  addimage to firebase storeage
    async function uploadimagetofirebasestorage(){
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
   




    // crate account for company
    function createUserwithEmailandPwd(){
        createUserWithEmailAndPassword(auth,uemail.value,upassword.value).then(()=>{
         }).then(()=>{
      
                 console.log('user email and pwd are created');
                 const Logoutclass = async() =>{
                     await signOut(auth);
                     console.log('logout success');
             }
             Logoutclass();
            

     
          
         }).catch((error)=>{
             console.log('error from add-employe.js in company folder: ' + error);
             errormsg1.style.display = 'block';
           successmsg1.style.display = 'none';
           errormsg1.innerHTML = error;
         });
        }




            //store company (email) in userdata for the role login
    async function storemployedatain_userdata_collection(email){
        let docRef = collection(db,'userdata');
    
        let docSnap = await addDoc( docRef,{
            Email: email,
            company_name:companyname.value,
            company_ceo:ceoname.value,
            addeddate:created_date,
            id:userid,
            role:'company',
        }).then(()=>{

            console.log('user role is created');
            errormsg.style.display = 'none';
            successmsg.style.display = 'block';
            successmsg.innerHTML = 'Account Created Successfully';
        }).catch((error)=>{


            errormsg1.style.display = 'block';
            successmsg1.style.display = 'none';
            errormsg1.innerHTML = error;
        });

      
        
   
        
       
    }


    // create account (auth account for company)

    createaccountbtn.addEventListener('click',function (e) {
        e.preventDefault();
        // useremail
              // clicked
              if(uemail.value != '' && upassword.value != ''){
                // create employe account ((login credentails))
                createUserwithEmailandPwd();
    
            }else{
                
            errormsg1.style.display = 'block';
            successmsg1.style.display = 'none';
            errormsg1.innerHTML = 'empty email and password field';
            }
        
        
    })