import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";

function PopularBooksYear() {
  const [books_year, setBooks_year] = useState([]);
  const [page, setPage] = useState(1);
  const [booksPerPage] = useState(4);

  useEffect(() => {
    fetch("/api/popular-books-year")
      .then((response) => response.json())
      .then((data) => setBooks_year(data))
      .catch((error) => console.error(error));
  }, []);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const indexOfLastBook = page * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books_year
    .filter(
      (book) =>
        book["Year-Of-Publication"] < 2006 || book["Year-Of-Publication"] > 2021
    )
    .slice(indexOfFirstBook, indexOfLastBook);

  return (
    <Container>
      <hr></hr>
      <h1>Popular Books By Years</h1>
      <Grid container spacing={2}>
        {currentBooks.map((book) => (
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
                  Author: {book["Book-Author"]}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", color: "#1E90FF" }}
                >
                  Year: {book["Year-Of-Publication"]}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(
          books_year.filter(
            (book) =>
              book["Year-Of-Publication"] < 2006 ||
              book["Year-Of-Publication"] > 2021
          ).length / booksPerPage
        )}
        page={page}
        color="success"
        onChange={handleChangePage}
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
          "& .MuiPaginationItem-root": {
            color: "",
          },
        }}
      />
    </Container>
  );
}

export default PopularBooksYear;
