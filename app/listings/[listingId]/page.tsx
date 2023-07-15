import getCurrentUser from '../../actions/getCurrentUser'
import getListingById from '../../actions/getListingById'
import getReservations from '../../actions/getReservations'
import EmptyState from '../../components/EmptyState'
import ListingClient from './ListingClient'

interface IParams {
	listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
	const listing = await getListingById(params)
	const currentUser = await getCurrentUser()
	const reservations = await getReservations(params)

	if (!listing) {
		return (
			<EmptyState
				title='Listing not found'
				subtitle='The listing you are looking for does not exist or has been removed.'
				showReset
				resetLabel='Go back to home'
			/>
		)
	}

	return <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />
}

export default ListingPage
