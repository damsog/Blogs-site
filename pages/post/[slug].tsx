import { GetStaticProps } from "next";
import logger from "../../lib/logger";
import postService from "../../services/postService";
import { Post } from "@prisma/client";
import Header from "../../components/Header";


// This function gets called at build time populated with the posts data
interface Props {
    post: Post;
}

function Post({post}: Props) {
    return (
        <>
            <main>
                <Header />
            </main>
            <div>
                <h1>{post.title}</h1>
            </div>
        </>
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
    logger.info(`Request to get post with slug ${slug}`);

    if (!post)  {
        logger.info(`Post with slug ${slug} not found`);
        return {notFound: true}
    }

    return {
        props: {
            post: JSON.parse(JSON.stringify(post)),
        }
    }
}