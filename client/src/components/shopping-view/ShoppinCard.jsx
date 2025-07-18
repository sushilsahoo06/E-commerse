import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

export default function ShoppinCard({ product }) {
 
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] rounded-t-lg object-cover"
          />
          {product?.salePrice > 0 ? <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600 '>Sale</Badge> : null}
        </div>
        
        
      </div>

      <CardContent className="p-4">
        <h2 className=" font-bold text-xl mb-2">{product?.title}</h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[16px] text-muted-foreground">
            {categoryOptionsMap[product?.category]}
          </span>
          <span className="text-[16px] text-muted-foreground">
            {brandOptionsMap[product?.brand]}
          </span>


        </div>
        <div className="flex justify-between items-center mb-2"> 

          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            } text-lg font-semibold text-primary`}
          >
            ${product?.price}
          </span>
          {product?.salePrice > 0 ? (
            <span className="text-lg font-semibold text-primary">
              ${product?.salePrice}
            </span>
          ) : null}
        </div>
      </CardContent>
      <CardFooter >
        <Button className='w-full'>Add to cart</Button>
      </CardFooter>
    </Card>
  );
}
