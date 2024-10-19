import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid, Pagination } from "@mui/material";
import Container from "@mui/material/Container";

function PopularBooks() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    fetch("/api/popular-books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error(error));
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getPageBooks = () => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return books.slice(startIndex, endIndex);
  };

  return (
    <Container>
      <hr></hr>
      <h1>Popular Books</h1>
      <Grid container spacing={2}>
        {getPageBooks().map((book) => (
          <Grid item key={book.ISBN} xs={12} sm={6} lg={3}>
            <Card sx={{ maxWidth: 500 }}>
              <CardContent
                sx={{
                  maxHeight: 400,
                  height: 400,
                  backgroundImage:
                    "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
                  color: "#00BFFF",
                  borderRadius: "15px",
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={book["Image-URL-L"]}
                  alt={book["Book-Title"]}
                  sx={{
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.06)",
                    },
                  }}
                />
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    textAlign: "center",
                    padding: "5px 0",
                  }}
                >
                  <h5
                    style={{
                      maxWidth: "250px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      transition: "width 0.3s ease",
                    }}
                    className={
                      book["Book-Title"].length > 250 ? "expand-on-hover" : ""
                    }
                  >
                    {book["Book-Title"]}
                  </h5>
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", color: "#1E90FF" }}
                >
                  <Typography>Author: {book["Book-Author"]}</Typography>
                  <Typography>Rating: {book["Book-Rating"]}</Typography>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(books.length / ITEMS_PER_PAGE)}
        page={page}
        color="success"
        onChange={handlePageChange}
        sx={{
          display: "flex", justifyContent: "center", margin: "20px 0",
          "& .MuiPaginationItem-root": {
            color: "",
          },
        }}
      />
    </Container>
  );
}

export default PopularBooks;

