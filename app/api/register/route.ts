import { NextResponse } from "@/node_modules/next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  const headers = request.headers
  const code = headers.get('code')
  const username = headers.get('username')
  const password = headers.get('password')

  if (!code || !username || !password) {
    return new NextResponse(JSON.stringify({ error: 'Variables not found!' }), { status: 404 })
  }

  const prisma = new PrismaClient()
  const register = await prisma.register.findFirst({
    where: {
      username: username
    }
  })

  if (!register) {
    return new NextResponse(JSON.stringify({ error: 'Username not waiting for registration!' }), { status: 404 })
  }

  if (register.code !== code) {
    return new NextResponse(JSON.stringify({ error: 'Invalid registration code!' }), { status: 400 })
  }

  const hash = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      username: username,
      hash: hash
    }
  })

  await prisma.register.delete({
    where: {
      id: register.id
    }
  })

  return new NextResponse(JSON.stringify({ message: 'Username registered!' }), { status: 200 })
}