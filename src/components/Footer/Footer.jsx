import DividerLine from "../ui/DividerLine/DividerLine";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div>
          <p className="heading">Custom Print Store</p>
          <div className="icon-container">
            <i className="fa-brands fa-instagram link"></i>
            <i className="fa-brands fa-twitter link"></i>
            <i className="fa-brands fa-linkedin-in link"></i>
            <i className="fa-brands fa-square-facebook link"></i>
          </div>
        </div>
        <div>
          <p className="heading">
            Get in Touch with Us for the Best Quality Custom Prints & Supplies.
          </p>
          <div className="content">
            <p>
              Qui dolore ipsum quia dolor sit amet, consec tetur adipisci velit,
              sed quia non numquam eius modi tempora incidunt lores ta porro
              ame.
            </p>
          </div>
        </div>
        <div>
          <p className="heading">Quick Links</p>
          <div className="content">
            <p className="link">Know More About us</p>
            <p className="link">Visit Store</p>
            <p className="link">Let&apos;s Connect</p>
          </div>
        </div>
        <div>
          <p className="heading">Important Links</p>
          <div className="content">
            <p className="link">privacy policy</p>
            <p className="link">Shipping Details</p>
            <p className="link">Terms & Conditions</p>
          </div>
        </div>
      </div>
      <DividerLine color="#272727" width="100%" height={1} />
      <div className="footer__copyright-text-container">
        <p className="footer__copyright-text">
          Copyright &copy; 2024 | Custom printing
        </p>
        <p className="footer__powered-by-text"> Powered By You</p>
      </div>
    </div>
  );
};

export default Footer;
