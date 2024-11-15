require('dotenv').config();
const path = require('path');
const { NodeSSH } = require('node-ssh');

// Thanks to
// https://github.com/kendallgoto/ilo4_unlock/blob/main/scripts/kg-silence-dl380pG8.sh
// https://github.com/kendallgoto/ilo4_unlock/blob/main/scripts/aterfax-silence-dl380pG8-screen.sh

const COMMAND_LIST = [
  // fan minimums
  "fan p 0 min 0",
  "fan p 1 min 0",
  "fan p 2 min 0",
  "fan p 3 min 0",
  "fan p 4 min 0",
  "fan p 5 min 0",

  // Ignore HD Cage sensor due to non-HP branded HDDs.
  "fan t 12 off",

  // Ignore PCIe slots cage 1 sensors?
  "fan t 32 off",
  "fan t 33 off",
  "fan t 34 off",
  "fan t 35 off",
  "fan t 36 off",
  "fan t 37 off",
  "fan t 38 off",

  // Ignore PCIe slots cage 2 sensors?
  "fan t 52 off",
  "fan t 53 off",
  "fan t 54 off",
  "fan t 55 off",
  "fan t 56 off",
  "fan t 57 off",
  "fan t 58 off",
  "fan t 59 off",
  "fan t 60 off",
  "fan t 61 off",
  "fan t 62 off",
  "fan t 63 off",

  "fan pid 50 sp 4600",

  // CPU 1 setpoint
  "fan pid 2 sp 5500",

  // CPU 2 setpoint
  "fan pid 3 sp 5500"

];

const ssh = new NodeSSH();

const privateKeyPath = path.resolve(process.env.PRIVATE_KEY_PATH);
const sshOptions = {
  host: process.env.HOST,
  username: process.env.USERNAME,
  privateKeyPath: privateKeyPath,
  algorithms: {
    kex: [process.env.KEX_ALGORITHMS],
  },
};

async function main() {
  try {
    await ssh.connect(sshOptions);
    console.log('SSH Connection Established');

    for (let i = 0; i < COMMAND_LIST.length; i++) {
      const command = COMMAND_LIST[i];
      console.log(`Running command: ${command}`);

      const result = await ssh.execCommand(command);
      console.log(`STDOUT: ${result.stdout}`);
      if (result.stderr) {
        console.log(`STDERR: ${result.stderr}`);
      }
    }

    console.log('All commands executed successfully');
    process.exit(0);
  } catch (error) {
    console.error('SSH Error:', error);
  }
}

main();
