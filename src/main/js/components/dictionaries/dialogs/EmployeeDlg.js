const React = require('react');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
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


const dialogStyle = {
    width: '60%',
    maxWidth: 'none',
};

const floatLeftStyle = {
    float: "left",
    width: "50%",
};

const floatRightStyle = {
    float: "right",
    width: "50%",
};

const tableHeight = '150px';

const marginRight = {
    marginRight: '50px',
};

class  EmployeeDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newEmployee: {
                organizations: [],
            },
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onRowSelection = this.onRowSelection.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        let loadEmployees = this.props.loadEmployees;
        let organizations = this.props.organizations;

        $.ajax({
            url: '/rest/employee',
            type: 'POST',
            data: JSON.stringify(this.state.newEmployee),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                loadEmployees();
                organizations.forEach((obj) => {
                    obj.selected = false;
                });
            }
        });

        this.props.onClose();
    };

    onChange(e){
        const state = this.state;
        state.newEmployee[e.target.name] = e.target.value;
        this.setState(state);
    }

    onChangeDate(date, name){
        const state = this.state;
        state.newEmployee[name] = date.getTime();
        this.setState(state);
    }

    onRowSelection(rows, type) {
        let state = this.state;

        const selected = [];
        this.props[type].forEach((obj, i) => {
            if (rows.indexOf(i) > -1) {
                selected.push(obj);
            }
            obj.selected = rows.indexOf(i) > -1;
        });

        state.newEmployee[type] = selected;
        this.setState(state);
    };

    render() {
        const actions = [
            <FlatButton label="Отмена" onClick={this.props.onClose} primary={true} key="cancel"/>,
            <FlatButton type="submit" label="Создать" primary={true} key="submit"/>,
        ];

        let organizations = [];
        this.props.organizations.forEach(function(organization) {
            organizations.push(
                <TableRow key={"organization_" + organization.id} selected={organization.selected}>
                    <TableRowColumn>{organization.name}</TableRowColumn>
                </TableRow>
            );
        });

        let selectedOrganizations = [];
        this.state.newEmployee.organizations.forEach(function(organization) {
            selectedOrganizations.push(
                <TableRow key={"selectedOrganization_" + organization.id}>
                    <TableRowColumn>{organization.name}</TableRowColumn>
                </TableRow>
            );
        });

        return (
            <div>
                <Dialog
                    title="Новый сотрудник"
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.props.onClose}
                    contentStyle={dialogStyle}
                >
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="surname" floatingLabelText="Фамилия" onChange={this.onChange} style={marginRight}/>
                        <TextField name="name" floatingLabelText="Имя" onChange={this.onChange} style={marginRight}/>
                        <TextField name="middleName" floatingLabelText="Отчество" onChange={this.onChange}/>
                        <br/>
                        <TextField name="position" floatingLabelText="Должность" onChange={this.onChange}/>
                        <br/>
                        <TextField name="orderNumber" floatingLabelText="Номер приказа о назначении на должность" onChange={this.onChange} style={marginRight}/>
                        <DatePicker
                            floatingLabelText="Дата приказа о назначении на должность"
                            locale="ru"
                            onChange={(e, date) => this.onChangeDate(date, "orderDate")}
                        />
                        <br/>
                        <div style={floatLeftStyle}>
                            <Table
                                height={tableHeight}
                                selectable={true}
                                fixedHeader={true}
                                multiSelectable={true}
                                className={"tableForSelecting"}
                                onRowSelection={(rows) => this.onRowSelection(rows, "organizations")}>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>
                                            Возможные организации
                                        </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={true}
                                    className={"tableBodyForSelecting"}
                                    deselectOnClickaway={false}>
                                    {organizations}
                                </TableBody>
                            </Table>
                        </div>
                        <div style={floatRightStyle}>
                            <Table
                                height={tableHeight}
                                fixedHeader={true}
                                className={"tableForSelecting"}>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>
                                            Выбранные организации
                                        </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} className={"tableBodyForSelecting"}>
                                    {selectedOrganizations}
                                </TableBody>
                            </Table>
                        </div>

                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default EmployeeDlg;