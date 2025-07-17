import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { LogOut, Menu, ShoppingCart, UserRoundPen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { logOutUser } from "@/store/auth-slice";

export default function Header() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logout() {
    dispatch(logOutUser());
  }

  function HeaderRightContent() {
    const { user } = useSelector((state) => state.auth);
    return (
      <div className="flex lg:items-center lg:flex-row flex-row gap-4">
        <Button variant="outline" size="icon">
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">User Cart</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarFallback className="h-8 w-8 bg-black text-white">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => navigate("/shop/account")}>
              <UserRoundPen /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              <LogOut /> Log out{" "}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
  function menuItems() {
    return (
      <nav
        className="flex flex-col gap-6 mb-3 mt-4 ml-4 
                    lg:mt-0 lg:ml-0 lg:mb-0 lg:items-center lg:flex-row"
      >
        {shoppingViewHeaderMenuItems.map((items) => (
          <Link key={items.id} to={items.path} className="text-sm font-medium">
            {items.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <header className="sticky top-0 w-full border-b bg-background z-40 ">
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
            <HeaderRightContent/>
            {menuItems()}
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">{menuItems()}</div>
        {isAuthenticated ? (
          <div className="hidden lg:block">{HeaderRightContent()}</div>
        ) : null}
      </div>
    </header>
  );
}
