const React = require('react');

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class Certificates extends React.Component {
    constructor(props) {
        super(props);
        this.onRowSelection = this.onRowSelection.bind(this);
    }

    onRowSelection(rows) {

        let selectedId = null;
        this.props.allCertificates.forEach((obj, i) => {
            if (rows.indexOf(i) > -1) {
                selectedId = obj.id;
            }
        });

        this.props.onSelect("certificate", selectedId);
    };

    render() {
        let allCertificates = [];
        this.props.allCertificates.forEach(function(certificate) {
            allCertificates.push(
                <TableRow key={"certificate_" + certificate.id}>
                    <TableRowColumn>{certificate.material}</TableRowColumn>
                </TableRow>
            );
        });

        let documentDate;
        if (this.props.certificate.documentDate) {
            documentDate = new Date(this.props.certificate.documentDate);
            documentDate = documentDate.toLocaleDateString();
        }

        let documentEndDate;
        if (this.props.certificate.documentEndDate) {
            documentEndDate = new Date(this.props.certificate.documentEndDate);
            documentEndDate = documentEndDate.toLocaleDateString();
        }

        return (
            <div style={this.props.styles.dataBlockStyle}>
                <div style={this.props.styles.floatLeftStyle}>
                    <Table
                        fixedHeader={true}
                        onRowSelection={(rows) => this.onRowSelection(rows)}
                    >
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn style={{textAlign: 'center'}}>
                                    Все сертификаты
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {allCertificates}
                        </TableBody>
                    </Table>
                </div>
                <div style={this.props.styles.floatRightStyle}>
                    <Table>
                        <TableBody
                            displayRowCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>{this.props.certificate.material}</TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Нормативный документ, согласно которого изготовлен материал</TableRowColumn>
                                <TableRowColumn>{this.props.certificate.standardDocument}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Вид документа</TableRowColumn>
                                <TableRowColumn>{this.props.certificate.documentKind}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Нормер документа, подтверждающего качество материала</TableRowColumn>
                                <TableRowColumn>{this.props.certificate.documentNumber}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Дата выдачи документа, подтверждающего качество материала</TableRowColumn>
                                <TableRowColumn>{documentDate}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Дата окончания срока действия документа</TableRowColumn>
                                <TableRowColumn>{documentEndDate}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Объем материала, "засертифицированного" данным документом</TableRowColumn>
                                <TableRowColumn>{this.props.certificate.materialVolume}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Единица измерения объема материала, "засертифицированного" данным документом</TableRowColumn>
                                <TableRowColumn>{this.props.certificate.measureUnit}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Скан-копия документа</TableRowColumn>
                                <TableRowColumn>{this.props.certificate.documentCopy}</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }

}

export default Certificates;