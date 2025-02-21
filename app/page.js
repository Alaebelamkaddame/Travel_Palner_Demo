import Link from 'next/link'

export default function Page() {
  return (
    <>
  <div className="text-center py-36 gap-12">
    <h1 className="font-bold text-8xl">Plan Your Trip Using AI</h1>
    <Link
      href="/Plan"
      className="mt-6 inline-block px-8 py-4 text-3xl font-bold text-white bg-teal-500 rounded-xl hover:bg-blue-800 transition-all"
    >
      Plan
    </Link>
  </div>
</>

  )
  
}