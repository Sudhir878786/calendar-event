import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import LogoutIcon from "./icons/LogoutIcon";
import UserIcon from "./icons/UserIcon";
import "./ui.css";
import Swal from "sweetalert2";
import { fetchWithToken } from "../../helpers/fetch";

const Navbar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") return;
    try {
      const response = await fetchWithToken(`/auth/search?term=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      Swal.fire("Error", "Failed to search users", "error");
    }
  };

  const viewUserEvents = (userId) => {
    // Call your fetch API here to get the events of the user
    fetchWithToken(`/events/user/${userId}`)
      .then(response => response.json())
      .then(data => {
        // Handle user events, maybe store them in Redux or in local state
        console.log(data); // Example of logging the events
      })
      .catch(error => {
        console.error("Error fetching user events:", error);
      });
  };
  
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <div className="navbar__item">
          <UserIcon />
          <p className="navbar__text">{name}</p>
        </div>
        <div className="navbar__item">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for users"
            className="navbar__search-input"
          />
          <button onClick={handleSearch} className="navbar__search-btn">Search</button>
        </div>
        {searchResults.length > 0 && (
          <div className="navbar__search-results">
            {searchResults.map((user) => (
              <div key={user.email} className="navbar__search-item">
                <p>{user.name}</p>
                <button
                  onClick={() => viewUserEvents(user._id)}
                  className="navbar__search-view-btn"
                >
                  View Events
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="navbar__item">
          <LogoutIcon
            className="navbar__link"
            title="Logout"
            onClick={handleLogout}
          />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
