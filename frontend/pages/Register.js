import React, {useState} from 'react';
import { 
  Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Paper, 
  Grid, Typography, TextField, InputAdornment, IconButton 
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: "url(/assets/top-manhwa.jpg)",
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [content,setContent] = useState({ 
    username: '',
    email: '',
    name: '',
    password: '',
    password2: '',
  });

  const setUsername = (e) => {
    setContent({
      ...content,username: e.target.value,
    })
    
  }
  const setEmail = (e) => {
    setContent({
      ...content,email: e.target.value,
    })
  }
  const handleFname = (e) => {
    setFname(e.target.value);
    setContent({
      ...content,name: fname+' '+lname,
    })
  }
  const handleLname = (e) => {
    setLname(e.target.value);
    setContent({
      ...content,name: fname+' '+lname,
    })
  }
  const setPassword = (e) => {
    setContent({
      ...content,password: e.target.value,
    })
  }
  const setCPassword = (e) => {
    setContent({
      ...content,password2: e.target.value,
    })
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(content);
    axios.post('http://localhost:8080'+'/users/register',content
    )
    .then(response => {
      console.log(response);
    })
  }
  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
              <TextField
                onChange={setEmail}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              </Grid>
              <Grid item xs={12} sm={12}>
              <TextField
                onChange={setUsername}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="username"
                label="Username"
                type="username"
                id="username"
                autoComplete="username"
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleFname}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleLname}
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
              <Grid item xs={12} sm={12}>
              <TextField
                onChange={setPassword}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{ // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              </Grid>
              <Grid item xs={12} sm={12}>
              <TextField
                onChange={setPassword}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                id="password2"
                autoComplete="current-password"
                InputProps={{ // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              </Grid>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="I would like to receive promotions and updates via email"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}