const React = require('react');
import Organizations from './views/Organizations'
import Employees from './views/Employees'
import Certificates from './views/Certificates'
import Confirmations from './views/Confirmations'

class DictionarySelector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const width = '45%';

        const floatLeftStyle = {
            float: "left",
            overflowY: "auto",
        };
        floatLeftStyle['width'] = width;
        floatLeftStyle['height'] = this.props.divHeight;

        const floatRightStyle = {
            float: "right",
            overflowY: "auto",
        };
        floatRightStyle['width'] = width;
        floatRightStyle['height'] = this.props.divHeight;

        const styles = {
            floatLeftStyle: floatLeftStyle,
            floatRightStyle: floatRightStyle,
        };

        let dictionary = null;
        if (this.props.dictionary === "organizations") {
            dictionary =
                <Organizations
                    allOrganizations={this.props.allOrganizations}
                    styles={styles}
                />
        } else if (this.props.dictionary === "employees") {
            dictionary =
                <Employees
                    allEmployees={this.props.allEmployees}
                    styles={styles}
                />
        } else if (this.props.dictionary === "certificates") {
            dictionary =
                <Certificates
                    allCertificates={this.props.allCertificates}
                    styles={styles}
                />
        } else if (this.props.dictionary === "confirmations") {
            dictionary =
                <Confirmations
                    allConfirmations={this.props.allConfirmations}
                    styles={styles}
                />
        }

        return <div>{dictionary}</div>
    }

}

export default DictionarySelector;