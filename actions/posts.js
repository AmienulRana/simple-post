export async function getAllPostsData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return posts;
}
export async function getDetailPostsData(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const posts = await res.json();
  return posts;
}
