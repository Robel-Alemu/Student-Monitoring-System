import classes from './Layout.module.css';
 import AdminNavigation from "../admin/AdminNavigation";

function Layout(props){
    return(
        <div className = {classes.header}>
{ <AdminNavigation /> }
<main className = {classes.main}>{props.children}</main>
</div>
    );
}

export default Layout;