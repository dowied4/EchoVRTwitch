import React from 'react'
import Authentication from '../../util/Authentication/Authentication'
import Axios from 'axios';
import { Grid, Button, Dimmer, Icon, Sidebar, Menu, Header, Segment } from 'semantic-ui-react';

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
            visible: true 
        }
        this.getMatch = this.getMatch.bind(this);
    }

    getMatch() {
        // Axios.get('SubtletyJuice/' + this.twitch.userId)
        // .then(res => {
        //     if(res.game_status === "playing") {
        //         this.setState({
        //             finishedLoading: true,
        //             matchData: res
        //         })
        //     }
        // })
        // .catch((err) => {console.log(err)});
        let res = { 
   "disc":{ 
      "position":[ 
         0.0,
         0.0,
         0.0
      ],
      "velocity":[ 
         0.0,
         0.0,
         0.0
      ],
      "bounce_count":0
   },
   "sessionid":"B4E938CD-E7EE-4067-84C6-2675D50AB93A",
   "orange_points":7,
   "private_match":false,
   "client_name":"sealablebag",
   "game_clock_display":"02:26.52",
   "game_status":"playing",
   "game_clock":146.52693,
   "match_type":"Echo_Arena",
   "teams":[ 
      { 
         "players":[ 
            { 
               "name":"Sealablebag",
               "rhand":[ 
                  -6.7260003,
                  6.5890002,
                  9.4430008
               ],
               "playerid":0,
               "position":[ 
                  -6.9000001,
                  6.5460005,
                  9.7380009
               ],
               "lhand":[ 
                  -6.9360003,
                  6.0230002,
                  9.3290005
               ],
               "userid":2190639920985629,
               "stats":{ 
                  "possession_time":22.006966,
                  "points":0,
                  "saves":0,
                  "goals":0,
                  "stuns":2,
                  "passes":0,
                  "catches":0,
                  "steals":0,
                  "blocks":0,
                  "interceptions":0,
                  "assists":1,
                  "shots_taken":0
               },
               "number":0,
               "level":50,
               "possession":false,
               "left":[ 
                  -0.79500002,
                  -0.40200001,
                  0.45400003
               ],
               "invulnerable":false,
               "up":[ 
                  -0.37200001,
                  0.91500002,
                  0.15800001
               ],
               "forward":[ 
                  -0.47900003,
                  -0.044000003,
                  -0.87700003
               ],
               "stunned":false,
               "velocity":[ 
                  2.4250002,
                  3.187,
                  -0.26900002
               ],
               "blocking":false
            },
            { 
               "name":"Mad-",
               "rhand":[ 
                  -0.63600004,
                  0.69300002,
                  -30.257002
               ],
               "playerid":1,
               "position":[ 
                  -0.44600001,
                  1.2880001,
                  -30.460001
               ],
               "lhand":[ 
                  -0.24700001,
                  0.63200003,
                  -30.150002
               ],
               "userid":1456925437728586,
               "stats":{ 
                  "possession_time":11.133615,
                  "points":0,
                  "saves":0,
                  "goals":0,
                  "stuns":10,
                  "passes":0,
                  "catches":0,
                  "steals":0,
                  "blocks":0,
                  "interceptions":0,
                  "assists":1,
                  "shots_taken":0
               },
               "number":22,
               "level":50,
               "possession":false,
               "left":[ 
                  0.98000002,
                  -0.037,
                  0.19700001
               ],
               "invulnerable":false,
               "up":[ 
                  0.041000001,
                  0.99900007,
                  -0.019000001
               ],
               "forward":[ 
                  -0.19600001,
                  0.027000001,
                  0.98000002
               ],
               "stunned":false,
               "velocity":[ 
                  -0.44900003,
                  0.45000002,
                  4.9020004
               ],
               "blocking":false
            },
            { 
               "name":"Strembitsky",
               "rhand":[ 
                  -10.225,
                  -1.1670001,
                  -4.9430003
               ],
               "playerid":3,
               "position":[ 
                  -10.51,
                  -1.7490001,
                  -4.9260001
               ],
               "lhand":[ 
                  -10.927,
                  -1.052,
                  -4.9420004
               ],
               "userid":2299195446858569,
               "stats":{ 
                  "possession_time":42.584103,
                  "points":5,
                  "saves":0,
                  "goals":0,
                  "stuns":1,
                  "passes":0,
                  "catches":0,
                  "steals":0,
                  "blocks":0,
                  "interceptions":0,
                  "assists":0,
                  "shots_taken":3
               },
               "number":7,
               "level":50,
               "possession":true,
               "left":[ 
                  -0.97100008,
                  0.059000004,
                  0.23200001
               ],
               "invulnerable":true,
               "up":[ 
                  0.040000003,
                  -0.91500002,
                  0.40000001
               ],
               "forward":[ 
                  0.23600002,
                  0.39800003,
                  0.88600004
               ],
               "stunned":false,
               "velocity":[ 
                  4.8250003,
                  0.93100005,
                  1.9890001
               ],
               "blocking":false
            },
            { 
                "name":"Loveridge",
                "rhand":[ 
                   -7.8890004,
                   2.8800001,
                   6.4780002
                ],
                "playerid":5,
                "position":[ 
                   -8.1129999,
                   3.3750002,
                   6.2540002
                ],
                "lhand":[ 
                   -7.4340005,
                   3.4330001,
                   6.2090001
                ],
                "userid":1892572377425534,
                "stats":{ 
                   "possession_time":10.171021,
                   "points":0,
                   "saves":1,
                   "goals":0,
                   "stuns":2,
                   "passes":0,
                   "catches":0,
                   "steals":0,
                   "blocks":0,
                   "interceptions":0,
                   "assists":0,
                   "shots_taken":0
                },
                "number":14,
                "level":50,
                "possession":false,
                "left":[ 
                   0.95800006,
                   0.26100001,
                   -0.12100001
                ],
                "invulnerable":false,
                "up":[ 
                   -0.28800002,
                   0.86000001,
                   -0.42100003
                ],
                "forward":[ 
                   -0.0060000001,
                   0.43800002,
                   0.89900005
                ],
                "stunned":false,
                "velocity":[ 
                   1.248,
                   3.8560002,
                   0.38100001
                ],
                "blocking":false
             }
         ],
         "team":"BLUE TEAM",
         "possession":true,
         "stats":{ 
            "points":5,
            "possession_time":75.724686,
            "interceptions":0,
            "blocks":0,
            "steals":0,
            "catches":0,
            "passes":0,
            "saves":0,
            "goals":0,
            "stuns":13,
            "assists":2,
            "shots_taken":3
         }
      },
      { 
         "players":[ 
            { 
               "name":"VTSking",
               "rhand":[ 
                  -6.4860005,
                  3.5020001,
                  7.3860002
               ],
               "playerid":2,
               "position":[ 
                  -6.1780005,
                  4.007,
                  7.2290006
               ],
               "lhand":[ 
                  -6.2450004,
                  3.4170001,
                  7.5730004
               ],
               "userid":2011070038974190,
               "stats":{ 
                  "possession_time":29.429996,
                  "points":5,
                  "saves":0,
                  "goals":0,
                  "stuns":3,
                  "passes":0,
                  "catches":0,
                  "steals":1,
                  "blocks":0,
                  "interceptions":0,
                  "assists":1,
                  "shots_taken":2
               },
               "number":32,
               "level":50,
               "possession":false,
               "left":[ 
                  0.79800004,
                  -0.086000003,
                  0.59600002
               ],
               "invulnerable":false,
               "up":[ 
                  0.25100002,
                  0.94800007,
                  -0.19800001
               ],
               "forward":[ 
                  -0.54800004,
                  0.30800003,
                  0.77800006
               ],
               "stunned":false,
               "velocity":[ 
                  -0.52200001,
                  3.1390002,
                  4.138
               ],
               "blocking":false
            },
            { 
               "name":"Exhibit",
               "rhand":[ 
                  -9.8160009,
                  -0.46700001,
                  3.2640002
               ],
               "playerid":4,
               "position":[ 
                  -9.6950006,
                  -0.095000006,
                  3.0350001
               ],
               "lhand":[ 
                  -9.5100002,
                  -0.30700001,
                  3.3150001
               ],
               "userid":1571994892917716,
               "stats":{ 
                  "possession_time":9.2693501,
                  "points":2,
                  "saves":0,
                  "goals":0,
                  "stuns":6,
                  "passes":0,
                  "catches":0,
                  "steals":0,
                  "blocks":0,
                  "interceptions":0,
                  "assists":0,
                  "shots_taken":1
               },
               "number":1,
               "level":50,
               "possession":false,
               "left":[ 
                  0.96400005,
                  -0.069000006,
                  -0.25500003
               ],
               "invulnerable":false,
               "up":[ 
                  -0.028000001,
                  0.93300003,
                  -0.35900003
               ],
               "forward":[ 
                  0.26300001,
                  0.35300002,
                  0.89800006
               ],
               "stunned":false,
               "velocity":[ 
                  1.25,
                  1.4810001,
                  4.3310003
               ],
               "blocking":false
            },
            { 
               "name":"qlyoung",
               "rhand":[ 
                  -7.8890004,
                  2.8800001,
                  6.4780002
               ],
               "playerid":5,
               "position":[ 
                  -8.1129999,
                  3.3750002,
                  6.2540002
               ],
               "lhand":[ 
                  -7.4340005,
                  3.4330001,
                  6.2090001
               ],
               "userid":1892572377425534,
               "stats":{ 
                  "possession_time":10.171021,
                  "points":0,
                  "saves":1,
                  "goals":0,
                  "stuns":2,
                  "passes":0,
                  "catches":0,
                  "steals":0,
                  "blocks":0,
                  "interceptions":0,
                  "assists":0,
                  "shots_taken":0
               },
               "number":14,
               "level":50,
               "possession":false,
               "left":[ 
                  0.95800006,
                  0.26100001,
                  -0.12100001
               ],
               "invulnerable":false,
               "up":[ 
                  -0.28800002,
                  0.86000001,
                  -0.42100003
               ],
               "forward":[ 
                  -0.0060000001,
                  0.43800002,
                  0.89900005
               ],
               "stunned":false,
               "velocity":[ 
                  1.248,
                  3.8560002,
                  0.38100001
               ],
               "blocking":false
            },
            { 
                "name":"Far",
                "rhand":[ 
                   -7.8890004,
                   2.8800001,
                   6.4780002
                ],
                "playerid":5,
                "position":[ 
                   -8.1129999,
                   3.3750002,
                   6.2540002
                ],
                "lhand":[ 
                   -7.4340005,
                   3.4330001,
                   6.2090001
                ],
                "userid":1892572377425534,
                "stats":{ 
                   "possession_time":10.171021,
                   "points":0,
                   "saves":1,
                   "goals":0,
                   "stuns":2,
                   "passes":0,
                   "catches":0,
                   "steals":0,
                   "blocks":0,
                   "interceptions":0,
                   "assists":0,
                   "shots_taken":0
                },
                "number":14,
                "level":50,
                "possession":false,
                "left":[ 
                   0.95800006,
                   0.26100001,
                   -0.12100001
                ],
                "invulnerable":false,
                "up":[ 
                   -0.28800002,
                   0.86000001,
                   -0.42100003
                ],
                "forward":[ 
                   -0.0060000001,
                   0.43800002,
                   0.89900005
                ],
                "stunned":false,
                "velocity":[ 
                   1.248,
                   3.8560002,
                   0.38100001
                ],
                "blocking":false
             }
         ],
         "team":"ORANGE TEAM",
         "possession":false,
         "stats":{ 
            "points":7,
            "possession_time":48.870369,
            "interceptions":0,
            "blocks":0,
            "steals":1,
            "catches":0,
            "passes":0,
            "saves":1,
            "goals":0,
            "stuns":11,
            "assists":1,
            "shots_taken":3
         }
      }
   ],
   "map_name":"mpl_arena_a",
   "possession":[ 
      0,
      2
   ],
   "tournament_match":false,
   "blue_points":5,
   "last_score":{ 
      "disc_speed":0.0,
      "team":"orange",
      "goal_type":"[NO GOAL]",
      "point_amount":0,
      "distance_thrown":0.0,
      "person_scored":"[INVALID]",
      "assist_scored":"[INVALID]"
   }
}

        this.setState({
            finishedLoading:true,
            matchData: res
        })
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

    componentDidMount(){
        if(this.twitch){
         console.log(this.twitch)
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
            // this.interval = setInterval(() => this.getMatch(), 1000)
            this.getMatch()
        }
    }

    componentWillUnmount(){
        if(this.twitch){
            this.twitch.unlisten('broadcast', ()=>console.log('successfully unlistened'))
        }
    }
    render(){
        if(this.state.finishedLoading && this.state.isVisible){
            return (
                <div className="App">
                    {this.state.renderScore ? <Scoreboard matchData={this.state.matchData}/> : null}
                    {this.state.renderOrange? <TeamBox mouseLeave={() => {this.setState({renderOrange: false})}} teamData={this.state.matchData.teams[0].team === "ORANGE TEAM" ? this.state.matchData.teams[0] : this.state.matchData.teams[1]}/> : null}
                    {this.state.renderBlue ? <TeamBox mouseLeave={() => {this.setState({renderBlue: false})}} teamData={this.state.matchData.teams[0].team === "BLUE TEAM" ? this.state.matchData.teams[0] : this.state.matchData.teams[1]}/> : null}
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