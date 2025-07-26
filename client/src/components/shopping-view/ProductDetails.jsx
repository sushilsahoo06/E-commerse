import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";


export default function ProductDetails({ open, setOpen, productdetails }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        {/* Image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productdetails?.image}
            alt={productdetails?.title}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productdetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productdetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productdetails?.salePrice ? "line-through" : ""
              }`}
            >
              ${productdetails?.price}
            </p>
            {productdetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-primary">${productdetails?.salePrice}</p>
            ) : (
              ""
            )}
          </div>
          <div className="mt-5 mb-5">
            <Button className='w-full'>Add to Cart</Button>
          </div>
          <Separator/>
        </div>
      </DialogContent>
    </Dialog>
  );
}
