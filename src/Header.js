import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import "./Header.css";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 400,
  },
  fullList: {
    width: "auto",
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  colorDefault: {
    backgroundColor: "red",
  },
  appbar: {
    backgroundColor: "black",
  },
}));

export default function Header() {
  const classes = useStyles();
  const [{ basket, user }, dispatch] = useStateValue();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  console.log("user hai", user);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
    setState({
      left: true,
    });
  };
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to={!user && "/login"}>
          <ListItem
            onClick={handleAuthenticaton}
            button
            className="header_option"
          >
            <ListItemText
              className="header_optionLineOne"
              primary={user ? "Hello, " + user.name : "Hello Guest"}
            />
            <ListItemText
              className="header_optionLineTwo"
              primary={user ? "Sign Out" : "Sign In"}
            />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/orders">
          <ListItem button className="header_option">
            <ListItemText
              className="header_optionLineOne"
              primary={"Returns & Orders"}
            />
          </ListItem>
        </Link>

        <Link to="/checkout">
          <ListItem button className="header_option">
            <ShoppingBasketIcon />
            <ListItemText
              className="header_optionLineOne"
              primary={basket?.length}
            />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  };
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="header">
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Link to="/">
            <img
              className="header_logo"
              src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            />
          </Link>
          <div className="header_search">
            <input className="header_searchInput" type="text" />
            <SearchIcon className="header_searchIcon" />
          </div>

          <div className={classes.sectionDesktop}>
            <div className="header_nav">
              <Link to={!user && "/login"}>
                <div onClick={handleAuthenticaton} className="header_option">
                  <Typography className="header_optionLineOne">
                    Hello {!user ? "Guest" : user.name}
                  </Typography>
                  <Typography className="header_optionLineTwo">
                    {user ? "Sign Out" : "Sign In"}
                  </Typography>
                </div>
              </Link>

              <Link to="/orders">
                <div className="header_option">
                  <Typography className="header_optionLineOne">
                    Returns
                  </Typography>
                  <Typography className="header_optionLineTwo">
                    & Orders
                  </Typography>
                </div>
              </Link>

              <Link to="/checkout">
                <div className="header_optionBasket">
                  <ShoppingBasketIcon />
                  <span className="header_optionLineTwo header_basketCount">
                    {basket?.length}
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
