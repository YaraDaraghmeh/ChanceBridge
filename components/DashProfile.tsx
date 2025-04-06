"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "@/firebase"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import {
  HiOutlineExclamationCircle,
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineUserGroup,
} from "react-icons/hi"

export default function DashProfile() {
  const { state, dispatch } = useAuth()
  const { user: currentUser } = state
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(currentUser?.googlePhotoUrl || null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState<number | null>(null)
  const [imageFileUploadError, setImageFileUploadError] = useState<string | null>(null)
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const [updateUserSuccess, setUpdateUserSuccess] = useState<string | null>(null)
  const [updateUserError, setUpdateUserError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [activeTab, setActiveTab] = useState("personal")
  const filePickerRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (imageFile) {
      uploadImage()
    }
  }, [imageFile])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }

  const uploadImage = async () => {
    if (!imageFile) return

    setImageFileUploading(true)
    setImageFileUploadError(null)

    const storage = getStorage(app)
    const fileName = new Date().getTime() + imageFile.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImageFileUploadProgress(progress)
      },
      (error) => {
        setImageFileUploadError("Could not upload image (File must be less than 2MB)")
        setImageFileUploadProgress(null)
        setImageFile(null)
        setImageFileUrl(null)
        setImageFileUploading(false)
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        setImageFileUrl(downloadURL)
        setFormData((prev) => ({ ...prev, profilePicture: downloadURL }))
        setImageFileUploading(false)
      },
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdateUserError(null)
    setUpdateUserSuccess(null)

    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload")
      return
    }

    const updatedData = { ...formData }
    if (imageFileUrl) {
      updatedData.profilePicture = imageFileUrl
    }

    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Not authenticated.")

      const res = await fetch("/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      dispatch({ type: "LOGIN", payload: data.user })
      setUpdateUserSuccess("Profile updated successfully!")

      setTimeout(() => {
        setUpdateUserSuccess(null)
      }, 3000)
    } catch (error: any) {
      setUpdateUserError(error.message || "Failed to update profile")
    }
  }

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Not authenticated.")

      const res = await fetch("/api/auth/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      setUpdateUserSuccess("Account deleted successfully!")

      localStorage.removeItem("token")
      localStorage.removeItem("user")
      dispatch({ type: "LOGOUT" })
      router.push("/user/signin")
    } catch (error: any) {
      setUpdateUserError(error.message || "Failed to delete account")
      setShowModal(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" })
      dispatch({ type: "LOGOUT" })
      router.push("/user/signin")
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 w-full">
      <div className="bg-white dark:bg-[rgb(22,33,62)] rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-700 p-6">
          <h1 className="text-3xl font-bold text-center text-white">Profile</h1>
          <p className="text-center text-white/80">Manage your account information and preferences</p>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="flex justify-center -mt-12 relative z-10">
            <div
              className="relative w-32 h-32 cursor-pointer overflow-hidden rounded-full border-4 border-white dark:border-[rgb(22,33,62)] bg-gray-100 dark:bg-gray-700"
              onClick={() => filePickerRef.current?.click()}
            >
              <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />

              {imageFileUploadProgress && (
                <CircularProgressbar
                  value={imageFileUploadProgress || 0}
                  text={`${Math.round(imageFileUploadProgress)}%`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    },
                    path: {
                      stroke: `rgba(99, 102, 241, ${imageFileUploadProgress / 100})`,
                    },
                    text: {
                      fill: "#6366f1",
                      fontSize: "1.5rem",
                    },
                    trail: {
                      stroke: "#d1d5db",
                    },
                  }}
                />
              )}

              <img
                key={imageFileUrl || currentUser?.googlePhotoUrl}
                src={
                  imageFileUrl ||
                  currentUser?.googlePhotoUrl ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt="user"
                className={`rounded-full w-full h-full object-cover ${
                  imageFileUploadProgress && imageFileUploadProgress < 100 ? "opacity-60" : ""
                }`}
              />
            </div>
          </div>

          {imageFileUploadError && (
            <div className="px-6 mt-4">
              <div className="p-4 mb-4 text-sm text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 rounded-lg">
                {imageFileUploadError}
              </div>
            </div>
          )}

          <div className="p-6">
            {/* Custom Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
              <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                <li className="mr-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("personal")}
                    className={`inline-flex items-center p-4 rounded-t-lg ${
                      activeTab === "personal"
                        ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <HiOutlineUser className="mr-2 w-5 h-5" />
                    Personal
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("contact")}
                    className={`inline-flex items-center p-4 rounded-t-lg ${
                      activeTab === "contact"
                        ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <HiOutlineMail className="mr-2 w-5 h-5" />
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveTab("education")}
                    className={`inline-flex items-center p-4 rounded-t-lg ${
                      activeTab === "education"
                        ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <HiOutlineAcademicCap className="mr-2 w-5 h-5" />
                    Education
                  </button>
                </li>
              </ul>
            </div>

            {/* Personal Tab Content */}
            {activeTab === "personal" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                    <HiOutlineUser className="inline-block mr-2 w-5 h-5" />
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Username"
                    defaultValue={currentUser?.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                    <HiOutlineUserGroup className="inline-block mr-2 w-5 h-5" />
                    Gender
                  </label>
                  <select
                    id="gender"
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    defaultValue={currentUser?.gender || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                    <HiOutlineLocationMarker className="inline-block mr-2 w-5 h-5" />
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="City, Country"
                    defaultValue={currentUser?.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {/* Contact Tab Content */}
            {activeTab === "contact" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                    <HiOutlineMail className="inline-block mr-2 w-5 h-5" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="your.email@example.com"
                    defaultValue={currentUser?.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                    <HiOutlinePhone className="inline-block mr-2 w-5 h-5" />
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="+1 (555) 123-4567"
                    defaultValue={currentUser?.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4 md:col-span-2">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                    <HiOutlineLockClosed className="inline-block mr-2 w-5 h-5" />
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="••••••••"
                    onChange={handleChange}
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Leave blank if you don't want to change your password
                  </p>
                </div>
              </div>
            )}

            {/* Education Tab Content */}
            {activeTab === "education" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="university"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                  >
                    <HiOutlineAcademicCap className="inline-block mr-2 w-5 h-5" />
                    University
                  </label>
                  <input
                    type="text"
                    id="university"
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="University name"
                    defaultValue={currentUser?.university}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="specialization"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                  >
                    <HiOutlineBookOpen className="inline-block mr-2 w-5 h-5" />
                    Specialization
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Your field of study"
                    defaultValue={currentUser?.specialization}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {/* Success/Error Messages */}
            {(updateUserSuccess || updateUserError) && (
              <div className="mt-4">
                {updateUserSuccess && (
                  <div className="p-4 mb-4 text-sm text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    {updateUserSuccess}
                  </div>
                )}
                {updateUserError && (
                  <div className="p-4 mb-4 text-sm text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    {updateUserError}
                  </div>
                )}
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 focus:outline-none"
                >
                  Delete Account
                </button>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 focus:outline-none"
                >
                  Sign Out
                </button>
              </div>
              <button
                type="submit"
                disabled={imageFileUploading}
                className="text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 dark:from-purple-600 dark:to-blue-700 dark:hover:from-purple-700 dark:hover:to-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Profile
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Delete Account Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[rgb(22,33,62)] p-6 rounded-lg max-w-md w-full">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <HiOutlineExclamationCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-gray-100">Delete Account</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteUser}
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-600 dark:bg-red-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-600 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  Yes, delete my account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

