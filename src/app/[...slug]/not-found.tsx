import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
      <p className="text-B2B2B2 mb-8">
        Sorry, we couldn't find the category you're looking for.
      </p>
      <div className="space-y-4">
        <p>You might want to check out these popular categories:</p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link 
            href="/womens-saree" 
            className="px-4 py-2 bg-F7F7F7 text-B2B2B2 rounded hover:bg-000000 hover:text-white"
          >
            Women's Sarees
          </Link>
          <Link 
            href="/womens-kurta" 
            className="px-4 py-2 bg-F7F7F7 text-B2B2B2 rounded hover:bg-000000 hover:text-white"
          >
            Women's Kurtas
          </Link>
          <Link 
            href="/mens-kurta" 
            className="px-4 py-2 bg-F7F7F7 text-B2B2B2 rounded hover:bg-000000 hover:text-white"
          >
            Men's Kurtas
          </Link>
          <Link 
            href="/girls-jumpsuit" 
            className="px-4 py-2 bg-F7F7F7 text-B2B2B2 rounded hover:bg-000000 hover:text-white"
          >
            Girls' Jumpsuits
          </Link>
        </div>
        <p className="mt-8">
          <Link href="/" className="text-B2B2B2 hover:underline">
            Return to Homepage
          </Link>
        </p>
      </div>
    </div>
  );
}