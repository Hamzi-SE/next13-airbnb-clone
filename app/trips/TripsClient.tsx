'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'
import { SafeReservation, SafeUser } from '../types'

interface TripsClientProps {
	reservations: SafeReservation[]
	currentUser?: SafeUser | null
}

const TripsClient: FC<TripsClientProps> = ({ reservations, currentUser }) => {
	const [deletingId, setDeletingId] = useState<string>('')

	const router = useRouter()

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id)

			axios
				.delete(`/api/reservations/${id}`)
				.then(res => {
					toast.success(res.data?.message || 'Reservation cancelled successfully')
					router.refresh()
				})
				.catch(error => {
					toast.error(error?.response?.data?.message || 'Something went wrong. Please try again.')
				})
				.finally(() => {
					setDeletingId('')
				})
		},
		[router]
	)

	return (
		<Container>
			<Heading title='Trips' subtitle="Where you've been and where you're going" />

			<div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
				{reservations.map(reservation => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={onCancel}
						disabled={deletingId === reservation.id}
						actionLabel='Cancel Reservation'
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}

export default TripsClient
