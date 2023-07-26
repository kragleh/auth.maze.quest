import { NextResponse } from "@/node_modules/next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  const headers = request.headers
  const username = headers.get('username')
  const password = headers.get('password')
  const ip = headers.get('x-forwarded-for')

  if (!ip) {
    return new NextResponse(JSON.stringify({ error: 'Unable to locate you!' }), { status: 404 })
  }

  if (!username || !password) {
    return new NextResponse(JSON.stringify({ error: 'Variables not found!' }), { status: 404 })
  }

  const prisma = new PrismaClient()
  const user = await prisma.user.findFirst({
    where: {
      username: username
    }
  })

  if (!user) {
    return new NextResponse(JSON.stringify({ error: 'This username isnt registered!' }), { status: 404 })
  }

  const auth = await bcrypt.compare(password, user.hash)

  if (auth) {
    await prisma.login.create({
      data: {
        ip: ip,
        username: username
      }
    })

    return new NextResponse(JSON.stringify({ message: 'Logged in!' }), { status: 200 })
  } else {
    return new NextResponse(JSON.stringify({ error: 'Wrong password!' }), { status: 500 })
  }
}