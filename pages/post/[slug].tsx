import { GetStaticProps } from "next";
import logger from "../../lib/logger";
import postService from "../../services/postService";
import prisma from "@prisma/client";
import Header from "../../components/Header";
import ReactMarkdown from "react-markdown";

// This function gets called at build time populated with the posts data

interface PostI extends prisma.Post {
    author: {
      firstName: string | null
    }
}

interface Props {
    post: PostI;
}

function Post({post}: Props) {
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
                    <img
                        className="h-10 w-10 rounded-full"
                        src={post.mainImage!} 
                        alt="" 
                    />
                    <p className="font-extralight text-sm">
                        Blog post by {" "}
                        <span className="text-green-600">{post.author.firstName}</span> 
                        - Published at {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                </div>

                <div className="mt-10">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </article>
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
    logger.info(`Request to get post with slug ${slug}`);
    
    logger.debug(`Post Content: ${postI.content}`);

    if (!post)  {
        logger.info(`Post with slug ${slug} not found`);
        return {notFound: true}
    }

    return {
        props: {
            post: JSON.parse(JSON.stringify(postI)),
        }
    }
}