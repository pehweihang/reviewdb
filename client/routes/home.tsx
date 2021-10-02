import React,{useState} from 'react';
import {
  AppBar,Button,Card,CardActions,CardContent,CardMedia,CssBaseline,
  Grid,Toolbar,Typography,TextField,Modal} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import StarsIcon from '@material-ui/icons/Stars';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useCreateGroupMutation, useGetGroupLinkMutation, useLogoutMutation } from '../generated/graphql';
import { getAccessToken, setAccessToken } from '../components/accessToken';
import router from 'next/router';
import { FormatAlignJustify, Translate } from '@material-ui/icons';
import { withApollo } from '../components/withApollo';
import JwtDecode from 'jwt-decode';
import { Payload } from '../types';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  logo: {
    marginRight: theme.spacing(2),
  },
  icon: {
    color: '#eb3461',
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 4),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  reviewButton: {
    backgroundColor:'#eb3461',
    padding:theme.spacing(1,2,1),
    color:'white',
    borderRadius:20
  },
  modalDiv: {
    width:400,position:'relative',top:'30%',
    margin:'auto',padding:15,paddingBottom:20,backgroundColor:'white'
  },
  searchBar: {
    [`& fieldset`]:{borderRadius:30},
  },
}));


//going to be replaced with data package from backend

const cards = [
  {title:'Tower of God',image:'tog.jpg',desc:'Some nigga called Bam',rating:4.2},
  {title:'Jujutsu Kaisen',image:'jjk.jpg',desc:'High school kid gets posessed',rating:4.5},
  {title:'Demon Slayer',image:'ds.png',desc:'Wholesome story about a boy and his chibi sister',rating:4.3},
  {title:'The Beginning After the End',image:'beginning.jpg',desc:'King -> kid',rating:4},
  {title:'Sololeveling',image:'sololeveling.jpg',desc:'Man vs God',rating:4.6},
  {title:'Tomb Raider King',image:'tombraiderking.jpg',desc:'Man goes back in time for revenge on the world',rating:3},
];

//data ends here



const Home:React.FC = () => {
  const payload: Payload = JwtDecode(getAccessToken()) as Payload
  const groupName = payload.groupName
  const classes = useStyles();
  const [filteredDataSource, setFilteredDataSource] = useState(cards);
  const [masterDataSource, setMasterDataSource] = useState(cards);
  const [open,setOpen] = useState(false);
 
  const searchFilterFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    let text=e.target.value;
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
        ? item.title.toUpperCase()
        : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      } else {
      setFilteredDataSource(masterDataSource);
      }
  };

  const cardsRender = (filteredDataSource: Array<any>) => {
    let cardsarr=[];
    if (filteredDataSource.length>0){
      filteredDataSource.map((card,index) => (
        cardsarr.push(
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              //have to change image source when connected to db/api
              image={'/assets/'+card.image}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {card.title}
              </Typography>
              <div style={{flexDirection:'row',display:'flex',paddingTop:3,paddingBottom:3}}>
              {ratingRender(card.rating)}
              <Typography style={{paddingLeft:10,marginTop:2}}>{card.rating}</Typography>
              </div>
              <Typography>
                {card.desc}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" className={classes.reviewButton}>
                Review
              </Button>
            </CardActions>
          </Card>
        </Grid>
        )
      ))
    }
    cardsarr.push(
    <Grid item key={filteredDataSource.length} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          //have to change image source when connected to db/api
          image={'/assets/plus.png'}
          title="Image title"
        />
        <CardActions>
          <Button onClick={()=>setOpen(true)} size="small" variant="contained" className={classes.reviewButton}>
            Add a new anime/webtoon/manga
          </Button>
        </CardActions>
      </Card>
    </Grid> 
    )
    return cardsarr;
  }

  const ratingRender = (rating: number) => {
    let ratingarr=[];
    for (let i=1;i<=5;i++){
      if (i<=Math.floor(rating)) ratingarr.push(<StarIcon key={i} className={classes.icon}/>)
      else if (i-rating<1) ratingarr.push(<StarHalfIcon key={i} className={classes.icon}/>)
      else ratingarr.push(<StarBorderIcon key={i} className={classes.icon}/>)
    }
    return ratingarr;
  }

  const [newGroupName, setNewGroupName] = useState('');
  const setNewGroupNameEvent=(e : React.ChangeEvent<HTMLInputElement>)=>setNewGroupName(e.target.value);

  const [createGroupMutation] = useCreateGroupMutation();
  async function createGroup(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await createGroupMutation({variables:{GroupName:newGroupName}});
    if (response && response.data) {
      const link = await getGroupLink()
      console.log(link)
      router.push("http://localhost:3000/joingroup/"+link)
    }
  }

  const joinGroupModal = () => {
    return(
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="AddNewEntry"
      >
          <form onSubmit={createGroup}>
          <div className={classes.modalDiv}>
            <h2>Hey, lets make a group!</h2>
            <p>
              Looks like you're not in a group. Join a group via a link or make one to start reviewing now!
            </p>
            <TextField id='groupname' onChange={setNewGroupNameEvent} style={{paddingRight:10}} placeholder='Group name'/>
            <Button type='submit' size="small" variant="contained" className={classes.reviewButton}>Make Group</Button>
          </div>
          </form>
      </Modal>
    )
  }

  const getGroupLinkModal = () => {
    return(
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="AddNewEntry"
      >
          <form onSubmit={createGroup}>
          <div className={classes.modalDiv}>
            <h2>Hey, lets make a group!</h2>
            <p>
              Looks like you're not in a group. Join a group via a link or make one to start reviewing now!
            </p>
            <TextField id='groupname' onChange={setNewGroupNameEvent} style={{paddingRight:10}} placeholder='Group name'/>
            <Button type='submit' size="small" variant="contained" className={classes.reviewButton}>Make Group</Button>
          </div>
          </form>
      </Modal>
    )
  }

  const [logoutMutation] =  useLogoutMutation();
  const logout = async() => {
    const response = await logoutMutation();
    if (response && response.data) {
      setAccessToken(response.data.logout.accessToken);
      router.reload();
    }
  }
  const [grouplinkMutation] = useGetGroupLinkMutation();
  const getGroupLink = async() => {
    const response = await grouplinkMutation();
    if (response && response.data) {
      console.log(response.data.getGroupLink);
      return response.data.getGroupLink;
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <StarsIcon/>
          <Typography variant="h6" color="inherit">
            WeebCritic
          </Typography>
          <div>
          {groupName?
          <button 
            onClick={() => getGroupLink()} 
            style={{
              justifySelf:'flex-end',
              flexDirection:'row',
              backgroundColor:'transparent',
              
            }}>
              {console.log("gn",payload)}
            <Typography>Get group invite link</Typography>:
            
          </button>:
          <button 
          onClick={() => setOpen(true)} 
          style={{
            justifySelf:'flex-end',
            flexDirection:'row',
            backgroundColor:'transparent',
            
          }}>
          <Typography>Join a group</Typography>
          </button>
          }
          <button 
            onClick={() => logout()} 
            style={{
              justifySelf:'flex-end',
              flexDirection:'row',
              backgroundColor:'transparent',
              
            }}>
            <Typography>Logout</Typography>
            <ExitToAppIcon/>
          </button>
          </div>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Welcome to WeebCritic
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Rate your favourite anime, manga and webtoons below!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                <div style={{position: 'relative',border: '1px solid black',borderRadius: 20,padding: 5}}> 
                  <TextField 
                  className={classes.searchBar}
                  placeholder="Search by title"
                  inputProps={{style:{paddingLeft:10}}}
                  InputProps={{ disableUnderline:true,startAdornment: <SearchIcon/>}}
                  onChange={searchFilterFunction}
                  />
                </div>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cardsRender(filteredDataSource)}
            {joinGroupModal()}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

export default withApollo({ssr:true})(Home);