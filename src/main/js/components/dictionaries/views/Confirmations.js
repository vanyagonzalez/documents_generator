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

const selectedItemStyle = {fontWeight: "bold", fontStyle: "italic"};

class Confirmations extends React.Component {
    constructor(props) {
        super(props);
        this.onRowSelection = this.onRowSelection.bind(this);
    }

    onRowSelection(rows) {

        let selectedId = null;
        this.props.allConfirmations.forEach((obj, i) => {
            if (rows.indexOf(i) > -1) {
                selectedId = obj.id;
            }
        });

        this.props.onSelect("confirmation", selectedId);
    };

    render() {
        let allConfirmations = [];
        const selectedId = this.props.confirmation.id;

        this.props.allConfirmations.forEach(function(confirmation) {
            let style;
            if (selectedId === confirmation.id) {
                style = selectedItemStyle;
            }
            allConfirmations.push(
                <TableRow key={"confirmation_" + confirmation.id} style={style}>
                    <TableRowColumn>{confirmation.name}</TableRowColumn>
                </TableRow>
            );
        });

        let issueDate;
        if (this.props.confirmation.issueDate) {
            issueDate = new Date(this.props.confirmation.issueDate);
            issueDate = issueDate.toLocaleDateString();
        }
        return (
            <div style={this.props.styles.dataBlockStyle}>
                <div style={this.props.styles.floatLeftStyle}>
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
                <div style={this.props.styles.floatRightStyle}>
                    <Table>
                        <TableBody
                            displayRowCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>{this.props.confirmation.name}</TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Номер документа</TableRowColumn>
                                <TableRowColumn>{this.props.confirmation.number}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Дата выдачи документа</TableRowColumn>
                                <TableRowColumn>{issueDate}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Скан-копия документа</TableRowColumn>
                                <TableRowColumn>{this.props.confirmation.copy}</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }

}

export default Confirmations;