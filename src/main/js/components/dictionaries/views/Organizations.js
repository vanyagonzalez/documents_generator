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

class Organizations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            organization: {}
        };

        this.onRowSelection = this.onRowSelection.bind(this);
    }

    onRowSelection(rows) {

        let selectedId = null;
        this.props.allOrganizations.forEach((obj, i) => {
            if (rows.indexOf(i) > -1) {
                selectedId = obj.id;
            }
        });

        if (selectedId) {
            let self = this;
            $.ajax({
                url: "/rest/organization/" + selectedId
            }).then(function (data) {
                self.setState({
                    organization: data,
                });
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
        if (this.state.organization.employees) {
            this.state.organization.employees.forEach(function (employee) {
                employees.push(
                    <li key={employee.id}>{employee.fio}</li>
                );
            });
        }

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
                                    Все организации
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {allOrganizations}
                        </TableBody>
                    </Table>
                </div>
                <div style={floatRightStyle}>
                    <Table>
                        <TableBody
                            displayRowCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>{this.state.organization.name}</TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>ОГРН</TableRowColumn>
                                <TableRowColumn>{this.state.organization.ogrn}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>ИНН</TableRowColumn>
                                <TableRowColumn>{this.state.organization.inn}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Номер СРО</TableRowColumn>
                                <TableRowColumn>{this.state.organization.sroNumber}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>СР выдавшая СРО</TableRowColumn>
                                <TableRowColumn>{this.state.organization.organizationIssuingSro}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Дата выдачи СРО</TableRowColumn>
                                <TableRowColumn>{this.state.organization.sroIssuedDate}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Юридический адрес организации</TableRowColumn>
                                <TableRowColumn>{this.state.organization.address}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Номер телефона организации</TableRowColumn>
                                <TableRowColumn>{this.state.organization.phoneNumber}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Номер факса организации</TableRowColumn>
                                <TableRowColumn>{this.state.organization.faxNumber}</TableRowColumn>
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