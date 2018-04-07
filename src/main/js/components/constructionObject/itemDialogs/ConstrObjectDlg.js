import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ButtonsBlock from '../../ButtonsBlock';
import $ from 'jquery';

class ConstrObjectDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            newConstrObj: {
                name: null,
                customer: {
                    id: null,
                },
                developer: {
                    id: null,
                },
            },
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
    }

    handleOpen(){
        this.setState({open: true});
    };

    handleClose(){
        this.setState({open: false});
    };

    handleSubmit(e){
        e.preventDefault();
        let updateConstrObjs = this.props.updateConstrObjs;

        $.ajax({
            url: '/rest/constructionObject',
            type: 'POST',
            data: JSON.stringify(this.state.newConstrObj),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                updateConstrObjs();
            }
        });

        this.handleClose();
    };

    onChange(e){
        const state = this.state;
        state["newConstrObj"][e.target.name] = e.target.value;
        this.setState(state);
    }

    onChangeSelect(name, value){
        const state = this.state;
        state.newConstrObj[name].id = value;
        this.setState(state);
    }


    render() {
        let customers = [];
        this.props.customers.forEach(function(customer) {
            customers.push(<MenuItem key={"customer_" + customer.id} value={customer.id} primaryText={customer.name} />);
        });

        let developers = [];
        this.props.developers.forEach(function(developer) {
            developers.push(<MenuItem key={"developer_" + developer.id} value={developer.id} primaryText={developer.name} />);
        });

        const actions = [
            <FlatButton label="Отмена" onClick={this.handleClose} primary={true} key="cancel"/>,
            <FlatButton type="submit" label="Создать" primary={true} key="submit"/>,
        ];

        return (
            <div>
                <ButtonsBlock
                    onCreate={() => this.handleOpen()}
                    onUpdate={() => this.handleOpen()}
                    onDelete={() => this.handleOpen()}
                />
                <Dialog
                    title="Новый объект строительства"
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="name" floatingLabelText="Наименование объекта" onChange={this.onChange}/>
                        <br/>
                        <TextField name="code" floatingLabelText="Шифр объекта" onChange={this.onChange}/>
                        <br/>
                        <SelectField value={this.state.newConstrObj.customer.id} floatingLabelText="Организация заказчик"
                                     onChange={(event, index, value) => this.onChangeSelect("customer", value)}>
                            {customers}
                        </SelectField>
                        <br/>
                        <SelectField value={this.state.newConstrObj.developer.id} floatingLabelText="Организация застройщик"
                                     onChange={(event, index, value) => this.onChangeSelect("developer", value)}>
                            {developers}
                        </SelectField>
                        <br/>
                        <TextField name="copies" floatingLabelText="Количество экземпляров приемо-сдаточной документации" onChange={this.onChange}/>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default ConstrObjectDlg;