import { Button } from '@material-ui/core';
import React, { ReactElement, useContext } from 'react'
import { auth, provider } from '../firebase';
import { DataLayerContext } from '../store/Context';
import axios from '../axios/axios';
import './Login.css';
import { userRes } from '../axios/types';

interface Props {

}

function Login({ }: Props): ReactElement {
  const [, dispatch] = useContext(DataLayerContext)

  const signInHandler = async () => {
    const res = await auth.signInWithPopup(provider);
    if (!res.user) return;
    const userIdToken = await res.user.getIdToken();
    const uid = res.user.uid;
    const name = res.user.displayName;
    console.log(res.user.displayName);
    const createdUser = await axios.post<userRes>('/api/v1/users/new', {
      name,
      uid
    });

    dispatch({
      type: 'SET_USER',
      user: {
        uid,
        name: createdUser.data.name,
        _id: createdUser.data._id,
        idToken: userIdToken
      }
    });
  }

  return (
    <div className='login'>
      <div className="login__container">
        <img src="https://i.pinimg.com/originals/53/4c/70/534c70ab45c3a33b0584a09f0aa1140f.png" alt="my whatsapp logo" />
        <div className="login__text">
          <h1> IWhatsApp</h1>
        </div>
        <Button type='submit' onClick={() => signInHandler()}>Sign In With Google</Button>
      </div>
    </div>
  )
}

export default Login
