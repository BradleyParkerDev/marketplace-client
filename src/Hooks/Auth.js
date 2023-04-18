import { useState, useEffect, createContext, useContext, useMemo } from "react";
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
const AuthContext = createContext();

/* 
@Source: https://blog.logrocket.com/complete-guide-authentication-with-react-router-v6/#basic-routing-with-routes
*/
export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
	const [userEmail, setUserEmail] = useState("");
  const [scope, setScope] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  useEffect(() => {

    //get session data if session is still active from the browser
    const userData = getLSUserData();
		if (userData && userData.token) {
			setUserToken(userData.token);
		}
		if (userData && userData.email) {
			setUserEmail(userData.email);
		}
    if(userData && userData.userType){
      setScope(userData.userType);
    }
  }, [isAuthLoading]);

  // call this function when you want to register the user
  const register = async (email, password) => {
    setIsAuthLoading(true);
    const registerResult = await registerUser(email, password);
    setIsAuthLoading(false);
    return registerResult;
  };

  // call this function when you want to authenticate the user
  const login = async (email, password) => {
    setIsAuthLoading(true);
    const loginResult = await loginUser(email, password);
		console.log("auth hook loginResult: ", loginResult)
    if (loginResult.success) {
      //update browser session details 
      setLSUserData(loginResult.token, loginResult.email, loginResult.userType);
    }
    setIsAuthLoading(false);
    setScope(loginResult.userType)
    return loginResult
  };

  // call this function to sign out logged in user
  const logout = async () => {
    setIsAuthLoading(true);
    await removeLSUserData(); // This has to be awaited for the useEffect to work
		setUserToken(null);
		setUserEmail("");
    setIsAuthLoading(false);
    setScope("");
  };

  /*  
    https://reactjs.org/docs/hooks-reference.html#usememo
    Memoization is essentially caching. The variable value will only be recalculated if the 
    variables in the watched array change.
  */
  const value = useMemo(
    () => ({
      scope,
      userToken,
			userEmail,
      login,
      logout,
      register,
    }),
    [userToken]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const registerUser = async (email, password) => {
  const url = `${urlEndpoint}/users/registration`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const responseJSON = await response.json();
  return responseJSON;
};

const loginUser = async (email, password) => {
  const url = `${urlEndpoint}/users/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const responseJSON = await response.json();
  console.log(responseJSON);
  return responseJSON;
};

const setLSUserData = (token, email, userType) => {

  // caching our token session/ email 
  // in the browser window
  localStorage.setItem(
    process.env.REACT_APP_TOKEN_HEADER_KEY,
    JSON.stringify({token, email, userType})
  );
};

const removeLSUserData = () => {
  //remove session from browser 
  localStorage.removeItem(process.env.REACT_APP_TOKEN_HEADER_KEY);
  return true;
};

const getLSUserData = () => {
  //get session from browser
  return JSON.parse(
    localStorage.getItem(process.env.REACT_APP_TOKEN_HEADER_KEY)
  );
};
