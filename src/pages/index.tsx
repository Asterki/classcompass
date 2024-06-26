import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import NavbarComponent from "@/components/navbar";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { useSession } from "next-auth/react";

export default function Home() {
    const router = useRouter();
    const { data: session, status } = useSession({
        required: false,
    });


    return (
        <div
            className={`flex min-h-screen w-full flex-col items-center justify-between ${inter.className} bg-purple-50 text-slate-700 dark:bg-slate-900 dark:text-slate-300`}
        >
            <NavbarComponent session={session} />

            <main className="flex w-full flex-col-reverse items-center justify-around gap-12 p-2 lg:flex-row lg:p-32 h-full">
                <div className="w-full px-4 text-center lg:w-1/2 lg:px-20 lg:text-left">
                    <h1 className="text-4xl font-bold">
                        Manage your life in a single, centralized, easy-to-use platform Made for students, by students.
                    </h1>

                    <br />

                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt impedit dolore blanditiis odio
                        ipsam sapiente voluptas in numquam sit quae expedita laudantium exercitationem eligendi et
                        ullam, ratione neque eius odit, quasi ducimus architecto omnis ipsum. Debitis veritatis unde ut
                        fugiat nemo nostrum vel ducimus, officia possimus esse labore harum quibusdam sit perferendis
                        eius pariatur voluptatibus laborum molestias nobis, quae minus ea. Excepturi, dolor sapiente?
                        Quibusdam soluta consectetur impedit ut aperiam sint maiores ipsum pariatur sed facere?
                    </p>

                    <div className="flex justify-center gap-4 lg:justify-start">
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
                    <img width={400} height={400} src="https://placehold.co/500" alt="Example for now" />
                </div>
            </main>

            <footer className="w-full mb-2 text-center">
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
