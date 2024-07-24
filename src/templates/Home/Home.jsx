import React from 'react'
import HeroHome from '@/components/Organisms/HeroHome/HeroHome';
import Header from '@/components/Organisms/Header/Header';
import Footer from '@/components/Organisms/Footer/Footer';
import HomeContent from '@/components/Organisms/HomeContent/HomeContent';
import WhereToSee from '@/components/Organisms/WhereToSee/WhereToSee';

function Home() {
    return (
        <div className='bg-black-08 space-y-20'>
            <div className='bg-[url("/images/hero.png")] bg-cover bg-no-repeat'>
                <Header />
                <HeroHome />
            </div>
            <HomeContent />
            <WhereToSee />
            <Footer />
        </div>
    )
}

export default Home