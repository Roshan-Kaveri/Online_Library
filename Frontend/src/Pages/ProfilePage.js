import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Nav, Card } from "react-bootstrap";
import CheckInPage from "./CheckInPage";
import { BsPerson } from "react-icons/bs";
import pic from "../Components/images/pic1.png";
import axios from "axios";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("reads");
  const [hoveredTab, setHoveredTab] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [currentReads, setCurrentReads] = useState([]);
  const [checkIns, setCheckIns] = useState({});
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const location = useLocation();
  //////////////////////////////////
  useEffect(() => {
    const loggedInEmail = localStorage.getItem("userEmail");
    if (loggedInEmail) {
      setEmail(loggedInEmail);

      fetchCheckIns(loggedInEmail);
    }
  }, []);
  const fetchCheckIns = async (userEmail) => {
    try {
      const res = await axios.get(
        `http://online-library-backend-six.vercel.app/checkins/${userEmail}`
      );
      setCheckIns(res.data);
    } catch (error) {
      console.error("Error fetching check-ins:", error);
    }
  };
  const calculateStreak = () => {
    let streak = 0;
    let date = new Date();
    while (true) {
      const dateKey = date.toISOString().split("T")[0];
      if (checkIns[dateKey]) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };
  const months = Array.from({ length: 4 }, (_, monthIndex) => {
    const monthStart = new Date(currentYear, monthIndex, 1);
    const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();

    const days = Array.from({ length: daysInMonth }, (_, dayIndex) => {
      const day = dayIndex + 1;
      const dateKey = `${currentYear}-${String(monthIndex + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      const checkedIn = checkIns[dateKey];

      return (
        <div
          key={day}
          className={`calendar-day ${checkedIn ? "checked-in" : ""}`}
        >
          {day}
        </div>
      );
    });

    return (
      <div key={monthIndex} className="month-block">
        <h3>{monthStart.toLocaleString("default", { month: "long" })}</h3>
        <div className="calendar-grid">{days}</div>
      </div>
    );
  });

  //////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log("Retrieved userId from localStorage:", storedUserId);
    setUserId(storedUserId);
    const storedUserEmail = localStorage.getItem("userEmail");
    console.log("Retrieved userEmail from localStorage:", storedUserEmail);
    setUserEmail(storedUserEmail);
  }, []);

  useEffect(() => {
    if (userId) {
      console.log("Fetching purchased books for userId:", userId);
      axios
        .get(
          `http://online-library-backend-six.vercel.app/books/user-orders/${userId}`
        )
        .then((response) => {
          console.log("Purchased books fetched:", response.data);
          setPurchasedBooks(response.data);
        })
        .catch((err) => {
          console.error("Error fetching purchased books:", err);
        });
    }
  }, [userId]);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (userId) {
      console.log("Fetching wishlist for userId:", userId);
      axios
        .get(
          `http://online-library-backend-six.vercel.app/wishlist/all/${userId}`
        )
        .then((response) => {
          console.log("Wishlist books fetched:", response.data);
          setWishlistBooks(response.data);
        })
        .catch((err) => {
          console.error("Error fetching wishlist books:", err);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      console.log("Fetching current reads for userId:", userId);
      axios
        .get(
          `http://online-library-backend-six.vercel.app/currentread/all/${userId}`
        )
        .then((response) => {
          console.log("Current reads fetched:", response.data);
          setCurrentReads(response.data);
        })
        .catch((err) => {
          console.error("Error fetching current reads:", err);
        });
    }
  }, [userId]);

  useEffect(() => {
    const loadBootstrapScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
      script.integrity =
        "sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz";
      script.crossOrigin = "anonymous";
      script.onload = () => {
        if (typeof window !== "undefined" && window.bootstrap) {
          const carouselElement = document.getElementById("booksCarousel");
          if (carouselElement) {
            new window.bootstrap.Carousel(carouselElement, {
              interval: 5000,
              wrap: true,
              touch: true,
            });
          }
        }
      };
      document.body.appendChild(script);
    };

    loadBootstrapScript();

    return () => {
      const bootstrapScript = document.querySelector(
        'script[src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"]'
      );
      if (bootstrapScript) {
        document.body.removeChild(bootstrapScript);
      }
    };
  }, [activeTab]);

  const styles = {
    pageContainer: {
      width: "100%",
      minHeight: "100vh",
      backgroundColor: "black", // ✅ dark background
      color: "white", // ✅ default text color
      padding: "0",
    },
    headerSection: {
      position: "relative",
      width: "100%",
      height: "400px",
      overflow: "hidden",
    },
    bookshelfImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "50% 20%",
    },
    bookImage: {
      width: "100%",
      height: "280px",
      objectFit: "cover",
      borderRadius: "5px 5px 0 0",
    },
    fullHeightImage: {
      width: "100%",
      height: "100%",
      objectFit: "fill",
    },
    profileOverlay: {
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "100%",
      textAlign: "center",
      padding: "20px 0",
    },
    profileIcon: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      backgroundColor: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 10px",
    },
    userName: {
      color: "white",
      fontSize: "1.5rem",
      fontWeight: "500",
      margin: "0 auto 100px",
    },
    navContainer: {
      backgroundColor: "#8c1919",
      width: "100%",
      padding: "10px 0",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    navTabs: {
      display: "flex",
      justifyContent: "space-around",
      maxWidth: "600px",
      margin: "0 auto",
    },
    navTab: {
      padding: "8px 20px",
      borderRadius: "20px",
      cursor: "pointer",
      fontWeight: "500",
      textAlign: "center",
      transition: "all 0.3s ease",
    },
    activeTab: {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
    },
    navTabHover: {
      transform: "scale(1.1)",
    },
    contentArea: {
      padding: "30px",
      minHeight: "400px",
    },
    tabContent: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "10px",
      padding: "20px",
      minHeight: "300px",
    },
    progressContainer: {
      width: "100%",
      backgroundColor: "#e0e0e0",
      borderRadius: "10px",
      overflow: "hidden",
      height: "10px",
      marginTop: "10px",
      color: "black",
    },
    progressBar: {
      height: "100%",
      backgroundColor: "#5D3F37",
    },
    progressText: {
      fontSize: "0.8rem",
      marginTop: "5px",
      color: "#ccc",
      fontWeight: "500",
      textAlign: "center",
    },
    bookCard: {
      border: "none",
      borderRadius: "10px",
      backgroundColor: "#1a1a1a", // ✅ match dark mode
      boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
      overflow: "hidden",
      height: "100%",
      width: "200px",
      margin: "0 10px",
      color: "white", // ✅ ensure text is readable
    },
    carouselContainer: {
      padding: "20px 0",
    },
    carouselInner: {
      padding: "20px 0",
    },
    carouselItem: {
      padding: "15px 0",
    },
    bookCardContent: {
      padding: "15px",
      color: "white",
    },
    carouselControl: {
      width: "5%",
      background: "rgba(255, 255, 255, 0.15)",
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      margin: "auto 10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  const wishListContent =
    wishlistBooks.length > 0 ? (
      <div>
        <h3 className="text-center mb-4 text-white">Your Wishlist</h3>
        <div
          id="wishlistCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" style={styles.carouselInner}>
            {Array.from(
              { length: Math.ceil(wishlistBooks.length / 4) },
              (_, i) => (
                <div
                  key={i}
                  className={`carousel-item ${i === 0 ? "active" : ""}`}
                  style={styles.carouselItem}
                >
                  <div className="d-flex justify-content-center">
                    {wishlistBooks.slice(i * 4, (i + 1) * 4).map((book) => (
                      <div
                        key={book.bookId}
                        style={styles.bookCard}
                        onClick={() => navigate(`/book/${book.bookId}`)}
                      >
                        <img
                          src={book.image}
                          alt={book.title}
                          style={styles.bookImage}
                        />
                        <div style={styles.bookCardContent}>
                          <h5
                            className="fs-6 text-center fw-bold"
                            style={{ color: "black" }}
                          >
                            {book.title}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#wishlistCarousel"
            data-bs-slide="prev"
            style={styles.carouselControl}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#wishlistCarousel"
            data-bs-slide="next"
            style={styles.carouselControl}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    ) : (
      <div className="text-center p-5 text-white">
        No books in wishlist yet.
      </div>
    );

  const currentReadsContent =
    currentReads.length > 0 ? (
      <div>
        <h3 className="text-center mb-4 text-white">Current Reads</h3>
        <div
          id="currentReadsCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" style={styles.carouselInner}>
            {Array.from(
              { length: Math.ceil(currentReads.length / 4) },
              (_, i) => (
                <div
                  key={i}
                  className={`carousel-item ${i === 0 ? "active" : ""}`}
                  style={styles.carouselItem}
                >
                  <div className="d-flex justify-content-center">
                    {currentReads.slice(i * 4, (i + 1) * 4).map((book) => (
                      <div
                        key={book.bookId}
                        style={styles.bookCard}
                        onClick={() => navigate(`/book/${book.bookId}`)}
                      >
                        <img
                          src={book.image}
                          alt={book.title}
                          style={styles.bookImage}
                        />
                        <div style={styles.bookCardContent}>
                          <h5
                            className="fs-6 text-center fw-bold"
                            style={{ color: "black" }}
                          >
                            {book.title}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#currentReadsCarousel"
            data-bs-slide="prev"
            style={styles.carouselControl}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#currentReadsCarousel"
            data-bs-slide="next"
            style={styles.carouselControl}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    ) : (
      <div className="text-center p-5 text-white">No current reads yet.</div>
    );

  const purchasedContent =
    purchasedBooks.length > 0 ? (
      <div>
        <h3 className="text-center mb-4 text-white">Purchased Books</h3>
        <div
          id="purchasedCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" style={styles.carouselInner}>
            {Array.from(
              { length: Math.ceil(purchasedBooks.length / 4) },
              (_, i) => (
                <div
                  key={i}
                  className={`carousel-item ${i === 0 ? "active" : ""}`}
                  style={styles.carouselItem}
                >
                  <div className="d-flex justify-content-center">
                    {purchasedBooks.slice(i * 4, (i + 1) * 4).map((book) => (
                      <div
                        key={book.bookId}
                        style={styles.bookCard}
                        onClick={() => navigate(`/book/${book.bookId}`)}
                      >
                        <img
                          src={book.image}
                          alt={book.title}
                          style={styles.bookImage}
                        />
                        <div style={styles.bookCardContent}>
                          <h5
                            className="fs-6 text-center fw-bold"
                            style={{ color: "black" }}
                          >
                            {book.title}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#purchasedCarousel"
            data-bs-slide="prev"
            style={styles.carouselControl}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#purchasedCarousel"
            data-bs-slide="next"
            style={styles.carouselControl}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    ) : (
      <div className="text-center p-5 text-white">No purchased books yet.</div>
    );

  const tabContents = {
    reads: currentReadsContent,
    wishlist: wishListContent,
    completed: wishListContent,
    notifications: purchasedContent,
  };
  return (
    <Container fluid style={styles.pageContainer} className="p-0">
      {/* Header Section */}
      <div style={{ position: "relative" }}>
        {/* <button
          onClick={() => navigate("/")}
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            backgroundColor: "#",
            color: "white",
            padding: "10px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          ← Back to Home
        </button> */}
        <div style={styles.headerSection}>
          <img src={pic} alt="Library shelves" style={styles.fullHeightImage} />
          <div style={styles.profileOverlay}>
            <div style={styles.profileIcon}>
              <BsPerson size={50} color="#5D3F37" />
            </div>
            <div style={styles.userName}>{userEmail}</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={styles.navContainer}>
        <Nav style={styles.navTabs}>
          <div
            style={{
              ...styles.navTab,
              ...(activeTab === "reads" ? styles.activeTab : {}),
              ...(hoveredTab === "reads" ? styles.navTabHover : {}),
            }}
            onClick={() => handleTabSelect("reads")}
            onMouseEnter={() => setHoveredTab("reads")}
            onMouseLeave={() => setHoveredTab(null)}
          >
            Reads
          </div>
          <div
            style={{
              ...styles.navTab,
              ...(activeTab === "wishlist" ? styles.activeTab : {}),
              ...(hoveredTab === "wishlist" ? styles.navTabHover : {}),
            }}
            onClick={() => handleTabSelect("wishlist")}
            onMouseEnter={() => setHoveredTab("wishlist")}
            onMouseLeave={() => setHoveredTab(null)}
          >
            Wishlist
          </div>
          <div
            style={{
              ...styles.navTab,
              ...(activeTab === "notifications" ? styles.activeTab : {}),
              ...(hoveredTab === "notifications" ? styles.navTabHover : {}),
            }}
            onClick={() => handleTabSelect("notifications")}
            onMouseEnter={() => setHoveredTab("notifications")}
            onMouseLeave={() => setHoveredTab(null)}
          >
            Purchased
          </div>
        </Nav>
      </div>

      {/* Content Area */}
      <div style={styles.contentArea}>
        <div style={styles.tabContent}>{tabContents[activeTab]}</div>
      </div>
      {/* <div className="calendar-container">
        <h2>📅 Daily Check-In - {currentYear}</h2>
        <div className="streak">
          <span role="img" aria-label="fire">
            🔥
          </span>{" "}
          Current Streak: {calculateStreak()} days
        </div>
        <div className="year-calendar">{months}</div>
      </div> */}
    </Container>
  );
};

export default ProfilePage;
