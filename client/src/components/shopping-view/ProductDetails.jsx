import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addNewCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";

export default function ProductDetails({ open, setOpen, productdetails }) {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  function handleAddToCart(getcurrentProductId) {
    console.log(getcurrentProductId);
    dispatch(
      addNewCart({
        userId: user?.id,
        productId: getcurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast("Product is added to cart");
      }
    });
  }
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
              <p className="text-2xl font-bold text-primary">
                ${productdetails?.salePrice}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
            </div>
            <span>(4.5)</span>
          </div>
          <div className="mt-5 mb-5">
            <Button
              className="w-full"
              onClick={()=>handleAddToCart(productdetails?._id)}
            >
              Add to Cart
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-3xl font-bold mt-4">Reviews</h2>
            <div className="grid gap-6 mt-4">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Sushil Sahoo</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muated-foreground">
                    This is awsome product
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <Input placeholder="Write a review..." />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
