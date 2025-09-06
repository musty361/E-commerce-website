import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1200, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Headphones", price: 150, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Smartwatch", price: 250, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
];

export default function Shop() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
    setAddedItems(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 1500);
  };

  const checkout = () => {
    // Convert cart to array with duplicates for API
    const cartForAPI = cart.flatMap(item => Array(item.quantity).fill(item.product));
    localStorage.setItem("cart", JSON.stringify(cartForAPI));
    window.location.href = "/payment";
  };

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <h1 className="text-3xl font-bold mb-6">Shop Products</h1>
      <div className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="p-6 bg-white shadow rounded-lg text-center">
            <img src={p.image} alt={p.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="mb-4">${p.price}</p>
            <button
              className={`px-4 py-2 text-white rounded-lg transition-all duration-300 transform ${
                addedItems.has(p.id)
                  ? 'bg-green-600 hover:bg-green-700 scale-105'
                  : 'bg-purple-600 hover:bg-purple-700 hover:scale-105'
              }`}
              onClick={() => addToCart(p)}
              disabled={addedItems.has(p.id)}
            >
              {addedItems.has(p.id) ? (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Added!
                </div>
              ) : (
                'Add to Cart'
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        {cart.map((item) => (
          <p key={item.product.id}>{item.product.name} - ${item.product.price} x {item.quantity}</p>
        ))}

        {cart.length > 0 && (
          <button
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            onClick={checkout}
          >
            Proceed to Payment
          </button>
        )}
      </div>
    </div>
  );
}
