import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Redirect, Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SiteLayout from "./site/SiteLayout";
import { PAGE_REDIRECTS } from "@shared/site";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import ServiceDetail from "./pages/ServiceDetail";
import ContactPage from './pages/ContactPage';
import Work, { CaseStudyPage } from './pages/Work';
import Insights, { ArticlePage } from './pages/Insights';
import { Integrity, Privacy } from './pages/PolicyPages';
import AdminInbox from './pages/AdminInbox';
import GuideDetail from './pages/GuideDetail';
import GuideIndex from './pages/GuideIndex';
import ClientLogin from './pages/ClientLogin';
import AdminClientAccess from './pages/AdminClientAccess';
import { useHashScroll } from "./hooks/useHashScroll";
import { useSeo } from "./hooks/useSeo";

function Router() {
  useHashScroll();
  useSeo();
  return (
    <SiteLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/industries" component={Industries} />
        <Route path="/services/:slug" component={ServiceDetail} />
        <Route path="/about/integrity" component={Integrity} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/projects" component={Work} />
        <Route path="/projects/:slug" component={CaseStudyPage} />
        <Route path="/insights" component={Insights} />
        <Route path="/insights/:slug" component={ArticlePage} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/admin/inbox" component={AdminInbox} />
        {/* Folded into other pages by the redesign; the server answers these with a 301. */}
        <Route path="/partners">
          <Redirect to={PAGE_REDIRECTS["/partners"]} replace />
        </Route>
        <Route path="/corporate-partners">
          <Redirect to={PAGE_REDIRECTS["/corporate-partners"]} replace />
        </Route>
        <Route path="/blog">
          <Redirect to={PAGE_REDIRECTS["/blog"]} replace />
        </Route>
        <Route path="/blog/:slug">
          <Redirect to={PAGE_REDIRECTS["/blog"]} replace />
        </Route>
        {/* Guides keep their earlier design and are not linked from the menus for now (decided 13 Oct 2026). */}
        <Route path="/guides">
          <div className="legacy-page">
            <GuideIndex />
          </div>
        </Route>
        <Route path="/guides/:slug">
          <div className="legacy-page">
            <GuideDetail />
          </div>
        </Route>
        <Route path="/client-login" component={ClientLogin} />
        <Route path="/admin/client-access" component={AdminClientAccess} />
        <Route component={NotFound} />
      </Switch>
    </SiteLayout>
  );
}

/**
 * `ssrPath` is set only when the page is being rendered at build time, where
 * there is no browser address to read. In the browser it is left undefined and
 * wouter uses the real location.
 */
function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <WouterRouter ssrPath={ssrPath}>
            <Router />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
