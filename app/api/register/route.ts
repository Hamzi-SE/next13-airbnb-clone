import bcrypt from 'bcrypt'

import prisma from '../../libs/prismadb'
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
	const body = await request.json()
	const { name, email, password } = body

	const hashedPassword = await bcrypt.hash(password, 12)

	// create a new user but if the email already exists, return an error
	try {
		await prisma.user.create({
			data: {
				name,
				email,
				hashedPassword,
			},
		})
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				// P2002 is the error code for unique constraint failed
				return new NextResponse(JSON.stringify({ error: 'User already exists!' }), { status: 400 })
			}

			return new NextResponse(JSON.stringify({ error: 'Something went wrong' }), { status: 500 })
		}
	}

	return new NextResponse(JSON.stringify({ message: 'Your account has been created successfully!' }), { status: 200 })
}
