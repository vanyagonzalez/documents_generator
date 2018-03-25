const React = require('react');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import ButtonsBlock from './ButtonsBlock'
import Organizations from './views/Organizations'
import OrganizationDlg from './dialogs/OrganizationDlg'
import Employees from './views/Employees'
import EmployeeDlg from './dialogs/EmployeeDlg'
import Certificates from './views/Certificates'
import CertificateDlg from './dialogs/CertificateDlg'
import Confirmations from './views/Confirmations'
import ConfirmationDlg from './dialogs/ConfirmationDlg'

const width = '45%';

const buttonsBlockStyle = {
    height: "10%",
};
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
            dlgOpeningState: {
                organization: false,
                employee: false,
                certificate: false,
                confirmation: false,
            },
            selectedData: {
                organization: {},
            },
            updatingData: {
                organization: {},
            }
        };

        this.onCreate = this.onCreate.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onDataUpdate = this.onDataUpdate.bind(this);
        this.handleOpenError = this.handleOpenError.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
    }

    onCreate(type) {
        let self = this.state;
        self.dlgOpeningState[type] = true;
        self.updatingData[type] = null;
        this.setState(self);
    }

    onUpdate(type) {
        let self = this.state;
        if (!self.selectedData[type].id) {
            self.openError=true;
        } else {
            self.dlgOpeningState[type] = true;
            self.updatingData[type] = self.selectedData[type];
        }
        this.setState(self);
    }

    onClose(type) {
        let self = this.state;
        self.dlgOpeningState[type] = false;
        self.updatingData[type] = null;
        this.setState(self);
    }

    onSelect(type, data) {
        let self = this.state;
        self.selectedData[type] = data;
        this.setState(self);
    }

    onDataUpdate(type, data) {
        this.onSelect(type, data);
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
                        style={buttonsBlockStyle}
                        onCreate={() => this.onCreate("organization")}
                        onUpdate={() => this.onUpdate("organization")}
                    />
                    <Organizations
                        organization={this.state.selectedData.organization}
                        allOrganizations={this.props.allOrganizations}
                        onSelect={this.onSelect}
                        styles={styles}
                    />
                    <OrganizationDlg
                        open={this.state.dlgOpeningState.organization}
                        onClose={() => this.onClose("organization")}
                        onDataUpdate={this.onDataUpdate}
                        loadOrganizations={this.props.loadOrganizations}
                        updatingOrganization={this.state.updatingData.organization}
                    />
                </div>
        } else if (this.props.dictionary === "employees") {
            dictionary =
                <div style={heightStyle}>
                    <ButtonsBlock
                        style={buttonsBlockStyle}
                        onCreate={() => this.onCreate("employee")}
                    />
                    <Employees
                        allEmployees={this.props.allEmployees}
                        styles={styles}
                    />
                    <EmployeeDlg
                        open={this.state.dlgOpeningState.employee}
                        onClose={() => this.onClose("employee")}
                        organizations={this.props.allOrganizations}
                        loadEmployees={this.props.loadEmployees}
                    />
                </div>
        } else if (this.props.dictionary === "certificates") {
            dictionary =
                <div style={heightStyle}>
                    <ButtonsBlock
                        style={buttonsBlockStyle}
                        onCreate={() => this.onCreate("certificate")}
                    />
                    <Certificates
                        allCertificates={this.props.allCertificates}
                        styles={styles}
                    />
                    <CertificateDlg
                        open={this.state.dlgOpeningState.certificate}
                        onClose={() => this.onClose("certificate")}
                        loadCertificates={this.props.loadCertificates}
                    />
                </div>
        } else if (this.props.dictionary === "confirmations") {
            dictionary =
                <div style={heightStyle}>
                    <ButtonsBlock
                        style={buttonsBlockStyle}
                        onCreate={() => this.onCreate("confirmation")}
                    />
                    <Confirmations
                        allConfirmations={this.props.allConfirmations}
                        styles={styles}
                    />
                    <ConfirmationDlg
                        open={this.state.dlgOpeningState.confirmation}
                        onClose={() => this.onClose("confirmation")}
                        loadConfirmations={this.props.loadConfirmations}
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