# Nginx and Vagrant:

## Install if not already installed:

- [HomeBrew](https://brew.sh) (Optional): A package manager for MacOS.
- [VirtualBox](https://www.virtualbox.org) `brew install virutalbox`: used by Vagrant to run the VMs.
- [Vagrant](https://vagrantup.com/downloads): Sort of like docker but for development environments.
- [Ubuntu VM](https://app.vagrantup.com/ubuntu/boxes/xenial64) is the linux image we are using for testing nginx.

- `./Vagrantfile` is kind of a like a Dockerfile for defining a vm and any setup that needs to be done.
- `./nginx/nginx.conf` is the nginx config file.
- `./nginx/sites-available/default.conf` is the default webserver server config.
- `./nginx/sites-available/vhosts.conf` is the bulk config for vhosts (where (sub)domains point and any overrides to the `nginx.conf` file)

## Hosts file and alison.local DNS

To be able to test Nginx virtual hosts in more realistic way we need 
your computer to route requests to a local domain name, `http://alison.local` 
which will point to the IP address assigned in the Vagrantfile. 

### On Mac/Linux:

    sudo vim /etc/hosts

After you add the changes to the hosts file:

- __To Edit__, hit the `i` key to enter _INSERT_ mode.
- __To Save__, hit `esc` then `:` then `wq` to _Write_ and _Quit_.

### On Windows:
    
Open in Notepad running as Administrator.

    c:\Windows\System32\Drivers\etc\hosts

### Port Forwarding: (Accessing from http://127.0.0.1:80/)

If, in the Vagrantfile, you are using port forwarding.

    config.vm.network "forwarded_port", guest: 80, host: 80, hostname: true

Add this line to the end of the host file.

    127.0.0.1 alison alison.local app.alison.local cms.alison.local etl.alison.local

### Private Networking: (Accessing from http://192.168.50.4:80/ or another IP)

If, in the Vagrantfile, you are using private networking. 

    config.vm.network "private_network", ip: "192.168.50.4", hostname: true

Add this line to the end of the host file.

    192.168.50.4 alison alison.local app.alison.local cms.alison.local etl.alison.local

### Clearing DNS Cache:

If you run into issues with alison.local not resolving to the vm server you will probably need to clear your DNS cache.

#### MacOS:

Clear DNS cache on macOS

    sudo dscacheutil -flushcache

For older versions of Mac OS or if the previous didn't work:

    sudo killall -HUP mDNSResponder

    sudo discoveryutil mdnsflushcache

    sudo dscacheutil -flushcache    

#### Windows:

Clear DNS cache on Windows

    ipconfig /flushdns

#### Chrome:

Sometimes Chrome will cache dns on it's own. If the page still doesn't 
load using alison.local and you verified the IP address 192.168.50.4

    chrome://net-internals/#dns

Probably not necessary to clear this one, but just in case.

    chrome://net-internals/#sockets

## Creating a new Vagrantfile:

Before we can run nginx we 

    vagrant init ubuntu/xenial64

## Start the VM:

To start the vm based on the Vagrantfile config.

    vagrant up

Start and Run the provision script in Vagrantfile

    vagrant up --provision 

Run setup script in Vagrantfile without restarting VM

    vagrant provision # run setup script in Vagrantfile

    vagrant reload

    vagrant halt

    vagrant destroy

To make sure latest configuration works from scratch.

    vagrant destroy -f && vagrant up

If you want to connect to the running vm to make changes to anything outside the scope of the setup script you can run 

    vagrant ssh


## After VM Start:

The VM should now support urls like these

    http://alison.local
    
And sub domains like these.

    http://app.alison.local
    http://cms.alison.local
    http://etl.alison.local

