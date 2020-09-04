import * as React from 'react';
import {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import classNames from "classnames";

interface Props {
    callback: (selected: string) => void;
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
            width: 99,
            overflowY: 'auto',
            height: 'calc(100vh - 121px)'
        },
        container: {

        },
        menuBtn: {
            background: 'none',
            height: 40
        },
        menuItem: {
            height: 48,
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        selected: {
            '&:hover': {
                backgroundColor: '#90bbdd',
            },
        },
        unselected: {
            background: '#404040'
        },
        BorderSelected: {
            background: 'none',
            borderRadius: 3,
            border: '1px solid #5D8AA8',
        },
        BorderUnselected: {
            background: 'none',
        },
        btnBorder: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 70,
            height: 46,
            borderRadius: 4
        }
    }),
);

const AFSCMenu: React.FC<Props> = props => {
    const classes = useStyles();
    // const dispatch = useDispatch();

    const [distinctAfscList, setDistinctAFSCList] = useState();

    useEffect(() => {

        fetch(`/positions/afscList/HL0RFB09`,
            {
                method: 'get',
            })
            .then(response => response.json())
            .then(json => handle1stResponse(json))
            .catch(reason => console.log(`Fetch failed: ${reason}`));

    }, [classes]);

    const handle1stResponse = (afscs: string[]) => {
        setDistinctAFSCList(afscs);
    };

    function handleClick(selected: string) {
        props.callback(selected);
    }

    function renderDistinctAFSCs() {
        return distinctAfscList.map((afsc: string, index: number) => {
            return <div key={index} className={classes.menuItem}>
                <div className={classNames(props.selected.indexOf(afsc) > -1 ? classes.BorderSelected : classes.BorderUnselected, classes.btnBorder)}>
                    <Button className={classNames(props.selected.indexOf(afsc) > -1 ? classes.selected : classes.unselected, classes.menuBtn)} onClick={() => handleClick(afsc)}>
                    {afsc}
                    </Button>
                </div>
            </div>
        })
    }

    return (
        <div className={classes.root}>
                {distinctAfscList && renderDistinctAFSCs()}
        </div>
    );
};

export default AFSCMenu;