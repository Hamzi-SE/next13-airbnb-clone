'use client'

import dynamic from 'next/dynamic'
import { FC, useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import useRentModal from '../../hooks/useRentModal'
import Heading from '../Heading'
import { categories } from '../Navbar/Categories'
import CategoryInput from '../inputs/CategoryInput'
import Counter from '../inputs/Counter'
import CountrySelect from '../inputs/CountrySelect'
import Modal from './Modal'

interface RentModalProps {}

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

const RentModal: FC<RentModalProps> = ({}) => {
	const [step, setStep] = useState(STEPS.CATEGORY)

	const rentModal = useRentModal()

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: '',
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: '',
			price: 1,
			title: '',
			description: '',
		},
	})

	const category = watch('category')
	const location = watch('location')
	const guestCount = watch('guestCount')
	const roomCount = watch('roomCount')
	const bathroomCount = watch('bathroomCount')

	const Map = useMemo(
		() =>
			dynamic(() => import('../Map'), {
				loading: () => <div className='h-[35vh] rounded-lg' />,
				ssr: false,
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[location]
	)

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		})
	}

	const onBack = () => {
		setStep(value => value - 1)
	}

	const onNext = () => {
		setStep(value => value + 1)
	}

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return 'Create'
		}

		return 'Next'
	}, [step])

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined
		}

		return 'Back'
	}, [step])

	let bodyContent = (
		<div className='flex flex-col gap-8'>
			<Heading title='Which of these best describes your place?' subtitle='Pick a category.' />
			<div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
				{categories.map(item => (
					<div className='col-span-1' key={item.label}>
						<CategoryInput
							label={item.label}
							onClick={category => setCustomValue('category', category)}
							icon={item.icon}
							selected={category === item.label}
						/>
					</div>
				))}
			</div>
		</div>
	)

	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading title='Where is your place located?' subtitle='Help guests find you!' />

				<CountrySelect value={location} onChange={value => setCustomValue('location', value)} />

				<Map center={location?.latlng} />
			</div>
		)
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading title='Share some information about your place' subtitle='What amenities do you offer?' />

				<Counter
					title='Guests'
					subtitle='How many guests can your place accommodate?'
					value={guestCount}
					onChange={value => setCustomValue('guestCount', value)}
				/>
				<hr />
				<Counter
					title='Rooms'
					subtitle='How many rooms can guests use?'
					value={roomCount}
					onChange={value => setCustomValue('roomCount', value)}
				/>
				<hr />
				<Counter
					title='Bathrooms'
					subtitle='How many bathrooms can guests use?'
					value={bathroomCount}
					onChange={value => setCustomValue('bathroomCount', value)}
				/>
			</div>
		)
	}

	return (
		<Modal
			isOpen={rentModal.isOpen}
			onClose={rentModal.onClose}
			onSubmit={onNext}
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			title='Airbnb your home!'
			body={bodyContent}
		/>
	)
}

export default RentModal
