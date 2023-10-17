const FooterSection = () => 
{
    return (
        <>
            <footer className="footer section">
    <div className="footer__container container grid">
      <div className="footer__content">
        <a href="#" className="footer__logo">
          Delivery
        </a>
        <p className="footer__description">
          Order Products Faster <br /> Easier
        </p>
      </div>
      <div className="footer__content">
        <h3 className="footer__title">Our Services</h3>
        <ul className="footer__links">
          <li>
            <a href="#" className="footer__link">
              Pricing{" "}
            </a>
          </li>
          <li>
            <a href="#" className="footer__link">
              Discounts
            </a>
          </li>
          <li>
            <a href="#" className="footer__link">
              Report a bug
            </a>
          </li>
          <li>
            <a href="#" className="footer__link">
              Terms of Service
            </a>
          </li>
        </ul>
      </div>
      <div className="footer__content">
        <h3 className="footer__title">Our Company</h3>
        <ul className="footer__links">
          <li>
            <a href="#" className="footer__link">
              Blog
            </a>
          </li>
          <li>
            <a href="#" className="footer__link">
              Our mision
            </a>
          </li>
          <li>
            <a href="#" className="footer__link">
              Get in touch
            </a>
          </li>
        </ul>
      </div>
      <div className="footer__content">
        <h3 className="footer__title">Community</h3>
        <ul className="footer__links">
          <li>
            <a href="#" className="footer__link">
              Support
            </a>
          </li>
          <li>
            <a href="#" className="footer__link">
              Questions
            </a>
          </li>
          <li>
            <a href="#" className="footer__link">
              Customer help
            </a>
          </li>
        </ul>
      </div>
      <div className="footer__social">
        <a href="#" className="footer__social-link">
          <i className="bx bxl-facebook-circle " />
        </a>
        <a href="#" className="footer__social-link">
          <i className="bx bxl-twitter" />
        </a>
        <a href="#" className="footer__social-link">
          <i className="bx bxl-instagram-alt" />
        </a>
      </div>
    </div>
    <p className="footer__copy">© Kargada. All right reserved</p>
  </footer>
        </>
    )
}
export default FooterSection