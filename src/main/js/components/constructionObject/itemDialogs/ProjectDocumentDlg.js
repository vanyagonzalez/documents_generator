import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as Constants from '../../../AppConstants';
import $ from 'jquery';

class ProjectDocumentDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restMethod: null,
            dlgTitle: null,
            btnLabel: "кнопка",
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open) {
            const operation = nextProps.operation;
            let state = this.state;
            state.newProjectDocument={
                projectPartition: {
                    id: nextProps.parentId,
                },
                author: {},
                customerRepresentative: {},
                developerRepresentative: {},
            };

            if (operation === Constants.CREATE) {
                state.restMethod = "POST";
                state.dlgTitle = "Новая проектная документация";
                state.btnLabel = "Создать";
            } else if (operation === Constants.COPY || operation === Constants.UPDATE || operation === Constants.DELETE) {
                const item = nextProps.item;
                state.newProjectDocument.name=item.name;
                state.newProjectDocument.code=item.code;
                state.newProjectDocument.phase=item.phase;
                if (item.author) {
                    state.newProjectDocument.author.id = item.author.id;
                }
                if (item.customerRepresentative) {
                    state.newProjectDocument.customerRepresentative.id = item.customerRepresentative.id;
                }
                if (item.developerRepresentative) {
                    state.newProjectDocument.developerRepresentative.id = item.developerRepresentative.id;
                }

                if (operation === Constants.COPY) {
                    state.restMethod = "POST";
                    state.dlgTitle = "Новая проектная документация";
                    state.btnLabel = "Создать";
                } else if (operation === Constants.UPDATE) {
                    state.newProjectDocument.id=item.id;
                    state.restMethod = "PUT";
                    state.dlgTitle = "Изменение проектной документации: " + item.name;
                    state.btnLabel = "Редактировать";
                } else {
                    state.newProjectDocument.id=item.id;
                    state.restMethod = "DELETE";
                    state.dlgTitle = "Удаление проектной документации: " + item.name;
                    state.btnLabel = "Удалить";
                }
            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const newProjectDocument = this.state.newProjectDocument;
        const updateConstrObj = this.props.updateConstrObj;
        const updateSelectedItem = this.props.updateSelectedItem;
        const operation = this.props.operation;

        $.ajax({
            url: '/rest/projectDocument',
            type: this.state.restMethod,
            data: JSON.stringify(newProjectDocument),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                updateConstrObj();
                if (operation !== Constants.DELETE) {
                    updateSelectedItem(Constants.PROJECT_DOCUMENT_TYPE, msg.id, true);
                } else {
                    updateSelectedItem(Constants.PROJECT_DOCUMENT_TYPE, null);
                }
            }
        });

        this.props.onClose();
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
            authors.push(<MenuItem key={"author_" + author.id} value={author.id} primaryText={author.person.fio} />);
        });

        let customerRepresentatives = [];
        this.props.customerRepresentatives.forEach(function(customerRepresentative) {
            customerRepresentatives.push(<MenuItem key={"customerRepresentative_" + customerRepresentative.id} value={customerRepresentative.id} primaryText={customerRepresentative.person.fio} />);
        });

        let developerRepresentatives = [];
        this.props.developerRepresentatives.forEach(function(developerRepresentative) {
            developerRepresentatives.push(<MenuItem key={"developerRepresentative_" + developerRepresentative.id} value={developerRepresentative.id} primaryText={developerRepresentative.person.fio} />);
        });

        const actions = [
            <FlatButton label="Отмена" onClick={this.props.onClose} primary={true} key="cancel"/>,
            <FlatButton type="submit" label={this.state.btnLabel} primary={true} key="submit"/>,
        ];

        const isDisabled = this.props.operation === Constants.DELETE;

        return (
            <div>
                <Dialog
                    title={this.state.dlgTitle}
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.props.onClose}
                >
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="name" floatingLabelText="Наименование проектной документации" disabled={isDisabled} defaultValue={this.state.newProjectDocument.name} onChange={this.onChange}/>
                        <br/>
                        <TextField name="code" floatingLabelText="Шифр проектной документации" disabled={isDisabled} defaultValue={this.state.newProjectDocument.code} onChange={this.onChange}/>
                        <br/>
                        <TextField name="phase" floatingLabelText="Стадия проектирования" disabled={isDisabled} defaultValue={this.state.newProjectDocument.phase} onChange={this.onChange}/>
                        <br/>
                        <SelectField value={this.state.newProjectDocument.author.id} floatingLabelText="Автор проектной документации"
                                     disabled={isDisabled} onChange={(event, index, value) => this.onChangeSelect("author", value)}>
                            {authors}
                        </SelectField>
                        <br/>
                        <SelectField value={this.state.newProjectDocument.customerRepresentative.id} floatingLabelText="Представитель заказчика"
                                     disabled={isDisabled} onChange={(event, index, value) => this.onChangeSelect("customerRepresentative", value)}>
                            {customerRepresentatives}
                        </SelectField>
                        <br/>
                        <SelectField value={this.state.newProjectDocument.developerRepresentative.id} floatingLabelText="Представитель застройщика"
                                     disabled={isDisabled} onChange={(event, index, value) => this.onChangeSelect("developerRepresentative", value)}>
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