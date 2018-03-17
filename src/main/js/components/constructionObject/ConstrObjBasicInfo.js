const React = require('react');
import TextField from 'material-ui/TextField';

const marginRight = {
    marginRight: '50px',
};

class ConstrObjBasicInfo extends React.Component {
    render() {
        let objName = this.props.constrObj.name ? this.props.constrObj.name : "";
        let customerName = this.props.constrObj.customer ? this.props.constrObj.customer.name : "";
        let developerName = this.props.constrObj.developer ? this.props.constrObj.developer.name : "";
        return (
            <div>
                <TextField
                    floatingLabelText="Название"
                    value={objName}
                    disabled={true}
                    style={marginRight}
                />
                <TextField
                    floatingLabelText="Заказчик"
                    value={customerName}
                    disabled={true}
                    style={marginRight}
                />
                <TextField
                    floatingLabelText="Застройщик"
                    value={developerName}
                    disabled={true}
                />
            </div>
        )

    }
}

export default ConstrObjBasicInfo;