import Layout from "../components/layout/Index";
import { BiSearch, BiTrash } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import { getAllPostsData } from "../actions/posts";
import Link from "next/link";
import Pagination from "../components/elements/Pagination";
import { useEffect, useState } from "react";
import Modal from "../components/elements/Modal";

interface TypePosts {
  userId?: number;
  id: number;
  title: string;
  body: string;
  posts: TypePosts[];
}

export interface Post {
  userId?: number;
  id: number;
  title: string;
  body: string;
}

const Home = ({ posts }: TypePosts) => {
  const [currentItems, setCurrentItems] = useState<any>([]);
  const [postsSearch, setPostSearch] = useState<any>([]);
  const [dataPost, setDataPosts] = useState(posts);
  const [isModalOpen, setIsModalOpen] = useState("");
  const [postSelected, setPostSelected] = useState<Post>({
    userId: 0,
    id: 0,
    title: "",
    body: "",
  });

  const handleAddPost = async (post: Post) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    setDataPosts([...dataPost, { ...data, id: post.id }]);
  };
  const handleDeletePost = async (id: number) => {
    setDataPosts(dataPost.filter((post) => post.id !== id));

    setPostSearch(postsSearch.filter((post: Post) => post.id !== id));
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
  };
  const handleEditPost = async (post: Post) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      {
        method: "PUT",
        body: JSON.stringify(post),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    setDataPosts(
      posts.map((p) => (p.id === data.id ? { ...data, id: post?.id } : p))
    );
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
    setIsModalOpen("");
    setPostSelected({
      userId: 0,
      id: 0,
      title: "",
      body: "",
    });
  };
  return (
    <Layout>
      <section className="flex flex-wrap justify-between w-full my-12 lg:my-24">
        <button
          className="text-white bg-orange-500 rounded-md flex justify-center items-center sm:min-w-max h-10 px-4 hover:opacity-80"
          onClick={() => setIsModalOpen("Add")}
        >
          Add Article
        </button>
        <div className="relative sm:w-4/12 mt-4 sm:mt-0 w-full">
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
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 flex-wrap justify-center">
          {currentItems?.map((post: Post) => (
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden my-4 mx-2 relative h-64 "
              key={post?.id}
            >
              <div className="px-3 py-2 h-52">
                <h3 className="text-gray-900 font-semibold text-lg">
                  {post?.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{post?.body}</p>
              </div>
              <div className="px-3 py-2 bg-gray-100 h-8 absolute bottom-0 left-0 w-full flex justify-between items-center">
                <Link href={`/${post?.id}`}>
                  <p className="text-orange-500 hover:underline font-semibold text-sm">
                    Read more
                  </p>
                </Link>
                <section className="flex items-center">
                  <button
                    className="bg-transparent flex items-center mr-2"
                    onClick={() => {
                      setPostSelected(post);
                      setIsModalOpen("Edit");
                    }}
                  >
                    <BsPencilSquare className="text-base text-orange-500" />
                  </button>
                  <button
                    className="bg-transparent flex items-center"
                    onClick={() => handleDeletePost(post?.id)}
                  >
                    <BiTrash className="text-xl text-red-500" />
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
        isModalOpen={isModalOpen === "Add"}
        handleCloseModal={handleCloseModal}
        onSubmit={handleAddPost}
        post={postSelected}
      />
      <PostForm
        post={postSelected}
        isModalOpen={isModalOpen === "Edit" && postSelected?.title !== ""}
        handleCloseModal={handleCloseModal}
        onSubmit={handleEditPost}
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
  post: Post;
}
export function PostForm({
  isModalOpen,
  handleCloseModal,
  onSubmit,
  post,
}: TypePostForm) {
  const [title, setTitle] = useState(post?.title);
  const [body, setBody] = useState(post?.body);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(post?.title);
    setBody(post?.body);
  }, [post?.title, post?.body]);

  const handleSubmit = (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();
    if (!post) {
      onSubmit({ userId: 1, title, body, id: Date.now() });
    } else {
      onSubmit({
        ...post,
        title: title ? title : post.title,
        body: body ? body : post.body,
      });
    }
    handleCloseModal();
    setTitle("");
    setBody("");
    setLoading(false);
  };
  return (
    <Modal open={isModalOpen}>
      <section className="px-4 h-72 py-6">
        <h1 className="text-xl font-bold mb-4">
          {post.title ? "Edit" : "Add"} Post
        </h1>
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
              disabled={loading || !title}
            >
              {post.title ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
}
