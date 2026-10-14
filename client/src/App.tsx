import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SiteLayout from "./site/SiteLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import ServiceDetail from "./pages/ServiceDetail";
import ContactPage from './pages/ContactPage';
import Work, { CaseStudyPage } from './pages/Work';
import Insights, { ArticlePage } from './pages/Insights';
import { Growth360, Integrity, Privacy } from './pages/PolicyPages';
import AdminInbox from './pages/AdminInbox';
import Partners from './pages/Partners';
import CorporatePartners from './pages/CorporatePartners';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
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
        <Route path="/growth-360" component={Growth360} />
        <Route path="/admin/inbox" component={AdminInbox} />
        <Route path="/partners" component={Partners} />
        <Route path="/corporate-partners" component={CorporatePartners} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/guides" component={GuideIndex} />
        <Route path="/guides/:slug" component={GuideDetail} />
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
