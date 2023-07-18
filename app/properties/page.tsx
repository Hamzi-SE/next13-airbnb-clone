import EmptyState from '../components/EmptyState'

import { Metadata } from 'next'
import getCurrentUser from '../actions/getCurrentUser'
import getListings from '../actions/getListings'
import PropertiesClient from './PropertiesClient'

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Your properties',
		description: 'Manage your properties here.',
	}
}

const PropertiesPage = async ({}) => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return <EmptyState title='You are not signed in' subtitle='Sign in to view your properties' />
	}

	const listings = await getListings({
		userId: currentUser.id,
	})

	if (listings.length === 0) {
		return <EmptyState title='No properties found' subtitle='Looks like you have not created any properties yet.' />
	}

	return <PropertiesClient listings={listings} currentUser={currentUser} />
}

export default PropertiesPage
