import Banner from "../../components/Banner/Banner";
import PopularSection from "../../components/PopularSection/PopularSection";
import FeaturesSection from "../../components/FeaturesSection/FeaturesSection";
import MostLovedProduct from "../../components/MostLovedProducts/MostLovedProduct";
import FlexibleBorder from "../../components/ui/FlexibleBorder/FlexibleBorder";
import ClientReviewSection from "../../components/ClientReviewSection/ClientReviewSection";
import FeaturedSection from "../../components/FeaturedSection/FeaturedSection";
import banner1 from "../../assets/MainBannerPhoto.png";
import banner2 from "../../assets/MainBannerPhoto@2x.png";
import DealOfTheDay from "../../components/DealOfTheDay/DealOfTheDay";

const Home = () => {
  return (
    <>
      <header>
        <Banner
          images={[banner1, banner2]}
          heading={"We Print What You Want!"}
          subHeading={`Click edit button to change this text. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sapien.`}
          buttonText={"Get Started"}
          tagline={"Best Quality Products"}
        />
      </header>
      <main>
        <PopularSection />
        <FeaturesSection />
        <DealOfTheDay />
        <MostLovedProduct />
        <FlexibleBorder />
        <ClientReviewSection />
        <FeaturedSection />
      </main>
    </>
  );
};

export default Home;
