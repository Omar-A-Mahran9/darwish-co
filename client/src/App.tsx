import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from './pages/Contact';
import AdminInbox from './pages/AdminInbox';
import Projects from './pages/Projects';
import Partners from './pages/Partners';
import CorporatePartners from './pages/CorporatePartners';
import Training from './pages/Training';
import Blog from './pages/Blog';
import Fonts from './pages/Fonts';
import { useHashScroll } from "./hooks/useHashScroll";

function Router() {
  useHashScroll();
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/contact" component={Contact} />
        <Route path="/projects" component={Projects} />
        <Route path="/admin/inbox" component={AdminInbox} />
        <Route path="/partners" component={Partners} />
        <Route path="/corporate-partners" component={CorporatePartners} />
        <Route path="/training" component={Training} />
        <Route path="/blog" component={Blog} />
        <Route path="/fonts" component={Fonts} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
