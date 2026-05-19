import React from "react";
import styles from "./Footer.module.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Social Icons */}
      <div className={styles.social}>
        <FaFacebookF />
        <FaInstagram />
        <FaTwitter />
        <FaYoutube />
      </div>

      {/* Links Section */}
      <div className={styles.linksContainer}>
        <div className={styles.column}>
          <a href="#">Audio Description</a>
          <a href="#">Investor Relations</a>
          <a href="#">Legal Notices</a>
        </div>

        <div className={styles.column}>
          <a href="#">Help Centre</a>
          <a href="#">Jobs</a>
          <a href="#">Cookie Preferences</a>
        </div>

        <div className={styles.column}>
          <a href="#">Gift Cards</a>
          <a href="#">Terms of Use</a>
          <a href="#">Corporate Information</a>
        </div>

        <div className={styles.column}>
          <a href="#">Media Centre</a>
          <a href="#">Privacy</a>
          <a href="#">Contact Us</a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.bottom}>
        <p>© 1997–2026 Netflix Clone</p>
      </div>
    </footer>
  );
};

export default Footer;
