import { NextResponse } from 'next/server'

import getCurrentUser from '../../../actions/getCurrentUser'
import prisma from '../../../libs/prismadb'

interface IParams {
	reservationId?: string
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return new NextResponse(JSON.stringify({ error: 'Login to cancel the trip' }), { status: 401 })
	}

	const { reservationId } = params

	if (!reservationId || typeof reservationId !== 'string') {
		return new NextResponse(JSON.stringify({ error: 'Invalid reservation ID' }), { status: 400 })
	}

	try {
		const reservation = await prisma.reservation.deleteMany({
			where: {
				id: reservationId,
				OR: [
					{
						userId: currentUser.id, // the user who made the reservation can cancel it
					},
					{
						listing: {
							userId: currentUser.id, // the user who owns the listing can cancel it
						},
					},
				],
			},
		})
	} catch (error: any) {
		return new NextResponse(JSON.stringify({ error: 'Failed to cancel reservation. Try again in a moment.' }), {
			status: 500,
		})
	}

	return new NextResponse(JSON.stringify({ message: 'Reservation cancelled successfully!' }), { status: 200 })
}
