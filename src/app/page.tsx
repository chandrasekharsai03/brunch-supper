import Hero from '@/components/Hero';
import About from '@/components/About';
import FeaturedMenu from '@/components/FeaturedMenu';
import TodaysSpecial from '@/components/TodaysSpecial';
import WhyUs from '@/components/WhyUs';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import OpeningHours from '@/components/OpeningHours';
import Location from '@/components/Location';
import Contact from '@/components/Contact';
import CustomerFeedback from '@/components/CustomerFeedback';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedMenu />
      <TodaysSpecial />
      <WhyUs />
      <Gallery />
      <Reviews />
      <OpeningHours />
      <Location />
      <Contact />
      <CustomerFeedback />
    </>
  );
}
