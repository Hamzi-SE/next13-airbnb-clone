import EmptyState from '../components/EmptyState'

import { Metadata } from 'next'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'
import TripsClient from './TripsClient'

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Your trips',
		description: 'Manage your trips here.',
	}
}

const TripsPage = async ({}) => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return <EmptyState title='You are not signed in' subtitle='Sign in to view your trips' />
	}

	const reservations = await getReservations({
		userId: currentUser.id,
	})

	if (reservations.length === 0) {
		return <EmptyState title='You have no trips scheduled' subtitle='Try searching for a place to stay!' />
	}

	return <TripsClient reservations={reservations} currentUser={currentUser} />
}

export default TripsPage
