import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      setUser({ role: 'GSMBOfficer' });  // Hardcoded role for testing
      setLoading(false); // Once data is fetched, set loading to false
    }, 1000); // Adjust timeout as needed
  }, []);

  return { user, loading };
};
