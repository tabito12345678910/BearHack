import Footer from '@/components/footer';
import Landing from '@/components/landing';
import Mission from '@/components/mission';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <Landing />
      <Mission />
      <Footer />
    </div>
  );
};

export default Home;