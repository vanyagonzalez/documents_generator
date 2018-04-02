const React = require('react');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import $ from 'jquery';

const marginRight = {
    marginRight: '50px',
};

const create = "create";
const update = "update";
const del = "delete";

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
        const operation = nextProps.operation;
        let state = this.state;
        state.newEmployee = {
            person: {},
            organization: {},
        };
        if (operation === create) {
            state.restMethod = "POST";
            state.dlgTitle = "Новый сотррудник";
            state.btnLabel = "Создать";
        } else if (operation === update || operation === del) {
            const dlgData = nextProps.dlgData;
            state.newEmployee.id=dlgData.id;
            if (dlgData.person) {
                state.newEmployee.person = dlgData.person;
            }
            state.newEmployee.organization=dlgData.organization;
            state.newEmployee.position=dlgData.position;
            state.newEmployee.orderNumber=dlgData.orderNumber;
            state.newEmployee.orderDate=dlgData.orderDate;

            let fio;
            if (dlgData.person) {
                fio = dlgData.person.fio;
            }

            if (operation === update) {
                state.restMethod = "PUT";
                state.dlgTitle = "Изменение рабочего: " + fio;
                state.btnLabel = "Редактировать";
            } else {
                state.restMethod = "DELETE";
                state.dlgTitle = "Удаление рабочего: " + fio;
                state.btnLabel = "Удалить";
            }

        }
    }

    handleSubmit(e){
        e.preventDefault();
        let loadEmployees = this.props.loadEmployees;
        let onDataUpdate = this.props.onDataUpdate;
        const operation = this.props.operation;

        $.ajax({
            url: '/rest/employee',
            type: this.state.restMethod,
            data: JSON.stringify(this.state.newEmployee),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                loadEmployees();
                if (operation !== del) {
                    onDataUpdate("employee", msg.id);
                } else {
                    onDataUpdate("employee", null);
                }
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

        let personId = null;
        if (this.state.newEmployee.person) {
            personId = this.state.newEmployee.person.id;
        }

        let organizationId = null;
        if (this.state.newEmployee.organization) {
            organizationId = this.state.newEmployee.organization.id;
        }

        const isDisabled = this.props.operation === del;

        return (
            <div>
                <Dialog
                    title={this.state.dlgTitle}
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.props.onClose}
                >
                    <form onSubmit={this.handleSubmit}>
                        <SelectField value={personId} floatingLabelText="Персона" disabled={isDisabled}
                                     onChange={(event, index, value) => this.onChangeSelect("person", value)}>
                            {persons}
                        </SelectField>
                        <br/>
                        <SelectField value={organizationId} floatingLabelText="Организация" disabled={isDisabled}
                                     onChange={(event, index, value) => this.onChangeSelect("organization", value)}>
                            {organizations}
                        </SelectField>
                        <br/>
                        <TextField
                            name="position"
                            floatingLabelText="Должность"
                            disabled={isDisabled}
                            defaultValue={this.state.newEmployee.position}
                            onChange={this.onChange}/>
                        <br/>
                        <TextField
                            name="orderNumber"
                            floatingLabelText="Номер приказа о назначении на должность"
                            onChange={this.onChange}
                            disabled={isDisabled}
                            defaultValue={this.state.newEmployee.orderNumber}
                            style={marginRight}/>
                        <DatePicker
                            floatingLabelText="Дата приказа о назначении на должность"
                            disabled={isDisabled}
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