import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import $ from 'jquery';

class ProjectDocumentDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            newProjectDocument: {
                author: {
                    id: null,
                },
                customerRepresentative: {
                    id: null,
                },
                developerRepresentative: {
                    id: null,
                },
                projectPartition: {
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
        const state = this.state;
        state.open=true;
        state.newProjectDocument.projectPartition.id = this.props.itemId;
        this.setState(state);
    };

    handleClose(){
        this.setState({open: false});
    };

    handleSubmit(e){
        e.preventDefault();
        let updateConstrObj = this.props.updateConstrObj;
        let constrObjId = this.props.constrObjId;

        $.ajax({
            url: '/rest/projectDocument',
            type: 'POST',
            data: JSON.stringify(this.state.newProjectDocument),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                updateConstrObj(constrObjId);
            }
        });

        this.handleClose();
    };

    onChange(e){
        const state = this.state;
        state.newProjectDocument[e.target.name] = e.target.value;
        this.setState(state);
    }

    onChangeSelect(name, value){
        const state = this.state;
        state.newProjectDocument[name].id = value;
        this.setState(state);
    }

    render() {
        let authors = [];
        this.props.authors.forEach(function(author) {
            authors.push(<MenuItem key={"author_" + author.id} value={author.id} primaryText={author.fio} />);
        });

        let customerRepresentatives = [];
        this.props.customerRepresentatives.forEach(function(customerRepresentative) {
            customerRepresentatives.push(<MenuItem key={"customerRepresentative_" + customerRepresentative.id} value={customerRepresentative.id} primaryText={customerRepresentative.fio} />);
        });

        let developerRepresentatives = [];
        this.props.developerRepresentatives.forEach(function(developerRepresentative) {
            developerRepresentatives.push(<MenuItem key={"developerRepresentative_" + developerRepresentative.id} value={developerRepresentative.id} primaryText={developerRepresentative.fio} />);
        });

        const actions = [
            <FlatButton label="Отмена" onClick={this.handleClose} primary={true} key="cancel"/>,
            <FlatButton type="submit" label="Создать" primary={true} key="submit"/>,
        ];

        return (
            <div>
                <RaisedButton label="Добавить проектную документацию" onClick={this.handleOpen} />
                <Dialog
                    title="Новая проектная документация"
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="name" floatingLabelText="Наименование проектной документации" onChange={this.onChange}/>
                        <br/>
                        <TextField name="code" floatingLabelText="Шифр проектной документации" onChange={this.onChange}/>
                        <br/>
                        <TextField name="phase" floatingLabelText="Стадия проектирования" onChange={this.onChange}/>
                        <br/>
                        <SelectField value={this.state.newProjectDocument.author.id} floatingLabelText="Автор проектной документации"
                                     onChange={(event, index, value) => this.onChangeSelect("author", value)}>
                            {authors}
                        </SelectField>
                        <br/>
                        <SelectField value={this.state.newProjectDocument.customerRepresentative.id} floatingLabelText="Представитель заказчика"
                                     onChange={(event, index, value) => this.onChangeSelect("customerRepresentative", value)}>
                            {customerRepresentatives}
                        </SelectField>
                        <br/>
                        <SelectField value={this.state.newProjectDocument.developerRepresentative.id} floatingLabelText="Представитель застройщика"
                                     onChange={(event, index, value) => this.onChangeSelect("developerRepresentative", value)}>
                            {developerRepresentatives}
                        </SelectField>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default ProjectDocumentDlg;