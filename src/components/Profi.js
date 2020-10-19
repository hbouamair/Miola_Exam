import React from 'react'
import { Paper, Card, Typography, makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fdfdff'
    },
    pageHeader:{
        padding:theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(2)
    },
    pageIcon:{
        display:'inline-block',
        width:40,
        height:40,
        padding:theme.spacing(2),
        color:'#3c44b1'
    },
    pageTitle:{
        paddingLeft:theme.spacing(4),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    }
}))

export default function PageHeader(props) {

    const classes = useStyles();
    const { title, subTitle, icon } = props;
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    <img  src={require("../images/logo.png")}/>
                </Card>
                <div className={classes.pageTitle}>
                    <Typography
                        variant="h6"
                        component="div">
                        Khalid Nafil</Typography>
                    <Typography
                        variant="subtitle2"
                        component="div">
                        Coordinateur</Typography>
                </div>
            </div>
        </Paper>
    )
}