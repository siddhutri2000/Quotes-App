import { Route } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Comments from "../components/comments/Comments";
import QuoteItem from "../components/quotes/QuoteItem";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NotFound from "./NotFound";
const DUMMY_QUOTES = [
  { id: "q1", author: "MAX", text: "Learning react is fun!" },
  { id: "q2", author: "MAXIMUM", text: "Learning react is great!" },
];

const QuoteDetails = () => {
  const params = useParams();

  const quote = DUMMY_QUOTES.find((quote) => params.quoteId === quote.id);

  if (!quote) {
    return <NotFound />;
  }

  return (
    <section>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </section>
  );
};

export default QuoteDetails;
