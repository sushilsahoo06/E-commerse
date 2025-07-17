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
import {
  addNewProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} from "@/store/admin/product-slice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import AdminCard from "./AdminCard";

const initialFormData = {
  Image: "",
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
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setcurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProduct);

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            // console.log(data, "Edit");
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setopenCreateProductDialog(false);
              setImageFile(null);
              setformData(initialFormData);
              toast("Product Edited Successfully");
            }
          }
        )
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadImageURL,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setopenCreateProductDialog(false);
            setImageFile(null);
            setformData(initialFormData);
            toast("Product add Successfully");
          }
        });
  }
  function handleDelete(getCurrentProductId) {
    // console.log(getCurrentProductId)
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data.payload.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  return (
    <Fragment>
      <div className="mb-5 flex w-full justify-end">
        <Button onClick={() => setopenCreateProductDialog(true)}>
          Add new product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => {
              return (
                <AdminCard
                  setformData={setformData}
                  setopenCreateProductDialog={setopenCreateProductDialog}
                  setcurrentEditedId={setcurrentEditedId}
                  product={productItem}
                  handleDelete={handleDelete}
                />
              );
            })
          : null}
      </div>

      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setopenCreateProductDialog(false);
          setcurrentEditedId(null);
          setformData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadImageURL={uploadImageURL}
            setuploadImageURL={setuploadImageURL}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6 px-5">
            <CommonFrom
              formData={formData}
              setformData={setformData}
              fromControls={addProductFormElements}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}
