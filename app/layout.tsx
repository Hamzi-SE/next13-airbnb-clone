import { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import getCurrentUser from './actions/getCurrentUser'
import Navbar from './components/Navbar/Navbar'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import RentModal from './components/modals/RentModal'
import './globals.css'
import ToasterProvider from './providers/ToasterProvider'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: 'Airbnb',
		template: '%s | Airbnb',
	},
	description: 'Airbnb clone built with Next.js 13 and Tailwind CSS',
	keywords: ['Airbnb', 'Next.js', 'Tailwind CSS'],
	icons: {
		icon: '/favicon.ico',
	},
	creator: 'Muhammad Hamza',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const currentUser = await getCurrentUser()
	return (
		<html lang='en'>
			<body className={font.className}>
				<ToasterProvider />
				<RentModal />
				<LoginModal />
				<RegisterModal />
				<Navbar currentUser={currentUser} />
				<div className='pb-20 pt-28'>{children}</div>
			</body>
		</html>
	)
}
