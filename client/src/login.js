import { Button } from "@material-ui/core";
import {auth, provider} from './firebase';
import { useDispatch, useSelector } from "react-redux";
import {putUser} from './actions';

export default function Login() {
    const dispatch = useDispatch();
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch(putUser(result.user));

            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://webcomicms.net/sites/default/files/clipart/131888/cool-logos-131888-2986250.png"></img>

                <h1>Sign in to Smart Home Office</h1>
                <Button onClick={signIn}>sign in with Google</Button>
            </div>
        </div>
    );
}
