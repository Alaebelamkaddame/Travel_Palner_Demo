import Link from 'next/link';

export default function Nav() {
    return (
        <nav className='flex items-center justify-between flex-wrap p-10'>
            <h1 className='font-bold text-4xl'>TravelS</h1>
            <ul className='flex gap-10 font-bold'>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/Plan">Plan</Link></li>
            </ul>
        </nav>
    );
}
