"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Label,
  TextInput,
  FileInput,
  ToggleSwitch,
  Card,
  Alert,
} from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  data?: {
    companyEmail?: string;
  };
}

const CompleteDetails: React.FC<Props> = ({ data }) => {
  const [whitelabel, setWhitelabel] = useState<boolean>(false);
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(null);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [publishError, setPublishError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/saveDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      console.log("Agency information saved");
      router.push("/agency-dashboard");
    } catch (error) {
      setPublishError("Failed to save details. Try again.");
    }
  };

  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      setFormData((prevData) => ({ ...prevData, image: data.url }));
      setImageUploadError(null);
    } catch (error) {
      setImageUploadError("Image upload failed");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Complete Details</h1>
      <Card className="max-w-3xl w-full p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />
            <Button type="button" gradientDuoTone="purpleToBlue" size="sm" outline onClick={handleUploadImage}>
              {imageUploadProgress !== null ? (
                <div className="w-16 h-16">
                  <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                </div>
              ) : (
                "Upload Image"
              )}
            </Button>
          </div>
          {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
          {formData.image && <img src={formData.image} alt="upload" className="w-full h-72 object-cover" />}
          
          <Label htmlFor="agencyName" value="Name" />
          <TextInput id="agencyName" placeholder="Your agency name" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

          <Label htmlFor="agencyEmail" value="Email" />
          <TextInput id="agencyEmail" type="email" value={data?.companyEmail || ""} disabled />

          <Label htmlFor="phoneNumber" value="Phone Number" />
          <TextInput id="phoneNumber" type="tel" placeholder="Phone" required onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

          <ToggleSwitch checked={whitelabel} onChange={setWhitelabel} label="Whitelabel" />

          <ReactQuill theme="snow" placeholder="Write something..." className="h-72 !mb-16" required onChange={(value) => setFormData({ ...formData, content: value })} />

          <Button type="submit" gradientDuoTone="purpleToPink" className="w-full mt-4">
            Save The Account Information
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CompleteDetails;
