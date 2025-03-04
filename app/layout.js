// These styles apply to every route in the application
import './globals.css'
import Nav from './nav'
 
export const metadata = {
  title: 'Travel Planer.AI',
  description: 'Generated by create next app',
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}