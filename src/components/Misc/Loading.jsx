import {
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { keyframes } from "@mui/system";

const loadAnim = keyframes`
    0% {
        height:100%
    }
    50%{
        height: 50%
    }
    100% {
        height:100%
    }
`;

const LoadingComponent = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ py: 2, width: "100%", height: 15 }}
    >
      <Box
        className="loader-box loader-box-1"
        sx={(theme) => ({
          backgroundColor: "text.primary",
          animation: `${loadAnim} 1s ease infinite`,
        })}
      ></Box>
      <Box
        className="loader-box loader-box-2"
        sx={(theme) => ({
          backgroundColor: "text.primary",
          animation: `${loadAnim} 1s 200ms ease infinite`,
        })}
      ></Box>
      <Box
        className="loader-box loader-box-3"
        sx={(theme) => ({
          backgroundColor: "text.primary",
          animation: `${loadAnim} 1s 450ms ease infinite`,
        })}
      ></Box>
    </Box>
  );
};

export default LoadingComponent;
