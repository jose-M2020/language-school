
import { Typography, Box } from "@mui/material";
import { tokens } from "../../../theme";

const Header = ({ title, subtitle }) => {
  const colors = tokens();
  return (
    <Box my="20px">
      <Typography
        variant="h2"
        color={colors.primary}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.secondary}>
        {subtitle}
      </Typography>
    </Box>
  );
}

export default Header;