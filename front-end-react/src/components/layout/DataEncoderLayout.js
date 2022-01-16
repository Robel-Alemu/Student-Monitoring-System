import classes from './DataEncoderLayout.module.css';
 import AdminNavigation from "../admin/AdminNavigation";
import DataEncoderNavigation from '../data-encoder/DataEncoderNavigation';

function DataEncoderLayout(props){
    return(
        <div className = {classes.header}>
{ <DataEncoderNavigation /> }
<main className = {classes.main}>{props.children}</main>
</div>
    );
}

export default DataEncoderLayout;