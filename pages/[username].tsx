import { useSession } from "next-auth/react";
import { GetStaticPaths, GetStaticProps } from "next/types";
import Header from "../components/Header";
import userService from "../services/userService";
import { Post, User } from "@prisma/client";
import Stories from "../components/Stories";
import { useState } from "react";
import Account from "../components/Account";
import Write from "../components/Write";
import { IoBookmarksOutline } from "@react-icons/all-files/io5/IoBookmarksOutline";
import { IoBookOutline } from "@react-icons/all-files/io5/IoBookOutline";
import postService from "../services/postService";
import Link from "next/link";
import SideBar from "../components/SideBar";


interface PropsI {
    user: User,
    posts: Post[]
}

function user({user, posts}: PropsI) {
    const [ selection, setSelection ] = useState("stories");
    const { data: session, status } = useSession();

    return (
        <main>
            {session ? (
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
                <p>Not logged</p>
            )}
        </main>
    )
}

export default user;

export const getStaticPaths: GetStaticPaths = async () => {
    const users = await userService.findAll();

    const paths = users.map( (user) =>{
        return `/${user.email}`;
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