const React = require('react');
import ButtonsBlock from './ButtonsBlock'
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

        const heightStyle = {};
        heightStyle['height'] = this.props.divHeight;

        const styles = {
            floatLeftStyle: floatLeftStyle,
            floatRightStyle: floatRightStyle,
            dataBlockStyle: dataBlockStyle,
        };

        let dictionary = null;
        if (this.props.dictionary === "organizations") {
            dictionary =
                <div style={heightStyle}>
                    <ButtonsBlock style={buttonsBlockStyle}/>
                    <Organizations
                        allOrganizations={this.props.allOrganizations}
                        styles={styles}
                    />
                </div>
        } else if (this.props.dictionary === "employees") {
            dictionary =
                <div style={heightStyle}>
                    <ButtonsBlock style={buttonsBlockStyle}/>
                    <Employees
                        allEmployees={this.props.allEmployees}
                        styles={styles}
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