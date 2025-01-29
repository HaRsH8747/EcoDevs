import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
    const location = useLocation();
    
    // Paths that don't show header and footer
    const hideForPaths = ['/login', '/signup'];
    const showHeaderFooter = !hideForPaths.includes(location.pathname);
  
    return (
      <>
        {showHeaderFooter && <Header />}
        <main className="content pt-16 lg:pt-20">{children}</main>
        <Footer/>
      </>
    );
  };

  export default Layout;