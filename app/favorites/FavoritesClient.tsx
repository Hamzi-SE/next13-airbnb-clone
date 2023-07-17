'use client'

import { FC } from 'react'
import { SafeListing, SafeUser } from '../types'
import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'

interface FavoritesClientProps {
	currentUser?: SafeUser | null
	favoriteListings: SafeListing[]
}

const FavoritesClient: FC<FavoritesClientProps> = ({ currentUser, favoriteListings }) => {
	return (
		<Container>
			<Heading
				title='Your Favorites'
				subtitle={`List of places you have favorited. You have ${favoriteListings.length} favorite ${
					favoriteListings.length === 1 ? 'listing' : 'listings'
				}!`}
			/>

			<div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
				{favoriteListings.map(listing => (
					<ListingCard key={listing.id} currentUser={currentUser} data={listing} />
				))}
			</div>
		</Container>
	)
}

export default FavoritesClient
