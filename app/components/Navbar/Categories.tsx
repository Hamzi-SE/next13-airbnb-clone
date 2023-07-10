'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { BsSnow } from 'react-icons/bs'
import { FaSkiing } from 'react-icons/fa'
import {
	GiBarn,
	GiBoatFishing,
	GiCactus,
	GiCastle,
	GiCaveEntrance,
	GiForestCamp,
	GiIsland,
	GiWindmill,
} from 'react-icons/gi'
import { IoDiamond } from 'react-icons/io5'
import { MdOutlineVilla } from 'react-icons/md'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import CategoryBox from '../CategoryBox'
import Container from '../Container'

export const categories = [
	{
		label: 'Beach',
		icon: TbBeach,
		description: 'This property is located near the beach',
	},
	{
		label: 'Windmills',
		icon: GiWindmill,
		description: 'This property has windmills',
	},
	{
		label: 'Modern',
		icon: MdOutlineVilla,
		description: 'This property is modern',
	},
	{
		label: 'Country Side',
		icon: TbMountain,
		description: 'This property is located in the country side',
	},
	{
		label: 'Pools',
		icon: TbPool,
		description: 'This property has a pool',
	},
	{
		label: 'Islands',
		icon: GiIsland,
		description: 'This property is located on an island',
	},
	{
		label: 'Lake',
		icon: GiBoatFishing,
		description: 'This property is located near a lake',
	},
	{
		label: 'Skiing',
		icon: FaSkiing,
		description: 'This property has skiing activities',
	},
	{
		label: 'Castles',
		icon: GiCastle,
		description: 'This property is in a castle',
	},
	{
		label: 'Camping',
		icon: GiForestCamp,
		description: 'This property has camping activities',
	},
	{
		label: 'Arctic',
		icon: BsSnow,
		description: 'This property is located in the snow',
	},
	{
		label: 'Cave',
		icon: GiCaveEntrance,
		description: 'This property is located in a cave',
	},
	{
		label: 'Desert',
		icon: GiCactus,
		description: 'This property is located in the desert',
	},
	{
		label: 'Barns',
		icon: GiBarn,
		description: 'This property is located in a barn',
	},
	{
		label: 'Lux',
		icon: IoDiamond,
		description: 'This property is luxurious',
	},
]

const Categories = () => {
	const params = useSearchParams()

	const selectedCategory = params?.get('category')

	const pathname = usePathname()

	const isMainPage = pathname === '/'

	if (!isMainPage) {
		return null
	}

	return (
		<Container>
			<div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
				{categories.map(category => (
					<CategoryBox key={`category-` + category.label} {...category} selected={selectedCategory === category.label} />
				))}
			</div>
		</Container>
	)
}

export default Categories
