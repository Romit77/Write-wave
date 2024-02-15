import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//eslint-disable-next-line
export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  //to ask if logged in or not from store
  const authStatus = useSelector((state) => state.auth.status);

  // if (authStatus ===true){
  //     navigate("/")
  // } else if (authStatus === false) {
  //     navigate("/login")
  // }

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
