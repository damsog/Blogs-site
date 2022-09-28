import { GetServerSideProps, GetStaticProps } from "next/types";
import logger from "../../lib/logger";
import postService from "../../services/postService";
import prisma, { Prisma } from "@prisma/client";
import Header from "../../components/Header";
import ReactMarkdown from "react-markdown";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import commentService from "../../services/commentService";
import { useSession } from "next-auth/react";
import userService from "../../services/userService";
import Link from "next/link";

// This function gets called at build time populated with the posts data

interface PostI extends prisma.Post {
    author: {
        name: string | null
    }
}

interface CommentI extends prisma.Comment {
    author: {
        name: string | null,
        image: string | null
    }
}

interface Props {
    post: PostI;
    author: prisma.User;
    comments: CommentI[];
}

interface IFormInput {
    postId: string,
    authorId: string,
    content: string
}

function Post({post,author,comments}: Props) {
    const [ submitted, setSubmitted ] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInput>();
    const { data: session, status } = useSession();

    const onSubmit:SubmitHandler<IFormInput> = async (data) => {
        console.log(`Submitting data:  ${JSON.stringify(data)}`);

        try{
            const response = await fetch("/api/comment", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            console.log(`Response: ${JSON.stringify(response)}`);
            setSubmitted(true);
        }catch(e){
            console.log(`Error: ${e}`);
            setSubmitted(false);
        }
    }
    return (
        <main>
            <Header />

            <img 
                className="w-full h-40 object-cover"
                src={post.mainImage!} 
                alt="" 
            />

            <article className="max-w-3xl mx-auto p-5">
                <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
                <h2 className="text-xl font-light text-gray-500 mb-2">{post.description}</h2>

                <div className="flex items-center space-x-2">
                    <Link key={`/user/${author.email!}`} href={`/user/${author.email!}`}>
                    <img
                        className="cursor-pointer h-10 w-10 rounded-full"
                        src={author.image!} 
                        alt="" 
                    />
                    </Link>

                    <p className="font-extralight text-sm">
                        Blog post by {" "}
                        <Link key={`/user/${author.email!}`} href={`/user/${author.email!}`}>
                        <span className="cursor-pointer text-green-600">{post.author.name}</span> 
                        </Link>
                        - Published at {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                </div>

                <div className="mt-10">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </article>

            <hr className="max-w-lg my-5 mx-auto border border-yellow-500"/>

            {!session && (
                <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white
                    max-w-2xl mx-auto">
                    <h3 className="text-3xl font-bold"> Login and leave comment! </h3>
                    <p>Don't have an account? join now for free</p>
                </div>
            )}
            {(session && submitted) && (
                <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white
                    max-w-2xl mx-auto">
                    <h3 className="text-3xl font-bold"> Thank you for submitting your comment! </h3>
                    <p>Once it has been aproved it shall appear below</p>
                </div>
            )}
            {(session && !submitted) && (<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 max-w-2xl mx-auto mb-10">
                <h3 className="text-5m text-yellow-500 ">Enjoyed this article?</h3>
                <h4 className="text-3xl font-bold">Leave a Comment below!</h4>
                <hr className="py-3 mt-2"/>

                <input 
                    {...register("postId", {required: true})}
                    type="hidden"
                    name="postId"
                    value={post.id}
                />
                <input 
                    {...register("authorId", {required: true})}
                    type="hidden"
                    name="authorId"
                    value={session?.userId as string}
                />
                <label className="block mb-5">
                    <span className="text-gray-700">Comment</span>
                    <textarea
                        {...register("content", {required: true})}
                        className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500
                        outline-none focus:ring" 
                        placeholder="John Doe" 
                        rows={8} 
                    />
                </label>

                {/* Validation errors for the form */}
                <div className="flex flex-col p-5">
                    {errors.content && (
                        <span className="text-red-500">
                            - This field is required
                        </span>   
                    )}
                </div>

                <input 
                    type="submit" 
                    className="shadow bg-yellow-500 hover:bg-yellow-400 
                    focus:shadow-outline focus:outline-none text-white font-bold
                    py-2 px-4 rounded cursor-pointer" 
                    value="Submit Comment"
                />
            </form>
            )}

        {/* Comments */}
        <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500
                        shadow space-y-2">
            <h3 className="text-4xl">Comments</h3>
            <hr className="pb-2"/>

            {comments.map( (comment) => (
                <div key={comment.id} className="flex items-center space-x-2">
                    <img  className="h-12 w-12 rounded-full" src={comment.author.image!}/>
                    <div className="">
                        <p className="text-lg">{comment.author.name}</p>
                        <p className="font-extralight text-slate-600 text-xs">{new Date(comment.createdAt).toLocaleDateString()}</p>
                        <p className="text-sm">{comment.content}</p>
                    </div>
                </div>
            ))}
        </div>

        </main>
    );
};

export default Post;


// Everything below is Server Side
// This also gets called at build time
// Generate the posible paths for each post
export const getStaticPaths = async () => {
    const posts = await postService.findAll();
    logger.info("Getting all the posible paths for each post");

    const paths = posts.map( (post) => {
        return `/post/${post.slug}`;
    });

    logger.debug(`Paths: ${paths}`);
    return {
        paths,
        fallback: 'blocking'
    }
};

// This also gets called at build time
// Gathers the data for each post
export const getStaticProps: GetStaticProps = async ({params}) => {
    const slug = params!.slug as string;
    const post = await postService.findBySlug(slug);
    const postI: PostI = post as PostI;
    const author = await userService.findById(postI.authorId);
    const comments = await commentService.findByPostIdInclude(post!.id);
    const commentsI = comments as CommentI[];
    
    logger.info(`Request to get post with slug ${slug}`);
    logger.info(`Author: ${JSON.stringify(author!.image)}`);
    
    //logger.debug(`Post Content: ${postI.content}`);

    if (!post)  {
        logger.info(`Post with slug ${slug} not found`);
        return {notFound: true}
    }

    return {
        props: {
            post: JSON.parse(JSON.stringify(postI)),
            author: JSON.parse(JSON.stringify(author)),
            comments: JSON.parse(JSON.stringify(commentsI)),
        }
    }
}