import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="h-screen bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center flex items-center justify-center text-center text-white">
      <div className="backdrop-blur-lg bg-black/50 p-8 rounded-lg">
        <h1 className="text-5xl font-extrabold mb-6">Welcome to ShopFlow 🛒</h1>
        <p className="text-xl mb-6">Your modern online store with secure payments</p>
        <Link href="/shop">
          <button className="px-6 py-3 bg-white text-purple-600 font-bold rounded-lg shadow-lg hover:scale-105 transition">
            Start Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
