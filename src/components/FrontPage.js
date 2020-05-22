import React, { Component } from 'react';
const images = require.context('../img', true);

class FrontPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            regiuni: [],
            judete: [],
            info: [],
            afiseaza: true,
            idJudet: -1,
            areStadion: false,
            regiuneCurenta: -1,
            denumire: '',
            valoare: '',
            idJudetLiber: 0,
            fetchingDone: true,
            valueInserted: false

        }
        this.arataRegiuni = this.arataRegiuni.bind(this);
        this.handleClickRegiuni = this.handleClickRegiuni.bind(this);
        this.stergeJudet = this.stergeJudet.bind(this);
        this.adaugaValoare = this.adaugaValoare.bind(this);
    }


    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    componentDidMount() {
        fetch('/regiuni')
        .then(res => res.json())
        .then((regiuni) => {
          this.setState({ regiuni })
        })
        .catch()


        fetch('/judete')
        .then(res => res.json())
        .then((judete) => {
            this.setState({ 
                judete, 
                idJudetLiber: judete.length
            })
        })
        .catch()

        fetch('/info')
        .then(res => res.json())
        .then((info) => {
          this.setState({ info })
        })
        .catch()
    }

    arataRegiuni() {
        this.setState(prevState => ({
            afiseazaRegiune: !prevState.afiseazaRegiune,
            idJudet: -1
        }));
    }

    stergeJudet(event) {
        const id = event.target.id;

        return fetch('/judete/' + id, {
            method: 'DELETE'
        })
        .then(response => {
            response.json();
            this.setState({
                judete: this.state.judete.filter(judet => {
                    console.log(judet.id + " -- " + id)
                    return judet.id !== id;
                })
            })
            window.location.reload(false);
        });
    }

    handleClickRegiuni(event) {
        const id = event.target.id;
        this.setState( { 
            idJudet: id,
            regiuneCurenta: id
        })
    }

    adaugaValoare = (event) => {

        const { regiuneCurenta, denumire, valoare, idJudetLiber} = this.state; 

        if (regiuneCurenta === -1) {
            alert(regiuneCurenta);
            return;
        }

        this.setState({
            fetchingDone: false
        })

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: idJudetLiber,
                idZona: regiuneCurenta,
                nume: denumire,
                resedinta: '',
                populatie: 0,
                densitate: 0,
                suprafata: 0,
                areStadion: false,
                indicatorAuto: '',
                imagineStema: 'placeholder.png',
                prefixTelefonic: '',
                campAdaugat: valoare,

            })
        };

        return fetch('/judete', requestOptions)
        .then(response => {
            response.json();
        })
        .then(judetNou => 
            this.setState(prevState => ({ 
                judete: [...prevState.judete, judetNou],
                idJudetLiber: prevState.idJudetLiber + 1,
                fetchingDone: true,
                valueInserted: true
            }),
            window.location.reload(false)
        ))
    }

    render() {

        const { regiuni, judete, info, idJudet } = this.state;

        console.log("IDJudet: " + idJudet)
        return (
            <div className="container" style={containerTitlu}>

                <div className="row" style={rowOneStyle}>
                    <div className="col">
                        <div>
                            <br />
                            <h1>{info.nume}</h1>
                            <h2>{info.descriere}</h2>
                        </div>
                    </div>
                </div>

                <div className="row" style={butonAfiseazaRegiuni}>
                    <button
                        type="button" 
                        className="btn btn-primary"
                        onClick={this.arataRegiuni}
                    >Afișează regiuni</button>
                    <hr />
                </div>

                <div className="row" style={containerRegiuni}>
                    <div className="col-3" style={listaRegiuni}>
                        <div className="container shadow-lg p-3 mb-5 bg-white rounded post-summary" >
                            {this.state.afiseazaRegiune && 
                                <div className="list-group">
                                    { regiuni.map(( regiune ) => (
                                        <button 
                                            key={regiune.id} 
                                            id={regiune.id} 
                                            type="button" 
                                            className="list-group-item list-group-item-action"
                                            onClick={this.handleClickRegiuni}
                                            >
                                            {regiune.zona}
                                        </button>
                                    )) }
                                    <hr />
                                </div>}
                        </div>
                    </div>


                    {
                        this.state.fetchingDone && <div className="col-9" style={containerJudete}>
                            <div className="container shadow-lg p-3 mb-5 bg-white rounded post-summary" >
                                <div className="list-group">

                                    {judete.map((judet) => {
                                        let isOldField = judet.campAdaugat.length === 0 ? true : false;
                                        let imagineCurenta = images(`./${judet.imagineStema}`);

                                        if (judet.idZona == idJudet) {
                                                return ( 
                                                    <div className="container" key={judet.id} >
                                                        <div className="row" style={listGroupStyle}>
                                                            <div className="col-4">
                                                                <h3>{judet.nume}</h3> 
                                                                <img src={imagineCurenta} alt="" style={imgStyle}/>
                                                                <button 
                                                                    style={buttonDeleteStyle}
                                                                    id={judet.id} 
                                                                    type="button" 
                                                                    className="btn btn-danger"
                                                                    onClick={this.stergeJudet}
                                                                >Stergere
                                                                </button> 
                                                            </div>
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
                                                        </div>
                                                        <hr />
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                    <hr />
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <div className="row" style={containerInserari}>
                    <div className="col">
                        <div className="credentials-form" >
                            <h1 className="">Inserare valori</h1>
                            <hr />
                            <form className="form-row align-items-center">

                                <div className="col-sm-4 my-1" style={formInserare} >
                                    <label htmlFor="denumire">Denumire</label>
                                    <input
                                        type="text"
                                        id="denumire"
                                        className="form-control"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>   
                                <div className="col-sm-4 my-1" style={formInserare} >
                                    <label htmlFor="valoare">Valoare</label>
                                    <input
                                        type="text"
                                        id="valoare"
                                        className="form-control"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>        
                                <div className="col-auto my-1" style={containerButonTrimitere} >
                                    <button   
                                        onMouseOver={this.adaugaValoare} 
                                        style={butonTrimitere} 
                                        className="btn btn-primary">Adaugă</button>
                                </div>            
                            </form>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const containerTitlu = {
    margin: "0 auto",
}

const rowOneStyle = {
    padding: "20px"
}

const butonAfiseazaRegiuni = {
    padding: "20px",
}

const containerRegiuni = {
    border: "1px solid lightgrey",
    minHeight: "500px",
    margin: "20px 0",
    backgroundColor: "white"
}

const containerInserari = {
    border: "1px solid lightgrey",
    minHeight: "100px",
    margin: "20px 0",
    backgroundColor: "white"
}

const listaRegiuni = {
    padding: "20px",
}

const containerJudete = {
    padding: "20px",
}

const detaliiJudet = {
    paddingLeft: "30px",
}

const imgStyle = {
    width: "100px",
    height: "100px",
    // margin: "50px 0"
}

const buttonDeleteStyle = {
    width: 100,
    bottom: 0,
    left: "10px",
    position: "absolute",
    margin: "20px 0"
}

const butonTrimitere = {
    padding: "25px",
    marginLeft: "50px"
}

const containerButonTrimitere = {
    marginRight: "0"
}

const formInserare = {
    padding: "10px"
}

const listGroupStyle = {
    height: "350px"
}

export default FrontPage