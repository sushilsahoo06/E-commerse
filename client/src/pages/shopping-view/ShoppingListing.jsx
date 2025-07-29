import Filter from "@/components/shopping-view/Filter";
import ProductDetails from "@/components/shopping-view/ProductDetails";
import ShoppinCard from "@/components/shopping-view/ShoppinCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { addNewCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/product-slice";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function ShoppingListing() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { ProductList, productDetails } = useSelector(
    (state) => state.shopProduct
  );

  
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDialog, setOpenDialog] = useState(false);

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
        toast('Product is added to cart')
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function createSearchParamsHelper(filterParms) {
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParms)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramsValue = value.join(",");
        queryParams.push(`${key}=${encodeURIComponent(paramsValue)}`);
      }
    }
    console.log(queryParams);
    return queryParams.join("&");
  }

  function handleSort(value) {
    console.log(value);
    setSort(value);
  }
  // function handleFilter(getSetionId,getCurrentOptions){
  //   // console.log(getCurrentOptions,getSetionId)
  //   let copyFilters={...filters};
  //   const indexOfCurrentsections=Object.keys(copyFilters).indexOf(getSetionId)

  //   if(indexOfCurrentsections === -1){
  //     copyFilters={
  //       ...copyFilters,
  //       [getSetionId]:[getCurrentOptions]
  //     }
  //     console.log(copyFilters);

  //   }
  //   else{
  //     const indexOfCurrentOptions=copyFilters[getSetionId].indexOf(getCurrentOptions)
  //     if(indexOfCurrentOptions===-1) copyFilters[getSetionId].push(getCurrentOptions)
  //       else copyFilters[getSetionId].splice(indexOfCurrentOptions,1)
  //   }
  //   setFilters(copyFilters);
  //   sessionStorage.setItem('filters',JSON.stringify(copyFilters))
  // }

  function handleFilter(getSectionId, getCurrentOpctions) {
    console.log(getSectionId, getCurrentOpctions);

    let copyFilters = { ...filters };
    // Check if the current section exists in the filters
    const sectionsKeys = Object.keys(copyFilters);
    const sectionExists = sectionsKeys.includes(getSectionId); //exist on array
    // If section doesn't exist, add it with the current option
    if (!sectionExists) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOpctions],
      };
    } else {
      const currentOptions =
        copyFilters[getSectionId].indexOf(getCurrentOpctions);
      if (currentOptions === -1)
        copyFilters[getSectionId].push(getCurrentOpctions);
      else copyFilters[getSectionId].splice(currentOptions, 1);
    }
    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
    console.log(copyFilters);
    console.log(searchParams, "parms");
  }
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);
  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);
  console.log(productDetails);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQuerryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQuerryString));
    }
  }, [filters]);
  useEffect(() => {
    if (productDetails !== null) setOpenDialog(true);
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
      <Filter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm ">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {ProductList.length} products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown />
                  <span>Short by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {ProductList && ProductList.length > 0
            ? ProductList.map((productItem) => {
                return (
                  <ShoppinCard
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={handleAddToCart}
                  />
                );
              })
            : null}
        </div>
      </div>
      <ProductDetails
        open={openDialog}
        setOpen={setOpenDialog}
        productdetails={productDetails}
      />
    </div>
  );
}
