import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const path = router.pathname;
  return (
    <header>
      <nav className="flex w-full py-4">
        <section className="flex items-center">
          <h2 className="bg-orange-500 text-3xl font-bold flex items-center justify-center md:w-14 md:h-14 w-8 h-8 text-white rounded-xl mr-4">
            S
          </h2>
          <h1 className="text-xl font-bold text-orange-500">SimplePost</h1>
        </section>
        <section className="flex m-auto">
          <Link href="/">
            <p
              className={[
                "font-semibold mr-4 md:mr-16 cursor-pointer",
                path === "/" ? "text-orange-500" : "",
              ].join(" ")}
            >
              Home
            </p>
          </Link>
        </section>
      </nav>
    </header>
  );
}
