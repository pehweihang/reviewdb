import React,{useState} from 'react';
import {
  AppBar,Button,Card,CardActions,CardContent,CardMedia,CssBaseline,
  Grid,Toolbar,Typography,TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import StarsIcon from '@material-ui/icons/Stars';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import SearchIcon from '@material-ui/icons/Search';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/styles';

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
  icon: {
    marginRight: theme.spacing(2),
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
  searchBar: {
    [`& fieldset`]:{borderRadius:30},
  },
}));

const cards = [
  {title:'Tower of God',image:'tog.jpg',desc:'Some nigga called Bam',rating:4.2},
  {title:'Jujutsu Kaisen',image:'jjk.jpg',desc:'High school kid gets posessed',rating:4.5},
  {title:'Demon Slayer',image:'ds.png',desc:'Wholesome story about a boy and his chibi sister',rating:4.3},
  {title:'The Beginning After the End',image:'beginning.jpg',desc:'King -> kid',rating:4},
  {title:'Sololeveling',image:'sololeveling.jpg',desc:'Man vs God',rating:4.6},
  {title:'Tomb Raider King',image:'tombraiderking.jpg',desc:'Man goes back in time for revenge on the world',rating:3},
];

export default function Home() {
  const classes = useStyles();
  const [filteredDataSource, setFilteredDataSource] = useState(cards);
  const [masterDataSource, setMasterDataSource] = useState(cards);
 
  const searchFilterFunction = (e) => {
    console.log("change")
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


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <StarsIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            ReviewDB
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Welcome to ReviewDB
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Rate your favourite anime, manga and webtoons below!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                <div style={{position: 'relative'}}> 
                  <TextField 
                  className={classes.searchBar}
                  placeholder="Search by title"
                  inputProps={{style:{paddingLeft:10}}}
                  InputProps={{ disableUnderline: true,startAdornment: <SearchIcon/>}}
                  variant='outlined'
                  onChange={searchFilterFunction}
                  />
                </div>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {filteredDataSource.length>0? filteredDataSource.map((card,index) => (
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
                    {
                       <StarIcon/>
                    }
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
            )):
            <Grid item align='center' style={{flex:1}}>
              <Typography color='secondary' variant='h4'>No webtoons found!</Typography>
            </Grid>}
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