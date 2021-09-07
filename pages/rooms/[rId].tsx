import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { rId } = router.query

  return <p>Post: {rId}</p>
}

export default Post