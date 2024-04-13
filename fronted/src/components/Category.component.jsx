import React, { useEffect, useState } from "react";
import "./../styles/login.css"; // Import your CSS file for styling
import axios from "axios";

const Category = () => {
  let [categories, setCategories] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [totalPages, setTotalPages] = useState(0);
  let [selectedCategories, setSelectedCategories] = useState(
    JSON.parse(localStorage.getItem("user")).selectedCategories
  );
  let pageSize = 6;

  const handleChange = (e) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = JSON.parse(localStorage.getItem("token"));

    axios
      .post(
        `http://localhost:5000/users/${user.id}/category`,
        {
          categoryId: e.id,
          isSelected: selectedCategories.indexOf(e.id) == -1,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.data));
      })
      .catch((e) => {
        alert(e.response.data.message || "InternalServer error");
      });
    let index = selectedCategories.indexOf(e.id);
    console.log(index, selectedCategories);
    index == -1
      ? setSelectedCategories([...selectedCategories, e.id])
      : setSelectedCategories([
          ...selectedCategories.filter((el) => {
            console.log(el , e)
            return el != e.id;
          }),
        ]);
  };

  useEffect(() => {
    axios
      .post(
        `http://localhost:5000/categories/filter?page=${currentPage}&pageSize=${pageSize}`
      )
      .then((res) => {
        setTotalPages(res.data.data?.paginationDetails?.totalPage);
        setCategories(res.data?.data?.categories);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }, [currentPage]);

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="login-form-container">
      <h1 style={{ fontSize: "1.2rem", textAlign: "center" }}>
        Please mark your interests
      </h1>
      <p style={{ fontSize: "12px", textAlign: "center" }}>
        We will keep you notified
      </p>
      <div className="category-container">
        <p style={{ width: "100%", fontSize: "0.8rem", fontWeight: 500 }}>
          My Saved Interests
        </p>
        {categories.map((e) => {
          return (
            <div className="categoryRow">
              <input
                type="checkbox"
                checked={selectedCategories.indexOf(e.id) != -1}
                onChange={() => handleChange(e)}
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "black",
                  border: "1px solid black",
                  borderRadius: "4px",
                  marginRight: "5px",
                  cursor: "pointer",
                }}
              />
              <label
                onClick={() => handleChange(e)}
                style={{ fontSize: "0.8rem" }}
              >
                {" "}
                {e.categoryName}
              </label>
            </div>
          );
        })}
      </div>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => handlePagination(page)}
            style={{ margin: "3px", backgroundColor: "white", color: "grey" }}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

export default Category;
