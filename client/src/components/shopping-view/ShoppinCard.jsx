import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function ShoppinCard({ product }) {
  console.log(product, "product card");
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] rounded-t-lg object-cover"
          />
        </div>
        {product?.salePrice > 0 ? <Badge>Sale</Badge> : null}
      </div>

      <CardContent className="p-4">
        <h2 className="font-bold text-xl mb-2">{product?.title}</h2>
        <div>
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            } text-lg font-semibold text-primary`}
          >
            {product?.price}
          </span>
          {product?.salePrice > 0 ? (
            <span className="text-lg font-semibold text-primary">
              {product?.brand}
            </span>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <Button>Add to cart</Button>
      </CardFooter>
    </Card>
  );
}
