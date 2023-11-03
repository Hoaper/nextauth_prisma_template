'use client';
import {FormEvent, Fragment, useEffect} from "react";
import Link from "next/link";
import {signIn, useSession} from "next-auth/react";
import {redirect, useRouter} from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const signMeIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        const res = await signIn('credentials', { password: password, email: email, redirect: false })
        console.log(res)
    }

    const session = useSession();
    if (session.status === "loading") {
        return <h1>LOADING</h1>
    } else if (session.status === "authenticated") {
        return redirect("/")
    } else {
        return <Fragment>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto"
                         src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
                    <h2 className="dark:text-white mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign
                        in to your account</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <button onClick={e => signIn("github")}
                            className="bg-gray-800 text-white rounded-md py-2 px-4 mb-4 w-full flex items-center justify-center space-x-2">
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100"
                             height="100" viewBox="0 0 32 32">
                            <path fill="evenodd"
                                  d="M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 21.300781 7.4375 25.800781 12.207031 27.386719 C 12.808594 27.496094 13.027344 27.128906 13.027344 26.808594 C 13.027344 26.523438 13.015625 25.769531 13.011719 24.769531 C 9.671875 25.492188 8.96875 23.160156 8.96875 23.160156 C 8.421875 21.773438 7.636719 21.402344 7.636719 21.402344 C 6.546875 20.660156 7.71875 20.675781 7.71875 20.675781 C 8.921875 20.761719 9.554688 21.910156 9.554688 21.910156 C 10.625 23.746094 12.363281 23.214844 13.046875 22.910156 C 13.15625 22.132813 13.46875 21.605469 13.808594 21.304688 C 11.144531 21.003906 8.34375 19.972656 8.34375 15.375 C 8.34375 14.0625 8.8125 12.992188 9.578125 12.152344 C 9.457031 11.851563 9.042969 10.628906 9.695313 8.976563 C 9.695313 8.976563 10.703125 8.65625 12.996094 10.207031 C 13.953125 9.941406 14.980469 9.808594 16 9.804688 C 17.019531 9.808594 18.046875 9.941406 19.003906 10.207031 C 21.296875 8.65625 22.300781 8.976563 22.300781 8.976563 C 22.957031 10.628906 22.546875 11.851563 22.421875 12.152344 C 23.191406 12.992188 23.652344 14.0625 23.652344 15.375 C 23.652344 19.984375 20.847656 20.996094 18.175781 21.296875 C 18.605469 21.664063 18.988281 22.398438 18.988281 23.515625 C 18.988281 25.121094 18.976563 26.414063 18.976563 26.808594 C 18.976563 27.128906 19.191406 27.503906 19.800781 27.386719 C 24.566406 25.796875 28 21.300781 28 16 C 28 9.371094 22.628906 4 16 4 Z"></path>
                        </svg>
                        Sign In with GitHub
                    </button>

                    <button onClick={e => signIn("google")}
                            className="bg-white text-black rounded-md py-2 px-4 w-full flex items-center justify-center space-x-2">
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                            <path fill="#FFC107"
                                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            <path fill="#FF3D00"
                                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                            <path fill="#4CAF50"
                                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                            <path fill="#1976D2"
                                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        Sign In with Google
                    </button>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={signMeIn} className="space-y-6">
                        <div>
                            <label htmlFor="email"
                                   className="dark:text-white block text-sm font-medium leading-6 text-gray-900">Email
                                address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autoComplete="email" required
                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className="dark:text-white block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div className="text-sm">
                                    <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot
                                        password?</Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autoComplete="current-password"
                                       required
                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <button type="submit" value="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                            in
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    }
}