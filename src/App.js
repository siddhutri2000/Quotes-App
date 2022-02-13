import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// import AllQuotes from "./pages/AllQuotes";
// import QuoteDetails from "./pages/QuoteDetails";
import Layout from "./components/layout/Layout";
// import NotFound from "./pages/NotFound";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuotes = React.lazy(() => import("./pages/NewQuotes"));
const QuoteDetails = React.lazy(() => import("./pages/QuoteDetails"));

const NotFound = React.lazy(() => import("./pages/NotFound"));
const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes"></Redirect>
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetails />
          </Route>
          <Route path="/new-quote">
            <NewQuotes />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
