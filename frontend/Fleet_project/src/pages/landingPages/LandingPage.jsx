import { Link } from 'react-router-dom';
import '../../../public/assets/css/landingPage/landingpage.css'
import React, { useEffect } from 'react';
import AboutSection from './AboutSection';
import HomeSection from './HomeSection';
import SecuritySection from './SecuritySection';
import ServicesSection from './ServicesSection';
import AppSection from './AppSection';
import FooterSection from './FooterSection'
import ContactSection from './ContactSection'

const LandingPage = () => 
{

  useEffect(() => {
    if (window.location.pathname === '/') {
      const script = document.createElement('script');
      script.src = "https://sitespeak.ai/chatbots/49dc5243-2eaf-44da-847f-d64260062133.js";
      script.async = true;
      document.head.appendChild(script);
  
      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);
       // SHOW MENU
       const showMenu = (toggleId, navId) => {
        const toggle = document.getElementById(toggleId);
        const nav = document.getElementById(navId);
  
        if (toggle && nav) {
          const handleClick = () => {
            nav.classList.toggle('show-menu');
          };
  
          toggle.addEventListener('click', handleClick);
  
          return () => {
            toggle.removeEventListener('click', handleClick);
          };
        }
      };
  useEffect(() => {

    showMenu('nav-toggle', 'nav-menu');

    // REMOVE MENU MOBILE
    const navLink = document.querySelectorAll('.nav__link');

    function linkAction() {
      const navMenu = document.getElementById('nav-menu');
      navMenu.classList.remove('show-menu');
    }

    navLink.forEach((n) => n.addEventListener('click', linkAction));

    return () => {
      navLink.forEach((n) => n.removeEventListener('click', linkAction));
    };
  }, []);

  // SCROLL SECTIONS ACTIVE LINK
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
      const scrollY = window.pageYOffset;

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelector(`.nav__menu a[href*="${sectionId}"]`).classList.add('active-link');
        } else {
          document.querySelector(`.nav__menu a[href*="${sectionId}"]`).classList.remove('active-link');
        }
      });
    }

    window.addEventListener('scroll', scrollActive);

    return () => {
      window.removeEventListener('scroll', scrollActive);
    };
  }, []);

  // CHANGE BACKGROUND HEADER
  useEffect(() => {
    function scrollHeader() {
      const nav = document.getElementById('header');

      if (window.scrollY >= 80) {
        nav.classList.add('scroll-header');
      } else {
        nav.classList.remove('scroll-header');
      }
    }

    window.addEventListener('scroll', scrollHeader);

    return () => {
      window.removeEventListener('scroll', scrollHeader);
    };
  }, []);

  // SHOW SCROLL UP
  useEffect(() => {
    function scrollUp() {
      const scrollUp = document.getElementById('scroll-up');

      if (window.scrollY >= 560) {
        scrollUp.classList.add('show-scroll');
      } else {
        scrollUp.classList.remove('show-scroll');
      }
    }

    window.addEventListener('scroll', scrollUp);

    return () => {
      window.removeEventListener('scroll', scrollUp);
    };
  }, []);

  // DARK LIGHT THEME
  useEffect(() => {
    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme';
    const iconTheme = 'bx-toggle-right';

    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-toggle-left' : 'bx-toggle-right';

    const handleThemeToggle = () => {
      document.body.classList.toggle(darkTheme);
      themeButton.classList.toggle(iconTheme);

      localStorage.setItem('selected-theme', getCurrentTheme());
      localStorage.setItem('selected-icon', getCurrentIcon());
    };

    themeButton.addEventListener('click', handleThemeToggle);

    return () => {
      themeButton.removeEventListener('click', handleThemeToggle);
    };
  }, []);

    return (
        <div className="LandingPage">
          
  {/*=============== HEADER ===============*/}
  <header className="header" id="header">
    <nav className="nav container">
      <Link href="/" className="nav__logo">
        kar<span>gada</span> 
      </Link>
      <div className="nav__menu" id="nav-menu" onClick={showMenu}>
        <ul className="nav__list">
          <li className="nav__item">
            <a href="#home" className="nav__link active-link">
              Home
            </a>
          </li>
          <li className="nav__item">
            <a href="#about" className="nav__link">
              About us
            </a>
          </li>
          <li className="nav__item">
            <a href="#services" className="nav__link">
              Services
            </a>
          </li>
          <li className="nav__item">
            <a href="#contact" className="nav__link">
              Contact us
            </a>
          </li>
          <li className="nav__item">
            <a href="/login" className="nav__link">
              Login
            </a>
          </li>
          <i className="bx bx-toggle-left change-theme" id="theme-button" />
        </ul>
      </div>
      <div className="nav__toggle" id="nav-toggle">
        <i className="bx bx-grid-alt" />
      </div>
      <a href="#" className="button button__header">
        Order Now!
      </a>
    </nav>
  </header>
  <main className="main">
    {/*=============== HOME ===============*/}
              <HomeSection/>
    {/*=============== ABOUT ===============*/}
             <AboutSection/>
    {/*=============== SECURITY ===============*/}
            <SecuritySection/>
    {/*=============== SERVICES ===============*/}
            <ServicesSection/>
    {/*=============== APP ===============*/}
            <AppSection/>
    {/*=============== CONTACT US ===============*/}
            <ContactSection/>
  </main>
  {/*=============== FOOTER ===============*/}
        <FooterSection/>
  {/*=============== SCROLL UP ===============*/}
  <a href="#" className="scrollup" id="scroll-up">
    <i className="bx bx-up-arrow-alt scrollup__icon" />
  </a>
        </div>
    )
}

export default LandingPage;