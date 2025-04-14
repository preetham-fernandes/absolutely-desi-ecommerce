import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
      <p className="text-gray-600 mb-8">
        Sorry, we couldn't find the product you're looking for.
      </p>
      <div className="space-y-4">
        <p>You might want to check out these popular categories:</p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link 
            href="/categories/womens-saree" 
            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
          >
            Women's Sarees
          </Link>
          <Link 
            href="/categories/womens-kurta" 
            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
          >
            Women's Kurtas
          </Link>
          <Link 
            href="/categories/mens-kurta" 
            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
          >
            Men's Kurtas
          </Link>
          <Link 
            href="/categories/girls-jumpsuit" 
            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
          >
            Girls' Jumpsuits
          </Link>
        </div>
        <p className="mt-8">
          <Link href="/" className="text-indigo-600 hover:underline">
            Return to Homepage
          </Link>
        </p>
      </div>
    </div>
  );
}