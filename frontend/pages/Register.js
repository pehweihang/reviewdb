import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [response, setResponse] = useState('');
  var content = { 
    username: username,
    email: email,
    name: firstname+lastname,
    password: password,
    password2: password2,
  };
  
  function handleSubmit(){ 
    console.log(content);
    axios.post(process.env.API_URI+'/users/register',content)
    .then(response => {
      setResponse(response);
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
          <form className={classes.form} noValidate onSubmit={() => handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
              <TextField
                onChange={value => setEmail(value)}
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
                onChange={value => setUsername(value)}
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
                onChange={value => setFirstname(value)}
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
                onChange={value => setLastname(value)}
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
                onChange={value => setPassword(value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              </Grid>
              <Grid item xs={12} sm={12}>
              <TextField
                onChange={value => setPassword2(value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="current-password"
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