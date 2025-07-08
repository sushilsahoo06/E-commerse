import { ChartNoAxesCombined } from "lucide-react";
import React, { Fragment } from "react";

export default function Sidebar() {
  return (
    <Fragment>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div className="flex items-center gap-2 cursor-pointer">
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold">Admin pannel</h1>
        </div>
      </aside>
    </Fragment>
  );
}
