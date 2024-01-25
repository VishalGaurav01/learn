import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
export default function DashProfile() {
    const {currentUser}= useSelector((state)=>state.user)
    const [imageFile,setimagefile]=useState(null);
    const [imageFileUrl, setimageFileUrl]=useState(null);
    const [imageFileUploadingProgress, setmageFileUploadingProgress] = useState(null);
    const [imageFileUploadingerror, setimageFileUploadingerror] = useState(null);
    console.log(imageFileUploadingProgress,imageFileUploadingerror);
    const fileref =useRef();
    const handleImgChange= (e)=>{
        const file= e.target.files[0];
        if(file){
        setimagefile(file);
        setimageFileUrl(URL.createObjectURL(file));
        }
    };
    useEffect(()=>{
        if(imageFile){
            uploadImage();
        }
    },[imageFile]);
    const uploadImage= async()=>{
        setimageFileUploadingerror(null)
        const storage= getStorage(app)
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef,imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setmageFileUploadingProgress(progress.toFixed(0));
            },
            (error) =>{

                setimageFileUploadingerror('Count not upload Image (File must be less than 2 mb)');
                setmageFileUploadingProgress(null);
                setimagefile(null);
                setimageFileUrl(null);
            },
            ()=> {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setimageFileUrl(downloadURL);
                });
            }
        );
    };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl '>Profile</h1>
        <form className='flex flex-col gap-4'>
        <input type='file' accept='image/*' onClick={handleImgChange} ref={fileref} hidden/>
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' 
        onClick={()=>fileref.current.click()}>

{/* {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadingProgress / 100
                  })`,
                },
              }}
            /> */}
            <img src={imageFileUrl || currentUser.profilePicture } alt="Profile" 
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] `}/>
        </div>
        {imageFileUploadingerror && <Alert color='failure'>{imageFileUploadingerror}</Alert>}
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='password'/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
            <span className='cursor-pointer'>Delete Account</span>
            <span className='cursor-pointer'>Sign Out</span>
        </div>
    </div>
  )
}
