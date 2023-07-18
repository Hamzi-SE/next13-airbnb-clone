import getCurrentUser from './actions/getCurrentUser'
import getListings, { IListingsParams } from './actions/getListings'
import Container from './components/Container'
import EmptyState from './components/EmptyState'
import ListingCard from './components/listings/ListingCard'

export const dynamic = 'force-dynamic'
interface HomeProps {
	searchParams: IListingsParams
}

const Home = async ({ searchParams }: HomeProps) => {
	const listings = await getListings(searchParams)
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

export default Home
