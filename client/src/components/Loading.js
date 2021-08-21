import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
    root : {
        display : 'flex',
        height : '100%',
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center',
        '& > *' : {
            margin : '10px'
        }
    }
})
export const Loading = () => {
    const classes = useStyle();

    return(
        <div className = {classes.root}>
            <h2>Chargement en cour...</h2>
            <CircularProgress thickness = {4} variant = 'indeterminate'/>
        </div>
    )
}