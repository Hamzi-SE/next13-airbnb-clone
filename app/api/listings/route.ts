import { NextResponse } from 'next/server'

import prisma from '../../libs/prismadb'
import getCurrentUser from '../../actions/getCurrentUser'

export async function POST(request: Request) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return new NextResponse(JSON.stringify({ error: 'You must be logged in to create a listing!' }), { status: 401 })
	}

	const body = await request.json()

	const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price } = body

	if (
		!title ||
		!description ||
		!imageSrc ||
		!category ||
		!roomCount ||
		!bathroomCount ||
		!guestCount ||
		!location ||
		!price
	) {
		return new NextResponse(JSON.stringify({ error: 'Please fill in all fields!' }), { status: 400 })
	}

	try {
		await prisma.listing.create({
			data: {
				title,
				description,
				imageSrc,
				category,
				roomCount,
				bathroomCount,
				guestCount,
				locationValue: location.value,
				price: parseInt(price, 10),
				userId: currentUser.id,
			},
		})
	} catch (error) {
		return new NextResponse(JSON.stringify({ error: 'Something went wrong' }), { status: 500 })
	}

	return new NextResponse(JSON.stringify({ message: 'Your listing has been created successfully!' }), { status: 200 })
}
