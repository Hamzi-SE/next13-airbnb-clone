import prisma from '../libs/prismadb'

export default async function getListings() {
	try {
		const listings = await prisma.listing.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			// include: {
			//     user: true
			// }
		})

		return listings
	} catch (error: any) {
		throw new Error(error?.message || 'Error getting listings')
	}
}
