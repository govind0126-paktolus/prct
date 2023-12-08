// import React from "react";
// import "./style.css";
// import Button from "../../Button";
// import logo from "../../../assets/Group 187.png";

// const Header = () => {
//   const handleButtonClick = () => {
//     console.log("Button clicked!");
//   };
//   const adminLogin = () => {

//   }

//   return (
//     <div className="header_div">
//       <div className="img_div">
//         <img src={logo} alt="Logo" />
//       </div>
//       <div className="btn_div">
//         <Button onClick={handleButtonClick} label="Clone now" />
//         <Button onClick={adminLogin} label="Admin Login" />
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useState } from "react";
import "./style.css";
import Button from "../../Button";
import logo from "../../../assets/Group 187.png";
import { toast } from "react-toastify";

const Header = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [toastShown, setToastShown] = useState<boolean>(false);

  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  const adminLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        const { access_token } = data;
        console.log("Token:", access_token);

        const databaseResponse = await fetch(
          "http://localhost:3001/get-all-details",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (databaseResponse.ok) {
          const databaseData = await databaseResponse.json();
          console.log("Database Details:", databaseData);
        } else {
          console.error("Error fetching details from the database", databaseResponse.status, databaseResponse.statusText);
        }
      } else {
        setError("Invalid username or password");
        console.log(error);
      }
    } catch (error) {
      showToast("Error during admin login:");
    }
  };

  const showToast = (message: string) => {
    if (!toastShown) {
      toast.error(message);
      setToastShown(true);
      setTimeout(() => {
        setToastShown(false);
      }, 5000);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="header_div">
      <div className="img_div">
        <img src={logo} alt="Logo" />
      </div>
      <div className="btn_div">
        <Button onClick={handleButtonClick} label="Clone now" />
        <Button
          onClick={() => {
            setError("");
            adminLogin();
          }}
          label="Admin Login"
        />

        {error && (
          <div>
            <div className="overlay active"></div>
            <div className="popup active">
              <h3>Please enter Admin Credentials</h3>
              <form>
                <label>
                  Username:
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </label>

                <button type="button" onClick={adminLogin}>
                  Login
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
