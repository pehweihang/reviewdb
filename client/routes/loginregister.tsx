import React, {useState,useEffect} from 'react';
import { 
  Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Paper, 
  Grid, Typography, TextField, InputAdornment, IconButton, Link, 
  Tabs, Tab, AppBar
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useRouter } from 'next/router'
import { useLoginMutation, useRegisterMutation } from '../generated/graphql';
import { getAccessToken, setAccessToken } from '../utils/accessToken';
import { withApollo } from '../utils/withApollo';


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
    zIndex: -1,
  },
  welcomeMsg: {
    width:'40%',
    zIndex:1,
    position:'absolute',
    top:'40%',
    left:'10%',
    color:'white',
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

const Login:React.FC = () => {
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
        console.log(getAccessToken())
      }
      router.query.referer?
      router.push(router.query.referer.toString()):
      router.reload();
    }catch(error:any){
      console.log(error.message);
      setShowAlert(error.message);
    }
  } 
  
  return (
    <Grid container component="main" >
        {showAlert && <Alert style={{flex:1}} severity='error'>{showAlert}</Alert>}
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
            </Grid>
            </Grid>
          </form>
        </div>
      
    </Grid>
  );
}

const Register:React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const [register] = useRegisterMutation();
  const [content,setContent] = useState({ 
    email: '',
    fname:'',
    lname:'',
    name: '',
    password: '',
    password2: '',
  });
  useEffect(() => {
    validate()
  }, [content]);
  
  const setEmail = (e : React.ChangeEvent<HTMLInputElement>) => {
    setContent({
      ...content,email: e.target.value,
    })
  }
  const handleFname = (e : React.ChangeEvent<HTMLInputElement>) => {
    setContent({
      ...content,fname: e.target.value,
    })
  }
  const handleLname = (e : React.ChangeEvent<HTMLInputElement>) => {
    setContent({
      ...content,lname: e.target.value,
    })
  }
  const setPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
    setContent({
      ...content,password: e.target.value,
    })
  }
  const setCPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
    setContent({
      ...content,password2: e.target.value,
    })
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [showAlert, setShowAlert] = useState(null);

  const [isFormValid, setIsFormValid ] = useState(false);
  const validate = () => {
    if (!content.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) 
      || content.fname.length==0 
      || content.password.length<8 
      || content.password2!==content.password)
    setIsFormValid(false);
    else setIsFormValid(true);
  }

  async function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try{
      const response = await register({
        variables: {
          registerName:content.fname.trim()+' '+content.lname.trim(),
          registerEmail:content.email.trim(),
          registerPassword:content.password,
          registerPassword2:content.password2
        },
      })
      if (response && response.data){
        setAccessToken(response.data.register.accessToken)
      }
      console.log(router.query.referer);
      router.query.referer?
      router.push(router.query.referer.toString()):
      router.reload();
    } catch(error:any){
      console.log(error.message);
      setShowAlert(error.message);
    }
  }
  
  return (
    <Grid container component="main">
        {showAlert && <Alert style={{flex:1}} severity='error'>{showAlert}</Alert>}
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
              Register
            </Button>
            </Grid>
          </form>
        </div>
    </Grid>
  );
}

const LoginRegister:React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} style={{alignItems:'center'}}>
      <div className={classes.image}/>
      <div className={classes.welcomeMsg}>
      <Typography variant='h3' >Review your favourite webtoons now! On WeebCritical</Typography>
      </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{zIndex:2}}>

        <div className={classes.root}>
        <Tabs
          value={value}
          textColor="primary"
          indicatorColor="primary"
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Tab style={{flex:1}} label="Login" />
          <Tab style={{flex:1}} label="Register" />
        </Tabs>
          {value==0?<Login/>:<Register/>}
        </div>
      </Grid>
    </Grid>
  )
}

export default withApollo({ssr:true})(LoginRegister);