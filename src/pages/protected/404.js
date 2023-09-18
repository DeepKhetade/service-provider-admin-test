import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import FaceFrownIcon  from '@heroicons/react/24/solid/FaceFrownIcon'

function InternalPage(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : ""}))
      }, [])

    return(
        <div className="hero h-4/5 bg-zinc-950">
            <div className="hero-content  text-center">
                <div className="max-w-md">
                {/* <FaceFrownIcon className="h-48 w-48 inline-block"/> */}
                <img src="/fourzerof.png"   w-80 />
                <span className='text-3xl font-bold mt-1'>OOPS !</span>
                <p>Error 404-Page Not Found</p>
                <p>This page  you requested could not be found</p>

                </div>
            </div>
        </div>
    )
}

export default InternalPage