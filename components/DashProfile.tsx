"use client";

import { Alert, Button, Modal, ModalBody, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "@/firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashProfile() {
  const { state, dispatch } = useAuth();
  const { user: currentUser } = state;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(currentUser?.googlePhotoUrl || null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState<number | null>(null);
  const [imageFileUploadError, setImageFileUploadError] = useState<string | null>(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState<string | null>(null);
  const [updateUserError, setUpdateUserError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  
  const uploadImage = async () => {
    if (!imageFile) return;
  
    setImageFileUploading(true);
    setImageFileUploadError(null);
  
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress);
      },
      (error) => {
        setImageFileUploadError("Could not upload image (File must be less than 2MB)");
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageFileUrl(downloadURL);
        setImageFileUploading(false);
      }
    );
  };
  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
  
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
  
    const updatedData = { ...formData };
    if (imageFileUrl) {
      updatedData.profilePicture = imageFileUrl;  
    }
  
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated.");
  
      const res = await fetch("/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
  
      dispatch({ type: "LOGIN", payload: data.user }); 
      setUpdateUserSuccess("Profile updated successfully!");
  
      setTimeout(() => {
        setUpdateUserSuccess(null);
      }, 3000);
    } catch (error: any) {
      setUpdateUserError(error.message || "Failed to update profile");
    }
  };
  
  
  

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated.");
  
      const res = await fetch("/api/auth/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
  
      setUpdateUserSuccess("Account deleted successfully!");
      
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: 'LOGOUT' });
        router.push('/user/signin');
    } catch (error: any) {
      setUpdateUserError(error.message || "Failed to delete account");
    }
  };
  
  

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      dispatch({ type: 'LOGOUT' });
      router.push('/user/signin');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current?.click()}
        >
          {imageFileUploadProgress && (
                       <CircularProgressbar
                         value={imageFileUploadProgress || 0}
                         text={`${imageFileUploadProgress}%`}
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
                               imageFileUploadProgress / 100
                             })`,
                           },
                         }}
                       />
          )}
          <img 
            key={imageFileUrl || currentUser?.googlePhotoUrl} 
            src={imageFileUrl || currentUser?.googlePhotoUrl} 
            alt="user" 
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>}
        <TextInput type="text" id="username" placeholder="Username" defaultValue={currentUser?.username} onChange={handleChange} />
        <TextInput type="email" id="email" placeholder="Email" defaultValue={currentUser?.email} onChange={handleChange} />
        <TextInput type="password" id="password" placeholder="Password" onChange={handleChange} />
        <TextInput type="text" id="phone" placeholder="Phone" defaultValue={currentUser?.phone} onChange={handleChange} />
        <TextInput type="text" id="location" placeholder="Location" defaultValue={currentUser?.location} onChange={handleChange} />
        <TextInput type="text" id="gender" placeholder="Gender" defaultValue={currentUser?.gender} onChange={handleChange} />
        <TextInput type="text" id="university" placeholder="University" defaultValue={currentUser?.university} onChange={handleChange} />
        <TextInput type="text" id="specialization" placeholder="Specialization" defaultValue={currentUser?.specialization} onChange={handleChange} />

        <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={imageFileUploading}>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="cursor-pointer">
          Sign Out
        </span>
      </div>
      {updateUserSuccess && <Alert color="success">{updateUserSuccess}</Alert>}
      {updateUserError && <Alert color="failure">{updateUserError}</Alert>}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500">Are you sure you want to delete your account?</h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
