import * as React from 'react';
import {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import AFSCMenu from "../menus/AFSCMenu";
import AFSCCard from "./AFSCCard";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

interface Props {
    pas: string;
    className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',

            },
            table: {
                width: '100%',
                position: 'relative',
                boxSizing: 'border-box',
                display: 'flex',
                padding: '12px 4px 12px 12px',
                height: '100%',
                verticalAlign: 'baseline',
            },
            paper: {
                display: 'flex',
                padding: theme.spacing(1),
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                height: 20,
                width: 60,
                color: theme.palette.text.secondary
            },
            container: {},
            AFSCCardContainer: {
                position: 'relative',
                display: 'flex',
                width: '100%',
                height: 'calc(100vh - 70px)',
                overflowY: 'auto',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            divider: {
                position: 'absolute',
                left: '100px'
            },
            AFSCMenuTitle: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',

            },
            toggleBtn: {
                width: 20,
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                background: '#565656',
                height: '100%',
                position: 'relative',
                right: 0,
                transition: 'width 200ms',
                '&:hover': {
                    backgroundColor: '#90bbdd',
                    cursor: 'pointer',
                        width: 80,
                },
            },
            AFSCMenuTitleArea: {
                zIndex: 200,
                background: '#4e5456',
                position: 'absolute',
                display: 'inline-flex',
                justifyContent: 'start',
                alignItems: 'center',
                borderBottom: '1px solid #000',
                height: 50,
                width: 98,


            },
            toggleBtnOpen: {
                display: 'flex',
                zIndex: 199,
                justifyContent: 'start',
                alignItems: 'center',
                background: '#4e5456',
                position: 'absolute',
                width: 14,
                height: 50,
                borderBottom: '1px solid #000',
                transition: 'width 200ms',
                '&:hover': {
                    backgroundColor: '#90bbdd',
                    cursor: 'pointer',
                    width: 50,
                },
            }
        }),
    )
;

const AFSCPanelContainer: React.FC<Props> = props => {
    const classes = useStyles();

    const [selectedAFSC, setSelectedAFSC] = useState([] as string[])
    const [open, toggleOpen] = useState(true);

    let afsc = selectedAFSC;

    function handleCallback(selected: string) {
        if (selectedAFSC.indexOf(selected) > -1) {
            afsc = selectedAFSC.filter(item => item != selected);
            setSelectedAFSC(afsc);
        } else {
            setSelectedAFSC(selectedAFSC.concat(selected));
        }
    }

    useEffect(() => {
        console.log(selectedAFSC);
    }, [selectedAFSC]);

    function GridItems() {
        return (
            <React.Fragment>
                {selectedAFSC && selectedAFSC.map((item: string, index: number) => {
                    return <AFSCCard key={index} pas={props.pas} afsc={item} mapKi={index}/>
                })}
            </React.Fragment>
        )
    }

    function handleClick() {
        toggleOpen(prev => !prev)
    }

    return (
        <div className={classes.root}>
            <Collapse in={open} exit={true} >
                <div className={classes.AFSCMenuTitleArea}>
                    <div className={classes.AFSCMenuTitle}>
                        <Typography color={"primary"}>
                            AFSC
                        </Typography>

                    </div>
                    <div className={classes.toggleBtn} onClick={handleClick}>
                        <ArrowLeftIcon/>
                    </div>
                </div>
                {open && <AFSCMenu callback={handleCallback} selected={selectedAFSC}/> }
            </Collapse>
            {!open &&  <div className={classes.toggleBtnOpen} onClick={handleClick}>
                <ArrowRightIcon fontSize={"small"}/>
            </div> }
            {open && <Divider orientation={"vertical"} className={classes.divider}/>}
            <div className={classes.AFSCCardContainer}>
                {GridItems()}
            </div>
        </div>
    );
};

export default AFSCPanelContainer;