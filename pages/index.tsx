import type { NextPage } from "next";
import Layout from "../components/layout/Index";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { getAllPostsData } from "../actions/posts";
import { CardPost } from "../components/organism/Posts";

export interface TypePost {
  userId?: number;
  id: number;
  title: string;
  body: string;
  posts: TypePost[];
}

const Home = ({ posts }: TypePost) => {
  return (
    <Layout>
      <section className="flex justify-between w-full my-12 lg:my-24">
        <button className="text-white bg-orange-500 rounded-md flex justify-center items-center min-w-max px-4 hover:opacity-80">
          Add Article
        </button>
        <div className="relative lg:w-4/12">
          <input
            type="text"
            placeholder="cari"
            className="pl-14 py-2 rounded-md w-full border focus:border-orange-500 focus:outline-orange-500 text-gray-400"
          />
          <BiSearch className="absolute top-2/4 -translate-y-2/4 left-4 text-2xl text-gray-300" />
        </div>
      </section>
      <section>
        <div className="grid grid-cols-3 gap-4 flex-wrap justify-center">
          {posts?.map((post: TypePost) => (
            <CardPost
              key={post?.id}
              id={post?.id}
              body={post?.body}
              title={post?.title}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const posts = await getAllPostsData();
  console.log(posts);
  return {
    props: {
      posts,
    },
  };
}
