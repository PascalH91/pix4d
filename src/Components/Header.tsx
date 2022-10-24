import * as React from "react";
import { Box, Toolbar, IconButton } from "@mui/material";

import { avatarImageUrl, placeholderLogo } from "../consts";

import "../Styles/components/header.css";

const Header = (): JSX.Element => {
  return (
    <Box height="4rem" width="100%">
      <Toolbar className="Toolbar">
        <img className="CompanyLogo" src={placeholderLogo} />

        <Box component={IconButton} size="small" edge="start" color="inherit">
          <img className="AvatarImage" src={avatarImageUrl} />
        </Box>
      </Toolbar>
    </Box>
  );
};

export default React.memo(Header);
