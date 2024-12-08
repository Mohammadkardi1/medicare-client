import { useEffect } from "react"
import {  Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { verifyEmail } from './../redux/thunks/authThunks';


import success from "../assets/images/success.png"
import failure from "../assets/images/failure.png"




// import { verifyEmail } from "../redux/actions/AuthActions"
// import PageLoadingModel from "./Models/PageLoadingModel"



const VerifyEmail = () => {
	const param = useParams()
	const dispatch = useDispatch()


    const {isVerified, authError, loading} = useSelector(state => state.auth)




	useEffect(() => {
		try {
			dispatch(verifyEmail({role: param.role, id: param.id, token: param.token}))
		} catch (error) {
			console.log(error)
		}
	}, [])

	// if (loading) {
	// 	return <PageLoadingModel/>
	// }
	


	return (

		<div className='w-full mt-12 flex flex-col gap-6 items-center justify-center font-bold'>


		
			{isVerified === true &&
				<>
					<img src={success} alt="success_img" className='w-[150px] lg:w-[250px]' />
					<h1 className="plain-text text-center">
						Email verified successfully! Please Log in.
					</h1>
					<Link to="/login">
						<button className='primary px-4'>Login</button>
					</Link>
				</>
				}
				
				{isVerified === false &&
					<>
						<img src={failure} alt="failure_img" className='w-[150px] lg:w-[250px]' />
						<h1 className="plain-text text-center">
							{authError}
						</h1>
					</>
				}
		</div>
	);
};

export default VerifyEmail