const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");

async function getContract() {

  const ccpPath = path.resolve(
    __dirname,
    "connection-org.json"
  );

  const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

  const walletPath = path.join(__dirname, "wallet");
  const wallet = await Wallets.newFileSystemWallet(walletPath);

  const gateway = new Gateway();

  await gateway.connect(ccp, {
    wallet,
    identity: "appUser",
    discovery: { enabled: true, asLocalhost: true }
  });

  const network = await gateway.getNetwork("mychannel");

  const contract = network.getContract("consent");

  return contract;
}

module.exports = { getContract };
