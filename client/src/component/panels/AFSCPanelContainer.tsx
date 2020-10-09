import * as React from 'react';
import {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import AFSCMenu from "../menus/AFSCMenu";
import AFSCCard from "./AFSCCard";
import Typography from "@material-ui/core/Typography";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {Slide} from "@material-ui/core";
import classNames from "classnames";

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
                justifyContent: 'start',
                transition: theme.transitions.create(["padding-left"], {duration: theme.transitions.duration.complex}),
            },
            divider: {
                paddingLeft: 25,
            },
            AFSCMenuTitle: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                marginLeft: 9

            },
            toggleBtn: {
                width: 24,
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                height: '100%',
                position: 'relative',
                right: 0,
                background: '#5D8AA8',
                borderRadius: '2px 0 0 2px',
                transition: theme.transitions.create(["width"], {duration: theme.transitions.duration.shortest}),
                '&:hover': {
                    backgroundColor: '#90bbdd',
                    cursor: 'pointer',
                    width: 80,
                },
            },
            AFSCMenuTitleArea: {
                zIndex: 200,
                // background: '#4e5456',
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
                zIndex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                background: '#5D8AA8',
                position: 'absolute',
                width: 24,
                height: 50,
                borderRadius: '0 2px 2px 0',
                borderBottom: '1px solid #000',
                transition: theme.transitions.create(["width"], {duration: theme.transitions.duration.short}),
                '&:hover': {
                    backgroundColor: '#90bbdd',
                    cursor: 'pointer',
                    width: 50,
                },
            },
            MenuContainer: {
                zIndex: 1
            },
            scrollRef: {
                height: 1,
                background: 'transparent',
                width: "100%"
            }
        }),
    )
;

const AFSCPanelContainer: React.FC<Props> = props => {
    const classes = useStyles();

    const [selectedAFSC, setSelectedAFSC] = useState<string[]>([])
    const [open, toggleOpen] = useState(true);
    const [closing, toggleClosing] = useState(false);

    let afsc = selectedAFSC;

    function handleCallback(selected: string) {
        if (selectedAFSC.indexOf(selected) > -1) {
            toggleClosing(true);
            afsc = selectedAFSC.filter(item => item != selected);
            setSelectedAFSC(afsc);

        } else {
            toggleClosing(false);
            setSelectedAFSC(selectedAFSC.concat(selected));
        }
    }

    function showAll(afsclist: string[]) {
        setSelectedAFSC([]);
        setSelectedAFSC(afsclist);
    }

    useEffect(() => {
        if (!closing) {
            let element = document.getElementById("scrollRabbit");
            element.scrollIntoView();
            element.scrollIntoView(false);
            element.scrollIntoView({block: "end"});
            element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }


        return function cleanup() {
        }
    }, [selectedAFSC]);


    function handleClick() {
        toggleOpen(prev => !prev)
    }

    return (
        <div className={classes.root}>
            <Slide direction="right" in={open} mountOnEnter unmountOnExit>
                <div className={classes.MenuContainer}>
                    <div className={classes.AFSCMenuTitleArea}>
                        <div className={classes.AFSCMenuTitle}>
                            <Typography>
                                Show AFSC
                            </Typography>

                        </div>
                        <div className={classes.toggleBtn} onClick={handleClick}>
                            <ArrowLeftIcon/>
                        </div>
                    </div>
                    <AFSCMenu callback={handleCallback} selected={selectedAFSC} showAll={showAll}/>
                </div>
            </Slide>
            <Slide direction="right" in={!open} mountOnEnter unmountOnExit>
                <div className={classes.toggleBtnOpen} onClick={handleClick}>
                    <ArrowRightIcon fontSize={"small"}/>
                </div>
            </Slide>
            <div className={classNames(classes.AFSCCardContainer, !open ? classes.divider : "")}>
                {selectedAFSC && selectedAFSC.map((item: string, index: number) => {
                    return <AFSCCard key={item} pas={props.pas} afsc={item} mapKi={index} callback={handleCallback}/>
                })}
                <div id={"scrollRabbit"} className={classes.scrollRef}/>
            </div>
        </div>
    );
};

export default AFSCPanelContainer;
