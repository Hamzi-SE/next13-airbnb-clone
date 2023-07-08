import { Nunito } from 'next/font/google'
import Navbar from './components/Navbar/Navbar'
import './globals.css'
import ToasterProvider from './providers/ToasterProvider'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
	title: 'Airbnb',
	description: 'Airbnb clone built with Next.js 13 and Tailwind CSS',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const currentUser = await getCurrentUser()
	return (
		<html lang='en'>
			<body className={font.className}>
				<ToasterProvider />
				<LoginModal />
				<RegisterModal />
				<Navbar currentUser={currentUser} />
				{children}
			</body>
		</html>
	)
}
