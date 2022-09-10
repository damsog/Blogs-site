import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import logger from '../lib/logger';
import axios from 'axios';
import dotenv from 'dotenv';
import { Post } from '@prisma/client';
import Link from 'next/link';

interface PostI extends Post {
  author: {
    firstName: string | null
  }
}

interface Props {
  posts: PostI[] | undefined;
}

const Home: NextPage<Props> = ({posts}:Props) => {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Blogge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serift ">
            <span className="underline decoration-black decoration-4">Medium</span> is a place to write, read, and connect 
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
        </div>

        <div>

        </div>

        <img 
          className="hidden md:inline-flex h-32 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" 
          alt="" />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3  md:gap-6 p-2 md:p-6'>
        {posts?.map((post) => (
          <Link key={post.id} href={`/post/${post.title}`}>
            <div className='border rounded-lg group cursor-pointer overflow-hidden'>
              <img 
                className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
                src={post.mainImage!} alt="" 
              />
              <div className='flex justify-between p-5 bg-white'>
                <div>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p className='text-xs'>{post.description} by {post.author.firstName}</p>
                </div>
                
                <img 
                  className='h-12 w-12 rounded-full'
                  src={post.mainImage!} alt="" 
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div> 
  )
}

export const getServerSideProps = async () => {
  dotenv.config();
  const api = process.env.API_URL;
  let posts:PostI|undefined;

  logger.debug(api);
  try{
    const res = await axios.get(`${api}/post`);
    posts = res.data;
  }catch(err){
    logger.error(err);
    posts = undefined;
  }

  return {
    props: {
      posts,
    }
  } 
}


export default Home
