import React from 'react';
import SignMeUp from './SignMeUp';

function Header() {

    const signupCallback = (email) => {
        return console.log(`SignUp called with email ${email}`);
    };

    return (
        <div className="jumbotron jumbotronheight">
            <div className="row">
                <div className="col-12 col-sm-4 text-center">
                <h6 className="text-uppercase">Aug 16 2021</h6>
                <h6 className="text-uppercase">Lahore Pakistan</h6>
                </div>
                <div className="col-12 col-sm-8 text-lg-right">
                <div>
                    <img src="/static/fitoutfit.png" />
                </div>
                <h2>FitOutFit: Web Developers</h2>
                <div className="row col-12 text-lg-right">
                    <SignMeUp signupCallback={signupCallback} />
                </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
