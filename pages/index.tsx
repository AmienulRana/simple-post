import Layout from "../components/layout/Index";
import { BiSearch, BiTrash } from "react-icons/bi";
import { getAllPostsData } from "../actions/posts";
import Link from "next/link";
import Pagination from "../components/elements/Pagination";
import { useState } from "react";
import Modal from "../components/elements/Modal";

interface TypePosts {
  userId?: number;
  id: number;
  title: string;
  body: string;
  posts: TypePosts[];
}

interface Post {
  userId?: number;
  id: number;
  title: string;
  body: string;
}

const Home = ({ posts }: TypePosts) => {
  const [currentItems, setCurrentItems] = useState<any>([]);
  const [postsSearch, setPostSearch] = useState<any>([]);
  const [dataPost, setDataPosts] = useState(posts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPost = async (post: Post) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log(data);
    setDataPosts([...dataPost, data]);
  };
  const handleDeletePost = async (id: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
    setDataPosts(dataPost.filter((post) => post.id !== id));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      return setPostSearch([]);
    }
    const filterPost = dataPost.filter((post) => {
      if (post.title.toLowerCase().includes(e.target.value.toLowerCase())) {
        return post;
      }
    });
    setPostSearch(filterPost);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout>
      <section className="flex justify-between w-full my-12 lg:my-24">
        <button
          className="text-white bg-orange-500 rounded-md flex justify-center items-center min-w-max px-4 hover:opacity-80"
          onClick={() => setIsModalOpen(true)}
        >
          Add Article
        </button>
        <div className="relative lg:w-4/12">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search..."
            className="pl-14 py-2 rounded-md w-full border focus:border-orange-500 focus:outline-orange-500 text-gray-400"
          />
          <BiSearch className="absolute top-2/4 -translate-y-2/4 left-4 text-2xl text-gray-300" />
        </div>
      </section>
      <section>
        <div className="grid grid-cols-3 gap-4 flex-wrap justify-center">
          {currentItems?.map((post: Post) => (
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden my-4 mx-2 relative h-64 "
              key={post?.id}
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
                <section>
                  <button className="bg-transparent">
                    <BiTrash />
                  </button>
                </section>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          setCurrentItems={setCurrentItems}
          data={postsSearch.length > 0 ? postsSearch : dataPost}
          itemsPerPage={10}
        />
      </section>
      <PostForm
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        onSubmit={handleAddPost}
      />
    </Layout>
  );
};

export default Home;
export async function getStaticProps() {
  const posts = await getAllPostsData();
  return {
    props: {
      posts,
    },
  };
}

interface TypePostForm {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  onSubmit: (post: Post) => void;
}
export function PostForm({
  isModalOpen,
  handleCloseModal,
  onSubmit,
}: TypePostForm) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ userId: 1, title, body, id: Date.now() });
    handleCloseModal();
    setTitle("");
    setBody("");
  };
  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <section className="px-4 h-72 py-6">
        <h1 className="text-xl font-bold mb-4">Modal Title</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            className="px-6 py-2 mb-4 rounded-md w-full border focus:border-orange-500 focus:outline-orange-500 text-gray-400"
          />
          <textarea
            value={body}
            placeholder="Description..."
            onChange={(event) => setBody(event.target.value)}
            className="px-6 py-2 mb-5 rounded-md w-full border focus:border-orange-500 focus:outline-orange-500 text-gray-400"
          ></textarea>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 text-white mr-4 bg-red-500 rounded-md hover:bg-red-600"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-white bg-orange-500 rounded-md hover:opacity-80"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
}
