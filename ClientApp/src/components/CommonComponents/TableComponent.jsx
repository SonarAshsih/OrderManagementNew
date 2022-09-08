import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/DeleteForeverSharp';
import CloudDownloadSharp from '@material-ui/icons/CloudDownloadSharp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PlusOneSharp from '@material-ui/icons/AddCircleRounded';


export default class TableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [],
        };
        this.generateHeaders();
    }
    componentDidMount() {
    }
    generateHeaders() {
        if (this.props.dataSource.length > 0) {
            for (let c in this.props.dataSource[0]) {
                this.state.headers.push(c);
            }
        }
    }
    DisplayClick = (d) => () => {
        this.props.DisplayRecord(d);
    };
    DeleteClick = (d,i) => () => {
        if (this.props.DeleteIndexRecord != null) {
            this.props.DeleteRecord(d,i);
        }
        else
        this.props.DeleteRecord(d);
    };

    AddClick = (d,i) => () => {
        if (this.props.DeleteIndexRecord != null) {
            this.props.Add(d,i);
        }
        else {
            this.props.Add(d);
        }
    }
    render() {
        //console.log(this.props.dataSourceWithoutFilter);
        return (
            <div style={{ maxHeight: 400, overflow: "auto" }}>
                <Table className="table table-striped table-bordered table-responsive" stickyheader="true">
                    <TableHead>
                        <TableRow>
                            {this.props.Columns.map((h, i) => (
                                <TableCell
                                    scope="row"
                                    key={i}
                                    hidden={this.props.hiddenheaders[i]}>
                                    <b> {h}</b>
                                </TableCell>
                            ))}
                            <TableCell scope="row" hidden={this.props.isAddButtonHidden}>
                                <b>{this.props.AddButtonName}</b>
                            </TableCell>
                            <TableCell scope="row" hidden={this.props.isDisplayButtonHidden}>
                            <b>{this.props.DisplayButtonName}</b>
                            </TableCell>
                            <TableCell scope="row" hidden={this.props.isDeleteButtonHidden}>
                            <b>{this.props.DeleteButtonName}</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.dataSource.map((d, i) => (
                            <TableRow
                                hover={true}
                                // role="checkbox"
                                tabIndex={-1}
                                key={i}
                                onClick={evt => this.props.selectedRow(d)}>
                                {this.state.headers.map((h, i) => (
                                    <TableCell
                                        scope="row"
                                        hidden={this.props.hiddenheaders[i]}
                                        key={i}>
                                        {d[h]}
                                    </TableCell>
                                ))}
                                <TableCell padding="none" component="th" scope="row" hidden={this.props.isAddButtonHidden}>
                                    <IconButton onClick={this.AddClick(d)} value={d}>
                                        <PlusOneSharp color="primary" />
                                    </IconButton>
                                </TableCell>
                                <TableCell padding="none" component="th" scope="row" hidden={this.props.isDisplayButtonHidden}>
                                    <IconButton onClick={this.DisplayClick(d)} value={d}>
                                        <VisibilityIcon color="primary" />
                                    </IconButton>
                                </TableCell>
                                <TableCell padding="none" component="th" scope="row" hidden={this.props.isDeleteButtonHidden}>
                                    <IconButton onClick={this.DeleteClick(d,i)} value={d}>
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}