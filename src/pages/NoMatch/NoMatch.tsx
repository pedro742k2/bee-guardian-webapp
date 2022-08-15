import "./NoMatch.scss";
import NotFound from "../../Assets/Icons/no-results.png";

export const NoMatch = () => {
  return (
    <div className="no-match-container">
      <div>
        <h1>
          <img src={NotFound} alt="Not Found" />
          Sorry, but we couldn't find what you're looking for...
        </h1>
        <p>
          Try using the navigation bar located on the top or contact us for
          further support.
        </p>
      </div>
    </div>
  );
};
