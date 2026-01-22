import Link from "next/link";

export default function CartPage() {
  return (
    <div className="max-w-2xl mx-auto py-20 px-4 text-center">
      <h1 className="text-2xl font-black uppercase italic mb-4">Your bag is empty</h1>
      <p className="text-gray-600 mb-8">Items remain in your bag for 60 minutes, and then they’re moved to your Saved Items.</p>
      <Link href="/women" className="inline-block bg-[#018849] text-white px-10 py-3 font-bold uppercase tracking-widest hover:bg-[#016a3a] transition-colors">
        Shop Women's
      </Link>
    </div>
  );
}