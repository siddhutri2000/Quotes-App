import { Link, Route, Router } from "react-router-dom";
import {
  useParams,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import Comments from "../components/comments/Comments";
import QuoteItem from "../components/quotes/QuoteItem";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NotFound from "./NotFound";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetails = () => {
  const params = useParams();
  const { quoteId } = params;
  const match = useRouteMatch();

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="centered">{error}</div>;
  }
  // const quote = DUMMY_QUOTES.find((quote) => params.quoteId === quote.id);

  if (!loadedQuote) {
    return <NotFound />;
  }

  return (
    <section>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </section>
  );
};

export default QuoteDetails;
