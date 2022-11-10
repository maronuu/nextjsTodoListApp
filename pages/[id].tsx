import { useRouter } from 'next/router'

const EditPage = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>Post: {id}</p>
}

export default EditPage