'use client'

import { formatISO } from 'date-fns'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { FC, useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import useSearchModal from '../../hooks/useSearchModal'
import Heading from '../Heading'
import Calendar from '../inputs/Calendar'
import Counter from '../inputs/Counter'
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect'
import Modal from './Modal'

interface SearchModalProps {}

enum STEPS {
	LOCATION = 0,
	DATE = 1,
	INFO = 2,
}

const SearchModal: FC<SearchModalProps> = ({}) => {
	const [step, setStep] = useState(STEPS.LOCATION)
	const [location, setLocation] = useState<CountrySelectValue>()
	const [guestCount, setGuestCount] = useState(1)
	const [roomCount, setRoomCount] = useState(1)
	const [bathroomCount, setBathroomCount] = useState(1)
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	})

	const searchModal = useSearchModal()
	const router = useRouter()
	const params = useSearchParams()

	const Map = useMemo(
		() =>
			dynamic(() => import('../Map'), {
				loading: () => <div className='h-[35vh] rounded-lg' />,
				ssr: false,
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[location]
	)

	const onBack = useCallback(() => {
		setStep(value => value - 1)
	}, [])

	const onNext = useCallback(() => {
		setStep(value => value + 1)
	}, [])

	const onSubmit = useCallback(async () => {
		if (step !== STEPS.INFO) {
			return onNext()
		}

		let query = {}

		if (params) {
			query = qs.parse(params.toString())
		}

		const updatedQuery: any = {
			...query,
			locationValue: location?.value,
			guestCount,
			roomCount,
			bathroomCount,
		}

		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate)
		}

		if (dateRange.endDate) {
			updatedQuery.endDate = formatISO(dateRange.endDate)
		}

		const url = qs.stringifyUrl(
			{
				url: '/',
				query: updatedQuery,
			},
			{
				skipNull: true,
			}
		)

		setStep(STEPS.LOCATION)

		searchModal.onClose()

		router.push(url)
	}, [step, onNext, params, location, guestCount, roomCount, bathroomCount, dateRange, router, searchModal])

	const actionLabel = useMemo(() => {
		if (step === STEPS.INFO) {
			return 'Search'
		}

		return 'Next'
	}, [step])

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.LOCATION) {
			return undefined
		}

		return 'Back'
	}, [step])

	let bodyContent = (
		<div className='flex flex-col gap-8'>
			<Heading title='Where do you want to go?' subtitle='Find the perfect place to stay, for a night or longer!' />
			<CountrySelect value={location} onChange={value => setLocation(value as CountrySelectValue)} />

			<hr />

			<Map center={location?.latlng} />
		</div>
	)

	if (step === STEPS.DATE) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading title='When do you want to go?' subtitle='Make sure everyone is free!' />

				<Calendar value={dateRange} onChange={value => setDateRange(value.selection)} />
			</div>
		)
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading title='More information about your stay' subtitle='Find your perfect place to stay!' />

				<Counter
					title='Guests'
					subtitle='How many guests will be staying?'
					value={guestCount}
					onChange={value => setGuestCount(value)}
				/>

				<Counter
					title='Rooms'
					subtitle='How many rooms do you need?'
					value={roomCount}
					onChange={value => setRoomCount(value)}
				/>

				<Counter
					title='Bathrooms'
					subtitle='How many bathrooms do you need?'
					value={bathroomCount}
					onChange={value => setBathroomCount(value)}
				/>
			</div>
		)
	}

	return (
		<Modal
			isOpen={searchModal.isOpen}
			onClose={searchModal.onClose}
			onSubmit={onSubmit}
			title='Filters'
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
			body={bodyContent}
		/>
	)
}

export default SearchModal
