import classes from './LayoutCenter.module.css';
 import AdminNavigation from "../admin/AdminNavigation";

function LayoutCenter(props){
    return(
        <div className={classes.header}>
{ <AdminNavigation /> }
<main className = {classes.main}>{props.children}</main>
</div>
    );
}

export default LayoutCenter;