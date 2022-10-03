import { GetStaticProps, GetStaticPropsContext } from "next"

export interface IPostListProps {
    posts: any []
}

function ListPost({posts}: IPostListProps) {
  return (
    <ul>
        {
            posts.map((post) => {
                return (
                    <li key={post.id}>{ post.title }</li>
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
                    id: post.id,
                    title: post.title
                }
            })
        }
    }
}
