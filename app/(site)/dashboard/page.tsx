import {getServerSession} from "next-auth";

export default async function TestLogin() {
    const session = await getServerSession();
    return (
        <div>
            <pre>{JSON.stringify(session)}</pre>
        </div>
    )
}