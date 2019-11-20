import React from 'react'
import Authentication from '../../util/Authentication/Authentication'
import Axios from 'axios';
import { Grid, Button, Dimmer, Icon, Sidebar, Menu, Header, Segment } from 'semantic-ui-react';

import './App.css'
import '../font.css'
import Scoreboard from '../Scoreboard';
import TeamBox from '../TeamBox';
import * as firebase from 'firebase/app';
require("firebase/firestore");


export default class App extends React.Component{
    constructor(props){
        super(props)
        this.Authentication = new Authentication()

        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state={
            finishedLoading:false,
            theme:'dark',
            isVisible:true,
            renderBlue: false,
            renderOrange: false,
            renderScore: false,
            matchData: null,
            visible: true ,
        }
        this.getMatch = this.getMatch.bind(this);
        var config = {
            apiKey: "AIzaSyDBDMGG037xZnc7l1LUS3MkGgUHpGWd9yE",
            authDomain: "echovrconnect-6b9cb.firebaseapp.com",
            databaseURL: "https://echovrconnect-6b9cb.firebaseio.com",
            projectId: "echovrconnect-6b9cb",
            storageBucket: "echovrconnect-6b9cb.appspot.com",
            messagingSenderId: "1048248144557",
            appId: "1:1048248144557:web:865ca74a75873d781dec24",
            measurementId: "G-PG51TVKWW3"
          };
          firebase.initializeApp(config);
          this.db = firebase.firestore();
    }

    getMatch() {
       if(this.state.uid) {
         let doc = this.db.collection('matchsnaps').doc(this.state.uid);
         let observer = doc.onSnapshot(snap => {
             console.log(snap.data());
             this.setState({matchData: snap.data()})
         }, err => {
             console.log(err)
         })
      }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }
    contextUpdate(context, delta){
        if(delta.includes('theme')){
            this.setState(()=>{
                return {theme:context.theme}
            })
        }
    }

    visibilityChanged(isVisible){
        this.setState(()=>{
            return {
                isVisible
            }
        })
    }
    
    componentDidUpdate(prevProps, prevState){
        // console.log(prevState);
        // console.log(this.state)
        if(this.state.uid !== prevState.uid){
            if(this.state.uid){
                this.getMatch()
            }
        }
    }

    componentDidMount(){
        if(this.twitch){
            window.Twitch.ext.configuration.onChanged(() => {
                this.setState({
                    uid: window.Twitch.ext.configuration.broadcaster.content
                })
            })
            this.twitch.onAuthorized((auth)=>{
                this.Authentication.setToken(auth.token, auth.userId)
                if(!this.state.finishedLoading){
                    // if the component hasn't finished loading (as in we've not set up after getting a token), let's set it up now.

                    // now we've done the setup for the component, let's set the state to true to force a rerender with the correct data.
                    this.setState(()=>{
                        return {finishedLoading:true}
                    })
                }
            })
            this.twitch.listen('broadcast',(target,contentType,body)=>{
                this.twitch.rig.log(`New PubSub message!\n${target}\n${contentType}\n${body}`)
                // now that you've got a listener, do something with the result...

                // do something...

            })

            this.twitch.onVisibilityChanged((isVisible,_c)=>{
                this.visibilityChanged(isVisible)
            })

            this.twitch.onContext((context,delta)=>{
                this.contextUpdate(context,delta)
            })
        }
    }
                // Axios.get('https://api.twitch.tv/helix/users?id=' + auth.channelId,{
                //    headers: {'Client-ID': auth.clientId}
                // })
                // .then(result => {
                //      this.setState({
                //         streamer: result.data.data[0]
                //      })
                //   })
                // .catch(err => {console.warn(err.response)})
    componentWillUnmount(){
        if(this.twitch){
            this.twitch.unlisten('broadcast', ()=>console.log('successfully unlistened'))
        }
    }
    render(){
        if(this.state.finishedLoading && this.state.isVisible && this.state.matchData){
            return (
                <div className="App">
                    {this.state.renderScore ? <Scoreboard matchData={this.state.matchData}/> : null}
                    {this.state.renderOrange? <TeamBox mouseLeave={() => {this.setState({renderOrange: false})}} teamData={this.state.matchData.teams[1]} teamIndex={1}/> : null}
                    {this.state.renderBlue ? <TeamBox mouseLeave={() => {this.setState({renderBlue: false})}} teamData={this.state.matchData.teams[0]} teamIndex={0}/> : null}
                    <div className={this.state.theme === 'light' ? 'App-light' : 'App-dark'} >
                           <div className="row">
                              <div className="exit"
                                 onMouseEnter={() => this.setState({
                                    renderOrange: false,
                                    renderBlue: false,
                                    renderScore: false
                                 })}
                              />
                              <div className="orange-team"
                                 onMouseEnter={() => this.setState({
                                       renderOrange: true,
                                       renderBlue: false,
                                       renderScore: false
                                 })}
                              />
                              <div className="scoreboard"
                                 onMouseEnter={() => this.setState({
                                       renderScore: true,
                                       renderBlue: false,
                                       renderOrange: false
                                 })}
                                 onMouseLeave={() => this.setState({renderScore: false})}
                              />
                              <div className="blue-team"
                                 onMouseEnter={() => this.setState({
                                       renderBlue: true,
                                       renderOrange: false,
                                       renderScore: false
                                 })}
                              />
                              <div className="exit"
                                 onMouseEnter={() => this.setState({
                                    renderBlue: false,
                                    renderOrange: false,
                                    renderScore: false
                                 })}
                              />
                        </div>
                        <div className="exit-div"
                           onMouseEnter={() => this.setState({
                              renderBlue: false,
                              renderOrange: false,
                              renderScore: false
                           })}
                        />
                    </div>
                </div>
            )
        }else{
            return (
                <div className="App">
                </div>
            )
        }

    }
}