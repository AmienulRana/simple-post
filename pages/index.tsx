import type { NextPage } from "next";
import Layout from "../components/layout/Index";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { getAllPostsData } from "../actions/posts";

interface TypePost {
  userId: number;
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
        {/* <h1 className="text-orange-500 text-4xl lg:text-5xl mr-2 font-medium">
          Article
        </h1> */}
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
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden my-4 mx-2 relative h-64 "
            >
              <div className="px-3 py-2 h-52">
                <h3 className="text-gray-900 font-semibold text-lg">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{post.body}</p>
              </div>
              <div className="px-3 py-2 bg-gray-100 h-8 absolute bottom-0 left-0 w-full flex items-center">
                <Link href={`/posts/${post.id}`}>
                  <p className="text-orange-500 hover:underline font-semibold text-sm">
                    Read more
                  </p>
                </Link>
              </div>
            </div>
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
