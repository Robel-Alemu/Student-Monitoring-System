import classes from './Layout.module.css';


function CommonLayout(props){
    return(
        <div className = {classes.header}>

<main className = {classes.main}>{props.children}</main>
</div>
    );
}

export default CommonLayout;