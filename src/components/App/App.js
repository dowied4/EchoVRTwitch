import React from 'react'
import Authentication from '../../util/Authentication/Authentication'
import Axios from 'axios';
import { Grid, Button, Dimmer, Icon, Sidebar, Menu, Header, Segment, StepTitle, Responsive } from 'semantic-ui-react';

import './App.css'
import '../font.css'
import Scoreboard from '../Scoreboard';
import TeamBox from '../TeamBox';


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
        this.renderBounds = this.renderBounds.bind(this)
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
    }

    componentDidMount(){
        if(this.twitch){
            this.twitch.onAuthorized((auth)=>{
                this.Authentication.setToken(auth.token, auth.userId)
                if(!this.state.finishedLoading){
                    // if the component hasn't finished loading (as in we've not set up after getting a token), let's set it up now.

                    // now we've done the setup for the component, let's set the state to true to force a rerender with the correct data.
                    this.setState(()=>{
                        return {finishedLoading:true}
                    })
                }
                Axios.get("https://us-central1-echovrconnect-6b9cb.cloudfunctions.net/getMatchData", {headers: {'Twitch-ID': auth.channelId}})
                .then((match) => {
                    this.setState({
                        matchData: match.data.match
                    })
                    }
                )
                .catch((err) => {
                    console.log('%c 🍮 err: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', err);
                    }
                )
            })
            this.twitch.listen('broadcast',(target,contentType,body)=>{
                this.twitch.rig.log(`New PubSub message!\n${target}\n${contentType}\n${body}`)
                this.setState({matchData: JSON.parse(body)})
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

    componentWillUnmount(){
        if(this.twitch){
            this.twitch.unlisten('broadcast', ()=>console.log('successfully unlistened'))
        }
    }

    renderBounds(){
        return(
            <div className={this.state.theme === 'light' ? 'App-light' : 'App-dark'} >
                <div className="exit-div"
                onMouseEnter={() => this.setState({
                    renderBlue: false,
                    renderOrange: false,
                    renderScore: false
                })}
                />
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
        );
    }

    render(){
        if(this.state.finishedLoading && this.state.isVisible && this.state.matchData){
            if(this.state.matchData.top){
                return (
                    <div className="App-top">
                        {this.renderBounds()}
                        <Responsive maxWidth={1200}>
                            <div className="scale-down">
                                {this.state.renderScore ? <Scoreboard matchData={this.state.matchData}/> : null}
                            </div>
                            {this.state.renderOrange? <TeamBox small={true} top={true} mouseLeave={() => {this.setState({renderOrange: false})}} teamData={this.state.matchData.teams[1]} teamIndex={1}/> : null}
                            {this.state.renderBlue ? <TeamBox small={true} top={true} mouseLeave={() => {this.setState({renderBlue: false})}} teamData={this.state.matchData.teams[0]} teamIndex={0}/> : null}
                        </Responsive>
                        <Responsive minWidth={1200}>
                            {this.state.renderScore ? <Scoreboard matchData={this.state.matchData}/> : null}
                            {this.state.renderOrange? <TeamBox top={true} mouseLeave={() => {this.setState({renderOrange: false})}} teamData={this.state.matchData.teams[1]} teamIndex={1}/> : null}
                            {this.state.renderBlue ? <TeamBox top={true} mouseLeave={() => {this.setState({renderBlue: false})}} teamData={this.state.matchData.teams[0]} teamIndex={0}/> : null}
                        </Responsive>
                        
                            
                    </div>
                )
            } else {
                return (
                    <div className="App-bottom">
                        {this.state.renderScore ? <Scoreboard matchData={this.state.matchData}/> : null}
                        {this.state.renderOrange? <TeamBox mouseLeave={() => {this.setState({renderOrange: false})}} teamData={this.state.matchData.teams[1]} teamIndex={1}/> : null}
                        {this.state.renderBlue ? <TeamBox mouseLeave={() => {this.setState({renderBlue: false})}} teamData={this.state.matchData.teams[0]} teamIndex={0}/> : null}
                        {this.renderBounds()}
                    </div>
                )
            }
        }else{
            return (
                <div className="App">
                </div>
            )
        }

    }
}