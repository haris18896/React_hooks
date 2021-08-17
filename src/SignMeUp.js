import React, {useState, useContext} from 'react';
import { ConfigContext } from './App';

function SignMeUp({signupCallback}) {
    const [email , setEmail] = useState('');
    const context =  useContext(ConfigContext);

    return context.showSignMeUp === false ? null : (
        <div className="Container">
            <div>
                <div className="content">
                    <input
                    palceholder="Enter your email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value);}}
                    />
                    &nbsp;
                    <button
                    disabled={!email.includes('@')}
                     onClick={() => {
                        signupCallback(email);
                        setEmail('');
                        alert('Signup confirmed');
                        }}
                        className="btn"
                        type="submit"
                     >Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default SignMeUp;
