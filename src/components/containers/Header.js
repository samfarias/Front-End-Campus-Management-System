/*==================================================
Header.js

It contains the Header component to be displayed on every page.
The header contains navigation links to every other page.
================================================== */
// Import "material" library for building UI with React components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

// Define styling for the header
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    zIndex: 10,
  },
  appBar: {
    backgroundColor: 'rgba(46, 58, 89, 0.85)',
    backdropFilter: 'blur(6px)',
    height: '80px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 2rem',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Merriweather, serif',
    fontSize: '2rem',
    fontWeight: 600,
    color: '#fff',
  },
  icon: {
    fontSize: '2rem',
    marginRight: theme.spacing(1),
  },
  links: {
    textDecoration: 'none',
  },
  navButton: {
    marginLeft: theme.spacing(2),
    fontWeight: 600,
    fontSize: '1rem',
    padding: '10px 20px',
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    color: 'white',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#388e3c',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
      padding: '8px 14px',
    },
  },
}));

// Header component, displayed on every page
const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} elevation={1}>
      <Toolbar className={classes.toolbar}>
          {/* Title with academic icon */}
          <Typography variant="h6" className={classes.title}>
            <span className={classes.icon}>🏫</span>
            Campus Management System
          </Typography>

          {/* Navigation Buttons */}
          <Link className={classes.links} to="/">
            <Button variant="contained" style={{ backgroundColor: '#4CAF50', color: 'white' }} className={classes.navButton}>
              Home
            </Button>
          </Link>

          <Link className={classes.links} to="/campuses">
            <Button variant="contained" style={{ backgroundColor: '#4CAF50', color: 'white' }} className={classes.navButton}>
              All Campuses
            </Button>
          </Link>

          <Link className={classes.links} to="/students">
            <Button variant="contained" style={{ backgroundColor: '#4CAF50', color: 'white' }} className={classes.navButton}>
              All Students
            </Button>
          </Link>

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
