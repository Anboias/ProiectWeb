import * as Styles from './Styles';

import React, { Component } from 'react';
import DetaliiJudet from './DetaliiJudet';
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
            afiseazaRegiune: false,
            fetchingDone: true,
            valueInserted: false

        }
        this.afiseazaZonaRegiuni = this.afiseazaZonaRegiuni.bind(this);
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

    afiseazaZonaRegiuni() {
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

    // parasireCasutaAdauga = () => {
    //     window.location.reload(false)
    // }

    adaugaValoare = () => {

        const { regiuneCurenta, denumire, valoare, idJudetLiber} = this.state; 

        if (regiuneCurenta === -1) {
            alert('Alege o regiune!');
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

        return (
            <div className="container" style={Styles.containerTitlu}>

                <div className="row" style={Styles.rowOneStyle}>
                    <div className="col">
                        <div>
                            <br />
                            <h1>{info.nume}</h1>
                            <h2>{info.descriere}</h2>
                        </div>
                    </div>
                </div>

                <div className="row" style={Styles.butonAfiseazaZonaRegiuni}>
                    <button
                        type="button" 
                        className="btn btn-primary"
                        onClick={this.afiseazaZonaRegiuni}
                    >Afișează regiuni</button>
                    <hr />
                </div>

                <div className="row" style={this.state.afiseazaRegiune ? Styles.containerRegiuni : Styles.hideContainerRegiuni}>
                    <div className="col-3" style={Styles.listaRegiuni}>
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
                        this.state.fetchingDone && <div className="col-9" style={Styles.containerJudete}>
                            <div className="container shadow-lg p-3 mb-5 bg-white rounded post-summary" >
                                <div className="list-group">

                                    {judete.map((judet) => {
                                        let isOldField = judet.campAdaugat.length === 0 ? true : false;
                                        let imagineCurenta = images(`./${judet.imagineStema}`);

                                        if (judet.idZona == idJudet) {
                                                return ( 
                                                    <div className="container" key={judet.id} >
                                                        <div className="row" style={Styles.listGroupStyle}>
                                                            <div className="col-4">
                                                                <h3>{judet.nume}</h3> 
                                                                <img src={imagineCurenta} alt="" style={Styles.imgStyle}/>
                                                                <button 
                                                                    style={Styles.buttonDeleteStyle}
                                                                    id={judet.id} 
                                                                    type="button" 
                                                                    className="btn btn-danger"
                                                                    onClick={this.stergeJudet}
                                                                >Stergere
                                                                </button> 
                                                            </div>
                                                            <DetaliiJudet isOldField={isOldField} detaliiJudet={Styles.detaliiJudet} judet={judet} />
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

                <div className="row" style={Styles.containerInserari}>
                    <div className="col">
                        <div className="credentials-form" >
                            <h1 className="">Inserare valori</h1>
                            <hr />
                            <form className="form-row align-items-center">

                                <div className="col-sm-4 my-1" style={Styles.formInserare} >
                                    <label htmlFor="denumire">Denumire</label>
                                    <input
                                        type="text"
                                        id="denumire"
                                        className="form-control"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>   
                                <div className="col-sm-4 my-1" style={Styles.formInserare} >
                                    <label htmlFor="valoare">Valoare</label>
                                    <input
                                        type="text"
                                        id="valoare"
                                        className="form-control"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>        
                                <div className="col-auto my-1" style={Styles.containerButonTrimitere} >
                                    <button   
                                        onMouseOver={this.adaugaValoare} 
                                        // onMouseOut={this.parasireCasutaAdauga} 
                                        style={Styles.butonTrimitere} 
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


export default FrontPage