import EmptyState from '../components/EmptyState'

import { Metadata } from 'next'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'
import ReservationsClient from './ReservationsClient'

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Your reservations',
		description: 'Manage your reservations here.',
	}
}

const ReservationsPage = async () => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return <EmptyState title='You are not logged in' subtitle='Please log in to view your reservations' />
	}

	const reservations = await getReservations({ authorId: currentUser.id }) // reservations other users have made on the current user listings

	if (reservations.length === 0) {
		return (
			<EmptyState title='No reservations found' subtitle='Looks like you have no reservations on your properties yet' />
		)
	}

	return <ReservationsClient reservations={reservations} currentUser={currentUser} />
}

export default ReservationsPage
