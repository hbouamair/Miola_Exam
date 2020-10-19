
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';


class Services extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
            <React.Fragment>
                <section className="section bg-light" id="services">
                    <div className="container">
                        <Row>
                            <Col lg="8" className="offset-lg-2">
                                <h1 className="section-title text-center">Nos Services</h1>
                                <div className="section-title-border margin-t-20"></div>
                                <p className="section-subtitle text-muted text-center padding-t-30 font-secondary"></p>
                            </Col>
                        </Row>
                        <div className="row margin-t-30">
                            <Col lg="4" className="margin-t-20">
                                <div className="services-box">
                                    <div className="media">
                                        <i className="pe-7s-diamond text-custom"></i>
                                        <div className="media-body ml-4">
                                            <h4>Consultation des résultats</h4>
                                            <p className="pt-2 text-muted">En tant qu'étudiant ,vous pouvez consulter vos résultats à distance pour ne pas vous déplacer.</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="4" className="margin-t-20">
                                <div className="services-box">
                                    <div className="media">
                                        <i className="pe-7s-pen text-custom"></i>
                                        <div className="media-body ml-4">
                                            <h4>Planification des examens</h4>
                                            <p className="pt-2 text-muted">En tant qu'enseignant ,vous pouvez planifier les dates des examens pour ne pas entrer en conflit avec d'autres enseignants</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="4" className="margin-t-20">
                                <div className="services-box">
                                    <div className="media">
                                        <i className="pe-7s-piggy text-custom"></i>
                                        <div className="media-body ml-4">
                                            <h4>Gestion des salles</h4>
                                            <p className="pt-2 text-muted">En tant que coordinateur, vous pouvez gérer tout aspect de votre formation</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </div>
                        
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default Services;


