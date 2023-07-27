import Link from "next/link"

export default function Home() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center gap-2">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h1 className="text-white text-2xl font-semibold mb-2">Maze Quest Auth</h1>
        <div className="flex flex-col gap-2">
          <Link href={'/login'} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded text-center duration-200">
            Login
          </Link>
          <Link href={'/register'} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-center duration-200">
            Register
          </Link>
        </div>
      </div>
    </main>
  )
}
