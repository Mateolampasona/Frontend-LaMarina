import React from "react";
import ShoppingCart from "@/Components/Cart";
import { UserProvider } from "@/Context/userContext";

const Cart = () => {
  return (
    <div>
    <UserProvider>
      <ShoppingCart />
    </UserProvider>
    </div>
  );
};

export default Cart;
