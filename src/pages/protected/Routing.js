import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Routings from '../../features/Routing'

function InternalPage() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Routings" }))
    }, [])

    return (
        <Routings />
    )
}

export default InternalPage