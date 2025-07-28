import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

export default function CartItemContent({ item }) {
  console.log(item, "sushil");

  return (
    <div className="flex items-center space-x-4 mx-4">
      <img
        src={item?.image}
        alt={item?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-bold">{item?.title}</h3>
        <div className="flex items-center mt-1 gap-4">
          <Button className="h-8 w-8 rounded-full" variant="outline" size="icon">
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <Button className="h-8 w-8 rounded-full" variant="outline" size="icon">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
