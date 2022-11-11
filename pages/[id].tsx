import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar';

const EditPage = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <>
            <NextNProgress/>
            <p>Task: {id}</p>
        </>
    )
}

export default EditPage