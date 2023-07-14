'use client'

import { FC, useCallback } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
	var cloudinary: any
}

interface ImageUploadProps {
	value: string
	onChange: (value: string) => void
}

const ImageUpload: FC<ImageUploadProps> = ({ value, onChange }) => {
	const handleUpload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url)
		},
		[onChange]
	)

	return (
		<CldUploadWidget
			onUpload={handleUpload}
			uploadPreset='next13-airbnb-preset'
			options={{
				maxFiles: 1,
			}}>
			{({ open }) => {
				return (
					<div
						onClick={open && (() => open?.())}
						className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600'>
						<TbPhotoPlus size={50} />

						<div className='font-semibold text-lg'>Upload a photo</div>

						{value && (
							<div className='absolute inset-0 w-full h-full'>
								<Image src={value} fill alt='preview-image' style={{ objectFit: 'cover' }} />
							</div>
						)}
					</div>
				)
			}}
		</CldUploadWidget>
	)
}

export default ImageUpload
