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
alert("Please login Vexwallet PC, if you won't to login vexwallet, you can submit manual");
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
$('#yourBp').text("please login again");
				$('#mybalance').text("please login again");
$('#balance').text("please login again");
$('#bidder').text("please login again");
	} catch (e) {
		console.log(e);
	}
}

$("#claimButton").click(function() {
var contract_claim = "vexcore";
var vexnet = VexNet(network);
var url = $("#produrl").val();
var prodpubkey = $("#prodpubkey").val();
var indonesia = 0;
  vexnet.contract(contract_claim).then(contract =>
   contract.regproducer({
producer: account,
producer_key: prodpubkey,
url: url,
location: indonesia,
}, {
authorization: account
})).then(function() {
alert("Your BP registered");
}).catch(function(exception) {
alert(exception);
})
});

$("#unreg").click(function() {
var contract_unreg = "vexcore";
var vexnet = VexNet(network);
  vexnet.contract(contract_unreg).then(contract =>
   contract.unregprod({
producer: account,
}, {
authorization: account
})).then(function() {
alert("Your BP unregistered");
}).catch(function(exception) {
alert(exception);
})
});

$("#claim").click(function() {
var contract_reg = "vexcore";
var vexnet = VexNet(network);
  vexnet.contract(contract_reg).then(contract =>
   contract.claimrewards({
owner: account,
}, {
authorization: account
})).then(function() {
alert("Your reward BP claimed");
}).catch(function(exception) {
alert(exception);
})
});

$("#bid").click(function() {
var contract_bid = "vexcore";
var newname = $("#newname").val();
var bid = $("#bidprice").val();
var vex = ' VEX';
var vexnet = VexNet(network);
vexnet.contract(contract_bid).then(contract =>
  contract.bidname({
bidder: account,
newname: newname,
bid: bid + vex,
}, {
authorization: account
})).then(function() {
alert("Bidname Success");
}).catch(function(exception) {
alert(exception);
})
});

$("#transferButton").click(function() {
var contract_transfer = "vex.token";
const to = $("#transTo").val();
const quantity = $("#transAmount").val();
var vex = ' VEX';
const memo = $("#transMemo").val();
var vexnet = VexNet(network);
vexnet.contract(contract_transfer).then(contract =>
  contract.transfer({
from: account,
to: to,
quantity: quantity + vex,
memo: memo,
}, {
authorization: account
})).then(function() {
alert("Transfer Success");
getinfo(account);
}).catch(function(exception) {
alert(exception);
})
});

$("#vexplorer").click(function() {
	var acc = account;
	openLink("https://explorer.vexanium.com/account/" + acc, "_blank");
    });

$("#stakeButton").click(function() {
var contract_stake = "vexcore";
const stakecpu = $("#stakecpu").val();
const stakenet = $("#stakenet").val();
var vex = ' VEX';
var trans = 0;
var vexnet = VexNet(network);
vexnet.contract(contract_stake).then(contract =>
  contract.delegatebw({
from: account,
receiver: account,
stake_net_quantity: stakenet + vex,
stake_cpu_quantity: stakecpu + vex,
transfer: trans,
}, {
authorization: account
})).then(function() {
alert("Stake VEX Success");
getinfo(account);
}).catch(function(exception) {
alert(exception);
})
});

$("#unstakeButton").click(function() {
var contract_unstake = "vexcore";
const stakecpu = $("#unstakecpu").val();
const stakenet = $("#unstakenet").val();
var vex = ' VEX';
var vexnet = VexNet(network);
vexnet.contract(contract_unstake).then(contract =>
  contract.undelegatebw({
from: account,
receiver: account,
unstake_net_quantity: stakenet + vex,
unstake_cpu_quantity: stakecpu + vex,
}, {
authorization: account
})).then(function() {
alert("Unstake VEX Success");
getinfo(account);
}).catch(function(exception) {
alert(exception);
})
});


$("#voteprod").click(function() {
var contract_vote = "vexcore";
const prod = $("#producerName").val();
var vexnet = VexNet(network);
vexnet.contract(contract_vote).then(contract =>
  contract.voteproducer({
voter: account,
proxy: "",
producers: [prod],
}, {
authorization: account
})).then(function() {
alert("Vote BP " + prod + " Success");
}).catch(function(exception) {
alert(exception);
})
});

$("#voteprox").click(function() {
var contract_vote = "vexcore";
const prox = $("#proxyName").val();
var vexnet = VexNet(network);
vexnet.contract(contract_vote).then(contract =>
  contract.voteproducer({
voter: account,
proxy: prox,
producers: [],
}, {
authorization: account
})).then(function() {
alert("Vote BP " + prox + " Success");
}).catch(function(exception) {
alert(exception);
})
});

function konfirmasiVote(){
var konfirmasi = confirm ("Are you sure for vote ekasepbanjar ?");
var vexnet = VexNet(network);
var contract_vote = "vexcore";
if(konfirmasi == true) {
vexnet.contract(contract_vote).then(contract =>
  contract.voteproducer({
voter: account,
proxy: "",
producers: ["ekasepbanjar"],
}, {
authorization: account
})).then(function() {
alert("Vote BP ekasepbanjar Success");
}).catch(function(exception) {
alert(exception);
})
}else{
alert("canceled")
}
}

function konfirmasiDonate(){
var vexnet = VexNet(network);
var contract_transfer = "vex.token";
var donate = $("#donateamount").val();
var konfirmasi = confirm ("Are you sure for " + donate + " VEX to ekasepbanjar ?");
var vex = ' VEX';
if(konfirmasi == true) {
vexnet.contract(contract_transfer).then(contract =>
  contract.transfer({
from: account,
to: "ekasepbanjar",
quantity: donate + vex,
memo: "Donate for support DApp Vex Ecosystem",
}, {
authorization: account
})).then(function() {
alert("Transfer Success");
}).catch(function(exception) {
alert(exception);
})
}else{
alert("canceled")
}
}