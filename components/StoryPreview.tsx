import { Post, User } from "@prisma/client";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface PropsI {
    post: Post,
    user: User
}

const StoryPreview = ({post, user}: PropsI) => {
    const text_limit = 150;
    const toShow = post.content.substring(0, text_limit) + "...";

    return (
        <div className="my-10 mx-4">
            <div className="flex place-items-center">
                <img className="w-10 h-10 rounded-full" src={user.image!} alt="story" />
                <h1 className="p-2">
                    <Link href={`/user/${user.email}`}>
                        {user.name} 
                    </Link>
                    <span className=" text-sm text-gray-500 "> · {new Date(post.createdAt).toLocaleDateString()}</span> 
                </h1>
            </div>
            <div className="flex justify-between py-2">
                <Link key={`/post/${post.slug}`} href={`/post/${post.slug}`}>
                    <div className="cursor-pointer">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                        <p className=" text-sm my-2 text-gray-700 ">{post.description}</p>
                        <ReactMarkdown>{toShow}</ReactMarkdown>
                    </div>
                </Link>
                <img className="w-40 h-auto object-cover rounded-lg" src={post.mainImage!} alt="" />
            </div>
            <div>

            </div>
        </div>
    )
}

export default StoryPreview;