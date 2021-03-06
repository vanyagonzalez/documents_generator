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

class Person extends React.Component {
    constructor(props) {
        super(props);
        this.onRowSelection = this.onRowSelection.bind(this);
    }

    onRowSelection(rows) {

        let selectedId = null;
        this.props.allPersons.forEach((obj, i) => {
            if (rows.indexOf(i) > -1) {
                selectedId = obj.id;
            }
        });

        this.props.onSelect("person", selectedId);
    };

    render() {
        const allPersons = [];
        const selectedId = this.props.person.id;

        this.props.allPersons.forEach(function(person) {
            let style;
            if (selectedId === person.id) {
                style = selectedItemStyle;
            }
            allPersons.push(
                <TableRow key={"person_" + person.id} style={style}>
                    <TableRowColumn>{person.fio}</TableRowColumn>
                </TableRow>
            );
        });

        let employees = [];
        if (this.props.person.employees) {
            this.props.person.employees.forEach(function (employee) {
                employees.push(
                    <li key={employee.id}>{employee.organization.name + "; " + employee.position}</li>
                );
            });
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
                                    Все люди
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {allPersons}
                        </TableBody>
                    </Table>
                </div>
                <div style={this.props.styles.floatRightStyle}>
                    <Table>
                        <TableBody
                            displayRowCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>{this.props.person.fio}</TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Фамилия</TableRowColumn>
                                <TableRowColumn>{this.props.person.surname}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Имя</TableRowColumn>
                                <TableRowColumn>{this.props.person.name}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Отчество</TableRowColumn>
                                <TableRowColumn>{this.props.person.middleName}</TableRowColumn>
                            </TableRow>

                            <TableRow>
                                <TableRowColumn>Список рабочих мест</TableRowColumn>
                                <TableRowColumn>{employees}</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }

}

export default Person;