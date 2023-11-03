'use client';
import {signOut, useSession} from "next-auth/react";

export default function TestLogin() {
    const session = useSession();
    return (
        <div>
            <pre>{JSON.stringify(session)}</pre>
            <button onClick={() => signOut({redirect: false})}>LOG OUT</button>
        </div>
    )
}