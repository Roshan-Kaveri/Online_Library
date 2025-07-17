import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./BookViewer.css";

import Menum from "./Menum";
import ReviewForm from "../Components/book_read/ReviewForm";

const BookViewer = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [book, setBook] = useState(null);
  const [ownsBook, setOwnsBook] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const bookContainerRef = useRef(null);
  const wordsPerPage = 150;

  // Set theme class on body
  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  // Fetch book + check if user owns it
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookRes, ownershipRes] = await Promise.all([
          axios.get(
            `https://online-library-backend-six.vercel.app/bookc/${bookId}`
          ),
          axios.get(
            `https://online-library-backend-six.vercel.app/rzpay/check/${userId}/${bookId}`
          ),
        ]);

        if (!ownershipRes.data.owns) {
          navigate(`/book/${bookId}`);
        } else {
          setOwnsBook(true);
          setBook(bookRes.data);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchData();
  }, [bookId, userId, navigate]);

  const toggleFullScreen = () => {
    const el = bookContainerRef.current;
    if (!document.fullscreenElement) {
      el?.requestFullscreen().catch((err) =>
        console.error("Fullscreen error:", err)
      );
    } else {
      document.exitFullscreen();
    }
  };

  if (!book) return <div>Loading book content...</div>;

  const words = book.abstract.split(" ");
  const totalPages = Math.ceil(words.length / wordsPerPage);
  const currentPageText = words
    .slice(currentPage * wordsPerPage, (currentPage + 1) * wordsPerPage)
    .join(" ");

  return (
    <div>
      <Menum />
      <div style={{ marginTop: "80px" }}>
        <div
          className={`book-viewer ${isDarkMode ? "dark-mode" : "light-mode"}`}
          ref={bookContainerRef}
        >
          {/* Controls */}
          <div className="top-bar">
            <div className="right-buttons">
              <Button
                variant="secondary"
                onClick={() => setFontSize((prev) => prev + 2)}
              >
                ➕
              </Button>
              <Button
                variant="secondary"
                onClick={() => setFontSize((prev) => Math.max(14, prev - 2))}
              >
                ➖
              </Button>
              <Button variant="secondary" onClick={toggleFullScreen}>
                ⛶ Full Screen
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsDarkMode((prev) => !prev)}
              >
                {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
              </Button>
            </div>
          </div>

          {/* Book content */}
          <div className="book-container">
            <Container className="book-content">
              <Row>
                <Col md={{ span: 8, offset: 2 }}>
                  <p
                    className="book-text"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {currentPageText}
                  </p>

                  {/* Pagination */}
                  <div className="pagination-controls">
                    <Button
                      variant="secondary"
                      onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                      disabled={currentPage === 0}
                    >
                      ⬅️ Previous
                    </Button>
                    <span>
                      Page {currentPage + 1} of {totalPages}
                    </span>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
                      }
                      disabled={currentPage === totalPages - 1}
                    >
                      Next ➡️
                    </Button>
                  </div>

                  {/* Review Form */}
                  {ownsBook && currentPage === totalPages - 1 && (
                    <ReviewForm bookid={bookId} />
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookViewer;
