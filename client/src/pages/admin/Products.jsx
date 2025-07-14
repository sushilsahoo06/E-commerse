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
import { addNewProduct, fetchAllProducts } from "@/store/admin/product-slice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
const initialFormData = {
  Image: '',
  title: "",
  Description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

export default function Products() {
  const [openCreateProductDialog, setopenCreateProductDialog] = useState(false);
  const [formData, setformData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageURL, setuploadImageURL] = useState("");
  const [imageLoadingState,setImageLoadingState]=useState(false);
  const dispatch=useDispatch();
  const {productList}=useSelector((state)=>state.adminProduct)

  function onSubmit(event) {
    event.preventDefault();
    dispatch(addNewProduct({
      ...formData,
      image:uploadImageURL
    })).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setopenCreateProductDialog(false)
        setImageFile(null)
        setformData(initialFormData)
        toast('Product add Successfully')
      }

    })
  }
 useEffect(()=>{
  dispatch(fetchAllProducts())
 },[dispatch])
 console.log(productList,uploadImageURL)
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
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
            />
            <div className="py-6 px-5">
              <CommonFrom
                formData={formData}
                setformData={setformData}
                fromControls={addProductFormElements}
                buttonText={"Add"}
                onSubmit={onSubmit}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
}
