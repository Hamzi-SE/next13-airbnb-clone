import { Metadata } from 'next'
import getCurrentUser from '../actions/getCurrentUser'
import getFavoriteListings from '../actions/getFavoriteListings'
import EmptyState from '../components/EmptyState'
import FavoritesClient from './FavoritesClient'

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Your favorites',
		description: 'Manage your favorites here.',
	}
}

const FavoriteListingPage = async () => {
	const currentUser = await getCurrentUser()
	const favoriteListings = await getFavoriteListings()

	if (favoriteListings.length === 0) {
		return (
			<EmptyState
				title='No favorites yet'
				subtitle="You don't have any favorite listings yet. Click the heart icon on a listing to add it to your favorites."
			/>
		)
	}

	return <FavoritesClient currentUser={currentUser} favoriteListings={favoriteListings} />
}

export default FavoriteListingPage
