import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Solutions", path: "/solutions" },
    { name: "Projects", path: "/projects" },
    { name: "Gallery", path: "/gallery" },
    { name: "Events", path: "/events" },
    { name: "Articles", path: "/articles" },
    { name: "Feedback", path: "/feedback" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="w-full bg-background/95 backdrop-blur-sm shadow-card border-b px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link 
            to="/" 
            className="bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            AI SOLUTIONS
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-foreground/80 hover:text-foreground transition-colors font-medium",
                location.pathname === item.path && "text-primary"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/contact">
            <Button variant="hero" size="sm">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;