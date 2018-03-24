const React = require('react');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class OrganizationDlg extends React.Component {
    render() {
        const actions = [
            <FlatButton label="Отмена" onClick={this.handleClose} primary={true} key="cancel"/>,
            <FlatButton type="submit" label="Создать" primary={true} key="submit"/>,
        ];

        return (
            <div>
                <RaisedButton label="Добавить лист проектной документации" onClick={this.handleOpen} />
                <Dialog
                    title="Новый лист проектной документации"
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="name" floatingLabelText="Наименование листа" onChange={this.onChange}/>
                        <br/>
                        <TextField name="number" floatingLabelText="Номер листа" onChange={this.onChange}/>
                        <br/>
                        <TextField name="change" floatingLabelText="Номер изменения листа" onChange={this.onChange}/>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default OrganizationDlg;