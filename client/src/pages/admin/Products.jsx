import ImageUpload from "@/components/admin-view/ImageUpload";
import CommonFrom from "@/components/common/CommonFrom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import React, { Fragment, useState } from "react";
const initialFormDat = {
  Image: null,
  title: " ",
  Description: " ",
  category: " ",
  brand: " ",
  price: " ",
  salePrice: " ",
  totalStock: " ",
};

export default function Products() {
  const [openCreateProductDialog, setopenCreateProductDialog] = useState(false);
  const [formData, setformData] = useState(initialFormDat);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageURL, setuploadImageURL] = useState("");

  function onSubmit() {}
  return (
    <Fragment>
      <div className="mb-5 flex w-full justify-end">
        <Button onClick={() => setopenCreateProductDialog(true)}>
          Add new product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Sheet
          open={openCreateProductDialog}
          onOpenChange={() => {
            setopenCreateProductDialog(false);
          }}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <ImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadImageURL={uploadImageURL}
              setuploadImageURL={setuploadImageURL}
            />
            <div className="py-6 px-5">
              <CommonFrom
                formData={formData}
                setformData={setformData}
                fromControls={addProductFormElements}
                buttonText={"Add"}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
}
