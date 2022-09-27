import { Post, User } from "@prisma/client";

interface PropsI {
    post: Post,
    user: User
}

const StoryPreview = ({post, user}: PropsI) => {
    return (
        <div className="my-10 mx-4">
            <div className="flex place-items-center">
                <img className="w-10 h-10 rounded-full" src={user.image!} alt="story" />
                <h1 className="p-2">{user.name} <span className=" text-sm text-gray-500 "> · {new Date(post.createdAt).toLocaleDateString()}</span> </h1>
            </div>
            <div className="flex justify-between py-2">
                <div>
                    <h1 className=" text-2xl font-bold">{post.title}</h1>
                    <p>{post.description}</p>
                </div>
                <img className="w-20 h-20" src={post.mainImage!} alt="" />
            </div>
            <div>

            </div>
        </div>
    )
}

export default StoryPreview;