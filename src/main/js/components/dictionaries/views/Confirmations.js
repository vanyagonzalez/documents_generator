const React = require('react');

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import $ from 'jquery';

const height = '80vh';
const width = '45%';

const floatLeftStyle = {
    float: "left",
    overflowY: "auto",
};
floatLeftStyle['width'] = width;
floatLeftStyle['height'] = height;

const floatRightStyle = {
    float: "right",
    overflowY: "auto",
};
floatRightStyle['width'] = width;
floatRightStyle['height'] = height;

class Confirmations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmation: {}
        };

        this.onRowSelection = this.onRowSelection.bind(this);
    }

    onRowSelection(rows) {

        let selectedId = null;
        this.props.allConfirmations.forEach((obj, i) => {
            if (rows.indexOf(i) > -1) {
                selectedId = obj.id;
            }
        });

        if (selectedId) {
            let self = this;
            $.ajax({
                url: "/rest/confirmation/" + selectedId
            }).then(function (data) {
                self.setState({
                    confirmation: data,
                });
            });
        }
    };

    render() {
        let allConfirmations = [];
        this.props.allConfirmations.forEach(function(confirmation) {
            allConfirmations.push(
                <TableRow key={"confirmation_" + confirmation.id}>
                    <TableRowColumn>{confirmation.name}</TableRowColumn>
                </TableRow>
            );
        });
        return (
            <div>
                <div style={floatLeftStyle}>
                    <Table
                        fixedHeader={true}
                        onRowSelection={(rows) => this.onRowSelection(rows)}
                    >
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn style={{textAlign: 'center'}}>
                                    Все подтверждения
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {allConfirmations}
                        </TableBody>
                    </Table>
                </div>
                <div style={floatRightStyle}>
                    <Table>
                        <TableBody
                            displayRowCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>{this.state.confirmation.name}</TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Номер документа</TableRowColumn>
                                <TableRowColumn>{this.state.confirmation.number}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Дата выдачи документа</TableRowColumn>
                                <TableRowColumn>{this.state.confirmation.issueDate}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Скан-копия документа</TableRowColumn>
                                <TableRowColumn>{this.state.confirmation.copy}</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }

}

export default Confirmations;