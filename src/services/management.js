const API_CREDENTIALS = {
    username: '@achinthamihiran',
    password: 'Ab2#*De#'
  };
  
  const getAuthHeaders = () => {
    const credentials = btoa(`${API_CREDENTIALS.username}:${API_CREDENTIALS.password}`);
    return {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    };
  };
  
  const handleApiResponse = async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };
  
  export const fetchComplaintCounts = async () => {
    try {
      const response = await fetch('/api/projects/GSMB/issues.json', {
        headers: getAuthHeaders(),
      });
      
      const data = await handleApiResponse(response);
      const counts = {
        New: 0,
        Rejected: 0,
        InProgress: 0,
        Executed: 0,
      };
  
      const filteredIssues = data.issues.filter((issue) => {
        const tracker = issue.tracker || {};
        return tracker.id === 26 && tracker.name === 'Complaints';
      });
  
      counts.total = filteredIssues.length;
  
      filteredIssues.forEach((issue) => {
        const status = issue.status?.name || '';
        if (status === 'New') counts.New++;
        if (status === 'Rejected') counts.Rejected++;
        if (status === 'In Progress') counts.InProgress++;
        if (status === 'Executed') counts.Executed++;
      });
      
      return counts;
    } catch (error) {
      console.error('Error fetching complaint data:', error);
      throw error;
    }
  };
  
  export const fetchRoleCounts = async () => {
    try {
      const response = await fetch('/api/projects/GSMB/memberships.json', {
        headers: getAuthHeaders(),
      });
      
      const data = await handleApiResponse(response);
      const counts = {
        licenceOwner: 0,
        activeGSMBOfficers: 0,
        policeOfficers: 0,
        public: 0,
      };
  
      data.memberships.forEach((membership) => {
        const roleName = membership.roles[0]?.name || '';
        if (roleName === 'MLOwner') counts.licenceOwner++;
        if (roleName === 'GSMBOfficer') counts.activeGSMBOfficers++;
        if (roleName === 'PoliceOfficer') counts.policeOfficers++;
        if (roleName === 'Public') counts.public++;
      });
  
      return counts;
    } catch (error) {
      console.error('Error fetching role data:', error);
      throw error;
    }
  };
  
  export const fetchMiningLicenseCounts = async () => {
    try {
      const response = await fetch('/api/projects/GSMB/issues.json', {
        headers: getAuthHeaders(),
      });
      
      const data = await handleApiResponse(response);
      const counts = {
        valid: 0,
        expired: 0,
        rejected: 0,
      };
  
      const filteredIssues = data.issues.filter((issue) => {
        const tracker = issue.tracker || {};
        return tracker.id === 7 && tracker.name === 'ML';
      });
  
      counts.total = filteredIssues.length;
  
      filteredIssues.forEach((issue) => {
        const status = issue.status?.name || '';
        if (status === 'Valid') counts.valid++;
        if (status === 'Expired') counts.expired++;
        if (status === 'Rejected') counts.rejected++;
      });
  
      return counts;
    } catch (error) {
      console.error('Error fetching license data:', error);
      throw error;
    }
  };
  
  export const fetchRoyaltyCounts = async () => {
    try {
      const response = await fetch('/api/projects/GSMB/issues.json', {
        headers: getAuthHeaders(),
      });
      
      const data = await handleApiResponse(response);
      
      const filteredIssues = data.issues.filter((issue) => {
        const tracker = issue.tracker || {};
        return tracker.id === 7 && tracker.name === 'ML';
      });
  
      const total = filteredIssues.reduce((sum, issue) => {
        const royaltyField = issue.custom_fields?.find(
          (field) => field.name === 'Royalty(sand)due'
        );
  
        if (royaltyField && royaltyField.value) {
          const numericValue = parseFloat(
            royaltyField.value.replace(/[^\d.]/g, '').replace(',', '')
          );
          return sum + numericValue;
        }
        return sum;
      }, 0);
  
      return total;
    } catch (error) {
      console.error('Error fetching royalty data:', error);
      throw error;
    }
  };