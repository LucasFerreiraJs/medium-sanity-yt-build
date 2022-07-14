import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../components/Header/Header'
import { Banner } from '../components/Header/Banner'
import { PostList } from '../components/PostsResult/PostResult'
import { sanityClient, urlFor } from '../sanity';

import { IPost } from '../typings'
interface IProps {
  posts: IPost[];
}


export default function Home({ posts }: IProps) {


  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Banner />


      {/* posts */}

      <PostList postsReceived={posts} urlImageConverter={urlFor}/>

    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `
    *[_type== "post"]{
      _id,
      title,
      author ->{
      name,
      image
    },
    description,
    mainImage,
    slug
    }
  `;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    }
  };

};
