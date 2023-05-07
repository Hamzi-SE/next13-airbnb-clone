'use client'

import { FC, useCallback, useState } from 'react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRegisterModal from '../../hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'

interface RegisterModalProps {}

const RegisterModal: FC<RegisterModalProps> = ({}) => {
	const registerModal = useRegisterModal()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	})

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true)

		axios
			.post('/api/register', data)
			.then(res => {
				registerModal.onClose()
				console.log(res)
			})
			.catch(err => {
				toast.error(err.response.data.message || err.message || 'Something went wrong')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Heading title='Welcome to Airbnb' subtitle='Create an account' />
			<Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
			<Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />
			<Input
				id='password'
				label='Password'
				type='password'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	)

	const footerContent = (
		<div className='flex flex-col gap-4 mt-3'>
			<hr />
			<Button outline label='Continue with Google' icon={FcGoogle} disabled={isLoading} onClick={() => {}} />
			<Button outline label='Continue with Github' icon={AiFillGithub} disabled={isLoading} onClick={() => {}} />
			<div className='text-neutral-500 text-center mt-4 font-light'>
				<div className='flex flex-row justify-center items-center gap-2'>
					<div>Already have an account?</div>
					<div onClick={registerModal.onClose} className='to-neutral-800 cursor-pointer hover:underline'>
						Login{' '}
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title='Register'
			actionLabel='Continue'
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default RegisterModal
