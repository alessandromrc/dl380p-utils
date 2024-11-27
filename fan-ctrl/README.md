## Prerequisites

- A client machine with SSH installed.
- Access to the iLO interface.
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on the client machine. (I recommend using [nvm](https://github.com/nvm-sh/nvm))

---

## Steps

### 1. Generate the SSH Key

To generate an SSH key with a length of 1024 bits (the maximum size supported by iLO4), run the following command on your client machine:

```bash
ssh-keygen -t rsa -b 1024 -f ~/.ssh/ilo_key -C "iLO Access Key"
```

- **`-t rsa`**: Specifies the key type as RSA.
- **`-b 1024`**: Sets the key length to 1024 bits.
- **`-f ~/.ssh/ilo_key`**: Specifies the file path to save the key.
- **`-C "iLO Access Key"`**: Adds a comment to identify the key.

The private key will typically be saved at:

```bash
/root/.ssh/ilo_key
```

---

### 2. Authorize the Public Key in iLO

After generating the key pair, the public key (found in `~/.ssh/ilo_key.pub`) must be added to the iLO interface:

1. Open the iLO web interface in a browser.
2. Navigate to **Administration > Security**.
3. Select the **Administrator** account (or the relevant user account).
4. Under the **SSH Key** section, click **Add Key** and paste the contents of your public key file (`~/.ssh/ilo_key.pub`), you can use ``cat`` to read the public key.

---


### 3. Configure the Environment

Edit the `.env` file located in the repository and update the following information:

- **`HOST`**: The IP address of the iLO interface.
- **`PRIVATE_KEY_PATH`**: The path to the private key (e.g., `/root/.ssh/ilo_key`).

Your `.env` file should look something like this:

```env
HOST=192.168.x.x
PRIVATE_KEY_PATH=/root/.ssh/ilo_key
```

---

### 4. Install Dependencies

Navigate to the project directory and install the required dependencies using:

```bash
npm install
```

---

### 5. Run the Program

You have two options to run the program:

1. **Run Once (Recommended for First Time)**  
   This is useful for testing the SSH connection and ensuring everything is set up correctly:
   ```bash
   node index.js
   ```

2. **Run Automatically on Boot**  
   Use a process manager like [PM2](https://pm2.keymetrics.io/) to keep the script running in the background and restart it on system boot:
   ```bash
   pm2 start index.js --name "ilo_script"
   pm2 save
   pm2 startup
   ```

---

### Troubleshooting

- Ensure the iLO IP address is correct and accessible.
- Verify the path to the private key in the `.env` file matches your setup.
- Use the following command to test the SSH connection manually:
  ```bash
  ssh -i /root/.ssh/ilo_key Administrator@ILO_IP
  ```

---

## References

- [PM2 Documentation](https://pm2.keymetrics.io)
- [Node.js Installation Guide](https://nodejs.org/)
- [OpenSSH Documentation](https://www.openssh.com/manual.html)

--- 

Feel free to reach out if you encounter issues or need further assistance!
