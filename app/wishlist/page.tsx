import Link from "next/link";

export default function WishlistPage() {
  return (
    <div className="max-w-2xl mx-auto py-20 px-4 text-center">
      <div className="flex justify-center mb-6">
        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <h1 className="text-2xl font-black uppercase italic mb-4">You have no Saved Items</h1>
      <p className="text-gray-600 mb-8">Start hearting items you love to save them for later.</p>
      <Link href="/women" className="inline-block border-2 border-black px-10 py-3 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
        Continue Shopping
      </Link>
    </div>
  );
}