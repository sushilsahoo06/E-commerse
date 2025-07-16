import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

export default function ImageUpload({
  imageFile,
  setImageFile,
  uploadImageURL,
  setuploadImageURL,
  setImageLoadingState,
  imageLoadingState,
  isEditMode,
}) {
  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];

    if (selectedFile) setImageFile(selectedFile);
  }
  function handleDragOver(event) {
    event.preventDefault();
  }
  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0]; //

    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );

    // console.log(response.data.result.url, "response");
    // console.log(response.data?.success, "response");

    if (response.data?.success) {
      setuploadImageURL(response.data.result.url);
      setImageLoadingState(false);
    } //back to the respone to the backend
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);
  const inputRef = useRef();
  return (
    <div className="w-full max-w-md px-2 ">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        className={`${
          isEditMode ? "opacity-60 " : ""
        }border-2 border-dashed mx-auto mt-2 h-40`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            }flex flex-col items-center justify-center cursor-pointer h-32`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground" />
            <span>Drag & Drop or Click to upload Image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="w-full h-20 rounded-md bg-gray-100" />
        ) : (
          //if file has already upoload
          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
