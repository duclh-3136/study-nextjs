import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import { useRouter } from "next/router"

export interface IPostDetailProps {
  id: number,
  title: string
}

function PostDetail(post: IPostDetailProps) {
  const router = useRouter()

  return (
    <div>
      <p>id:{post.id}</p>
      <p>title: {post.title}</p>
    </div>
  )
}

export default PostDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return {
    paths: posts.map((post: any) => {
      return { params: { postId: post.id.toString()} }
    }),
    fallback: false
  }
}

export const  getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const postId = context.params?.postId

  if(!postId) {
    return {
      notFound: true
    }
  }

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const post = await res.json();

  return {
    props: {
      id: post.id,
      title: post.title
    }
  }
}
