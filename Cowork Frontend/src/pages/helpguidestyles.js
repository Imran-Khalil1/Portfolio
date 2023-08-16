import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme)=>({
    container:{
        backgroundColor:'#F4EDE5',
        padding: theme.spacing(8,0,6),
    },
    icon:{
        marginRight:'20px'
    },
    cardGrid:{
        padding:'20px 0',
        marginBottom:"3%"
    },
    card:{
        height:'100%',
        display:'flex',
        flexDirection:'column',
        width: "400px"
    },
    cardMedia:{
        paddingTop:'56.25%'
    },
    cardContent:{
        flexGrow:2,
        backgroundColor:"#F1B47B",
        color:"#FFFFFF"
    },
    informationCard:{
        paddingLeft:"20%",
  
    },
    submitbutton:{
        backgroundColor:"#F1B47B",
        color:"#FFFFFF",
    }
}))

export default useStyles;