import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import CartItemContent from "./CartItemContent";

export default function CartWarpper({ cartList }) {
  const totalcartAmount =
    cartList && cartList.length > 0
      ? cartList.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem.price) *
              currentItem?.quantity,
          0
        )
      : null;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4 overflow-auto">
        {cartList && cartList.length > 0
          ? cartList.map((item) => <CartItemContent item={item} />)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between mx-4">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalcartAmount}</span>
        </div>
      </div>
      <div className="mx-4">
        <Button className="w-full mt-5 mb-2">Checkout</Button>
      </div>
    </SheetContent>
  );
}
