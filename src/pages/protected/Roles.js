import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Roles from '../../features/Roles'

function InternalPage(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Roles"}))
      }, [])
      
    return(
        <Roles />
    )
}

export default InternalPage