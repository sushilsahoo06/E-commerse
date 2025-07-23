import Filter from "@/components/shopping-view/Filter";
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
import { fetchAllFilteredProducts } from "@/store/shop/product-slice";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ShoppingListing() {
  const dispatch = useDispatch();
  const { ProductList } = useSelector((state) => state.shopProduct);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);

  function handleSort(value) {
    console.log(value);
    setSort(value);
  }
  function handleFilter(getSetionId,getCurrentOptions){
    // console.log(getCurrentOptions,getSetionId)
    let copyFilters={...filters};
    const indexOfCurrentsections=Object.keys(copyFilters).indexOf(getSetionId)

    if(indexOfCurrentsections === -1){
      copyFilters={
        ...copyFilters,
        [getSetionId]:[getCurrentOptions]
      }
      console.log(copyFilters);
      
    }
    else{
      const indexOfCurrentOptions=copyFilters[getSetionId].indexOf(getCurrentOptions)
      if(indexOfCurrentOptions===-1) copyFilters[getSetionId].push(getCurrentOptions)
        else copyFilters[getSetionId].splice(indexOfCurrentOptions,1)
    }
    setFilters(copyFilters);
    sessionStorage.setItem('filters',JSON.stringify(copyFilters))
  }
  useEffect(()=>{
    setSort('price-lowtohigh')
    setFilters(JSON.parse(sessionStorage.getItem('filters'))|| {})
  },[])
  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);
  console.log(filters,'filters');
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
      <Filter filters={filters} handleFilter={handleFilter}/>
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
              <DropdownMenuContent align="end" className="w-[200px]">
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
                return <ShoppinCard product={productItem} />;
              })
            : null}
        </div>
      </div>
    </div>
  );
}
