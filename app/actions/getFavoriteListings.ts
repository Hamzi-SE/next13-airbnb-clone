import prisma from '../libs/prismadb'

import getCurrentUser from './getCurrentUser'

export default async function getFavoriteListings() {
	try {
		const currentUser = await getCurrentUser()

		if (!currentUser) {
			return []
		}

		const favoriteListings = await prisma.listing.findMany({
			where: {
				id: {
					in: [...(currentUser.favoriteIds || [])],
				},
			},
		})

		const safeFavoriteListings = favoriteListings.map(favorite => ({
			...favorite,
			createdAt: favorite.createdAt.toISOString(),
		}))

		return safeFavoriteListings
	} catch (error: any) {
		throw new Error(error)
	}
}
