'use client'

import { signIn } from 'next-auth/react'
import { FC, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import Button from '../Button'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Modal from './Modal'

import { useRouter } from 'next/navigation'
import useLoginModal from '../../hooks/useLoginModal'

interface LoginModalProps {}

const LoginModal: FC<LoginModalProps> = ({}) => {
	
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const router = useRouter()
	const loginModal = useLoginModal()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true)

		signIn('credentials', {
			...data,
			redirect: false,
		}).then(res => {
			setIsLoading(false)

			if(res?.ok) {
				loginModal.onClose()
				toast.success('Logged in successfully!')
				router.refresh()
				loginModal.onClose()
			} else {
				toast.error(res?.error || 'Something went wrong!')
			}

		})
	}

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Heading title='Welcome back' subtitle='Login to your account!' />
			<Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
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
			<Button outline label='Continue with Google' icon={FcGoogle} disabled={isLoading} onClick={() => signIn('google')} />
			<Button outline label='Continue with Github' icon={AiFillGithub} disabled={isLoading} onClick={() => signIn('github')} />
			<div className='text-neutral-500 text-center mt-4 font-light'>
				<div className='flex flex-row justify-center items-center gap-2'>
					<div>Already have an account?</div>
					<div onClick={loginModal.onClose} className='to-neutral-800 cursor-pointer hover:underline'>
						Login{' '}
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title='Login'
			actionLabel='Continue'
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default LoginModal
