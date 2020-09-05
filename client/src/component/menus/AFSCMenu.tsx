import * as React from 'react';
import {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import {useDispatch} from "react-redux";

interface Props {
    callback: (selected: string) => void;
    showAll: (afsclist: string[]) => void;
    selected: string[];
className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'block',
            position: 'relative',
            top: 51,
            zIndex: 200,
            width: 98,
            paddingTop: 5,
            overflowY: 'auto',
            background: '#2b2b2b',
            height: 'calc(100vh - 121px)'
        },
        container: {

        },
        menuBtn: {
            background: 'none',
            height: 30
        },
        menuItem: {
            height: 40,
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        selected: {
            // '&:hover': {
            //     backgroundColor: '#90bbdd',
            // },
        },
        unselected: {
            background: '#404040',
            width: 66,
            height: 32,

            '&:hover': {
            border: '1px solid #5D8AA8',
            },
        },
        BorderSelected: {
            background: 'none',
            borderRadius: 3,
            width: 66,
            height: 38,
            overflow: 'hidden',
            transition: theme.transitions.create(["width","height"],{ duration: theme.transitions.duration.shortest }),
            // transition: 'width 600ms ease-out, height 600ms ease-out',
            border: '1px solid #5D8AA8',
        },
        BorderUnselected: {
            width: 54,
            height: 22,
            background: 'none',
            transition: theme.transitions.create(["width","height"],{ duration: theme.transitions.duration.shortest }),
        },
        btnBorder: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,

        },
        toggleBtnGrp: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        },
        toggleShowHideBtn: {
            width: 85
        },
        toggled: {
            background: "#5D8AA8"
        }
    }),
);

const AFSCMenu: React.FC<Props> = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [distinctAfscList, setDistinctAFSCList] = useState();
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {

        fetch(`/positions/afscList/HL0RFB09`,
            {
                method: 'get',
            })
            .then(response => response.json())
            .then(json => handle1stResponse(json))
            .catch(reason => console.log(`Fetch failed: ${reason}`));

    }, [dispatch]);

    const handle1stResponse = (afscs: string[]) => {
        setDistinctAFSCList(afscs);
    };

    function handleClick(selected: string) {
        props.callback(selected);
    }

    function toggleAll() {
        if(showAll) {
            props.showAll(distinctAfscList)
        } else {
            props.showAll([]);
        }
        setShowAll(prev => !prev)
    }


    function renderDistinctAFSCs() {
        return distinctAfscList.map((afsc: string, index: number) => {
            return <div key={index} className={classes.menuItem}>
                <div className={classNames(classes.btnBorder, props.selected.indexOf(afsc) > -1 ? classes.BorderSelected : classes.BorderUnselected )}>
                    <Button className={classNames(props.selected.indexOf(afsc) > -1 ? classes.selected : classes.unselected, classes.menuBtn)} onClick={() => handleClick(afsc)}>
                    {afsc}
                    </Button>
                </div>
            </div>
        })
    }

    return (
        <div className={classes.root}>
            <div className={classes.toggleBtnGrp}>
            <Button onClick={toggleAll} className={classNames(classes.toggleShowHideBtn, !showAll ? classes.toggled : "")}>
                Show All
            </Button>
            </div>
                {distinctAfscList && renderDistinctAFSCs()}
        </div>
    );
};

export default AFSCMenu;