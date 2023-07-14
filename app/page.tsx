import getCurrentUser from './actions/getCurrentUser'
import getListings from './actions/getListings'
import Container from './components/Container'
import EmptyState from './components/EmptyState'
import ListingCard from './components/listings/ListingCard'

export default async function Home() {
	const listings = await getListings()
	const currentUser = await getCurrentUser()

	if (listings.length === 0) {
		return <EmptyState showReset />
	}

	return (
		<Container>
			<div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
				{listings.map(listing => (
					<ListingCard key={listing.id} data={listing} currentUser={currentUser} />
				))}
			</div>
		</Container>
	)
}
