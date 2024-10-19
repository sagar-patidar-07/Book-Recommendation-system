import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { keyframes } from "@emotion/react";
import { Button } from "@mui/material";

const LandingPageWrapper = styled(Box)(({ theme }) => ({
  height: "92vh",
  backgroundImage:
    "url(https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const AnimatedText = styled(Typography)(({ theme }) => ({
  animation: `fadeInOut 5s ${theme.transitions.easing.easeInOut}`,
  "@keyframes fadeInOut": {
    "0%": {
      opacity: 0,
      transform: "translateY(50%)",
    },
    "50%": {
      opacity: 1,
      transform: "translateY(0%)",
    },
    "100%": {
      opacity: 0,
      transform: "translateY(-50%)",
    },
  },
  background: "linear-gradient(to right, #8e9eab, #eef2f3)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
}));
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`;

const StyledButton = styled(Button)({
  background: "linear-gradient(45deg, #fe8c00 30%, #f83600 90%)",
  animation: `${pulseAnimation} 2s linear infinite`,
});
function handleButtonClick() {
  console.log("Button clicked!");
}

function LandingPage() {
  return (
    <LandingPageWrapper>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={8} md={6} lg={5}>
          <AnimatedText
            variant="h1"
            align="center"
            color="white"
            sx={{ mb: 2 }}
          >
            Find Your
          </AnimatedText>
          <AnimatedText
            variant="h1"
            align="center"
            color="white"
            sx={{ mb: 2 }}
          >
            Next
          </AnimatedText>
          <AnimatedText
            variant="h1"
            align="center"
            color="white"
            sx={{ mb: 2 }}
          >
            Favorite Book
          </AnimatedText>
          <AnimatedText
            variant="h4"
            align="center"
            color="white"
            sx={{ mb: 8 }}
          >
            Let our book recommendation system find the perfect book for you.
          </AnimatedText>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
                <StyledButton
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleButtonClick}
                >
                  Get Started
                </StyledButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </LandingPageWrapper>
  );
}

export default LandingPage;
