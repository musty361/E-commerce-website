import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CheckoutForm from "./CheckoutForm";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function Payment() {
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    } else {
      // If no cart, redirect to shop
      router.push("/shop");
    }
  }, [router]);

  const handleSuccess = () => {
    // Clear cart on success
    localStorage.removeItem("cart");
    router.push("/success");
  };

  const handleRemoveItem = (index: number) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <CheckoutForm cart={cart} onSuccess={handleSuccess} onRemoveItem={handleRemoveItem} />
    </div>
  );
}