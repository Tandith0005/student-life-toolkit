import Features from '../Components/Home/Features';
import Testimonials from '../Components/Home/Testimonials';
import Hero from '../Components/Home/Hero';
import LearnMore from '../Components/Home/LearnMore';

const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <Hero></Hero>

      {/* Features Section */}
      <Features></Features>

      {/* Testimonials Section */}
      <Testimonials></Testimonials>
      {/* Learn More */}
      <LearnMore></LearnMore>
    </div>
  );
};

export default Home;