import React, {useState, useEffect} from 'react'
import starIcon from '../../assets/images/Star.png'
import About from './About'
import Reveiw from './Reveiw'
import SidePanel from './SidePanel'
import { useLocation, useNavigate } from 'react-router-dom';
import { calculateAverageRating } from './../../utils/calculateAverageRating';

const DoctorOverview = ({doctorProfileData,  doctorViewMode=false}) => {

  const location = useLocation()
  const navigate = useNavigate()

  const { pathname } = useLocation()


  const [tab, setTab] = useState('About')

   
  const queryParams = new URLSearchParams(location.search)
  const activeTabFromURL = queryParams.get('tab') || "About"


  const handleTabChange = (tab) => {
    setTab(tab)
    navigate(`?tab=${tab}`)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    setTab(activeTabFromURL)
  }, [activeTabFromURL])
 

  return (
    <section className='pt-[35px] lg:pt-[75px]'>
      <div className={`${doctorViewMode ? "" : "container"}`}>
        <div className='max-w-[1170px] mx-auto'>


          <div className='grid grid-cols-1 gap-[20px]'>
            <div>


              <div className='grid grid-cols-3 gap-6'>



                <div className="aspect-square w-full overflow-hidden rounded-xl">
                  <img className="object-cover  w-full"
                        src={doctorProfileData?.photo}/>
                </div>

                <div className='col-span-2'>

                  {doctorProfileData?.specialization &&
                    <div className='bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 inline-block 
                                    lg:text-[16px] lg:leading-7 font-semibold rounded'>
                      {doctorProfileData?.specialization}
                    </div>
                  }

                  <h3 className=' text-headingColor text-[22px] leading-9 mt-3 font-[700]'>
                    Dr. {doctorProfileData?.name}
                  </h3>



                  <div className='flex items-center gap-[6px]'>
                    <span className='flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[600] 
                                  text-headingColor'>
                      <img src={starIcon} alt=''/> 
                        {calculateAverageRating(doctorProfileData?.reviews)}
                    </span>
                    <span className='text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] 
                                  text-textColor'>
                      ({doctorProfileData?.reviews ? doctorProfileData?.reviews?.length : "0"})
                    </span>
                  </div>




                  {doctorProfileData?.bio &&
                    <p className='text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]'>
                      {doctorProfileData?.bio}
                    </p>
                  }

                </div>

              </div>


              <div className='mt-[50px] border-b border-solid border-[#0066ff34]'>
                <button onClick={() => handleTabChange("About")}
                        className={`${tab === 'About' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] 
                                    leading-7 text-headingColor font-semibold`}>
                  About
                </button>

                <button onClick={() => handleTabChange("Reviews")}
                        className={`${tab === 'Reviews' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px]
                                      leading-7 text-headingColor font-semibold`}>
                  Reviews
                </button>

              </div>


              <div className='mt-[50px]'>
                {tab === 'About' ? 
                  <About doctorProfileData={doctorProfileData}/> : 
                  <Reveiw doctorProfileData={doctorProfileData} doctorViewMode={doctorViewMode}/>}
              </div>
            </div>
            
            <div className=' flex justify-center'>
              <SidePanel doctorProfileData={doctorProfileData} doctorViewMode={doctorViewMode}/>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default DoctorOverview
