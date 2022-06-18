import React from "react";
import "./footer.css";

function Footer() {
  return (
    <>
      <footer className="footer-container">
        <nav>
          <ul>
            <li className="social">
              <a
                href="https://github.com/Nahuel-Ramirez"
                rel="noopenernoreferrer"
                className="btn btn-dark"
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
        <p>Copyright Alkemy Challenge</p>
      </footer>
    </>
  );
}

export default Footer;
