import { useSession } from "next-auth/react";
import { GetStaticPaths, GetStaticProps } from "next/types";
import Header from "../../components/Header";
import userService from "../../services/userService";
import { User } from "@prisma/client";


interface PropsI {
    user: User;
}

function user({user}: PropsI) {
    const { data: session, status } = useSession();

    return (
        <main>
            {session ? (
                <div className="grid grid-cols-4 grid-rows-5 h-screen w-auto">
                    <div className="bg-blue-200">
                        <li className="row-span-3">Edit</li>
                        <li>Following</li>
                        <li>Account</li>
                    </div>
                        
                    <div className="bg-blue-500 col-span-3">
                        <p>Aomething</p>    
                    </div>
                </div>
            ) : (
                <p>Not logged</p>
            )}
        </main>
    )
}

export default user;

export const getStaticPaths: GetStaticPaths = async () => {
    const users = await userService.findAll();

    const paths = users.map( (user) =>{
        return `/user/${user.email}`;
    });

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const username = params!.username as string;
    const user = await userService.findByEmail(username);

    if (!user) {
        return {notFound: true}
    }

    return {
        props: {
            user: JSON.parse(JSON.stringify(user)),
        }
    }
}