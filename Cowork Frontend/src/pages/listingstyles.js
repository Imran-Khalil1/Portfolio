import {makeStyles} from '@material-ui/core/styles'
import img1 from '../assets/Listing.jpg'

const useStyles = makeStyles((theme)=>({
    hero:{
        backgroundImage: `url(${img1})`,
        width: "100%",
        height:"1093px",
        marginTop:"9%",
        position:"absolute"
    },
    headingText:{
        width:"30%",
        marginTop:"2%",
        marginLeft:"2%",
        color:"white"
        
    },
    listingButton:{
        color:"white",
        backgroundColor:"#F1B47B",
        borderRadius:"20px",
        width:"150px",
        height:"50px",
        marginTop:"20px",
        marginBottom:"10px"
    },
    informationSection:{
        backgroundColor:"#F1B47B",
        width:"50%",
        height:"422",
        marginLeft:"30%",
        marginTop:"3%",
        opacity:"0.9",
        color:"white",
        marginBottom:"20%"
    },
    text:{
        marginBottom:"10px"
    },
    box1:{
        width:"35%",
        paddingTop:"20px",
        paddingLeft:"20px"
    },
    box2:{
        width:"35%",
        marginLeft:"60%",
        marginTop:"-10%",
        paddingBottom:"20px"
    },
    box3:{
        width:"35%",
        paddingLeft:"20px"
    },
    box4:{
        width:"35%",
        marginLeft:"60%",
        marginTop:"-10%",
        paddingBottom:"20px"
    },

}))

export default useStyles;