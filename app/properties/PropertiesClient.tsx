'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'
import { SafeListing, SafeReservation, SafeUser } from '../types'

interface PropertiesClientProps {
	listings: SafeListing[]
	currentUser?: SafeUser | null
}

const PropertiesClient: FC<PropertiesClientProps> = ({ listings, currentUser }) => {
	const [deletingId, setDeletingId] = useState<string>('')

	const router = useRouter()

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id)

			axios
				.delete(`/api/listings/${id}`)
				.then(res => {
					toast.success(res.data?.message || 'Listing deleted successfully')
					router.refresh()
				})
				.catch(error => {
					toast.error(error?.response?.data?.error || 'Something went wrong. Please try again.')
				})
				.finally(() => {
					setDeletingId('')
				})
		},
		[router]
	)

	return (
		<Container>
			<Heading title='Your Properties' subtitle='Here are the properties you have listed.' />

			<div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
				{listings.map(listing => (
					<ListingCard
						key={listing.id}
						data={listing}
						actionId={listing.id}
						onAction={onCancel}
						disabled={deletingId === listing.id}
						actionLabel='Delete Property'
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}

export default PropertiesClient
