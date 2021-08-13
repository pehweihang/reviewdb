import React, {useState} from 'react';
import { 
  Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Paper, 
  Grid, Typography, TextField, InputAdornment, IconButton 
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
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

export default function SignInSide(req, res) {
  const classes = useStyles();
  const router = useRouter();
  const [content,setContent] = useState({ 
    email: '',
    fname:'',
    lname:'',
    name: '',
    password: '',
    password2: '',
  });

  const setEmail = (e) => {
    setContent({
      ...content,email: e.target.value,
    })
    validate();
  }
  const handleFname = (e) => {
    setContent({
      ...content,fname: e.target.value,
    })
    validate();
  }
  const handleLname = (e) => {
    setContent({
      ...content,lname: e.target.value,
    })
    validate();
  }
  const setPassword = (e) => {
    setContent({
      ...content,password: e.target.value,
    })
    validate();
  }
  const setCPassword = (e) => {
    setContent({
      ...content,password2: e.target.value,
    })
    validate();
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
 
  const [isFormValid, setIsFormValid] = useState();
  const validate = () => {
    if (!content.email || !content.fname || !content.password || !content.password2) setIsFormValid(false);
    else setIsFormValid(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    content.name=content.fname+' '+content.lname;
    axios.post('http://localhost:8080'+'/users/register',content)
    .then(response => {
      if (response.status == 200){
        const cookies = new Cookies();
        cookies.set('auth', response.data.token, { path: '/' });
        router.push('/')
      } 
    })
    .catch(error => console.log(error.response.data.errors));
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
          <form className={classes.form} onSubmit={handleSubmit}>
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
                error={
                  !content.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ||
                  content.email==''
                }
                helperText={
                  content.email==''?'email cannot be blank':
                  !content.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)?'not an email bro':''
                }
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
                error={
                  content.fname==''
                }
                helperText={
                  content.fname==''?'first name cannot be blank':''
                }
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
                InputProps={{ 
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
                error={
                  content.password.length<8 ||
                  content.password!==content.password2
                }
                helperText={
                  content.password.length<8?'password too short':
                  content.password!==content.password2?'passwords don\'t match':''
                }
              />
              </Grid>
              <Grid item xs={12} sm={12}>
              <TextField
                onChange={setCPassword}
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
                error={
                  content.password2.length<8 ||
                  content.password!==content.password2
                }
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
              disabled={!isFormValid}
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