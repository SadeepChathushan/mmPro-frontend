import { useState, useEffect } from "react";
import axios from "axios";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Track errors during user fetch

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/current.json?include=memberships,groups");

        // Ensure the API returns data before trying to access user info
        if (response?.data?.user) {
          const userData = response.data.user;

          // Safely get the role, with default fallback if it's missing
          const role = userData.memberships?.[0]?.roles?.[0]?.name || "No Role Assigned";

          // Set the user data along with their role
          setUser({
            id: userData.id,
            name: `${userData.firstname} ${userData.lastname}`,
            email: userData.mail,
            role,
            avatarUrl: userData.avatar_url,
          });
        } else {
          setError("User data is missing or improperly structured.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error }; // Return error as well for better error handling
};
