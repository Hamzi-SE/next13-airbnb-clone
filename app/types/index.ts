import { Listing, Reservation, User } from '@prisma/client'

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
	createdAt: string
	updatedAt: string
	emailVerified: string | null
}

export type SafeListing = Omit<Listing, 'createdAt'> & {
	createdAt: string
}

export type SafeReservation = Omit<Reservation, 'createdAt' | 'startDate' | 'endDate' | 'listing'> & {
	createdAt: string
	startDate: string
	endDate: string
	listing: SafeListing
}

// Omit is a utility type that allows you to omit certain properties from a type.
// In this case, we are omitting the createdAt, updatedAt, and emailVerified properties from the User type. We then add them back in as strings.
// This is because Prisma returns these properties as Date objects, but we want to return them as strings.
