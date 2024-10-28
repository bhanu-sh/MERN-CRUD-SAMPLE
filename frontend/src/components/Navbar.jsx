import { useLocation, Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex justify-between">
      <NavigationMenu>
        <NavigationMenuList>
          {/* <img src="/logo.png" alt="logo" className="w-10 h-10" /> */}
          <NavigationMenuItem>
            <Link to="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} ${
                  isActive("/") ? "bg-yellow-300 rounded-none" : ""
                }`}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/employees" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} ${
                  isActive("/employees") ? "bg-yellow-300 rounded-none" : ""
                }`}
              >
                Employee List
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-2 items-center">
        {localStorage.token ? (
          <>
            <p className="text-primary font-medium text-sm">
              {localStorage.username ? localStorage.username : "Admin"}
            </p>
            <Button variant={"link"} onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Link to="/login">
            <Button variant={"link"}>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
