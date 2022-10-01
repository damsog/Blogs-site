import { signIn, useSession } from "next-auth/react";
import { GetStaticPaths, GetStaticProps } from "next/types";
import userService from "../../services/userService";
import { Post, User } from "@prisma/client";
import Stories from "../../components/Stories";
import { useEffect, useState } from "react";
import Account from "../../components/Account";
import Write from "../../components/Write";
import postService from "../../services/postService";
import SideBar from "../../components/SideBar";
import { useRouter } from "next/router";

interface PropsI {
    user: User,
    posts: Post[]
}

function user({user, posts}: PropsI) {
    const [ selection, setSelection ] = useState("stories");
    const { data: session, status } = useSession({ required: true });
    const router = useRouter();
    
    useEffect(() => {
        if(status === "loading") return;
        if(!session) router.push("/login");
        if(session.userEmail !== user.email) router.push("/");
    }, [session, status]);

    return (
        <main>
            {(status==="authenticated") && (
                <>
                    {(session.userEmail === user.email) ? (
                        <div className="flex flex-row justify-between h-screen w-auto">
                            
                            <SideBar className="w-1/6" user={user} selection={selection} setSelectionEvent={setSelection}></SideBar>  
                            
                            <div className=" w-8/12 ">
                                <div className=" px-24 ">
                                    {(selection === "stories") && (<Stories posts={posts} user={user} />)}

                                    {(selection === "write") && (<Write/>)}

                                    {(selection === "account") && (<Account/>)}
                                </div>
                            </div>
                            <div className=" w-1/4 "></div>                    
                        </div>
                    ) : (
                        <p>Not Allowed</p>
                    )}
                </>
            )}
        </main>
    )

}

export default user;

export const getStaticPaths: GetStaticPaths = async () => {
    const users = await userService.findAll();

    const paths = users.map( (user) =>{
        return `/feed/${user.email}`;
    });

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const username = params!.username as string;
    const user = await userService.findByEmail(username);
    const posts = await postService.findByAuthorId(user!.id);

    if (!user) {
        return {notFound: true}
    }

    return {
        props: {
            user: JSON.parse(JSON.stringify(user)),
            posts: JSON.parse(JSON.stringify(posts))
        }
    }
}