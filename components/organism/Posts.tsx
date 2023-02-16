import Link from "next/link";

interface CardPost {
  title: string;
  body: string;
  id: number;
}
export function CardPost(props: CardPost) {
  const { title, body, id } = props;
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden my-4 mx-2 relative h-64 ">
      <div className="px-3 py-2 h-52">
        <h3 className="text-gray-900 font-semibold text-lg">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{body}</p>
      </div>
      <div className="px-3 py-2 bg-gray-100 h-8 absolute bottom-0 left-0 w-full flex items-center">
        <Link href={`/posts/${id}`}>
          <p className="text-orange-500 hover:underline font-semibold text-sm">
            Read more
          </p>
        </Link>
      </div>
    </div>
  );
}
