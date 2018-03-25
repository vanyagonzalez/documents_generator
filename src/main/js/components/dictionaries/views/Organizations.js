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

class Organizations extends React.Component {
    constructor(props) {
        super(props);
        this.onRowSelection = this.onRowSelection.bind(this);
    }

    onRowSelection(rows) {

        let selectedId = null;
        this.props.allOrganizations.forEach((obj, i) => {
            if (rows.indexOf(i) > -1) {
                selectedId = obj.id;
            }
        });

        let onSelect=this.props.onSelect;
        if (selectedId) {
            let self = this;
            $.ajax({
                url: "/rest/organization/" + selectedId
            }).then(function (data) {
                onSelect("organization", data);
            });
        }
    };

    render() {
        let allOrganizations = [];
        this.props.allOrganizations.forEach(function(organization) {
            allOrganizations.push(
                <TableRow key={"organization_" + organization.id}>
                    <TableRowColumn>{organization.name}</TableRowColumn>
                </TableRow>
            );
        });

        let employees = [];
        if (this.props.organization.employees) {
            this.props.organization.employees.forEach(function (employee) {
                employees.push(
                    <li key={employee.id}>{employee.fio}</li>
                );
            });
        }

        let sroIssuedDate;
        if (this.props.organization.sroIssuedDate) {
            sroIssuedDate = new Date(this.props.organization.sroIssuedDate);
            sroIssuedDate = sroIssuedDate.toLocaleDateString();
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
                                    Все организации
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {allOrganizations}
                        </TableBody>
                    </Table>
                </div>
                <div style={this.props.styles.floatRightStyle}>
                    <Table>
                        <TableBody
                            displayRowCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>{this.props.organization.name}</TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>ОГРН</TableRowColumn>
                                <TableRowColumn>{this.props.organization.ogrn}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>ИНН</TableRowColumn>
                                <TableRowColumn>{this.props.organization.inn}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Номер СРО</TableRowColumn>
                                <TableRowColumn>{this.props.organization.sroNumber}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>СР выдавшая СРО</TableRowColumn>
                                <TableRowColumn>{this.props.organization.organizationIssuingSro}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Дата выдачи СРО</TableRowColumn>
                                <TableRowColumn>{sroIssuedDate}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Юридический адрес организации</TableRowColumn>
                                <TableRowColumn>{this.props.organization.address}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Номер телефона организации</TableRowColumn>
                                <TableRowColumn>{this.props.organization.phoneNumber}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Номер факса организации</TableRowColumn>
                                <TableRowColumn>{this.props.organization.faxNumber}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Список сотрудников</TableRowColumn>
                                <TableRowColumn>{employees}</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }

}

export default Organizations;