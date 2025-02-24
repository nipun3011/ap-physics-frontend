import { JSX, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isValid, setValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      setLoading(false); // No token, no need to validate
      setValid(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/protected", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          setValid(true);
        } else {
          setValid(false);
          localStorage.removeItem("access_token");
        }
      } catch (error) {
        console.error("Error:", error);
        setValid(false);
        localStorage.removeItem("access_token");
      } finally {
        setLoading(false); // Mark loading as complete
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (token && isValid) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;