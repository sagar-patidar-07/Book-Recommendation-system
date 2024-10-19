import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography  from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Search() {
  const [searchOption, setSearchOption] = useState('title');
  const [bookName, setBookName] = useState('');
  const [numResults, setNumResults] = useState(4);
  const [books, setBooks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = '';
    switch (searchOption) {
      case 'author':
        url = '/getAuthor';
        break;
      case 'publisher':
        url = '/getPublisher';
        break;
      case 'title':
        url = '/recommendKNN';
        break;
      default:
        break;
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        book_name: bookName
      })
    });

    const data = await response.json();
    setBooks(data.books);
  };

  const handleInputChange = (e) => {
    setBookName(e.target.value);
  };

  const handleNumResultsChange = (e) => {
    setNumResults(e.target.value);
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  return (
    <Container>
      <Grid
        container
        spacing={15}
        paddingTop={5}
        Width={600}
        justifyContent="center"
      >
        <Grid item xs={8}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} item xs={12} justifyContent="center">
              <Grid item xs={6} maxWidth={500}>
                <TextField
                  label="Title/Author/Publisher"
                  value={bookName}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <Select
                  value={searchOption}
                  onChange={handleSearchOptionChange}
                  fullWidth
                >
                  <MenuItem value="author">Author</MenuItem>
                  <MenuItem value="publisher">Publisher</MenuItem>
                  <MenuItem value="title">Title</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Number of Results"
                  type="number"
                  value={numResults}
                  onChange={handleNumResultsChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={1}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {books.slice(0, 4).map((book) => (
              <Grid item key={book.book_name} xs={12} sm={6} lg={3}>
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
                      image={book.image}
                      alt={book.book_name}
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
                      variant="h5" component="div" sx=
                      {{
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
                          book.book_name.length > 250
                            ? "expand-on-hover"
                            : ""
                        }
                      >
                        {book.book_name}
                      </h5>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "center", color: "#1E90FF" }}
                    >
                      <p>Author: {book.author}</p>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Search;

