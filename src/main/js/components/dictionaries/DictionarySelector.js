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
        let dictionary = null;
        if (this.props.dictionary === "organizations") {
            dictionary =
                <Organizations
                    allOrganizations={this.props.allOrganizations}
                />
        } else if (this.props.dictionary === "employees") {
            dictionary = <Employees/>
        } else if (this.props.dictionary === "certificates") {
            dictionary = <Certificates/>
        } else if (this.props.dictionary === "confirmations") {
            dictionary = <Confirmations/>
        }

        return <div>{dictionary}</div>
    }

}

export default DictionarySelector;