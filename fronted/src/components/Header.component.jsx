import React from "react";

function Header({ handleSearch, searchValue }) {
  return (
    <div className="header">
      <div className="header-top">
        <span>Help</span>
        <span>Orders & Return</span>
        <span>Hi, John</span>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-text">ECOMMERCE</div>
        <div className="header-bottom-links">
          <ul className="header-links">
            <li>Categories</li>
            <li>Sale</li>
            <li>Clearance</li>
            <li>New Stock</li>
            <li>Trending</li>
          </ul>
        </div>
        <div className="header-bottom-icons">
          <i class="fa-solid fa-magnifying-glass"></i>
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
      </div>
      <div className="header-bottom-layer">
        <div className="header-bottom-layer-text">
          &lt; Get 10% off on business sign up &gt;
        </div>
      </div>

      {/* <p className="header-text">Team</p>
      <div className="search-bar">
        <div className="search-icon">&#x1F50D;</div>
        <input
          className="search-bar-input"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchValue}
        ></input>
      </div> */}
    </div>
  );
}

export default Header;
