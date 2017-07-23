import React from 'react';
import ReactDOM from 'react-dom';
import AV from 'leancloud-storage'
import { LeanCloudAppID, LeanCloudAppKey } from './config.json'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Servant from './data-schema/Servant'
import './index.css';

AV.init({
  appId: LeanCloudAppID,
  appKey: LeanCloudAppKey,
});

// const test = new Servant()
// test.set('name', '测试')
// test.save().then((t) => {
//   console.log('saved', t)
// }, (err) => {
//   console.log(err)
// })

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
