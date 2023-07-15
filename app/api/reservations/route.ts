import { NextResponse } from 'next/server'

import prisma from '../../libs/prismadb'
import getCurrentUser from '../../actions/getCurrentUser'

export async function POST(request: Request) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return new NextResponse(JSON.stringify({ error: 'Login to book a reservation' }), { status: 401 })
	}

	const body = await request.json()

	const { listingId, startDate, endDate, totalPrice } = body

	if (!listingId || !startDate || !endDate || !totalPrice) {
		return new NextResponse(JSON.stringify({ error: 'Invalid reservation data' }), { status: 400 })
	}

	const listingAndReservation = await prisma.listing.update({
		where: {
			id: listingId,
		},
		data: {
			reservations: {
				create: {
					userId: currentUser.id,
					startDate: startDate,
					endDate: endDate,
					totalPrice: totalPrice,
				},
			},
		},
	})

	return new NextResponse(JSON.stringify({ listingAndReservation }), { status: 200 })
}
