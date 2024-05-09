import BenefitCard from "../BenefitsCard/BenefitCard";
import photo1 from "../../../assets/about-footer-1.png";
import photo2 from "../../../assets/about-footer-2.png";
import photo3 from "../../../assets/about-footer-3.png";
import photo4 from "../../../assets/about-footer-4.png";

const Footer = () => {
  return (
    <div className="about-footer">
      <div className="card-container">
        <BenefitCard
          imageUrl={photo1}
          heading="worldwide shipping"
          content="It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
        />
        <BenefitCard
          imageUrl={photo2}
          heading="Best Quality"
          content="It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
        />
        <BenefitCard
          heading="Best offers"
          imageUrl={photo3}
          content="It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
        />
        <BenefitCard
          heading="Secure Payments"
          imageUrl={photo4}
          content="It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
        />
      </div>
    </div>
  );
};

export default Footer;
