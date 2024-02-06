import Link from "next/link"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-16 xl:grid-cols-[1fr_650px]">
          <img
            alt="Hero Image"
            className="mx-auto overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last"
            src="/images/hero-image.png"
          />
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                The complete platform for building the Web
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Give your team the toolkit to stop configuring and start innovating. Securely build, deploy, and scale
                the best web experiences.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-12 w-36 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Get Started
              </Link>
              <Link
                className="inline-flex h-12 w-36 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="/auth/signin"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
