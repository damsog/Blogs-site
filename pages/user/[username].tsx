import { useSession } from "next-auth/react";
import { GetStaticPaths, GetStaticProps } from "next/types";
import Header from "../../components/Header";
import userService from "../../services/userService";
import { Post, User } from "@prisma/client";
import Stories from "../../components/Stories";
import { useState } from "react";
import Account from "../../components/Account";
import Write from "../../components/Write";
import { IoBookmarksOutline } from "@react-icons/all-files/io5/IoBookmarksOutline";
import { IoBookOutline } from "@react-icons/all-files/io5/IoBookOutline";
import postService from "../../services/postService";
import Link from "next/link";


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
                    <div className="flex flex-col justify-between w-1/6">
                        <div className="relative">
                            <Link key="/" href="/">
                                <img className="absolute top-0 right-0 w-44 object-contain cursor-pointer" src="https://links.papareact.com/yvf" alt="" />
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="absolute m-4 top-0 right-0">
                                {(selection === "stories") ? 
                                    (<h5 className=" text-2xl cursor-pointer text-gray-900" onClick={()=>setSelection("stories")}><IoBookmarksOutline/></h5>):
                                    (<h5 className=" text-2xl cursor-pointer text-gray-500 hover hover:text-gray-900" onClick={()=>setSelection("stories")}><IoBookmarksOutline/></h5>)}
                            </div>

                            <div className="absolute m-4 bottom-0 right-0">
                                {(selection === "write") ? 
                                    (<h5 className=" text-2xl cursor-pointer text-gray-900" onClick={()=>setSelection("write")}><IoBookOutline/></h5>):
                                    (<h5 className=" text-2xl cursor-pointer text-gray-500 hover hover:text-gray-900" onClick={()=>setSelection("write")}><IoBookOutline/></h5>)}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute m-4 bottom-0 right-0 ">
                                {(selection === "account") ? 
                                    (<img className="h-8 w-8 rounded-full cursor-pointer outline-double outline-black-900" onClick={()=>setSelection("account")} src={user.image!} alt=""/>):
                                    (<img className="h-8 w-8 rounded-full cursor-pointer hover hover:outline-double hover:outline-black-900" onClick={()=>setSelection("account")} src={user.image!} alt=""/>)}
                            </div>
                        </div>
                    </div>
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