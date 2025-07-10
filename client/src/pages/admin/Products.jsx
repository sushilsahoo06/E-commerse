import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { Fragment, useState } from "react";

export default function Products() {
  const [openCreateProductDialog, setopenCreateProductDialog] = useState(false);
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
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
}
