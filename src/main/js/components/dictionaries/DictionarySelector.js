const React = require('react');
import ButtonsBlock from './ButtonsBlock'
import Organizations from './views/Organizations'
import OrganizationDlg from './dialogs/OrganizationDlg'
import Employees from './views/Employees'
import EmployeeDlg from './dialogs/EmployeeDlg'
import Certificates from './views/Certificates'
import Confirmations from './views/Confirmations'

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
            dlgOpeningState: {
                organization: false,
                employee: false,
            },
        };

        this.onCreate = this.onCreate.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onCreate(type) {
        let self = this.state;
        self.dlgOpeningState[type] = true;
        this.setState(self);
    }

    onClose(type) {
        let self = this.state;
        self.dlgOpeningState[type] = false;
        this.setState(self);
    }

    render() {

        let dictionary = null;
        if (this.props.dictionary === "organizations") {
            dictionary =
                <div style={heightStyle}>
                    <ButtonsBlock
                        style={buttonsBlockStyle}
                        onCreate={() => this.onCreate("organization")}
                    />
                    <Organizations
                        allOrganizations={this.props.allOrganizations}
                        styles={styles}
                    />
                    <OrganizationDlg
                        open={this.state.dlgOpeningState.organization}
                        onClose={() => this.onClose("organization")}
                        loadOrganizations={this.props.loadOrganizations}
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
                    <ButtonsBlock style={buttonsBlockStyle}/>
                    <Certificates
                        allCertificates={this.props.allCertificates}
                        styles={styles}
                    />
                </div>
        } else if (this.props.dictionary === "confirmations") {
            dictionary =
                <div style={heightStyle}>
                    <ButtonsBlock style={buttonsBlockStyle}/>
                    <Confirmations
                        allConfirmations={this.props.allConfirmations}
                        styles={styles}
                    />
                </div>
        }

        return <div>{dictionary}</div>
    }

}

export default DictionarySelector;