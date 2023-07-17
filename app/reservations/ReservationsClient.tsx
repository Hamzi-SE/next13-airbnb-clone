'use client'

import { FC, useCallback, useState } from 'react'
import { SafeReservation, SafeUser } from '../types'
import Container from '../components/Container'
import Heading from '../components/Heading'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import ListingCard from '../components/listings/ListingCard'

interface ReservationsClientProps {
	reservations: SafeReservation[]
	currentUser?: SafeUser | null
}

const ReservationsClient: FC<ReservationsClientProps> = ({ reservations, currentUser }) => {
	const [deletingId, setDeletingId] = useState<string>('') // id of the reservation the user is deleting

	const router = useRouter()

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id)

			axios
				.delete(`/api/reservations/${id}`)
				.then(res => {
					toast.success(res.data?.message || 'Reservation cancelled successfully!')
					router.refresh()
				})
				.catch(err => {
					toast.error(err.response?.data?.error || 'Something went wrong. Please try again later.')
				})
				.finally(() => {
					setDeletingId('')
				})
		},
		[router]
	)

	return (
		<Container>
			<Heading title='Reservations' subtitle='Bookings on your properties' />

			<div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
				{reservations.map(reservation => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={onCancel}
						disabled={deletingId === reservation.id}
						actionLabel='Cancel guest reservation'
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}

export default ReservationsClient
