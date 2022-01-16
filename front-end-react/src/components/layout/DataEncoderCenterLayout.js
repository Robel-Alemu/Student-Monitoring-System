import classes from './DataEncoderCenterLayout.module.css';
 import AdminNavigation from "../admin/AdminNavigation";
import DataEncoderNavigation from '../data-encoder/DataEncoderNavigation';

function DataEncoderCenterLayout(props){
    return(
        <div className={classes.header}>
{ <DataEncoderNavigation /> }
<main className = {classes.main}>{props.children}</main>
</div>
    );
}

export default DataEncoderCenterLayout;