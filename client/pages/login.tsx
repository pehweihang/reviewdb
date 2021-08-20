import React, {useState} from 'react';
import { 
  Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Paper, 
  Grid, Typography, TextField, InputAdornment, IconButton, Link
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useRouter } from 'next/router'
import { useLoginMutation } from '../generated/graphql';
import { setAccessToken } from '../components/accessToken';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    width:'100%',
    height:'100%',
    opacity: 0.4,
    backgroundImage: "url(/assets/top-manhwa.jpg)",
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    justifyContent:'center',
    alignItems:'center',
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

export default function Login() {
  const classes = useStyles();
  const [login] = useLoginMutation();
  const [content,setContent] = useState({ 
    email: '',
    password: '',
  });
  const setEmail = (e : React.ChangeEvent<HTMLInputElement>) => {
    setContent({
      ...content,email: e.target.value,
    })
    validate();
  }
  const setPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
    setContent({
      ...content,password: e.target.value,
    })
    validate();
  }

  const [isFormValid, setIsFormValid ] = useState(false);
  const validate = () => {
    if (!content.email || !content.password) setIsFormValid(false);
    else setIsFormValid(true);
  }

  const [showAlert, setShowAlert] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const router = useRouter();

  async function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try{
      const response = await login({
        variables: {
          loginEmail:content.email,
          loginPassword:content.password,
        },
      })
      if (response && response.data){
        setAccessToken(response.data.login.accessToken)
      }
      
      router.push("/")
    }catch(error){
      console.log(error.message);
      setShowAlert(error.message);
    }
  } 
  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} style={{alignItems:'center'}}>
      <div className={classes.image}/>
      <div style={{width:'50%',alignSelf:'center',position:'absolute',top:'40%',color:'white',}}>
      <Typography variant='h3' >Review your favourite webtoons now! On ReviewDB</Typography>
      </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      {showAlert && <Alert severity='error'>{showAlert}</Alert>}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
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
                error={
                  content.password==''
                }
                helperText={
                  content.password==''?'password?':''
                }
              />
              </Grid>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}