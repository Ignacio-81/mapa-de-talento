import React from 'react'
import MainBar  from './MainBar.js';
import InitialPersonalData from './InitialPersonalData.js'
import SkillsBox from './SkillsBox.js';
import {mainSkills} from '../Utils/consts.js'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        marginLeft : '2vw',
        marginRight : '2vw',
    },
    content: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 70,
    }
})

export default function Form() {
    const classes = useStyles();
  return (
    <div className={classes.root}>
            <MainBar/>
        <main className={classes.content}>
            <InitialPersonalData/>
            <SkillsBox
                mainSkills={mainSkills}
            />
        </main>
    </div>
  )
}