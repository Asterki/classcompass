import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import NavbarComponent from "@/components/layout/navbar";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { useSession } from "next-auth/react";

export default function Home() {
    const router = useRouter();
    const { data: session, status } = useSession({
        required: false,
    });

    // Redirect to dashboard if user is logged in
    if (status === "authenticated") router.push("/panel");

    return (
        <div
            className={`flex min-h-screen w-full flex-col items-center justify-between ${inter.className} bg-purple-50 text-slate-700 dark:bg-slate-900 dark:text-slate-300`}
        >
            <NavbarComponent session={session} />

            <main className="mt-16 flex h-full w-full flex-col-reverse items-center justify-around gap-12 p-2 lg:mt-0 lg:flex-row lg:gap-6 lg:p-32">
                <div className="w-full px-4 text-center lg:w-11/12 lg:text-left">
                    <h1 className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-5xl font-bold text-transparent">
                        Manage your life in a single, centralized, easy-to-use platform Made for students, by students.
                    </h1>

                    <br />

                    <p>
                        Class Compass is an open-source project that aims to help students manage their academic,
                        professional, and personal life in a single, centralized, easy-to-use platform. It is designed
                        to be simple, intuitive, and user-friendly.
                    </p>

                    <div className="mt-6 flex justify-center gap-4 lg:justify-start">
                        <button
                            className="mt-2 rounded-md bg-gradient-to-br from-purple-400 to-purple-500 px-4 py-2 font-semibold text-white shadow-md transition-all hover:scale-105"
                            onClick={() => router.push("/auth/access")}
                        >
                            Register Now
                        </button>
                        <button
                            className="mt-2 rounded-md border-2 border-slate-200 px-4 py-2 font-semibold shadow-md transition-all hover:scale-105 dark:hover:bg-slate-300 dark:hover:text-slate-700"
                            onClick={() => router.push("/features")}
                        >
                            See Features
                        </button>
                    </div>
                </div>
                <div className="flex w-1/2 items-center justify-center text-center">
                    <Image
                        width={400}
                        height={400}
                        src="https://placehold.co/500/png"
                        alt="Example for now"
                        className="rounded-md"
                    />
                </div>
            </main>

            <footer className="mb-2 mt-16 w-full text-center lg:mt-0">
                <p className="text-sm">
                    &copy; {new Date(Date.now()).getFullYear()}{" "}
                    <Link href="/" className="font-semibold text-purple-500 hover:underline">
                        Class Compass
                    </Link>
                    . All rights reserved. Created by{" "}
                    <Link href="https://github.com/Asterki/" className="font-semibold text-purple-500 hover:underline">
                        Asterki
                    </Link>
                    .
                </p>
            </footer>
        </div>
    );
}
