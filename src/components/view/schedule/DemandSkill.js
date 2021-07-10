import DemandCard from "./DemandCard";
import { Grid, Typography, } from "@material-ui/core";


function DemandSkill({ skillDemand, onDelete, onEdit }) {
    return (<div style={{ backgroundColor: "#f3f5f6", height: "100%", width: 304, paddingTop: 20, }}>
        <Typography align="center" variant="h3">{skillDemand.skillName}</Typography>
        <Grid container spacing={2} style={{ padding: 20 }} direction="column" spacing={1}>
            {skillDemand.demandDatas.map((demand, index) => {
              
                return (
                    <Grid key={index} item style={{ backgroundColor: "#f3f5f6", height: "100%" }}>
                        <DemandCard start={demand.start} 
                                end={demand.end} 
                                demandIndex={index} 
                                skillId={skillDemand.skillId}
                                quantity={demand.quantity} 
                                level={demand.level} 
                                onDelete={onDelete} 
                                onEdit={onEdit} />
                    </Grid>);
            })}
        </Grid>
    </div>);
}

export default DemandSkill;