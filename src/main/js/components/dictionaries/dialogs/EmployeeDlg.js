const React = require('react');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import $ from 'jquery';

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
                person: {},
                organization: {},
            },
            btnLabel: "btnLabel",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const updatingEmployee = nextProps.updatingEmployee;

        let state = this.state;
        state.newEmployee = {
            person: {},
            organization: {},
        };
        if (updatingEmployee !== null && updatingEmployee.id) {
            state.restMethod = "PUT";
            let fio;
            if (updatingEmployee.person) {
                fio = updatingEmployee.person.fio;
            }
            state.dlgTitle = "Изменение рабочего: " + fio;
            state.btnLabel = "Редактировать";

            state.newEmployee.id=updatingEmployee.id;
            state.newEmployee.person=updatingEmployee.person;
            state.newEmployee.organization=updatingEmployee.organization;
            state.newEmployee.position=updatingEmployee.position;
            state.newEmployee.orderNumber=updatingEmployee.orderNumber;
            state.newEmployee.orderDate=updatingEmployee.orderDate;
        } else {
            state.restMethod = "POST";
            state.dlgTitle = "Новая персона";
            state.btnLabel = "Создать";
        }
    }

    handleSubmit(e){
        e.preventDefault();
        let loadEmployees = this.props.loadEmployees;
        let newEmployee = this.state.newEmployee;
        let onDataUpdate = this.props.onDataUpdate;

        $.ajax({
            url: '/rest/employee',
            type: 'POST',
            data: JSON.stringify(newEmployee),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                loadEmployees();
                onDataUpdate("employee", msg);
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

    onChangeSelect(name, value){
        const state = this.state;
        state.newEmployee[name].id = value;
        this.setState(state);
    }

    render() {
        const actions = [
            <FlatButton label="Отмена" onClick={this.props.onClose} primary={true} key="cancel"/>,
            <FlatButton type="submit" label={this.state.btnLabel} primary={true} key="submit"/>,
        ];

        let persons = [];
        this.props.persons.forEach(function(person) {
            persons.push(<MenuItem key={"person_" + person.id} value={person.id} primaryText={person.fio} />);
        });

        let organizations = [];
        this.props.organizations.forEach(function(organization) {
            organizations.push(<MenuItem key={"organization_" + organization.id} value={organization.id} primaryText={organization.name} />);
        });

        let orderDate;
        if (this.state.newEmployee.orderDate) {
            orderDate = new Date(this.state.newEmployee.orderDate);
        }

        return (
            <div>
                <Dialog
                    title={this.state.dlgTitle}
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.props.onClose}
                >
                    <form onSubmit={this.handleSubmit}>
                        <SelectField value={this.state.newEmployee.person.id} floatingLabelText="Персона"
                                     onChange={(event, index, value) => this.onChangeSelect("person", value)}>
                            {persons}
                        </SelectField>
                        <br/>
                        <SelectField value={this.state.newEmployee.organization.id} floatingLabelText="Организация"
                                     onChange={(event, index, value) => this.onChangeSelect("organization", value)}>
                            {organizations}
                        </SelectField>
                        <br/>
                        <TextField
                            name="position"
                            floatingLabelText="Должность"
                            defaultValue={this.state.newEmployee.position}
                            onChange={this.onChange}/>
                        <br/>
                        <TextField
                            name="orderNumber"
                            floatingLabelText="Номер приказа о назначении на должность"
                            onChange={this.onChange}
                            defaultValue={this.state.newEmployee.orderNumber}
                            style={marginRight}/>
                        <DatePicker
                            floatingLabelText="Дата приказа о назначении на должность"
                            defaultDate={orderDate}
                            onChange={(e, date) => this.onChangeDate(date, "orderDate")}
                        />
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default EmployeeDlg;