import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function ImageUpload({
  imageFile,
  setImageFile,
  uploadImageURL,
  setuploadImageURL,
}) {
  
  return (
    <div className="w-full max-w-md px-2 flex">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div>
        <Input id="image-upload" type="file" className="hidden" />
      </div>
    </div>
  );
}
