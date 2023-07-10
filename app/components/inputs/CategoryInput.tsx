'use client'

import { FC } from 'react'
import { IconType } from 'react-icons'

interface CategoryInputProps {
	label: string
	onClick: (value: string) => void
	icon: IconType
	selected?: boolean
}

const CategoryInput: FC<CategoryInputProps> = ({ label, onClick, icon: Icon, selected }) => {
	return (
		<div
			onClick={() => onClick(label)}
			className={`
            rounded-xl
            border-2
            p-4
            flex
            flex-col
            gap-3
            hover:border-black
            transition
            cursor-pointer
            ${selected ? 'border-black' : 'border-neutral-200'}
        `}>
			{<Icon size={30} />}
			<div className='font-semibold'>{label}</div>
		</div>
	)
}

export default CategoryInput
