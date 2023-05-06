import { Nunito } from 'next/font/google'
import Navbar from './components/Navbar/Navbar'
import './globals.css'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
	title: 'Airbnb',
	description: 'Airbnb clone built with Next.js 13 and Tailwind CSS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={font.className}>
				<Navbar />
				{children}
			</body>
		</html>
	)
}
