import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, Grid, Paper, Typography, } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { FirstPage, Stars, Store, ThumbDownAltOutlined, ThumbUpAltOutlined, WatchLaterRounded } from '@material-ui/icons';
class BrandHome extends React.Component {

    render() {
        const dataTable = [
            { id: 2, name: "Chi Nhanh 1", address: "abc", phone: "023578951" },
            { id: 3, name: "Chi Nhanh 1", address: "Quan Phu Nhuan", phone: "023578951" },
            { id: 1, name: "Effoc 1", address: "676 Le Duan", phone: "098987667" },
        ]
        const columns = [
            { field: 'store', headerName: 'Store', width: 150 },
            { field: 'name', headerName: 'Name', width: 200 },
            { field: 'address', headerName: 'Address', width: 200 },
        ];
        return (
            <React.Fragment>
                <Card style={{ padding: '10px', marginBottom: '20px' }}>
                    <h1>Home page</h1>
                </Card>
                <Grid container direction="row" spacing={2} style={{ flexWrap: 'nowrap' }}>
                    <Grid item xs={1} sm={3} md={3}>
                        <Card style={{ paddingTop: '5px', backgroundColor: '#AFD788' }}>
                            <Typography style={{ marginLeft: '60px', }} variant="h3"> <WatchLaterRounded style={{ color: 'green', marginBottom: '-3px' }} /> Start earliest</Typography>
                            <Card style={{ padding: '10px', backgroundColor: '' }}>
                                <Typography variant="h4"> <Store style={{ color: '#006241', marginBottom: '-3px' }} /> Store: Chi nhanh 1</Typography>
                                <p >Number of time are start early: 10</p>
                            </Card>
                        </Card>
                    </Grid>
                    <Grid item xs={1} sm={3} md={3} style={{ marginLeft: '10px' }}>
                        <Card style={{ paddingTop: '5px', backgroundColor: '#FCDAD5' }}>
                            <Typography style={{ marginLeft: '60px', }} variant="h3"> <WatchLaterRounded style={{ color: 'red', marginBottom: '-3px' }} /> End earliest</Typography>
                            <Card style={{ padding: '10px' }}>
                                <Typography variant="h4"> <Store style={{ color: '#006241', marginBottom: '-3px' }} /> Store: Chi nhanh 2</Typography>
                                <p >Number of time are end early: 5</p>
                            </Card>
                        </Card>
                    </Grid>
                    <Grid item xs={4} sm={3} md={3} style={{ marginLeft: '10px' }}>
                        <Card style={{ paddingTop: '5px', backgroundColor: '#AFD788' }}>
                            <Typography style={{ marginLeft: '60px', }} variant="h3"> <ThumbUpAltOutlined style={{ color: 'green', marginBottom: '-3px' }} /> End latest</Typography>
                            <Card style={{ padding: '10px' }}>
                                <Typography variant="h4"> <Store style={{ color: '#006241', marginBottom: '-3px' }} /> Store: Chi nhanh 2</Typography>
                                <p >Number of time are end late: 10</p>
                            </Card>
                        </Card>
                    </Grid>
                    <Grid item xs={4} sm={3} md={3} style={{ marginLeft: '10px' }}>
                        <Card style={{ paddingTop: '5px', backgroundColor: '#FCDAD5' }}>
                            <Typography style={{ marginLeft: '60px', }} variant="h3"> <ThumbDownAltOutlined style={{ color: 'red', marginBottom: '-3px' }} /> Start latest</Typography>
                            <Card style={{ padding: '10px' }}>
                                <Typography variant="h4"> <Store style={{ color: '#006241', marginBottom: '-3px' }} /> Store: Chi nhanh 2</Typography>
                                <p >Number of staff are late: 5</p>
                            </Card>

                        </Card>
                    </Grid>
                </Grid>
                <br /><br />
                <Grid container direction="row" spacing={2} style={{ flexWrap: 'nowrap' }}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Card style={{ paddingTop: '5px', backgroundColor: '#FFCC99', height: '350px' }}>
                            <Typography style={{ marginLeft: '60px', }} variant="h3"> <WatchLaterRounded style={{ color: 'green', marginBottom: '-3px' }} /> Start earliest</Typography>
                            <Card style={{ padding: '10px', backgroundColor: '', height: '330px' }}>
                                <DataGrid disableColumnFilter rows={dataTable} columns={columns} />
                            </Card>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} style={{ marginLeft: '10px' }}>
                        <Card style={{ paddingTop: '5px', backgroundColor: '#FFCC99', height: '350px' }}>
                            <Typography style={{ marginLeft: '60px', }} variant="h3"> <WatchLaterRounded style={{ color: 'red', marginBottom: '-3px' }} /> End earliest</Typography>
                            <Card style={{ padding: '10px', backgroundColor: '', height: '330px' }}>
                                <DataGrid disableColumnFilter rows={dataTable} columns={columns} />
                            </Card>
                        </Card>
                    </Grid>
                </Grid>
                <br /><br />
                <Grid container direction="row" spacing={2} style={{ flexWrap: 'nowrap' }}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Card style={{ paddingTop: '5px', backgroundColor: '#FFCC99', height: '350px' }}>
                            <Typography style={{ marginLeft: '60px', }} variant="h3"> <ThumbUpAltOutlined style={{ color: 'green', marginBottom: '-3px' }} /> End latest</Typography>
                            <Card style={{ padding: '10px', backgroundColor: '', height: '330px' }}>
                                <DataGrid disableColumnFilter rows={dataTable} columns={columns} />
                            </Card>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} style={{ marginLeft: '10px' }}>
                        <Card style={{ paddingTop: '5px', backgroundColor: '#FFCC99', height: '350px' }}>
                            <Typography style={{ marginLeft: '60px', }} variant="h3"> <ThumbDownAltOutlined style={{ color: 'red', marginBottom: '-3px' }} /> Start latest</Typography>
                            <Card style={{ padding: '10px', backgroundColor: '', height: '330px' }}>
                                <DataGrid disableColumnFilter rows={dataTable} columns={columns} />
                            </Card>
                        </Card>
                    </Grid>
                </Grid>

            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {};
}
export default connect(mapStateToProps, {

})(withStyles({ withTheme: true })(BrandHome));