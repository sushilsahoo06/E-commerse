import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UploadCloudIcon } from "lucide-react";

export default function ImageUpload({
  imageFile,
  setImageFile,
  uploadImageURL,
  setuploadImageURL,
}) {
  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];

    if (selectedFile) setImageFile(setImageFile);
  }

  const inputRef = useRef();
  return (
    <div className="w-full max-w-md px-2 ">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div className="border-2 border-dashed mx-auto mt-2  h-40 ">
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center cursor-pointer h-32"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground" />
            <span>Drag & Drop or Click to upload Image</span>
          </Label>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
