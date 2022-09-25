import { useSession } from "next-auth/react";
import { GetStaticPaths, GetStaticProps } from "next/types";
import Header from "../../components/Header";
import userService from "../../services/userService";
import { User } from "@prisma/client";
import Stories from "../../components/Stories";
import { useState } from "react";
import Account from "../../components/Account";
import Write from "../../components/Write";


interface PropsI {
    user: User;
}

function user({user}: PropsI) {
    const [ selection, setSelection ] = useState("stories");
    const { data: session, status } = useSession();

    return (
        <main>
            {session ? (
                <div className=" grid grid-cols-7 grid-rows-7 divide-x h-screen w-auto">
                    <div className="row-span-4 col-span-1 "></div>
                    <div className="relative col-span-6 row-span-6">
                        {(selection === "stories") && (<Stories/>)}

                        {(selection === "write") && (<Write/>)}

                        {(selection === "account") && (<Account/>)}
                    </div>
                    <div className="relative row-span-1 col-span-1 ">
                        <div className="m-4 absolute bottom-1/2 right-0">
                            {(selection === "stories") ? 
                                (<h5 className="cursor-pointer text-gray-900" onClick={()=>setSelection("stories")}>Stories</h5>):
                                (<h5 className="cursor-pointer text-gray-500 hover hover:text-gray-900" onClick={()=>setSelection("stories")}>Stories</h5>)}
                        </div>
                    </div>
                    <div className="relative row-span-1 col-span-1 ">
                        <div className="m-4 absolute bottom-1/2 right-0">
                            {(selection === "write") ? 
                                (<h5 className="cursor-pointer text-gray-900" onClick={()=>setSelection("write")}>Write</h5>):
                                (<h5 className="cursor-pointer text-gray-500 hover hover:text-gray-900" onClick={()=>setSelection("write")}>Write</h5>)}
                        </div>
                    </div>
                    <div className="relative row-span-1 col-span-1 ">
                        <div className="m-4 absolute top-1/2 right-0">
                            {(selection === "account") ? 
                                (<h5 className="cursor-pointer text-gray-900" onClick={()=>setSelection("account")}>Account</h5>):
                                (<h5 className="cursor-pointer text-gray-500 hover hover:text-gray-900" onClick={()=>setSelection("account")}>Account</h5>)}
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