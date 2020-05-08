ScatterJS.plugins( Vexanium() );
var fromDappBrowser = navigator.userAgent=='VexWalletAndroid';
var appname = document.title;
var network = ScatterJS.Network.fromJson({
	blockchain: bc('vex'),
	chainId:'f9f432b1851b5c179d2091a96f593aaed50ec7466b74f89301f957a83e56ce1f',
	host:'209.97.162.124',
	port:8080,
	protocol:'http'
});
var account;
let balance = '';
let net = '';
let cpu = '';
let dots = 0;
$('.eye').text('|');

setTimeout(function(){	
	connect();
},1000);

$('#ufo').on('click touch', function(){
	$(this).toggleClass('flying');
	$(this).toggleClass('caught');
});
$('#login').on('click touch', function(){
	connect();
});
function zero() {
	balance = balance;
	$('#dots').text('.');
	dots = 0;
}
function loading() {
	if(dots < 6) {
		$('#dots').append('.');
		dots++;
	}
}
function sleepy() {
	$('.tog').addClass('d-none');
	$('#login,#eyes').removeClass('d-none');
	$('#login').prop('disabled', false);
	$('.eye').text('X');
	$('#intro').text('Welcome');
}
function connect() {
	$('.tog').addClass('d-none');
	$('#dots,#login').removeClass('d-none');
	$('#login').prop('disabled', true);
	zero();
	try{
		if(!fromDappBrowser){
			ScatterJS.connect(appname,{network}).then(connected => {
				if(!connected) {
alert("Please login Vexwallet");
					notConnected();
					return;
				}
				login();
			});
		} else {
			pe.getWalletWithAccount().then((res)=>{
				if(!res) {
					notConnected();
					return;
				}
				account = res.data.account;
				onConnected();
			});	
		}
	} catch (e) {
		console.log(e);
	}
}
function notConnected(){
	$('.tog').addClass('d-none');
	$('#login,#nopen').removeClass('d-none');
	setTimeout(sleepy, 500);
}

function login() {
	try{
		ScatterJS.login().then(id => {
			if(!id) return;
			account = id.accounts[0].name;
			onConnected();
		});
	} catch (e) {
		console.log(e);
	}
}
function onConnected(){
	$('.tog').addClass('d-none');
	$('#gotin,#logout').removeClass('d-none');
	$('#yourBp').text(account);
 $('#mybalance').text(balance);
 $('#balance').text(balance);
	$('#logout').on('click touch', function(){
		logout();
	});
	getinfo(account);
}
function getinfo() {
	try {
		const vexnet = VexNet(network);
		vexnet.getAccount(account).then(info => {
			net = info.self_delegated_bandwidth.net_weight?info.self_delegated_bandwidth.net_weight:net;
cpu = info.self_delegated_bandwidth.cpu_weight?info.self_delegated_bandwidth.cpu_weight:cpu;
			balance = info.core_liquid_balance?info.core_liquid_balance:balance;
			setTimeout(function(){
				$('#user').text(account);
$('#bidder').text(account);
				$('#mybalance').text(balance);
$('#balance').text(balance);
$('#stakebalance').text(balance);
$('#netstake').text(net);
$('#cpustake').text(cpu);
			}, 500);
		});	
	} catch (e) {
		console.log(e);
	}
}
function logout() {
	try {
		if(!fromDappBrowser) ScatterJS.logout();
		sleepy();
$('#user').text("please login again");
$('#stakebalance').text("please login again");
$('#cpustake').text("please login again");
$('#netstake').text("please login again");
$('#yourBp').text("please login again");
				$('#mybalance').text("please login again");
$('#balance').text("please login again");
$('#bidder').text("please login again");
	} catch (e) {
		console.log(e);
	}
}

$("#claimButton").click(function() {
window.ScatterJS.scatter.connect(appname).then(connected => {
if(!connected) return false;
window.ScatterJS.plugins( new window.ScatterEOS());
   var scatter = window.ScatterJS.scatter;
 const requiredFields = { accounts:[network] };
   scatter.getIdentity(requiredFields).then(() => {
 account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
if (!account) return;
 var akun = account.name;
var sign = `${account.name}@${account.authority}`;
var contract_claim = "vexcore";
var vexnet = VexNet(network);
var url = $("#produrl").val();
var prodpubkey = $("#prodpubkey").val();
var indonesia = 0;
  vexnet.contract(contract_claim).then(contract =>
   contract.regproducer({
producer: akun,
producer_key: prodpubkey,
url: url,
location: indonesia,
}, {
authorization: sign
})).then(function() {
alert("Your BP registered");
}).catch(function(exception) {
alert(exception);
})
})
})
});

$("#unreg").click(function() {
window.ScatterJS.scatter.connect(appname).then(connected => {
if(!connected) return false;
window.ScatterJS.plugins( new window.ScatterEOS());
   var scatter = window.ScatterJS.scatter;
 const requiredFields = { accounts:[network] };
   scatter.getIdentity(requiredFields).then(() => {
 account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
if (!account) return;
 var akun = account.name;
var sign = `${account.name}@${account.authority}`;
var contract_unreg = "vexcore";
var vexnet = VexNet(network);
  vexnet.contract(contract_unreg).then(contract =>
   contract.unregprod({
producer: akun,
}, {
authorization: sign
})).then(function() {
alert("Your BP unregistered");
}).catch(function(exception) {
alert(exception);
})
})
})
});

$("#claim").click(function() {
window.ScatterJS.scatter.connect(appname).then(connected => {
if(!connected) return false;
window.ScatterJS.plugins( new window.ScatterEOS());
   var scatter = window.ScatterJS.scatter;
 const requiredFields = { accounts:[network] };
   scatter.getIdentity(requiredFields).then(() => {
 account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
if (!account) return;
 var akun = account.name;
var sign = `${account.name}@${account.authority}`;
var contract_reg = "vexcore";
var vexnet = VexNet(network);
  vexnet.contract(contract_reg).then(contract =>
   contract.claimrewards({
owner: akun,
}, {
authorization: sign
})).then(function() {
alert("Your reward BP claimed");
}).catch(function(exception) {
alert(exception);
})
})
})
});

$("#bid").click(function() {
window.ScatterJS.scatter.connect(appname).then(connected => {
if(!connected) return false;
window.ScatterJS.plugins( new window.ScatterEOS());
   var scatter = window.ScatterJS.scatter;
 const requiredFields = { accounts:[network] };
   scatter.getIdentity(requiredFields).then(() => {
 account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
if (!account) return;
 var akun = account.name;
var sign = `${account.name}@${account.authority}`;
var contract_bid = "vexcore";
var newname = $("#newname").val();
var bid = $("#bidprice").val();
var vex = ' VEX';
var vexnet = VexNet(network);
vexnet.contract(contract_bid).then(contract =>
  contract.bidname({
bidder: akun,
newname: newname,
bid: bid + vex,
}, {
authorization: sign
})).then(function() {
alert("Bidname Success");
connect();
}).catch(function(exception) {
alert(exception);
})
})
})
});

$("#transferButton").click(function() {
window.ScatterJS.scatter.connect(appname).then(connected => {
if(!connected) return false;
window.ScatterJS.plugins( new window.ScatterEOS());
   var scatter = window.ScatterJS.scatter;
 const requiredFields = { accounts:[network] };
   scatter.getIdentity(requiredFields).then(() => {
 account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
if (!account) return;
 var akun = account.name;
var sign = `${account.name}@${account.authority}`;
var contract_transfer = "vex.token";
const to = $("#transTo").val();
const quantity = $("#transAmount").val();
var vex = ' VEX';
const memo = $("#transMemo").val();
var vexnet = VexNet(network);
vexnet.contract(contract_transfer).then(contract =>
  contract.transfer({
from: akun,
to: to,
quantity: quantity + vex,
memo: memo,
}, {
authorization: sign
})).then(function() {
alert("Transfer Success");
connect();
}).catch(function(exception) {
alert(exception);
})
})
})
});

$("#vexplorer").click(function() {
	var acc = account.name;
	openLink("https://explorer.vexanium.com/account/" + acc, "_blank");
    });

$("#stakeButton").click(function() {
window.ScatterJS.scatter.connect(appname).then(connected => {
if(!connected) return false;
window.ScatterJS.plugins( new window.ScatterEOS());
   var scatter = window.ScatterJS.scatter;
 const requiredFields = { accounts:[network] };
   scatter.getIdentity(requiredFields).then(() => {
 account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
if (!account) return;
 var akun = account.name;
var sign = `${account.name}@${account.authority}`;
var contract_stake = "vexcore";
const stakecpu = $("#stakecpu").val();
const stakenet = $("#stakenet").val();
var vex = ' VEX';
var trans = 0;
var vexnet = VexNet(network);
vexnet.contract(contract_stake).then(contract =>
  contract.delegatebw({
from: akun,
receiver: akun,
stake_net_quantity: stakenet + vex,
stake_cpu_quantity: stakecpu + vex,
transfer: trans,
}, {
authorization: sign
})).then(function() {
alert("Stake VEX Success");
connect();
}).catch(function(exception) {
alert(exception);
})
})
})
});

$("#unstakeButton").click(function() {
window.ScatterJS.scatter.connect(appname).then(connected => {
if(!connected) return false;
window.ScatterJS.plugins( new window.ScatterEOS());
   var scatter = window.ScatterJS.scatter;
 const requiredFields = { accounts:[network] };
   scatter.getIdentity(requiredFields).then(() => {
 account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
if (!account) return;
 var akun = account.name;
var sign = `${account.name}@${account.authority}`;
var contract_unstake = "vexcore";
const stakecpu = $("#unstakecpu").val();
const stakenet = $("#unstakenet").val();
var vex = ' VEX';
var vexnet = VexNet(network);
vexnet.contract(contract_unstake).then(contract =>
  contract.undelegatebw({
from: akun,
receiver: akun,
unstake_net_quantity: stakenet + vex,
unstake_cpu_quantity: stakecpu + vex,
}, {
authorization: sign
})).then(function() {
alert("Unstake VEX Success");
connect();
}).catch(function(exception) {
alert(exception);
})
})
})
});


$("#voteprod").click(function() {
window.ScatterJS.scatter.connect(appname).then(connected => {
if(!connected) return false;
window.ScatterJS.plugins( new window.ScatterEOS());
   var scatter = window.ScatterJS.scatter;
 const requiredFields = { accounts:[network] };
   scatter.getIdentity(requiredFields).then(() => {
 account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
if (!account) return;
 var akun = account.name;
var sign = `${account.name}@${account.authority}`;
var contract_vote = "vexcore";
const prod = $("#producerName").val();
var vexnet = VexNet(network);
vexnet.contract(contract_vote).then(contract =>
  contract.voteproducer({
voter: akun,
proxy: "",
producers: [prod],
}, {
authorization: sign
})).then(function() {
alert("Vote BP " + prod + " Success");
}).catch(function(exception) {
alert(exception);
})
})
})
});

$("#voteprox").click(function() {
window.ScatterJS.scatter.connect(appname).then(connected => {
if(!connected) return false;
window.ScatterJS.plugins( new window.ScatterEOS());
   var scatter = window.ScatterJS.scatter;
 const requiredFields = { accounts:[network] };
   scatter.getIdentity(requiredFields).then(() => {
 account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
if (!account) return;
 var akun = account.name;
var sign = `${account.name}@${account.authority}`;
var contract_vote = "vexcore";
const prox = $("#proxyName").val();
var vexnet = VexNet(network);
vexnet.contract(contract_vote).then(contract =>
  contract.voteproducer({
voter: akun,
proxy: prox,
producers: [],
}, {
authorization: sign
})).then(function() {
alert("Vote BP " + prox + " Success");
}).catch(function(exception) {
alert(exception);
})
})
})
});

$("#konfirmasiVote").click(function() {
window.ScatterJS.scatter.connect(appname).then(connected => {
if(!connected) return false;
window.ScatterJS.plugins( new window.ScatterEOS());
   var scatter = window.ScatterJS.scatter;
 const requiredFields = { accounts:[network] };
   scatter.getIdentity(requiredFields).then(() => {
 account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
if (!account) return;
 var akun = account.name;
var sign = `${account.name}@${account.authority}`;
var contract_vote = "vexcore";
var vexnet = VexNet(network);
vexnet.contract(contract_vote).then(contract =>
  contract.voteproducer({
voter: akun,
proxy: "",
producers: ["ekasepbanjar"],
}, {
authorization: sign
})).then(function() {
alert("Vote BP ekasepbanjar Success");
}).catch(function(exception) {
alert(exception);
})
})
})
});

$("#konfirmasiDonate").click(function() {
window.ScatterJS.scatter.connect(appname).then(connected => {
if(!connected) return false;
window.ScatterJS.plugins( new window.ScatterEOS());
   var scatter = window.ScatterJS.scatter;
 const requiredFields = { accounts:[network] };
   scatter.getIdentity(requiredFields).then(() => {
 account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
if (!account) return;
 var akun = account.name;
var sign = `${account.name}@${account.authority}`;
var contract_transfer = "vex.token";
var donate = $("#donateamount").val();
var vex = ' VEX';
var vexnet = VexNet(network);
vexnet.contract(contract_transfer).then(contract =>
  contract.transfer({
from: akun,
to: "ekasepbanjar",
quantity: donate + vex,
memo: "Donate for support DApp Vex Ecosystem",
}, {
authorization: sign
})).then(function() {
alert("Transfer Success");
connect();
}).catch(function(exception) {
alert(exception);
})
}) 
}) 
});