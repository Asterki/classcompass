// Other dependencies
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

// Fonts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

const SignUpPage = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-center ${inter.className} bg-purple-50 text-slate-700 dark:bg-slate-900 dark:text-slate-300`}
        >
            <div className="w-11/12 text-center lg:w-3/12">
                <h1 className="text-3xl font-semibold">Register to ClassCompass</h1>
                <p>Select a provider</p>

                <div className="mt-4 flex flex-col gap-4">
                    {Object.values(providers).map((provider) => {
                        let icon = null;
                        if (provider.name === "Google") icon = faGoogle;
                        if (provider.name === "GitHub") icon = faGithub;
                        if (provider.name === "Discord") icon = faDiscord;
                        
                        return (
                            <button
                                key={provider.name}
                                className="rounded-md border-2 border-slate-200 p-2 transition-all hover:scale-105 hover:bg-slate-700 hover:text-purple-50 dark:text-white dark:hover:bg-slate-200 dark:hover:text-slate-900"
                                onClick={() => signIn(provider.id)}
                            >
                                {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
                                {provider.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            <footer className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
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
        </main>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (session) return { redirect: { destination: "/" } };

    const providers = await getProviders();
    return {
        props: {
            providers: providers ?? [],
        },
    };
}

export default SignUpPage;
