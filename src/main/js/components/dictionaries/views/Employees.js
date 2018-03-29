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
import {List, ListItem} from 'material-ui/List';
import $ from 'jquery';

class Employees extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openByKey: [],
        };

        this.selectEmployee = this.selectEmployee.bind(this);
        this.handleNestedListToggle = this.handleNestedListToggle.bind(this);
    }

    handleNestedListToggle(key) {
        let state = this.state;
        if (typeof state.openByKey[key] === 'undefined') {
            state.openByKey[key] = false;
        } else {
            state.openByKey[key] = !state.openByKey[key];
        }
        this.setState(state);
    };

    selectEmployee(selectedId) {
        let self = this.state;
        let onSelect = this.props.onSelect;
        $.ajax({
            url: "/rest/employee/" + selectedId
        }).then(function (data) {
            onSelect("employee", data);
        });
    };

    render() {
        let data={};
        this.props.allEmployees.forEach(function(employee) {
            let orgData = data["org" + employee.organization.id];
            if (!orgData) {
                orgData = {};
                orgData.organization = employee.organization;
                orgData.employees = [];
                data["org" + employee.organization.id] = orgData;
            }
            orgData.employees.push(employee);
        });

        let employeesTree = [];
        let selectEmployee = this.selectEmployee;
        let openByKey = this.state.openByKey;
        let handleNestedListToggle = this.handleNestedListToggle;

        Object.keys(data).forEach(function(key, index) {
            let root = data[key];
            let employees = [];
            if (root.employees) {
                root.employees.forEach(function (employee) {
                    employees.push(
                        <ListItem
                            key={key + employee.id}
                            primaryText={employee.person.fio + "; " + employee.position}
                            onClick={() => selectEmployee(employee.id)}
                        />
                    );
                });
            }

            let keyOpen = openByKey[key];
            if (typeof keyOpen === 'undefined') {
                keyOpen = true;
            }
            employeesTree.push(
                <ListItem
                    key={key}
                    primaryText={root.organization.name}
                    open={keyOpen}
                    nestedItems={employees}
                    onNestedListToggle={() => handleNestedListToggle(key)}
                />
            );

        });

        let fio;
        if (this.props.employee.person) {
            fio = this.props.employee.person.fio;
        }
        let orgName;
        if (this.props.employee.organization) {
            orgName = this.props.employee.organization.name;
        }
        let orderDate;
        if (this.props.employee.orderDate) {
            orderDate = new Date(this.props.employee.orderDate);
            orderDate = orderDate.toLocaleDateString();
        }

        return (
            <div style={this.props.styles.dataBlockStyle}>
                <div style={this.props.styles.floatLeftStyle}>
                    <List>
                        {employeesTree}
                    </List>
                </div>
                <div style={this.props.styles.floatRightStyle}>
                    <Table>
                        <TableBody
                            displayRowCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>Выбранный работник</TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Персона</TableRowColumn>
                                <TableRowColumn>{fio}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Организация</TableRowColumn>
                                <TableRowColumn>{orgName}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Должность</TableRowColumn>
                                <TableRowColumn>{this.props.employee.position}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Номер приказа о назначении на должность</TableRowColumn>
                                <TableRowColumn>{this.props.employee.orderNumber}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Дата приказа о назначении на должность</TableRowColumn>
                                <TableRowColumn>{orderDate}</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }

}

export default Employees;