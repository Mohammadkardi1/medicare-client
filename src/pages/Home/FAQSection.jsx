import React from 'react'
import faqImg from '../../assets/images/faq-img.png'
import FAQList from '../../components/FAQList/FAQList'

const FAQSection = () => {
  return (
    <section>
      <div className='container'>
        <div className='flex justify-between gap-[50px] lg:gap-0'>


            {/* ========== Left FAQ Section ========== */}
            <div className='w-1/2 hidden md:block'>
                <img src={faqImg} alt='FAQ-Image'/>
            </div>




            {/* ========== Right FAQ Section ========== */}
            <div className='w-1/2'>
              <h1 className='heading mb-8'>Most questions by our beloved patients</h1>
              
              <FAQList/>
            </div>




        </div>
      </div>
    </section>
  )
}

export default FAQSection
