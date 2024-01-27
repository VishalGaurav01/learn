import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {updateStart, updateFailure, updateSuccess, deleteUserStart,deleteUserFailure,deleteUserSuccess,signoutSuccess} from '../redux/user/userSlice'
import { app } from '../firebase'
// import {HiOutlineExclamationCircle} from 'react-icons/hi';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
export default function DashProfile() {
    const {currentUser , error}= useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [imageFile,setimagefile]=useState(null);
    const [imageFileUrl, setimageFileUrl]=useState(null);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [imageFileUploadingProgress, setmageFileUploadingProgress] = useState(null);
    const [imageFileUploadingerror, setimageFileUploadingerror] = useState(null);
    console.log(imageFileUploadingProgress,imageFileUploadingerror);
    const fileref =useRef();

    const handleSignout = async () => {
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const handleImgChange= (e)=>{
        const file= e.target.files[0];
        if(file){
        setimagefile(file);
        setimageFileUrl(URL.createObjectURL(file));
        }
    };
    const handleDeleteUser = async () => {
      setShowModal(false);
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (!res.ok) {
          dispatch(deleteUserFailure(data.message));
        } else {
          dispatch(deleteUserSuccess(data));
        }
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
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
                    setFormData({...formData,profilePicture: downloadURL });
                });
            }
        );
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setUpdateUserError(null);
      setUpdateUserSuccess(null);
      if (Object.keys(formData).length === 0) {
        setUpdateUserError('No changes made');
        return;
      }
      if (imageFileUploadingerror) {
        setUpdateUserError('Please wait for image to upload');
        return;
      }
      try {
        dispatch(updateStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          dispatch(updateFailure(data.message));
          setUpdateUserError(data.message);
        } else {
          dispatch(updateSuccess(data));
          setUpdateUserSuccess("User's profile updated successfully");
        }
      } catch (error) {
        dispatch(updateFailure(error.message));
        setUpdateUserError(error.message);
      }
    };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl '>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange}/>
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}onChange={handleChange}/>
        <TextInput type='password' id='password' placeholder='password'onChange={handleChange}/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
            <span onClick={()=>setShowModal(true)} className='cursor-pointer'>Delete Account</span>
            <span onClick={handleSignout}  className='cursor-pointer'>Sign Out</span>
        </div>
        {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
        )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            {/* <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' /> */}
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
