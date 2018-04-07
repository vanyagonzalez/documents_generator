const React = require('react');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import ButtonsBlock from '../ButtonsBlock'
import Persons from './views/Persons'
import PersonDlg from './dialogs/PersonDlg'
import Organizations from './views/Organizations'
import OrganizationDlg from './dialogs/OrganizationDlg'
import Employees from './views/Employees'
import EmployeeDlg from './dialogs/EmployeeDlg'
import Certificates from './views/Certificates'
import CertificateDlg from './dialogs/CertificateDlg'
import Confirmations from './views/Confirmations'
import ConfirmationDlg from './dialogs/ConfirmationDlg'
import $ from 'jquery';

const width = '45%';

const dataBlockStyle = {
    height: "90%",
};

const floatLeftStyle = {
    float: "left",
    overflowY: "auto",
    height: "100%",
};
floatLeftStyle['width'] = width;

const floatRightStyle = {
    float: "right",
    overflowY: "auto",
};
floatRightStyle['width'] = width;


const styles = {
    floatLeftStyle: floatLeftStyle,
    floatRightStyle: floatRightStyle,
    dataBlockStyle: dataBlockStyle,
};

const heightStyle = {};

class DictionarySelector extends React.Component {
    constructor(props) {
        super(props);

        heightStyle['height'] = this.props.divHeight;

        this.state = {
            openError: false,
            operation: "not found",
            dlgOpeningState: {
                organization: false,
                person: false,
                employee: false,
                certificate: false,
                confirmation: false,
            },
            selectedData: {
                organization: {},
                person: {},
                employee: {},
                certificate: {},
                confirmation: {},
            },
            dlgData: {
                organization: {},
                person: {},
                employee: {},
                certificate: {},
                confirmation: {},
            }
        };

        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.prepareDlgData = this.prepareDlgData.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onDataUpdate = this.onDataUpdate.bind(this);
        this.handleOpenError = this.handleOpenError.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
    }

    onCreate(type) {
        let self = this.state;
        self.dlgOpeningState[type] = true;
        self.dlgData[type] = null;
        self.operation = "create";
        this.setState(self);
    }

    prepareDlgData(type) {
        let self = this.state;
        if (!self.selectedData[type].id) {
            self.openError = true;
        } else {
            self.dlgOpeningState[type] = true;
            self.dlgData[type] = self.selectedData[type];
        }
    }

    onUpdate(type) {
        this.prepareDlgData(type);
        let self = this.state;
        self.operation = "update";
        this.setState(self);
    }

    onDelete(type) {
        this.prepareDlgData(type);
        let self = this.state;
        self.operation = "delete";
        this.setState(self);
    }

    onClose(type) {
        let self = this.state;
        self.dlgOpeningState[type] = false;
        self.dlgData[type] = {};
        this.setState(self);
    }

    onSelect(type, selectedId) {
        let self = this;
        if (selectedId) {
            $.ajax({
                url: "/rest/" + type + "/" + selectedId
            }).then(function (data) {
                self.state.selectedData[type] = data;
                self.setState(self.state);
            });
        } else {
            self.state.selectedData[type] = {};
            self.setState(self.state);
        }
    }

    onDataUpdate(type, selectedId) {
        this.onSelect(type, selectedId);
    }

    handleOpenError() {
        this.setState({openError: true});
    };

    handleCloseError() {
        this.setState({openError: false});
    };

    render() {

        let dictionary = null;
        if (this.props.dictionary === "organizations") {
            dictionary =
                <div style={heightStyle}>
                    <ButtonsBlock
                        onCreate={() => this.onCreate("organization")}
                        onUpdate={() => this.onUpdate("organization")}
                        onDelete={() => this.onDelete("organization")}
                    />
                    <Organizations
                        organization={this.state.selectedData.organization}
                        allOrganizations={this.props.allOrganizations}
                        onSelect={this.onSelect}
                        styles={styles}
                    />
                    <OrganizationDlg
                        open={this.state.dlgOpeningState.organization}
                        operation={this.state.operation}
                        onClose={() => this.onClose("organization")}
                        onDataUpdate={this.onDataUpdate}
                        loadOrganizations={this.props.loadOrganizations}
                        loadEmployees={this.props.loadEmployees}
                        dlgData={this.state.dlgData.organization}
                    />
                </div>
        } else if (this.props.dictionary === "persons") {
            dictionary =
                <div style={heightStyle}>
                    <ButtonsBlock
                        onCreate={() => this.onCreate("person")}
                        onUpdate={() => this.onUpdate("person")}
                        onDelete={() => this.onDelete("person")}
                    />
                    <Persons
                        person={this.state.selectedData.person}
                        allPersons={this.props.allPersons}
                        onSelect={this.onSelect}
                        styles={styles}
                    />
                    <PersonDlg
                        open={this.state.dlgOpeningState.person}
                        operation={this.state.operation}
                        onClose={() => this.onClose("person")}
                        onDataUpdate={this.onDataUpdate}
                        loadPersons={this.props.loadPersons}
                        loadEmployees={this.props.loadEmployees}
                        dlgData={this.state.dlgData.person}
                    />
                </div>
        } else if (this.props.dictionary === "employees") {
            dictionary =
                <div style={heightStyle}>
                    <ButtonsBlock
                        onCreate={() => this.onCreate("employee")}
                        onUpdate={() => this.onUpdate("employee")}
                        onDelete={() => this.onDelete("employee")}
                    />
                    <Employees
                        employee={this.state.selectedData.employee}
                        allEmployees={this.props.allEmployees}
                        onSelect={this.onSelect}
                        styles={styles}
                    />
                    <EmployeeDlg
                        open={this.state.dlgOpeningState.employee}
                        operation={this.state.operation}
                        onClose={() => this.onClose("employee")}
                        onDataUpdate={this.onDataUpdate}
                        loadEmployees={this.props.loadEmployees}
                        persons={this.props.allPersons}
                        organizations={this.props.allOrganizations}
                        dlgData={this.state.dlgData.employee}
                    />
                </div>
        } else if (this.props.dictionary === "certificates") {
            dictionary =
                <div style={heightStyle}>
                    <ButtonsBlock
                        onCreate={() => this.onCreate("certificate")}
                        onUpdate={() => this.onUpdate("certificate")}
                        onDelete={() => this.onDelete("certificate")}
                    />
                    <Certificates
                        certificate={this.state.selectedData.certificate}
                        allCertificates={this.props.allCertificates}
                        onSelect={this.onSelect}
                        styles={styles}
                    />
                    <CertificateDlg
                        open={this.state.dlgOpeningState.certificate}
                        operation={this.state.operation}
                        onClose={() => this.onClose("certificate")}
                        onDataUpdate={this.onDataUpdate}
                        loadCertificates={this.props.loadCertificates}
                        dlgData={this.state.dlgData.certificate}
                    />
                </div>
        } else if (this.props.dictionary === "confirmations") {
            dictionary =
                <div style={heightStyle}>
                    <ButtonsBlock
                        onCreate={() => this.onCreate("confirmation")}
                        onUpdate={() => this.onUpdate("confirmation")}
                        onDelete={() => this.onDelete("confirmation")}
                    />
                    <Confirmations
                        confirmation={this.state.selectedData.confirmation}
                        allConfirmations={this.props.allConfirmations}
                        onSelect={this.onSelect}
                        styles={styles}
                    />
                    <ConfirmationDlg
                        open={this.state.dlgOpeningState.confirmation}
                        operation={this.state.operation}
                        onClose={() => this.onClose("confirmation")}
                        onDataUpdate={this.onDataUpdate}
                        loadConfirmations={this.props.loadConfirmations}
                        dlgData={this.state.dlgData.confirmation}
                    />
                </div>
        }

        const actions = [
            <FlatButton label="Cancel" primary={true} onClick={this.handleCloseError}/>,
        ];

        return (
            <div>
                {dictionary}
                <div>
                    <Dialog actions={actions} modal={false} open={this.state.openError} onRequestClose={this.handleCloseError}>
                        Объект не выбран.
                    </Dialog>
                </div>
            </div>
        )
    }

}

export default DictionarySelector;