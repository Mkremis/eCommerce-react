import React, { Suspense} from "react";
import Loader from "../components/Loader";
const Hero = React.lazy(() => import("../components/Hero"));
const HomeContent = React.lazy(() => import("../components/HomeContent"));

const Home = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Hero />
      <HomeContent />
    </Suspense>
  );
};
export default Home;
