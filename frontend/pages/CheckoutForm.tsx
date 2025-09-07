import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

interface CheckoutFormProps {
  cart: Product[];
  onSuccess: () => void;
  onRemoveItem?: (index: number) => void;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutFormInner({ cart, onSuccess, onRemoveItem }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart }),
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    };
    createPaymentIntent();
  }, [cart]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
        clientSecret,
      });

      if (submitError) {
        setError(submitError.message || "An error occurred");
      } else {
        onSuccess();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-200">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Secure Checkout</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Cart Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Order Summary</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                View Details
              </button>
            </div>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {cart.slice(0, 2).map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">Qty: 1</p>
                  </div>
                  <p className="font-bold text-gray-800">${item.price}</p>
                  {onRemoveItem && (
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="text-red-500 hover:text-red-700 text-xl"
                      title="Remove item"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              {cart.length > 2 && (
                <p className="text-center text-gray-500 text-sm">+{cart.length - 2} more items</p>
              )}
            </div>
            <div className="border-t-2 pt-6 mt-6 border-gray-300">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-gray-700">Total:</span>
                <span className="text-green-600 text-2xl">${total}</span>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Payment Details</h3>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3 text-gray-700">Card Information</label>
              <div className="p-4 border-2 border-gray-300 rounded-lg bg-gray-50 focus-within:border-purple-500 transition-colors">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg border-l-4 border-red-500 animate-pulse">
                <p className="font-medium">Error:</p>
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!stripe || loading || !clientSecret}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg disabled:opacity-50 hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `Complete Payment - $${total}`
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Cart Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-96 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Cart Details</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">Qty: 1</p>
                  </div>
                  <p className="font-semibold text-gray-800">${item.price}</p>
                  {onRemoveItem && (
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="text-red-500 hover:text-red-700 text-xl"
                      title="Remove item"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-green-600">${total}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckoutForm({ cart, onSuccess, onRemoveItem }: CheckoutFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormInner cart={cart} onSuccess={onSuccess} onRemoveItem={onRemoveItem} />
    </Elements>
  );
}