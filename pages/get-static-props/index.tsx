import { GetStaticProps, GetStaticPropsContext } from "next"
import Link from "next/link"

export interface IPostListProps {
    posts: any []
}

function ListPost({posts}: IPostListProps) {
  return (
    <ul>
        {
            posts.map((post) => {
                return (
                    <li key={post.id}><Link href={`/get-static-paths/${post.id}`}>{ post.title }</Link></li>
                )
            })
        }
    </ul>
  )
}

export default ListPost

export const  getStaticProps: GetStaticProps<IPostListProps> = async (context: GetStaticPropsContext) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();

    return {
        props: {
            posts: posts.map((post: any) => {
                return {
                    id: post.id.toString(),
                    title: post.title
                }
            })
        }
    }
}
