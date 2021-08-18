import Web3 from "web3";
import fuckYouTokenArtifact from "./FuckYouToken.json";

const App = {
    web3: null,
    account: null,
    fuckYouToken: null,

    start: async function () {
        const {web3} = this;

        try {
            this.fuckYouToken = new web3.eth.Contract(
                fuckYouTokenArtifact.abi,
                "0x5ebcc7e46e494decc42db66ff862124866f97fb8"
            );

            // get accounts
            const accounts = await web3.eth.getAccounts();
            this.account = accounts[0];
            document.getElementById("forceWalletWrapper").style.display = "none";
        } catch (error) {
            console.error(error);
            console.error("Could not connect to contract or chain.");
        }
    },

    setStatus: function (message) {
        const status = document.getElementById("status");
        status.innerHTML = message;
    },

    clearAmountField: function () {
        document.getElementById("amount").value = 0;
    },

    getUserAmount: async function () {
        const decimals = await this.getDecimals();
        const input = parseFloat(document.getElementById("amount").value);

        return input * (10 ** decimals);
    },

    getDecimals: async function () {
        const {decimals} = this.fuckYouToken.methods;
        return await decimals().call({from: this.account});
    },

    depositToken: async function () {
        const {deposit} = this.fuckYouToken.methods;
        const amount = await this.getUserAmount();
        await deposit().send({from: this.account, value: amount});
        this.setStatus(`Successful deposit of ${amount} FUCKYOU for ${amount} MATIC to ${this.account}.`);
        this.clearAmountField();
    },

    withdrawToken: async function () {
      const {withdraw} = this.fuckYouToken.methods;
      const amount = await this.getUserAmount();
      await withdraw(amount).send({from: this.account});
      this.setStatus(`Successful withdrawn ${amount} FUCKYOU which are ${amount / 2} MATIC, because Fuck you!`);
      this.clearAmountField();
    },

    getBalance: async function () {
        const {balanceOf} = this.fuckYouToken.methods;
        const balance = await balanceOf(this.account).call({from: this.account});
        const decimals = await this.getDecimals();

        this.setStatus(`${balance / (10 ** decimals)} FUCKYOU`);
    }
};

async function load() {
    if (window.ethereum) {
        // use MetaMask's provider
        App.web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // get permission to access accounts
    } else {
        console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
    }

    App.start();
}

window.App = App;
window.load = load;

window.addEventListener("load", load);

export default App;
