import locationNotFoundIcon from "../assets/images/not-found-location.png";
import "../styles/ErrorMessage.css";

const NotFoundMessage = () => {
  return (
    <section className="error-container not-found-msg">
      <article className="msg">
        <img src={locationNotFoundIcon} alt="location not found illustration" />
        <h2>No search result found!</h2>
      </article>
    </section>
  );
};

export default NotFoundMessage;
