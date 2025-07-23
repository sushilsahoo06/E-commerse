import { filterOptions } from "@/config";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { Fragment } from "react";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

export default function Filter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-6 space-y-4">
        {Object.keys(filterOptions).map((keyItems) => (
          <Fragment>
            <div>
              <h3 className="text-base font-bold">{keyItems}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItems].map((options) => (
                  <Label className="flex items-center gap-2 font-medium">
                    <Checkbox
                      className="opacity-100 border border-gray-500"
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItems] &&
                        filters[keyItems].indexOf(options.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItems, options.id)}
                    />
                    {options.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator className="opacity-90 bg-gray-700" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
