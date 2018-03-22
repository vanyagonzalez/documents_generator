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

class Employees extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employee: {}
        };

        this.onRowSelection = this.onRowSelection.bind(this);
    }

    onRowSelection(rows) {

        let selectedId = null;
        this.props.allEmployees.forEach((obj, i) => {
            if (rows.indexOf(i) > -1) {
                selectedId = obj.id;
            }
        });

        if (selectedId) {
            let self = this;
            $.ajax({
                url: "/rest/employee/" + selectedId
            }).then(function (data) {
                self.setState({
                    employee: data,
                });
            });
        }
    };

    render() {
        let allEmployees = [];
        this.props.allEmployees.forEach(function(employee) {
            allEmployees.push(
                <TableRow key={"employee_" + employee.id}>
                    <TableRowColumn>{employee.fio}</TableRowColumn>
                </TableRow>
            );
        });

        let organizations = [];
        if (this.state.employee.organizations) {
            this.state.employee.organizations.forEach(function (organization) {
                organizations.push(
                    <li key={organization.id}>{organization.name}</li>
                );
            });
        }

        return (
            <div>
                <div style={this.props.styles.floatLeftStyle}>
                    <Table
                        fixedHeader={true}
                        onRowSelection={(rows) => this.onRowSelection(rows)}
                    >
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn style={{textAlign: 'center'}}>
                                    Все работники
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {allEmployees}
                        </TableBody>
                    </Table>
                </div>
                <div style={this.props.styles.floatRightStyle}>
                    <Table>
                        <TableBody
                            displayRowCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>{this.state.employee.fio}</TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Фамилия</TableRowColumn>
                                <TableRowColumn>{this.state.employee.surname}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Имя</TableRowColumn>
                                <TableRowColumn>{this.state.employee.name}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Отчество</TableRowColumn>
                                <TableRowColumn>{this.state.employee.middleName}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Должность</TableRowColumn>
                                <TableRowColumn>{this.state.employee.position}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Номер приказа о назначении на должность</TableRowColumn>
                                <TableRowColumn>{this.state.employee.orderNumber}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Дата приказа о назначении на должность</TableRowColumn>
                                <TableRowColumn>{this.state.employee.orderDate}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Список организаций</TableRowColumn>
                                <TableRowColumn>{organizations}</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }

}

export default Employees;