import { Button, Alert, Card, Navbar, Container, Row, Col, Modal, Form, ButtonGroup, ToggleButton } from 'react-bootstrap';

import './App.css';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios'
import HeroBG from './Hero-BG.jpg';

import ProjectImage01 from './PortfolioProjects01.png'
import ProjectImage02 from './PortfolioProjects02.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import ResumeContent from './ResumeTimeline.js';
import ProjectBlock from './PortfolioProjects.js';

const colorPrimary = "#3c6e71";
const colorSecondary = "#284b63";
const colorLightBW = "#d9d9d9";
const colorDarkBW = "#353535";
const colorBlack = "#000000"



function App() {


  const aboutRef = useRef(null);
  const resumeRef = useRef(null);
  const portfolioRef = useRef(null);
  const contactRef = useRef(null);
  const navItemsRef = useRef([]);

  const [topNavStatus, toggleTopNavStatus] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState("homeNav");
  const [activeResumeTab, setActiveResumeTab] = useState('v-pills-verizon');

  const [resumeTransition, setResumeTransition] = useState(false);
  const [requestedURL, setRequestedURL] = useState("")
  const [modalPreviewShow, setModalPreviewShow] = React.useState(false);
  const [radioValue, setRadioValue] = useState('0');
  const [contactInfo, setContactInfo] = useState({
    phone: "956*******",
    email: "jc7****@*****.com"
  })
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [hasAuthenticated, setHasAuthenticated] = useState(false);
  const [contactPreference, setContactPreference] = useState("Email");
  const [submitButtonText, setSubmitButtonText] = useState("Submit")
  const viewportHeight = window.innerHeight;


  useEffect(() => {
    window.scrollTo(0, 0); //Scroll to top of page upon reload.
    setTimeout(() => {
      document.querySelector(".hero-container").classList.remove("hero-initial-pos")
    }, 500);
  }, []);

  const useIntersection = (ref, options) => {
    const [hasIntersected, setHasIntersected] = useState(false);
    useEffect(() => {
      const element = ref.current;
      if (!element) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.unobserve(element);
        }
      }, options);
      observer.observe(element);

      return () => {
        if (element) observer.unobserve(element);
      };
    }, [ref, options]);

    return hasIntersected;
  };

  const isAboutVisible = useIntersection(aboutRef, { threshold: 0.1 });
  const isResumeVisible = useIntersection(resumeRef, { threshold: 0.1 });
  const isPortfolioVisible = useIntersection(portfolioRef, { threshold: 0.1 });
  const isContactVisible = useIntersection(contactRef, { threshold: 0.1 });
  const testFunction = useCallback(() => {
    console.log("About is visible: ", isAboutVisible)
  }, [isAboutVisible])
  useEffect(() => {
    testFunction()
  }, [testFunction])
  function toggleTopNav() {
    console.log("topNavStatus: ", topNavStatus);
  }

  const triggerIsScrollFlip = useCallback(() => {
    // console.log("Flip: ", isScrolled, window.scrollY)
    if (window.scrollY == 0) {
      setTimeout(() => {
        if (isScrolled) {
          setIsScrolled(false)
          setCurrentSection("homeNav")
        }
      }, 10);
    } else {
      setIsScrolled(true)
      console.log("Flip set true.")
    }
  }, [])

  useEffect(() => {
    triggerIsScrollFlip()
  }, [triggerIsScrollFlip])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const aboutPositionY = aboutRef.current ? aboutRef.current.getBoundingClientRect().top : 0
      const resumePositionY = resumeRef.current ? resumeRef.current.getBoundingClientRect().top : 0
      const portfolioPositionY = portfolioRef.current ? portfolioRef.current.getBoundingClientRect().top : 0
      const contactPositionY = contactRef.current ? contactRef.current.getBoundingClientRect().top : 0

      // FOR DEBUG
      // console.log(scrollY, isScrolled, aboutPositionY, resumePositionY, currentSection)

      if (scrollY >= 0 && scrollY <= 100) {
        if (currentSection != "homeNav") {
          setCurrentSection("homeNav")
          // console.log("Setting homeNav")
        }
      } else if (Math.abs(aboutPositionY) >= 0 && Math.abs(aboutPositionY) <= 100) {
        if (currentSection != "aboutNav") setCurrentSection("aboutNav")
      } else if (Math.abs(resumePositionY) >= 0 && Math.abs(resumePositionY) <= 100) {
        if (currentSection != "resumeNav") setCurrentSection("resumeNav")
      } else if (Math.abs(portfolioPositionY) >= 0 && Math.abs(portfolioPositionY) <= 100) {
        if (currentSection != "portfolioNav") setCurrentSection("portfolioNav")
      } else if (Math.abs(contactPositionY) >= 0 && Math.abs(contactPositionY) <= 100) {
        if (currentSection != "contactNav") setCurrentSection("contactNav")
      }

      if (scrollY > 1 && !isScrolled) {
        setIsScrolled(true);
        // console.log("setIsScrolled set to true")
        // document.getElementById("sideNav").classList.replace("d-none", "d-block")
      } else if (scrollY === 0 && isScrolled) {
        setIsScrolled(false);
        // console.log("setIsScrolled set to false")
        // document.getElementById("sideNav").classList.replace("d-block", "d-none")
      }
      // triggerIsScrollFlip()

    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled, currentSection]);


  const [sideNavPosition, setSideNavPosition] = useState(null);
  const [mainNavPosition, setMainNavPosition] = useState(null);


  const runNavAnimation = useCallback(() => {
    setTimeout(() => {
      // isScrolled ? document.getElementById("sideNav").classList.replace("d-none", "d-block") : document.getElementById("sideNav").classList.replace("d-block", "d-none")
      // isScrolled ? document.getElementById("mainNav").classList.replace("d-flex", "d-none") : document.getElementById("mainNav").classList.replace("d-none", "d-flex")

    }, 10);

    if (window.innerWidth > 575 && window.innerWidth < 991) {
      if (isScrolled) {
        document.getElementById("mainNav").classList.add("tablet-anim")
        setTimeout(() => {
          document.getElementById("topNavToggle").classList.replace("topNavToggle-initial-pos", "topNavToggle-scrolled-pos")
        }, 500);
      } else {
        toggleTopNavStatus(false);
        document.getElementById("topNavToggle").classList.replace("topNavToggle-scrolled-pos", "topNavToggle-initial-pos")
        setTimeout(() => {
          document.getElementById("mainNav").classList.remove("tablet-anim")
        }, 500);
      }
    }

    if (window.innerWidth > 991) {
      // console.log(window.innerWidth)
      // console.log("Running animation: ", isScrolled)

      const mainLiElements = document.getElementById("mainNav")?.querySelector("ul")?.querySelectorAll("li");
      document.getElementById("sideNav").classList.add("sideNav-initial-pos")

      if (isScrolled) {
        document.getElementById("mainNav").style.opacity = "0";
        document.querySelectorAll("#tempNav").forEach(tempNav => tempNav.remove())
        // console.log("navItemsRef:", navItemsRef[0].getBoundingClientRect().top)
        // console.log("mainLiElements: ", mainLiElements);
        for (let [index, li] of mainLiElements.entries()) {
          const clonedLi = li.cloneNode(true);
          Object.assign(clonedLi.style, {
            transition: "all 1s ease",
            position: "fixed",
            listStyle: "none",
            top: `${li.getBoundingClientRect().top}px`,
            left: `${li.getBoundingClientRect().left}px`,
            padding: "1rem",
            zIndex: "999",
          });
          Object.assign(clonedLi.firstChild.style, {
            padding: "1rem",
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
          });
          clonedLi.id = "tempNav"
          document.body.appendChild(clonedLi)
          setTimeout(() => {
            clonedLi.style.top = `${navItemsRef[index].getBoundingClientRect().top}px`
            clonedLi.style.left = `${navItemsRef[index].getBoundingClientRect().left}px`
          }, 10);

          clonedLi.addEventListener('transitionend', () => {
            clonedLi.remove();
            if (window.scrollY != 0) document.getElementById("sideNav").classList.remove("sideNav-initial-pos")

          }, { once: true });
        }

      } else if (isScrolled == false) {
        document.querySelectorAll("#tempNav").forEach(tempNav => tempNav.remove())
        document.getElementById("mainNav").style.opacity = "0";
        document.querySelectorAll("#tempNav").forEach(tempNav => tempNav.remove())
        // console.log("navItemsRef:", navItemsRef[0].getBoundingClientRect().top)
        // console.log("mainLiElements: ", mainLiElements);
        for (let [index, li] of mainLiElements.entries()) {
          const clonedLi = li.cloneNode(true);
          Object.assign(clonedLi.style, {
            transition: "all 1s ease",
            position: "fixed",
            listStyle: "none",
            top: `${navItemsRef[index].getBoundingClientRect().top}px`,
            left: `${navItemsRef[index].getBoundingClientRect().left}px`,
            padding: "1rem",
            zIndex: "999",
          });
          Object.assign(clonedLi.firstChild.style, {
            padding: "1rem",
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
          });
          clonedLi.id = "tempNav"
          document.body.appendChild(clonedLi)
          setTimeout(() => {
            clonedLi.style.top = `${li.getBoundingClientRect().top}px`
            clonedLi.style.left = `${li.getBoundingClientRect().left}px`
          }, 10);

          clonedLi.addEventListener('transitionend', () => {
            clonedLi.remove();
            if (window.scrollY != 0) document.getElementById("sideNav").classList.add("sideNav-initial-pos")
            document.getElementById("mainNav").style.opacity = "1";

          }, { once: true });

          document.getElementById("sideNav").classList.add("sideNav-initial-pos")
        }
      }

      if (false) {

        // if (isScrolled) {
        //   if (mainNavPosition == null) return
        //   document.getElementById("sideNav").style.opacity = "0"
        //   document.getElementById("mainNav").style.opacity = "0"
        //   document.getElementById("sideNav").classList.replace("d-none", "d-block")

        //   document.querySelectorAll("#tempNav").forEach(tempNav => tempNav.remove())
        //   for (let [index, nav] of navArray.entries()) {
        //     const clonedNav = nav[1].cloneNode(true)
        //     Object.assign(clonedNav.style, {
        //       transition: "all 1s ease",
        //       position: "fixed",
        //       listStyle: "none",
        //       top: `${mainNavPosition[index].top}px`,
        //       left: `${mainNavPosition[index].left}px`,
        //       padding: "1rem",
        //       zIndex: "999",
        //     });
        //     Object.assign(clonedNav.firstChild.style, {
        //       padding: "1rem",
        //       textDecoration: "none",
        //       color: "white",
        //     });
        //     clonedNav.id = "tempNav"
        //     document.body.appendChild(clonedNav)

        //     setTimeout(() => {
        //       clonedNav.style.top = `${nav[0].getBoundingClientRect().top}px`
        //       clonedNav.style.left = `${nav[0].getBoundingClientRect().left}px`
        //     }, 10);

        //     clonedNav.addEventListener('transitionend', () => {
        //       clonedNav.remove();
        //       document.getElementById("sideNav").style.opacity = "1"
        //       document.getElementById("sideNav").classList.replace("d-none", "d-block")

        //     }, { once: true });
        //   }
        // } else if (sideNavPosition != null && isScrolled == false) {
        //   document.getElementById("mainNav").style.opacity = "0"
        //   document.getElementById("sideNav").style.opacity = "0"
        //   document.getElementById("sideNav").classList.replace("d-none", "d-block")

        //   document.querySelectorAll("#tempNav").forEach(tempNav => tempNav.remove())
        //   for (let [index, nav] of navArray.entries()) {
        //     const clonedNav = nav[0].cloneNode(true)
        //     Object.assign(clonedNav.style, {
        //       transition: "all 1s ease",
        //       position: "fixed",
        //       listStyle: "none",
        //       top: `${sideNavPosition[index].top}px`,
        //       left: `${sideNavPosition[index].left}px`,
        //       padding: "1rem",
        //       zIndex: "999",
        //     });
        //     Object.assign(clonedNav.firstChild.style, {
        //       padding: "1rem",
        //       textDecoration: "none",
        //       color: "white",
        //     });
        //     clonedNav.id = "tempNav"
        //     document.body.appendChild(clonedNav)

        //     setTimeout(() => {
        //       clonedNav.style.top = `${nav[1].getBoundingClientRect().top}px`
        //       clonedNav.style.left = `${nav[1].getBoundingClientRect().left}px`
        //     }, 10);

        //     clonedNav.addEventListener('transitionend', () => {
        //       clonedNav.remove();
        //       document.getElementById("mainNav").style.opacity = "1"
        //       document.getElementById("sideNav").classList.replace("d-block", "d-none")
        //     }, { once: true });
        //   }
        // }

      }

    }
    // TO DEBUG: 


  }, [isScrolled])

  useEffect(() => {
    runNavAnimation()
  }, [runNavAnimation])

  const updateCurrentSection = useCallback(() => {
    // console.log("currentSection: ", currentSection)
    const selectedSection = `#${currentSection}`
    document.querySelectorAll(".selected-nav-li").forEach(selectedNav => {
      if (selectedNav.id !== "tempNav") {
        selectedNav.classList.remove("selected-nav-li");
      }
    });
    document.querySelectorAll(selectedSection).forEach(selectedNav => selectedNav.classList.add("selected-nav-li"))
  }, [currentSection])

  useEffect(() => {
    updateCurrentSection()
  }, [updateCurrentSection])

  function processResumeTransition() {
    setResumeTransition(true);
    // setTimeout(() => {
    //   setResumeTransition(false);
    // }, 100);
  }
  useEffect(() => {
    if (resumeTransition) {
      setTimeout(() => {
        setResumeTransition(false)
      }, 200);
    }
  }, [resumeTransition])

  const handleResumeTabClick = (tabId) => {
    setActiveResumeTab(tabId);
    processResumeTransition();
  };

  const processRequestedURL = useCallback(() => {
    if (requestedURL != "") {
      console.log("Requested URL: ", requestedURL)
      setModalPreviewShow(true)
    }
  }, [requestedURL])

  useEffect(() => {
    processRequestedURL()
  }, [processRequestedURL])

  const processRadioSelection = useCallback(() => {
    // console.log("radioValue: ", radioValue)
    const emailTextLabelOptional = document.getElementById("formNumberInputText");
    const phoneTextLabelOptional = document.getElementById("formEmailInputText");
    switch (radioValue) {
      case "0":
        document.getElementById("formNumberRequiredText").classList.add("d-none")
        emailTextLabelOptional.classList.remove("d-none")
        phoneTextLabelOptional.classList.add("d-none")
        break;
      case "1":
        document.getElementById("formEmailRequiredText").classList.add("d-none")
        document.getElementById("formEmailInvalidText").classList.add("d-none")
        emailTextLabelOptional.classList.add("d-none")
        phoneTextLabelOptional.classList.remove("d-none")
        break;
      case "2":
        document.getElementById("formEmailRequiredText").classList.add("d-none")
        document.getElementById("formEmailInvalidText").classList.add("d-none")
        emailTextLabelOptional.classList.add("d-none")
        phoneTextLabelOptional.classList.remove("d-none")
        break;
      case "3":
        document.getElementById("formNumberRequiredText").classList.add("d-none")
        emailTextLabelOptional.classList.add("d-none")
        phoneTextLabelOptional.classList.add("d-none")
        break;
      default:
        break;
    }
  }, [radioValue])

  useEffect(() => {
    processRadioSelection()
  }, [processRadioSelection])

  function removeContactErrors() {
    console.log("Removing contact errors.")
    const errorTextIds = ["formNameRequiredText", "formEmailRequiredText", "formEmailInvalidText", "formNumberRequiredText", "formNumberInvalidText", "formMessageRequiredText"]
    for (let errorTextId of errorTextIds) {
      document.getElementById(errorTextId).classList.add("d-none")
    }
  }
  useEffect(() => {
    removeContactErrors()
  }, [])
  async function evaluateForm(e) {
    e.preventDefault();
    removeContactErrors();
    try {
      const nameValue = document.getElementById("formName").value
      const nameRequired = document.getElementById("formNameRequiredText")
      const emailValue = document.getElementById("formEmail").value
      const emailRequired = document.getElementById("formEmailRequiredText")
      const emailInvalid = document.getElementById("formEmailInvalidText")
      const numberValue = document.getElementById("formNumber").value
      const numberRequired = document.getElementById("formNumberRequiredText")
      const numberInvalid = document.getElementById("formNumberInvalidText")
      const messageValue = document.getElementById("formMessage").value
      const messageRequired = document.getElementById("formMessageRequiredText")
      let missingField = false;
      let invalidField = false;

      const inputValues = [nameValue, emailValue, numberValue, messageValue];
      if (nameValue == "") {
        nameRequired.classList.remove("d-none")
        missingField = true;
      }
      if (emailValue == "" && radioValue != "1" && radioValue != "2") {
        emailRequired.classList.remove("d-none")
        missingField = true;
      }
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue) == false && emailValue != "") {
        emailInvalid.classList.remove("d-none")
        invalidField = true;
      }
      if (/^\+?(\d{1,3})?[-. (]?\d{3}[-. )]?\d{3}[-. ]?\d{4}$/.test(numberValue) == false && numberValue != "") {
        numberInvalid.classList.remove("d-none")
        invalidField = true;
      }
      if (numberValue == "" && radioValue != "0") {
        numberRequired.classList.remove("d-none")
        missingField = true;
      }
      if (messageValue == "") {
        messageRequired.classList.remove("d-none")
        missingField = true;
      }

      if (invalidField) throw new Error("Invalid input(s) entered.");
      if (missingField) throw new Error("Missing field(s). Please check to ensure all required inputs have been entered.");

      if (!missingField && !invalidField) {
        const formData = {
          name: nameValue,
          email: emailValue,
          number: numberValue,
          contactPreference: radioValue,
          message: messageValue
        }
        setSubmitButtonText("Submitting...")
        try {
          console.log("formData: ", formData)
          const response = await fetch(
            'https://script.google.com/macros/s/AKfycbzfi8Yg0LSfJUIhFWfgFdYcSxELRPykYIgFXS505iV6tM303EIu1XzNYWJv2MSGObDy_A/exec',
            {
              redirect: "follow",
              method: 'POST',
              headers: {
                'Content-Type': 'text/plain;charset=utf-8',
              },
              body: JSON.stringify(formData),
            }
          );

          if (!response.ok) {
            throw new Error('Failed to submit the form');
          }

          const responseData = await response.json();
          console.log(responseData.message);
          setSubmitButtonText("Submitted successfully!")
          setTimeout(() => {
            setSubmitButtonText("Submit")
          }, 2000);
        } catch (error) {
          console.error('Contact form submission failed: ', error);
          setSubmitButtonText("Error while submitting.")
          setTimeout(() => {
            setSubmitButtonText("Submit")
          }, 2000);
        } finally {
          // setLoading(false);

        }
      }
    } catch (e) {
      console.error("Form not submitted.", e)
    }

  }
  return (
    <div>
      <button id="topNavToggle" onClick={() => { toggleTopNavStatus(true) }} type="button" className="d-block d-lg-none position-fixed btn top-0 start-0 topNavToggle-initial-pos" style={{ margin: "32px 32px", height: "fit-content", width: "fit-content", zIndex: "999" }}><i className="bi bi-list fs-5"></i></button>
      <div id="topNav" className="d-block d-lg-none " style={{ top: `${topNavStatus ? "0" : "-200dvh"}` }}>
        <button id="topNavClose" onClick={() => { toggleTopNavStatus(false) }} type="button" className="d-block d-lg-none position-absolute btn top-0 start-0" style={{ height: "fit-content", width: "fit-content", zIndex: "999" }}><i className="bi bi-x"></i></button>
        <ul className="d-flex flex-column p-0 align-items-center mx-0 h-75 justify-content-evenly" id="navStyle">
          <li onClick={() => {
            setCurrentSection("homeNav")
            window.scrollTo(0, 0)
            toggleTopNavStatus(false)
          }} id="homeNav"><a href="#" onClick={(e) => { e.preventDefault() }}>Home</a></li>
          <li onClick={() => {
            setCurrentSection("aboutNav")
            window.scrollTo(0, window.scrollY + aboutRef.current.getBoundingClientRect().top)
            toggleTopNavStatus(false)
          }} id="aboutNav"><a href="#" onClick={(e) => { e.preventDefault() }}>About</a></li>
          <li onClick={() => {
            setCurrentSection("resumeNav")
            window.scrollTo(0, window.scrollY + resumeRef.current.getBoundingClientRect().top)
            toggleTopNavStatus(false)
          }} id="resumeNav"><a href="#" onClick={(e) => { e.preventDefault() }}>Resume</a></li>
          <li onClick={() => {
            setCurrentSection("portfolioNav")
            window.scrollTo(0, window.scrollY + portfolioRef.current.getBoundingClientRect().top)
            toggleTopNavStatus(false)
          }} id="portfolioNav"><a href="#" onClick={(e) => { e.preventDefault() }}>Portfolio</a></li>
          <li onClick={() => {
            setCurrentSection("contactNav")
            window.scrollTo(0, window.scrollY + contactRef.current.getBoundingClientRect().top)
            toggleTopNavStatus(false)
          }} id="contactNav"><a href="#" onClick={(e) => { e.preventDefault() }}>Contact</a></li>
        </ul>

      </div>
      <div id="sideNav" className="position-fixed sideNav-initial-pos d-none d-lg-block">
        <ul className="sideNav-pos" id="navStyle">
          <li ref={(li) => navItemsRef[0] = li} onClick={() => {
            setCurrentSection("homeNav")
            window.scrollTo(0, 0)
          }} id="homeNav"><a href="#" onClick={(e) => { e.preventDefault() }}>Home</a></li>
          <li ref={(li) => navItemsRef[1] = li} onClick={() => {
            setCurrentSection("aboutNav")
            window.scrollTo(0, window.scrollY + aboutRef.current.getBoundingClientRect().top)
          }} id="aboutNav"><a href="#" onClick={(e) => { e.preventDefault() }}>About</a></li>
          <li ref={(li) => navItemsRef[2] = li} onClick={() => {
            setCurrentSection("resumeNav")
            window.scrollTo(0, window.scrollY + resumeRef.current.getBoundingClientRect().top)
          }} id="resumeNav"><a href="#" onClick={(e) => { e.preventDefault() }}>Resume</a></li>
          <li ref={(li) => navItemsRef[3] = li} onClick={() => {
            setCurrentSection("portfolioNav")
            window.scrollTo(0, window.scrollY + portfolioRef.current.getBoundingClientRect().top)
          }} id="portfolioNav"><a href="#" onClick={(e) => { e.preventDefault() }}>Portfolio</a></li>
          <li ref={(li) => navItemsRef[4] = li} onClick={() => {
            setCurrentSection("contactNav")
            window.scrollTo(0, window.scrollY + contactRef.current.getBoundingClientRect().top)
          }} id="contactNav"><a href="#" onClick={(e) => { e.preventDefault() }}>Contact</a></li>
        </ul>
      </div>
      <Container id="heroSection" className="d-flex flex-column align-items-center position-relative" fluid style={{ height: "100vh", backgroundImage: `url(${HeroBG})` }}>
        {/* START DEBUGGING: Color key*/}
        <div className="position-absolute top-0 start-0 m-1 d-none" style={{ outline: "solid 1px red" }}>
          {[colorPrimary, colorSecondary, colorLightBW, colorDarkBW].map(color => <div style={{ backgroundColor: `${color}`, border: "1px solid black" }}>{color}</div>)}
          <p className="text-white fw-bold p-1 text-center m-0">Color Key<br></br>DEBUG</p>
        </div>
        {/* END DEBUGGING: Color key*/}

        <Navbar id="mainNav" className="w-100 justify-content-center p-0 d-none d-sm-flex disabled-phone tablet-anim">
          <ul className="d-flex flex-row p-0 align-items-center mx-0 my-2" id="navStyle">
            <li onClick={() => {
              setCurrentSection("homeNav")
              window.scrollTo(0, 0)
            }} id="homeNav"><a href="#" onClick={(e) => { e.preventDefault() }}>Home</a></li>
            <li onClick={() => {
              setCurrentSection("aboutNav")
              window.scrollTo(0, window.scrollY + aboutRef.current.getBoundingClientRect().top)
            }} id="aboutNav"><a href="#" onClick={(e) => { e.preventDefault() }}>About</a></li>
            <li onClick={() => {
              setCurrentSection("resumeNav")
              window.scrollTo(0, window.scrollY + resumeRef.current.getBoundingClientRect().top)
            }} id="resumeNav"><a href="#" onClick={(e) => { e.preventDefault() }}>Resume</a></li>
            <li onClick={() => {
              setCurrentSection("portfolioNav")
              window.scrollTo(0, window.scrollY + portfolioRef.current.getBoundingClientRect().top)
            }} id="portfolioNav"><a href="#" onClick={(e) => { e.preventDefault() }}>Portfolio</a></li>
            <li onClick={() => {
              setCurrentSection("contactNav")
              window.scrollTo(0, window.scrollY + contactRef.current.getBoundingClientRect().top)
            }} id="contactNav"><a href="#" onClick={(e) => { e.preventDefault() }}>Contact</a></li>
          </ul>
        </Navbar>


        <div className="w-100 position-relative" style={{ flex: "1", textShadow: "black 0px 1px 1px" }}>
          <div className="position-absolute hero-container hero-initial-pos">
            <h5 className="fw-light w-100 fw-semibold m-0" style={{ color: colorLightBW }}>Hi there, my name is</h5>
            <h1 className="display-1 w-100 fw-semibold text-white">Jaime Castillo</h1>
            <h5 className="fst-italic fw-semibold w-100 m-0" style={{ color: colorLightBW }}>Front end web developer | Data analyst</h5>
            <div className="mt-3 hero-phone-button-container">
              <button type="button" className="btn hero-main" onClick={() => {
                setCurrentSection("contactNav")
                window.scrollTo(0, window.scrollY + contactRef.current.getBoundingClientRect().top)
              }}><h5 className="m-0 py-1" >Contact</h5></button>
              <button type="button" className="btn hero-secondary" style={{ backgroundColor: "#00000000" }} onClick={() => {
                setCurrentSection("aboutNav")
                window.scrollTo(0, window.scrollY + aboutRef.current.getBoundingClientRect().top)
              }}><h5 className="m-0 py-1 fw-light" style={{ color: colorLightBW, textShadow: "black 0px 1px 1px" }}>Learn More</h5></button>
            </div>
          </div>
        </div>

        <div className="w-100 position-absolute bottom-0" style={{ height: "200px", boxShadow: `${colorBlack} 0px -100px 70px -20px inset` }}></div>
      </Container>

      <Container ref={aboutRef} id="aboutSection" className="px-auto responsive-width" fluid style={{ backgroundColor: `${colorBlack}` }}>
        <div className={isAboutVisible ? "" : "anim-slide-right"} style={{ transition: "all 1s ease" }}>
          <h1 className="display-1 text-white mb-5" >About</h1>

          <div className="d-flex about-flex-responsive justify-content-between pb-4 position-relative" style={{
            background: "linear-gradient(to bottom right, rgb(15, 15, 15), rgb(0, 0, 0))",
            padding: "1rem",
            paddingBottom: "1rem",
            borderRadius: "10px"
          }}>
            <div className="about-image me-3"></div>
            <div className="w-auto text-white about-text d-flex flex-column ms-3">
              <div className="d-flex flex-column flex-grow-1 justify-content-between">
                <span className="mb-1 fw-semibold">
                  Hello! I am a Texas-born bilingual front-end web developer and data analyst passionate about building user-friendly and innovative web experiences. I leverage my technical skills and analytical background to create engaging applications.
                </span>
                <p className="my-1">Proficient in front-end development using React.js, Bootstrap, HTML5, and CSS.</p>
                <p className="my-1">Proven ability to analyze complex datasets, identify trends, and improve workflows using JavaScript and Plotly.js</p>
                <p className="my-1">Adept at customer service and technical support, with experience troubleshooting devices and resolving inquiries in fast-paced environments (Starry, Inc., Apple, Frontier Communications).</p>
                <p className="my-1">Self-taught photographer with experience in Adobe Lightroom and Photoshop.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container ref={resumeRef} id="resumeSection" className="px-auto responsive-width" fluid style={{ backgroundColor: `${colorBlack}`, minHeight: "100vh" }}>
        <div className={isResumeVisible ? "" : "anim-slide-left"} style={{ transition: "all 1s ease" }}>

          <div className="w-100 d-flex flex-column justify-content-center" >
            <h1 className="display-1 text-white w-100 text-end my-5">Resume</h1>
          </div>
          <div id="resumeContainer" className="h-50 position-relative">
            <div className="d-flex align-items-start flex-responsive">

              <div className="dropdown mb-3 d-lg-none w-100">
                <button className="btn dropdown-toggle float-end text-white" style={{ backgroundColor: colorPrimary }} type="button" id="dropdownResumeMenuButton" data-bs-toggle="dropdown" aria-expanded="false" >
                  <span className="px-3 fw-semibold">
                    {activeResumeTab === 'v-pills-verizon' && 'Verizon'}
                    {activeResumeTab === 'v-pills-starry' && 'Starry, Inc.'}
                    {activeResumeTab === 'v-pills-apple' && 'Apple'}
                    {activeResumeTab === 'v-pills-frontier' && 'Frontier Communications'}
                    {activeResumeTab === 'v-pills-whataburger' && 'Whataburger'}
                  </span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownResumeMenuButton">
                  <li><button className={`dropdown-item ${activeResumeTab === 'v-pills-verizon' ? 'active' : ''}`} type="button" onClick={() => {
                    document.getElementById(activeResumeTab).classList.toggle("active")
                    document.getElementById(activeResumeTab).classList.toggle("show")
                    document.getElementById("v-pills-verizon").classList.add("active")
                    document.getElementById("v-pills-verizon").classList.add("show")
                    handleResumeTabClick('v-pills-verizon')
                  }} >Verizon</button></li>
                  <li><button className={`dropdown-item ${activeResumeTab === 'v-pills-starry' ? 'active' : ''}`} type="button" onClick={() => {
                    document.getElementById(activeResumeTab).classList.toggle("active")
                    document.getElementById(activeResumeTab).classList.toggle("show")
                    document.getElementById("v-pills-starry").classList.add("active")
                    document.getElementById("v-pills-starry").classList.add("show")
                    handleResumeTabClick('v-pills-starry')
                  }}  >Starry, Inc.</button></li>
                  <li><button className={`dropdown-item ${activeResumeTab === 'v-pills-apple' ? 'active' : ''}`} type="button" onClick={() => {
                    document.getElementById(activeResumeTab).classList.toggle("active")
                    document.getElementById(activeResumeTab).classList.toggle("show")
                    document.getElementById("v-pills-apple").classList.add("active")
                    document.getElementById("v-pills-apple").classList.add("show")
                    handleResumeTabClick('v-pills-apple')
                  }} >Apple</button></li>
                  <li><button className={`dropdown-item ${activeResumeTab === 'v-pills-frontier' ? 'active' : ''}`} type="button" onClick={() => {
                    document.getElementById(activeResumeTab).classList.toggle("active")
                    document.getElementById(activeResumeTab).classList.toggle("show")
                    document.getElementById("v-pills-frontier").classList.add("active")
                    document.getElementById("v-pills-frontier").classList.add("show")
                    handleResumeTabClick('v-pills-frontier')
                  }}>Frontier Communications</button></li>
                  <li><button className={`dropdown-item ${activeResumeTab === 'v-pills-whataburger' ? 'active' : ''}`} type="button" onClick={() => {
                    document.getElementById(activeResumeTab).classList.toggle("active")
                    document.getElementById(activeResumeTab).classList.toggle("show")
                    document.getElementById("v-pills-whataburger").classList.add("active")
                    document.getElementById("v-pills-whataburger").classList.add("show")
                    handleResumeTabClick('v-pills-whataburger')
                  }}>Whataburger</button></li>
                </ul>
              </div>

              <div className="nav flex-column nav-pills position-relative mx-5 d-none d-lg-flex" id="v-pills-tab" role="tablist" aria-orientation="vertical" >

                <button onClick={() => { handleResumeTabClick('v-pills-verizon') }} className="nav-link active" id="v-pills-verizon-tab" data-bs-toggle="pill" data-bs-target="#v-pills-verizon" type="button" role="tab" aria-controls="v-pills-verizon" aria-selected="true">Verizon</button>
                <button onClick={() => { handleResumeTabClick('v-pills-starry') }} className="nav-link" id="v-pills-starry-tab" data-bs-toggle="pill" data-bs-target="#v-pills-starry" type="button" role="tab" aria-controls="v-pills-starry" aria-selected="false">Starry, Inc.</button>
                <button onClick={() => { handleResumeTabClick('v-pills-apple') }} className="nav-link" id="v-pills-apple-tab" data-bs-toggle="pill" data-bs-target="#v-pills-apple" type="button" role="tab" aria-controls="v-pills-apple" aria-selected="false">Apple</button>
                <button onClick={() => { handleResumeTabClick('v-pills-frontier') }} className="nav-link" id="v-pills-frontier-tab" data-bs-toggle="pill" data-bs-target="#v-pills-frontier" type="button" role="tab" aria-controls="v-pills-frontier" aria-selected="false">Frontier <br></br>Communications</button>
                <button onClick={() => { handleResumeTabClick('v-pills-whataburger') }} className="nav-link" id="v-pills-whataburger-tab" data-bs-toggle="pill" data-bs-target="#v-pills-whataburger" type="button" role="tab" aria-controls="v-pills-whataburger" aria-selected="false">Whataburger</button>

              </div>
              <div className="tab-content position-relative" id="v-pills-tabContent" style={{ opacity: `${resumeTransition ? "0" : "1"}` }}>
                <div className="tab-pane fade show active position-relative" id="v-pills-verizon" role="tabpanel" aria-labelledby="v-pills-verizon-tab">
                  <ResumeContent
                    title={"Data Analyst"}
                    location={"Verizon-Remote"}
                    duration={"March 2023 to December 2024"}
                    description={`Incedo Inc. is a digital transformation and consulting company that provides services in data science,
analytics, and technology. It partners with clients across industries such as financial services, life
sciences, and telecommunications to deliver innovative solutions and drive sustainable business growth.
Within this role, I served as a member of a triage team (contract role) at a major wireless phone company,
specializing in the analysis of ticket description data to identify trends and recurring patterns. Key
responsibilities included:
• Analyzed ticket description data to identify recurring trends and patterns, supporting problem diagnosis
submitted by customer service representatives.
• Processed large datasets containing tens of thousands of ticket issues to extract actionable insights
and improve triage efficiency.
• Developed semi-automated solutions using front-end web technologies, including React.js, Bootstrap,
and Plotly.js, to streamline data visualization and trend identification.
• Documenting trends using Google Sheets, Google Slides, and Google Drive, incorporating Google Apps
Script where applicable.
• Enhanced team workflows by reducing manual analysis through the implementation of interactive and
dynamic data-driven tools.
• Communicated with team members to efficiently address issues out of my scope of support.
`}
                    rod={'Layoff; Company-wide contract ended'}
                    subcontractor={"Incedo, Inc."}
                  />
                </div>
                <div className="tab-pane fade" id="v-pills-starry" role="tabpanel" aria-labelledby="v-pills-starry-tab">
                  <ResumeContent
                    title={"Customer/Technical Support"}
                    location={"Starry, Inc.-Remote"}
                    duration={"July 2022 to January 2023"}
                    description={`Starry Internet is a fixed wireless broadband Internet service provider that uses millimeter-band LMDS
connections to connect its base stations to customer buildings.
In this role, we assisted customers accordingly via either phone, email, or live chat. Here, we worked in
different areas including, but not limited to, retention, technical support, upselling, billing, and booking
appointments. Some of my tasks included:
• Using the company's CMR, of which include Salesforce, Zendesk, Zendesk Chat, and alternate custom
software.
• Troubleshooting customer devices as well as Starry's custom provided modem/router equipment.
• Used Slack to intercommunicate with other departments, of which included the dispatch team, the
subscribers account's team, and the senior advisors' team.
• De-escalating upset customers from supervisor escalations, as well as working conjunctively with our
respective supervisors to diffuse scenarios.
• Helping customers understand their bills and any questions of which may entail.
`}
                    rod={'Layoff due to company bankrupcy'}
                    subcontractor={null}
                  />
                </div>

                <div className="tab-pane fade" id="v-pills-apple" role="tabpanel" aria-labelledby="v-pills-apple-tab">
                  <ResumeContent
                    title={"Customer/Technical Support"}
                    location={"Apple-Remote"}
                    duration={"March 2022 to July 2022"}
                    description={`Majorel is an international company that outsources employees, specializing in the customer/business
experience sector.
As for my role, I worked under one of the biggest tech companies in the world, although I'm not able to
disclose which. Some of my tasks involved:
• Adapting to MacOS in a matter of days, using the company's CMR.
• Troubleshooting iPads, iPhones, and Apple Watches.
• Reviewing service options with customers as well as scheduling appointment reservations.
• Working with a high influx of customers whilst building rapport with customers. After each call, a short
summary would be written under the customer's account.
• Cold/warm transferring to other departments when necessary, or when the issue was out of my scope of support.
`}
                    rod={'Received better economic opportunity; lack of management'}
                    subcontractor={"Majorel"}
                  />
                </div>

                <div className="tab-pane fade" id="v-pills-frontier" role="tabpanel" aria-labelledby="v-pills-frontier-tab">
                  <ResumeContent
                    title={"Customer Service Representative"}
                    location={"Frontier Communications-Remote"}
                    duration={"July 2021 to March 2022"}
                    description={`Although OneSupport (previously TeleNetwork, to avoid confusion) has different business sectors, the
sector I was in in dealt with being subcontractors for other companies. In my case, I was under a contract
for Frontier Communications. Frontier Communications is a telecommunications company that offers
internet, landline, and previously TV services. In here, our role as customer service representatives
carries out multiple tasks, among them including- but not limited to:
• Understanding and using company CRM software.
• Addressing customer concerns and dealing with them appropriately, including billing inquiries/disputes,
upgrading and changing customers' plans, issuing credits and diffusing customers threatening to leave,
customers experiencing difficulties with their online Frontier accounts or e-mails, written off accounts,
among other issues.
• Working with internal departments (technical support, collections, sales, etc) and redirecting customers based on their concerns.
It does go to mention it is not uncommon for us to work with upset customers here and there, many of which resort to foul language and insults. Alongside my previous job, I have become fairly familiar with diffusion methods.
`}
                    rod={'Received better economic opportunity; left after 2 weeks notice'}
                    subcontractor={"OneSupport"}
                  /></div>

                <div className="tab-pane fade" id="v-pills-whataburger" role="tabpanel" aria-labelledby="v-pills-whataburger-tab">
                  <ResumeContent
                    title={"Team Member"}
                    location={"Whataburger-Brownsville, TX"}
                    duration={"June 2020 to October 2021"}
                    description={`In this role, I gained valuable experience in a fast-paced, customer-focused environment by taking on
diverse responsibilities across multiple stations, including:
• Drive-thru order taking and cashier operations, ensuring prompt and accurate service to a high volume
of customers daily.
• Food preparation, grill station, and drink station management, maintaining high-quality standards and
adhering to safety protocols.
• Engaging with a bilingual customer base (English and Spanish) to deliver excellent service and resolve
inquiries effectively.
• Collaborated with team members to ensure smooth operations during peak hours, demonstrating
adaptability and strong communication skills.
• Provided maintenance and inventory support, contributing to the overall efficiency and cleanliness of the workplace.
This role honed my ability to thrive under pressure, build rapport with diverse individuals, and maintain a focus on excellence in service delivery.
`}
                    rod={'Received better economic opportunity; left after 2 weeks notice'}
                    subcontractor={null}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container ref={portfolioRef} id="portfolioSection" className="px-auto responsive-width" fluid style={{ backgroundColor: `${colorBlack}` }}>
      <div className={isPortfolioVisible ? "" : "anim-slide-right"} style={{ transition: "all 1s ease" }}>

        <h1 className="display-1 text-white my-5">Portfolio</h1>

        <div className="d-flex  pb-4 position-relative portfolio-content-layout" style={{ minHeight: "fit-content", maxHeight: "75vh" }}>
          <ProjectBlock
            title={"Password Generator"}
            description={"UTSA BOOTCAMP PROJECT: Password generator with different criteria; 8-128 characters."}
            url={"https://jc79932.github.io/Au-Hasard/"}
            cover={ProjectImage01}
            sendURL={setRequestedURL}
          />
          <ProjectBlock
            title={"Project Cerulean."}
            description={"UTSA BOOTCAMP PROJECT: Timed pop quiz with varying front end questionnaire."}
            url={"https://jc79932.github.io/Project-Cerulean./"}
            cover={ProjectImage02}
            sendURL={setRequestedURL}
          />
        </div>
        </div>
      </Container>
      <Container ref={contactRef} id="contactSection" className="px-auto responsive-width" fluid style={{ backgroundColor: `${colorBlack}`, minHeight: "100vh" }}>
      <div className={isContactVisible ? "" : "anim-slide-left"} style={{ transition: "all 1s ease" }}>

        <div className="w-100 d-flex flex-column justify-content-center" style={{ height: "11rem" }}>
          <h1 className="display-1 text-white w-100 text-end">Contact</h1>
          <h5 className="text-white w-100 text-end fw-light fst-italic">Let's get in touch!</h5>

        </div>

        <div className="w-100 d-flex contact-flow ">
          <div className="d-flex justify-content-start flex-column position-relative contact-items" style={{ gap: "1rem", zIndex: "2" }}>
            <div className="ms-auto d-flex contact-method text-break"
              onClick={() => {
                if (hasAuthenticated) {
                  window.location.href = `mailto:${contactInfo.email}?subject=Contact from Portfolio&body=Hello, I would like to get in touch!`
                }
              }}>
              <div className="rounded-circle bg-white m-3 position-relative d-inline-block" style={{ height: "3rem", minWidth: "3rem" }}>
                <i className="bi bi-envelope-at-fill position-absolute start-50 top-50 translate-middle" style={{ fontSize: "2rem" }}></i>
              </div>
              <div className="d-inline-block d-flex flex-column justify-content-center">
                <span className="text-white font-monospace">{contactInfo.email}</span>
              </div>
            </div>

            <div className="ms-auto d-flex contact-method"
              onClick={() => {
                if (hasAuthenticated) {
                  window.location.href = `tel:+1${contactInfo.phone}`
                }
              }}>
              <div className="rounded-circle bg-white m-3 position-relative d-inline-block" style={{ height: "3rem", minWidth: "3rem" }}>
                <i className="bi bi-telephone-fill position-absolute start-50 top-50 translate-middle" style={{ fontSize: "2rem" }}></i>
              </div>
              <div className="d-inline-block d-flex flex-column justify-content-center">
                <span className="text-white font-monospace">{contactInfo.phone}</span>
              </div>
            </div>

            <div className="ms-auto d-flex contact-method " onClick={() => { window.open("https://github.com/jc79932", "_blank") }}>
              <div className="rounded-circle bg-white m-3 position-relative d-inline-block" style={{ height: "3rem", minWidth: "3rem" }}>
                <i className="bi bi-github position-absolute start-50 top-50 translate-middle" style={{ fontSize: "2rem" }}></i>
              </div>
              <div className="d-inline-block d-flex flex-column justify-content-center">
                <span className="text-white font-monospace">jc79932</span>
              </div>
            </div>
            <button type="button" className={`btn text-white ms-auto fw-semibold ${hasAuthenticated ? "d-none" : ""}`} id="revealContactsButton" style={{ backgroundColor: `${colorPrimary}` }} onClick={async () => {
              setIsAuthenticating(true)
              try {
                const response = await axios.get('https://script.google.com/macros/s/AKfycbzBWtH3t5Euc_zFT8pwtpR2-Dq9lSt27OkyB0W3tTI_m0eK8gXhkLEQZqE7VMtwnK60/exec', {
                  params: { apiKey: 'JC00001' }
                });
                setContactInfo(response.data);
              } catch (error) {
                console.error("Error fetching contact info:", error);
              } finally {
                setHasAuthenticated(true)
              }
            }}>{isAuthenticating ?
              <>
                Authenticating...
                <div className="spinner-border spinner-border-sm ms-1" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>

              </>
              : "Click to reveal"}  </button>
          </div>
          <Form className="contact-items">
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label className="text-white"><h5>Name</h5></Form.Label>
              <Form.Control className="contact-input" type="text" placeholder="" />
              <Form.Text id="formNameRequiredText" className="fst-italic fw-light text-danger">
                * Required
              </Form.Text>
            </Form.Group>


            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="text-white"><h5>Email</h5></Form.Label>
                  <Form.Control className="contact-input" type="email" placeholder="" />
                  <Form.Text id="formEmailInputText" className="fst-italic form-text-optional">
                    (Optional)
                  </Form.Text>
                  <Form.Text id="formEmailRequiredText" className="fst-italic fw-light text-danger">
                    * Required
                  </Form.Text>
                  <Form.Text id="formEmailInvalidText" className="fst-italic fw-light text-danger">
                    * Invalid Email
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formNumber">

                  <Form.Label className="text-white"><h5>Phone</h5></Form.Label>
                  <Form.Control className="contact-input" type="tel" placeholder="" />
                  <Form.Text id="formNumberInputText" className="fst-italic form-text-optional">
                    (Optional)
                  </Form.Text>
                  <Form.Text id="formNumberRequiredText" className="fst-italic fw-light text-danger">
                    * Required
                  </Form.Text>
                  <Form.Text id="formNumberInvalidText" className="fst-italic fw-light text-danger">
                    * Invalid Phone Number
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formRadioSection">
              <Form.Label className="text-white"><h5>Contact preference</h5></Form.Label>
              <div className="d-none">
                <Form.Check
                  className="text-white"
                  inline
                  label="Email"
                  name="radioPreference"
                  type="radio"
                  id="preferenceEmail"
                />
                <Form.Check
                  className="text-white"
                  inline
                  label="Call"
                  name="radioPreference"
                  type="radio"
                  id="preferenceCall"
                />
                <Form.Check
                  className="text-white"
                  inline
                  label="Text"
                  name="radioPreference"
                  type="radio"
                  id="preferenceText"
                />
                <Form.Check
                  className="text-white"
                  inline
                  label="Any"
                  name="radioPreference"
                  type="radio"
                  id="preferenceAny"
                />
              </div>
              <br></br>
              <ButtonGroup style={{ borderRadius: "10px" }} className="mb-2 preference-group">
                <ToggleButton
                  className={radioValue === "0" ? "preference-radio-selected-first" : "preference-radio-unselected-first"}
                  key="preferenceEmail"
                  id="radioEmail"
                  type="radio"
                  name="Email"
                  value="0"
                  checked={radioValue === "0"}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}>Email</ToggleButton>

                <ToggleButton
                  className={radioValue === "1" ? "preference-radio-selected" : "preference-radio-unselected"}
                  key="preferenceCall"
                  id="radioCall"
                  type="radio"
                  name="Call"
                  value="1"
                  checked={radioValue === "1"}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}>Call</ToggleButton>
                <ToggleButton
                  className={radioValue === "2" ? "preference-radio-selected" : "preference-radio-unselected"}
                  key="preferenceText"
                  id="radioText"
                  type="radio"
                  name="Text"
                  value="2"
                  checked={radioValue === "2"}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}>Text</ToggleButton>
                <ToggleButton
                  className={radioValue === "3" ? "preference-radio-selected-last" : "preference-radio-unselected-last"}
                  key="preferenceAny"
                  id="radioAny"
                  type="radio"
                  name="Any"
                  value="3"
                  checked={radioValue === "3"}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}>Any</ToggleButton>
              </ButtonGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label className="text-white"><h5>Message</h5></Form.Label>
              <Form.Control className="contact-input" as="textarea" rows={3} style={{ resize: "none" }} />
              <Form.Text id="formMessageRequiredText" className="fst-italic fw-light text-danger">
                * Required
              </Form.Text>
            </Form.Group>

            <Button id="contactFormSubmit" style={{ backgroundColor: `${submitButtonText == "Submit" ? colorPrimary : ""}`, border: "none", float: "right" }} className={`btn ${submitButtonText == "Error while submitting." ? "btn-danger" : submitButtonText == "Submitted successfully!" ? "btn-success" : "submit-button"}`} type="submit" onClick={(e) => evaluateForm(e)}>
              {submitButtonText}
              <div className={`spinner-border spinner-border-sm ms-1 ${submitButtonText == "Submitting..." ? "" : "d-none"}`} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </Button>
          </Form>

        </div>
        </div>
      </Container>

      <Modal dialogClassName="preview-modal-size" show={modalPreviewShow} onHide={() => {
        setModalPreviewShow(false)
        setRequestedURL("")
      }}>
        <Modal.Header closeButton >
          <Modal.Title>{requestedURL}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <iframe
            id="iframeModalPreview"
            title="Preview"
            width="100%"
            height="100%"
            src={requestedURL}>
          </iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { window.open(requestedURL, "_blank") }}>
            <span className="small">Visit website <i className="ms-1 bi bi-box-arrow-up-right"></i></span>
          </Button>
        </Modal.Footer>
      </Modal>

      <footer>
        <p className="small text-center" >©2025 Jaime Castillo. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
