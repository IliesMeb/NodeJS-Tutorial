import React from 'react';
import './App.css';
import fuckYouTokenArtifact from "./FuckYouToken.json";
//import NavbarBlueprint from "./navbar";
import Banner from "./banner";
import Web3 from "web3";

import Button from "@material-ui/core/Button"
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {web3: null,
                  account: null,
                  fuckYouToken: null,
                  yourBalance: null,
                  amount: '',
                  amountSell: '',
                  tabIndex: 0
    }
    this.handleChangePurchase = this.handleChangePurchase.bind(this);
    this.handleSubmitPurchase = this.handleSubmitPurchase.bind(this);

    this.handleChangeSell = this.handleChangeSell.bind(this);
    this.handleSubmitSell = this.handleSubmitSell.bind(this);

    this.setTabIndex = this.setTabIndex.bind(this);
  }

  componentDidMount() {
    this.load();
  }
  
  setTabIndex(e, index) {
    this.setState({tabIndex: index})
  }

  load = async function () {
    if (window.ethereum) {
        // use MetaMask's provider
        this.setState({web3: new Web3(window.ethereum)});
        await window.ethereum.enable(); // get permission to access accounts
    } else {
        console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        this.setState({
          web3: new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"))
        });
    }
    await this.start();
    await this.getBalance();
  }
  
  start = async function () {
    const {web3} = this.state;

    try {
        const fuckYouToken = new web3.eth.Contract(
            fuckYouTokenArtifact.abi,
            "0x5ebcc7e46e494decc42db66ff862124866f97fb8"
            );
            // get accounts
          
            const accounts = await web3.eth.getAccounts();
            this.setState({account: accounts[0],
                           fuckYouToken: fuckYouToken
                          });
    } catch (error) {
        console.error(error);
        console.error("Could not connect to contract or chain.");
    }
  }

  getDecimals = async function () {
    const {decimals} = this.state.fuckYouToken.methods;
    return await decimals().call({from: this.state.account});
  }

  getBalance = async function () {
    const {balanceOf} = this.state.fuckYouToken.methods;
    const balance = await balanceOf(this.state.account).call({from: this.state.account});
    const decimals = await this.getDecimals();

    const currentBalance = balance / 10**decimals
    this.setState({yourBalance: currentBalance.toFixed(3)})
  }
  

  handleChangePurchase(action) {
    this.setState({amount: action.target.value});
  }

  handleChangeSell(action) {
    this.setState({amountSell: action.target.value})
  }

  handleSubmitPurchase = async function(action) {
    alert("Are you sure you want to purchase " + this.state.amount + " Fuck You Token");
    action.preventDefault();
    const decimals = await this.getDecimals();
    const amount = await this.state.amount * 10**decimals;
    const {deposit} = this.state.fuckYouToken.methods;
    await deposit().send({from: this.state.account, value: amount});
    await this.getBalance();
  }

  handleSubmitSell = async function(action) {
    alert("Are you sure you want to sell " + this.state.amountSell + " Fuck You Token");
    action.preventDefault();
    const decimals = await this.getDecimals();
    const amountSell = await this.state.amountSell * 10**decimals;
    const {withdraw} = this.state.fuckYouToken.methods; 
    if(this.state.amountSell < this.state.yourBalance) {
      await withdraw(amountSell).send({from: this.state.account})
    } else {
      await alert("You don't have enough Fuck You Token");
    }
    await this.getBalance();
  }



  render() {
    return (
      <div>
        {/* <NavbarBlueprint /> */}
        <div className="App">
          <Banner />
          <Grid container direction="column" justifyContent="space-evenly" alignItems="stretch">
            <div className="Account">
              <p>Fuck You Token Balance:</p>
              <p>{this.state.yourBalance} FUCKYOUs</p>
              <br></br>
              <br></br>
              <p2>Your Fuck You Token address:    </p2>
              <p2>{this.state.account}</p2>
            </div>
          </Grid>
          <AppBar position="static">
            <Tabs value={this.state.tabIndex} onChange={this.setTabIndex} centered="true">
              <Tab label="Buy FUCKYOUs" />
              <Tab label="Sell FUCKYOUs"/>
            </Tabs>
          </AppBar>
            {this.state.tabIndex === 0 ? 
            ( 
              <div className="tab-content">
                <form onSubmit={this.handleSubmitPurchase}>   
                  <TextField id="filled-margin-dense" margin="dense" style={{width: "15em"}} label="Amount" type="number" variant="outlined" inputProps={{min: "0", max: "10000000", step: "0.001", style:{textAlign: "center"}}} value={this.state.amount} onChange={this.handleChangePurchase}/>
                  <Button style={{borderRadius: 30, backgroundColor: "#21BF73", padding: "18px 36px", justifyContent: 'center', margin:"2em"}} type="submit">
                    Buy FUCKYOUs
                  </Button>  
                </form>
              </div>
              ) 
              : null}
            {this.state.tabIndex === 1 ? 
            ( 
            <div className='tab-content'> 
              <form onSubmit={this.handleSubmitSell}>
                <TextField id="filled-margin-dense" margin="dense" style={{width: "15em"}} label="Amount" type="number" variant="outlined" inputProps={{ min: "0", max: "10000000", step: "0.001", style:{textAlign: "center"} }} value={this.state.amountSell} onChange={this.handleChangeSell}/>
                <Button style={{borderRadius: 30, backgroundColor: "#BE0000", padding: "18px 36px", justifyContent: 'center', margin:"2em"}} type="submit">
                  Sell FUCKYOUs
                </Button>  
              </form>
            </div>
              ) 
              : null}
          <div>
            <p2>Idea: Konstantin Ullrich </p2>
            <br></br>
            <p2>Design: Ilies Mebarki</p2>
          </div>
        </div>
      </div>  
    );
  }
}
  

export default Home;
