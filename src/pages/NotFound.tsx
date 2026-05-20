import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-7xl font-bold gradient-text">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="btn-gradient">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;