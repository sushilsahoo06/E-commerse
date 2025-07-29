import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItems,
  updateCartItems,
} from "@/store/shop/cart-slice";
import { toast } from "sonner";

export default function CartItemContent({ item }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  function handleCartItems(getCartItems, typeOfAction) {
    const newQuantity =
      typeOfAction === "add"
        ? getCartItems?.quantity + 1
        : getCartItems?.quantity - 1;
    if (newQuantity < 1) return;
    dispatch(
      updateCartItems({
        userId: user?.id,
        productId: item?.productId,
        quantity: newQuantity,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast('Cart is updated succesfully');
      }
    });
  }
  function handleCartItemdelete(deleteCart) {
    dispatch(
      deleteCartItems({ userId: user?.id, productId: deleteCart?.productId })
    ).then((data)=>{
      if(data?.payload?.success){
        toast("Cart item is Delete succesfully!")
      }
    })
  }

  return (
    <div className="flex items-center space-x-4 mx-4 overflow-auto">
      <img
        src={item?.image}
        alt={item?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-bold">{item?.title}</h3>
        <div className="flex items-center mt-1 gap-4">
          <Button
            className="h-8 w-8 rounded-full"
            variant="outline"
            size="icon"
            onClick={() => handleCartItems(item, "minus")}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="semi-bold">{item.quantity}</span>
          <Button
            className="h-8 w-8 rounded-full"
            variant="outline"
            size="icon"
            onClick={() => handleCartItems(item, "add")}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
        <div className="flex flex-col items-end">
          <p className="semi-bold">
            $
            {(
              (item?.salePrice > 0 ? item?.salePrice : item?.price) *
              item?.quantity
            ).toFixed(2)}
          </p>
          <Trash
            className="cursor-pointer mt-1"
            size={20}
            onClick={() => handleCartItemdelete(item)}
          />
        </div>
      </div>
    </div>
  );
}
