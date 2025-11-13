import { useState, createContext, useEffect, useRef } from "react";

const SESSION_DURATION_MS = 30 * 60 * 1000; 
const UserContexts = createContext();

function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loginTime, setLoginTime] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const raw = localStorage.getItem("userSession");
    if (raw) {
      try {
        const stored = JSON.parse(raw);
        if (stored?.loginTime) {
          const expiresAt = stored.loginTime + SESSION_DURATION_MS;
          if (Date.now() < expiresAt) {
            setUser(stored.user);
            setLoginTime(stored.loginTime);
            setIsLoggedIn(true);
          } else {
            // Sesión vencida
            localStorage.removeItem("userSession");
          }
        }
      } catch (error) {
        console.error("Error al leer la sesión:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (isLoggedIn && loginTime) {
      const expiresAt = loginTime + SESSION_DURATION_MS;
      const remaining = expiresAt - Date.now();

      if (remaining <= 0) {
        logout();
      } else {
        timeoutRef.current = setTimeout(() => {
          logout();
        }, remaining);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isLoggedIn, loginTime]);

  function login(newUser) {
    const now = Date.now();
    setUser(newUser);
    setLoginTime(now);
    setIsLoggedIn(true);

    // Guardar en localStorage
    localStorage.setItem(
      "userSession",
      JSON.stringify({ user: newUser, loginTime: now })
    );
  }

  function logout() {
    setUser(null);
    setLoginTime(null);
    setIsLoggedIn(false);
    localStorage.removeItem("userSession");
  }

  return (
    <UserContexts.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, login, logout }}
    >
      {children}
    </UserContexts.Provider>
  );
}

export { UserContexts, UserProvider };
