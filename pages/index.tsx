import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import logger from '../lib/logger';
import axios from 'axios';
import dotenv from 'dotenv';
import { Post } from '@prisma/client';

interface Props {
  posts: Post[] | undefined;
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

    </div>
  )
}

export const getServerSideProps = async () => {
  dotenv.config();
  const api = process.env.API_URL;
  let posts:Post|undefined;

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
