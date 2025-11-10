import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  weight: ['300', '400', '600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

const playfair = Playfair_Display({
  weight: ['700', '900'],
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Happy Birthday Mitzi! 🎉',
  description: 'A special birthday celebration for Mitzi R Oliva',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}

