import "./styles.scss";
import "./responsive.scss";

export const Footer = () => (
  <footer className="app-footer">
    <h2>Any suggestion, question or bug report?</h2>
    <p>
      Contact me at{" "}
      <span className="footer-email">pedrobatista0704@gmail.com</span>
    </p>
    <p>
      Made with <span className="footer-heart">❤️</span> by{" "}
      <span className="footer-name author-name">
        <a href="https://github.com/pedro742k2">Pedro Batista</a>
      </span>
    </p>
  </footer>
);
