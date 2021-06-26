import { Card, CardContent, CardHeader, Divider, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "10px 10px",
        boxShadow: 'none'
    },
}));

export function CardCustom({ children, header }) {
    const classes = useStyles();
    return (<Card className={classes.container}>
        <CardHeader disableTypography={false} title={<Typography variant="h4">
            {header}
        </Typography>} />
        <Divider />
        <CardContent >
            {children}
        </CardContent>
    </Card>);
}