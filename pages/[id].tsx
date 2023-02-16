import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/layout/Index";
import { Post } from "./index";
import { getDetailPostsData } from "../actions/posts";

type Props = {
  post: Post;
};

const PostPageDetail = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={`SimplePost ${post?.title}`}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
        <p className="mb-4">{post?.body}</p>
        <Link href="/">
          <p className="text-orange-500 hover:underline">Back to posts</p>
        </Link>
      </div>
    </Layout>
  );
};

export default PostPageDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await posts.json();
  const paths = data.map((post: Post) => ({
    params: { id: post.id.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const post = await getDetailPostsData(params?.id as string);
  return { props: { post } };
};
