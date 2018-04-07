const React = require('react');
import TextField from 'material-ui/TextField';

const textStyle = {
    marginRight: '50px',
    marginTop: '0px',
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
                    style={textStyle}
                />
                <TextField
                    floatingLabelText="Заказчик"
                    value={customerName}
                    disabled={true}
                    style={textStyle}
                />
                <TextField
                    floatingLabelText="Застройщик"
                    value={developerName}
                    disabled={true}
                    style={textStyle}
                />
            </div>
        )

    }
}

export default ConstrObjBasicInfo;