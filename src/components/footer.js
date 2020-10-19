
import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
            <React.Fragment>
                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 margin-t-20">
                                <h4>HIRIC</h4>
                                <div className="text-muted margin-t-20">
                                    <ul className="list-unstyled footer-list">
                                        <li><Link onClick={evt => {  evt.preventDefault(); } } to="#">Home</Link></li>
                                        <li><Link  onClick={evt => {  evt.preventDefault(); } } to="#">About us</Link></li>
                                        <li><Link onClick={evt => {  evt.preventDefault(); } } to="#">Careers</Link></li>
                                        <li><Link onClick={evt => {  evt.preventDefault(); } } to="#">Contact us</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 margin-t-20">
                                <h4>Information</h4>
                                <div className="text-muted margin-t-20">
                                    <ul className="list-unstyled footer-list">
                                        <li><Link onClick={evt => {  evt.preventDefault(); } } to="#">Terms & Condition</Link></li>
                                        <li><Link onClick={evt => {  evt.preventDefault(); } } to="#">About us</Link></li>
                                        <li><Link onClick={evt => {  evt.preventDefault(); } } to="#">Jobs</Link></li>
                                        <li><Link onClick={evt => {  evt.preventDefault(); } } to="#">Bookmarks</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 margin-t-20">
                                <h4>Support</h4>
                                <div className="text-muted margin-t-20">
                                    <ul className="list-unstyled footer-list">
                                        <li><Link onClick={evt => {  evt.preventDefault(); } } to="">FAQ</Link></li>
                                        <li><Link onClick={evt => {  evt.preventDefault(); } } to="">Contact</Link></li>
                                        <li><Link onClick={evt => {  evt.preventDefault(); } } to="">Disscusion</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 margin-t-20">
                                <h4>Subscribe</h4>
                                <div className="text-muted margin-t-20">
                                    <p>In an ideal world this text wouldn’t exist, a client would acknowledge the importance of having web copy before the design starts.</p>
                                </div>
                                <form className="form subscribe">
                                    <input placeholder="Email" className="form-control" required />
                                    <Link onClick={evt => {  evt.preventDefault(); } } to="#" className="submit"><i className="pe-7s-paper-plane"></i></Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </footer>
            </React.Fragment >
        );
    }
}

export default Footer;


