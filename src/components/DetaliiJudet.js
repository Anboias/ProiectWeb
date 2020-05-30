import React from 'react'

const DetaliiJudet = ({ isOldField, detaliiJudet, judet }) => {
    return (
        <div className="col-8" style={detaliiJudet}>
            <table className="table table-hover">
                <tbody>
                    {isOldField ? <tr>
                        <th>Reședință</th>
                        <td>{judet.resedinta}</td>
                    </tr> : null}
                    {isOldField ? <tr>
                        <th>Populație</th>
                        <td>{judet.populatie}</td>
                    </tr> : null}
                    {isOldField ? <tr>
                        <th>Densitate</th>
                        <td>{judet.densitate}</td>
                    </tr> : null}
                    {isOldField ? <tr>
                        <th>Stadion</th>
                        <td>{judet.areStadion ? 'Da' : 'Nu'}</td>
                    </tr> : null}
                    {isOldField ? <tr>
                        <th>Suprafață</th>
                        <td>{judet.suprafata}</td>
                    </tr> : null}
                    {isOldField ? <tr>
                        <th>Indicator Auto</th>
                        <td>{judet.indicatorAuto}</td>
                    </tr> : null}
                    {isOldField ? <tr>
                        <th>Prefix Telefonic</th>
                        <td>{judet.prefixTelefonic}</td>
                    </tr> : null}
                    {!isOldField ? <tr>
                        <th>Camp adaugat</th>
                        <td>{judet.campAdaugat}</td>
                    </tr> : null}
                </tbody>
            </table>
        </div>
    )
}

export default DetaliiJudet;
