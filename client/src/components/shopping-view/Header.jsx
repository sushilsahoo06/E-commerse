import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";

export default function Header() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  function menuItems() {
    return (
      <nav className="flex flex-col gap-6 mb-3 mt-4 ml-4 
                    lg:mt-0 lg:ml-0 lg:mb-0 lg:items-center lg:flex-row">
        {shoppingViewHeaderMenuItems.map((items) => (
          <Link key={items.id} to={items.path} className="text-sm font-medium">
            {items.label}
          </Link>
        ))}
      </nav>
    );
  }
  return (
    <header className="sticky top-0 w-full border-b bg-background z-40">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <FontAwesomeIcon icon={faHouseUser} className="h-7 w-7" />
          <span className="font-bold">Ecommerse</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden" variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            {menuItems()}
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">{menuItems()}</div>
        {isAuthenticated ? <div></div> : null}
      </div>
    </header>
  );
}
