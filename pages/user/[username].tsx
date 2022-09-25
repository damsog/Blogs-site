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
                <div className="relative grid grid-cols-4 grid-rows-5 gap-5 h-screen w-auto bg-blue-100">
                    <div className="row-span-2 col-span-1 bg-blue-200"></div>
                    <div className="col-span-3 row-span-5 bg-blue-200">
                        <div className="">Aomething</div>    
                    </div>
                    <div className="relative bg-blue-200">
                        <div className="absolute bottom-0 right-0">
                            <p>Following</p>
                        </div>
                    </div>
                    <div className="relative bg-blue-200">
                        <div className="absolute top-0 right-0">
                            <p>Edit</p> 
                        </div>
                    </div>
                    <div className="relative bg-blue-200">
                        <div className="absolute top-0 right-0">
                            Account
                        </div>
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