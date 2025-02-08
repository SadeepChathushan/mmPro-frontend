import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [userData, setUserData] = useState({
    login: "",
    firstname: "",
    lastname: "",
    mail: "",
    password: "",
    role: "gsmb", // default to GSMB Officer
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create user data object
    const user = {
      user: {
        login: userData.login,
        firstname: userData.firstname,
        lastname: userData.lastname,
        mail: userData.mail,
        password: userData.password,
      },
    };

    // Send POST request to create user
    axios
      .post("api/users.json", user, {
        headers: {
          "Content-Type": "application/json",
          "X-Redmine-API-Key": "785fd8e158f186a952350aafc6d47331f551e18a", // Replace with your actual Redmine API key
        },
      })
      .then((response) => {
        console.log("User created:", response.data);

        // If user is created, assign them to the "GSMB" project with the selected role
        const userId = response.data.user.id; // Extract user ID from response

        // Assign the user to the project with the appropriate role
        const projectId = 31; // Assuming project ID for "GSMB" is 1
        const roleId = getRoleId(userData.role);

        axios
          .post(
            `api/projects/${projectId}/memberships.json`,
            {
              membership: {
                user_id: userId,
                role_ids: [roleId], // Assign selected role to the user
              },
            },
            {
              headers: {
                "Content-Type": "application/json",
                "X-Redmine-API-Key": "785fd8e158f186a952350aafc6d47331f551e18a", // Replace with your actual Redmine API key
              },
            }
          )
          .then((assignResponse) => {
            console.log("User assigned to project:", assignResponse.data);
            alert("User created and assigned to project successfully!");
          })
          .catch((error) => {
            console.error("Error assigning user to project:", error);
            alert("Error assigning user to project.");
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        alert("Error creating user.");
      });
  };

  const getRoleId = (role) => {
    // Return role ID based on selected role
    switch (role) {
      case "gsmb":
        return 7; // Replace with actual role ID for GSMB Officer
      case "police":
        return 8; // Replace with actual role ID for Police Officer
      case "mining":
        return 10; // Replace with actual role ID for Mining License Owner
      case "public":
        return 12; // Replace with actual role ID for Public
      default:
        return 7; // Default to GSMB Officer if role is not recognized
    }
  };

  return (
    <div>
      <h1>Signup Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Login (Username):
          <input
            type="text"
            name="login"
            value={userData.login}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <br />

        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={userData.firstname}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={userData.lastname}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Email:
          <input
            type="email"
            name="mail"
            value={userData.mail}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Role:
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            required
          >
            <option value="gsmb">GSMB Officer</option>
            <option value="police">Police Officer</option>
            <option value="mining">Mining License Owner</option>
            <option value="public">Public</option>
          </select>
        </label>
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
