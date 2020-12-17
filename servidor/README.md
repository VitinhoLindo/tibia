<h1>FOLLOW TO INSTALL AND CONFIGURATE</h1>

<p>This tutorial is to teach how to install nodejs current version of project</p>

<h4>
  nodejs, vuejs and packages
</h4>

<ul>
  <li style="padding: 2px; margin-bottom: 5px;">nodejs v15.x</li>
  <li style="padding: 2px; margin-bottom: 5px;">npm v7.x</li>
  <li style="padding: 2px; margin-bottom: 5px;">body-parser 1.x</li>
  <li style="padding: 2px; margin-bottom: 5px;">dotenv 8.x</li>
  <li style="padding: 2px; margin-bottom: 5px;">express 4.x</li>
  <li style="padding: 2px; margin-bottom: 5px;">mongodb 3.x</li>
  <li style="padding: 2px; margin-bottom: 5px;">mysql2 2.x</li>
  <li style="padding: 2px; margin-bottom: 5px;">vuejs 3.x</li>
  <li style="padding: 2px; margin-bottom: 5px;">vue-router 4.x</li>
  <li style="padding: 2px; margin-bottom: 5px;">vuex 4.x</li>
  <li style="padding: 2px; margin-bottom: 5px;">node-sass 5.x</li>
  <li style="padding: 2px; margin-bottom: 5px;">sass-loader 10.x</li>
  <li style="padding: 2px; margin-bottom: 5px;">axios 0.x</li>
</ul>

<h4>databases</h4>

<ul>
  <li style="padding: 2px; margin-bottom: 5px;">mysql version 8.x</li>
  <li style="padding: 2px; margin-bottom: 5px;">mongodb version 3.x</li>
</ul>

<h4>before installation</h4>

<pre style="background-color: #2f3640; color: #ffffff; padding: 5px; width: 100%;">
$ sudo apt-get -y update && sudo apt-get -y upgrade
</pre>

<h4>installation</h4>

<p style="text-align: center; background-color: #7f8fa6; -webkit-border-radius: 3px;">ubuntu<p>

<pre style="background-color: #2f3640; color: #ffffff; padding: 5px; width: 100%;">
$ sudo apt-get install -y curl
$ curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
$ sudo apt-get install -y nodejs
</pre>

<pre style="background-color: #2f3640; color: #ffffff; padding: 5px; width: 100%;">
$ sudo apt-get install -y mysql-server
</pre>

<pre style="background-color: #2f3640; color: #ffffff; padding: 5px; width: 100%;">
$ wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
$ sudo apt-get -y update
$ sudo apt-get install -y mongodb
</pre>

<pre style="background-color: #2f3640; color: #ffffff; padding: 5px; width: 100%;">
$ sudo mysql -u root -p
Enter password: no exists password after instalation, press enter
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 23
Server version: 8.0.22-0ubuntu0.20.04.3 (Ubuntu)

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

You are enforcing ssl connection via unix socket. Please consider
switching ssl off as it does not make connection via unix socket
any more secure.
mysql> use mysql
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> update user set plugin='caching_sha2_password';
mysql> create user '[USER]'@'[HOST]' identified by '[PASSWORD]' REQUIRE X509;
Query OK, 0 rows affected (0.02 sec)
mysql> grant all privileges on *.* to '[USER]'@'[HOST]';
# or
mysql> grant SELECT, INSERT, UPDATE, DELETE on [DATABASE].[TABLE] to '[USER]'@'[HOST]';
Query OK, 0 rows affected (0.01 sec)
mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.02 sec)
mysql> SET GLOBAL connect_timeout=28800;
Query OK, 0 rows affected (0.00 sec)
mysql> SET GLOBAL interactive_timeout=28800;
Query OK, 0 rows affected (0.00 sec)
mysql> SET GLOBAL wait_timeout=28800;
Query OK, 0 rows affected (0.00 sec)
mysql> exit
Bye
$ sudo systemctl restart mysql
</pre>

<h4>configurações</h4>

<p style="text-align: center; background-color: #7f8fa6; -webkit-border-radius: 3px;">mysql original config<p>

<pre style="background-color: #2f3640; color: #ffffff; padding: 5px; width: 100%;">
$ nano /etc/mysql/mysql.conf.d/mysqld.cnf
#
# The MySQL database server configuration file.
#
# One can use all long options that the program supports.
# Run program with --help to get a list of available options and with
# --print-defaults to see which it would actually understand and use.
#
# For explanations see
# http://dev.mysql.com/doc/mysql/en/server-system-variables.html
# Here is entries for some specific programs
# The following values assume you have at least 32M ram
#
[mysqld]
#
# * Basic Settings
#
user		= mysql
# pid-file	= /var/run/mysqld/mysqld.pid
# socket	= /var/run/mysqld/mysqld.sock
# port		= 3306
# datadir	= /var/lib/mysql
#
#
# If MySQL is running as a replication slave, this should be
# changed. Ref https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_tmpdir
# tmpdir		= /tmp
#
# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
bind-address		= 127.0.0.1
mysqlx-bind-address	= 127.0.0.1
#
# * Fine Tuning
#
key_buffer_size		= 16M
# max_allowed_packet	= 64M
# thread_stack		= 256K
#
# thread_cache_size       = -1
#
# This replaces the startup script and checks MyISAM tables if needed
# the first time they are touched
myisam-recover-options  = BACKUP
#
# max_connections        = 151
#
# table_open_cache       = 4000
#
#
# * Logging and Replication
#
# Both location gets rotated by the cronjob.
#
# Log all queries
# Be aware that this log type is a performance killer.
# general_log_file        = /var/log/mysql/query.log
# general_log             = 1
#
# Error log - should be very few entries.
#
log_error = /var/log/mysql/error.log
#
# Here you can see queries with especially long duration
# slow_query_log		= 1
# slow_query_log_file	= /var/log/mysql/mysql-slow.log
# long_query_time = 2
# log-queries-not-using-indexes
#
# The following can be used as easy to replay backup logs or for replication.
# note: if you are setting up a replication slave, see README.Debian about
#       other settings you may need to change.
# server-id		= 1
# log_bin			= /var/log/mysql/mysql-bin.log
# binlog_expire_logs_seconds	= 2592000
max_binlog_size   = 100M
# binlog_do_db		= include_database_name
# binlog_ignore_db	= include_database_name
</pre>

<p style="text-align: center; background-color: #7f8fa6; -webkit-border-radius: 3px;">generate ssl</p>

<pre style="background-color: #2f3640; color: #ffffff; padding: 5px; width: 100%;">
# Create CA certificate
$ openssl genrsa 2048 > ca-key.pem
$ openssl req -new -x509 -nodes -days 3600 -key ca-key.pem -out ca.pem

# Create server certificate, remove passphrase, and sign it
# server-cert.pem = public key, server-key.pem = private key
$ openssl req -newkey rsa:2048 -days 3600 -nodes -keyout server-key.pem -out server-req.pem
$ openssl rsa -in server-key.pem -out server-key.pem
$ openssl x509 -req -in server-req.pem -days 3600 -CA ca.pem -CAkey ca-key.pem -set_serial 01 -out server-cert.pem

# Create client certificate, remove passphrase, and sign it
# client-cert.pem = public key, client-key.pem = private key
$ openssl req -newkey rsa:2048 -days 3600 -nodes -keyout client-key.pem -out client-req.pem
$ openssl rsa -in client-key.pem -out client-key.pem
$ openssl x509 -req -in client-req.pem -days 3600 -CA ca.pem -CAkey ca-key.pem -set_serial 01 -out client-cert.pem
# verify cerificates
$ openssl verify -CAfile ca.pem server-cert.pem client-cert.pem
server-cert.pem: OK
client-cert.pem: OK
$ openssl x509 -text -in ca.pem
$ openssl x509 -text -in server-cert.pem
$ openssl x509 -text -in client-cert.pem
</pre>

<p style="text-align: center; background-color: #7f8fa6; -webkit-border-radius: 3px;">mysql modified configuration<p>

<pre style="background-color: #2f3640; color: #ffffff; padding: 5px; width: 100%;">
$ sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
#
# The MySQL database server configuration file.
#
# One can use all long options that the program supports.
# Run program with --help to get a list of available options and with
# --print-defaults to see which it would actually understand and use.
#
# For explanations see
# http://dev.mysql.com/doc/mysql/en/server-system-variables.html
# Here is entries for some specific programs
# The following values assume you have at least 32M ram
#
[mysqld]
#
# * Basic Settings
#
user		= mysql
# pid-file	= /var/run/mysqld/mysqld.pid
# socket	= /var/run/mysqld/mysqld.sock
port		= 3306 # changed
# datadir	= /var/lib/mysql
#
#
# If MySQL is running as a replication slave, this should be
# changed. Ref https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_tmpdir
# tmpdir		= /tmp
#
# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
bind-address		= 0.0.0.0 # changed
mysqlx-bind-address	= 0.0.0.0 # changed
#
# * Fine Tuning
#
key_buffer_size		= 16M
# max_allowed_packet	= 64M
# thread_stack		= 256K
#
# thread_cache_size       = -1
#
# This replaces the startup script and checks MyISAM tables if needed
# the first time they are touched
myisam-recover-options  = BACKUP
#
max_connections         = 20
#
# table_open_cache       = 4000
#
#
# * Logging and Replication
#
# Both location gets rotated by the cronjob.
#
# Log all queries
# Be aware that this log type is a performance killer.
general_log_file        = /var/log/mysql/query.log
# general_log             = 1
#
# Error log - should be very few entries.
#
# log_error = /var/log/mysql/error.log
#
# Here you can see queries with especially long duration
# slow_query_log		= 1
# slow_query_log_file	= /var/log/mysql/mysql-slow.log
# long_query_time = 2
# log-queries-not-using-indexes
#
# The following can be used as easy to replay backup logs or for replication.
# note: if you are setting up a replication slave, see README.Debian about
#       other settings you may need to change.
# server-id		= 1
# log_bin			= /var/log/mysql/mysql-bin.log
# binlog_expire_logs_seconds	= 2592000
max_binlog_size   = 100M
# binlog_do_db		= include_database_name
# binlog_ignore_db	= include_database_name
#
# Type your own certificates directory
ssl-ca=/var/lib/mysql/ca.pem
ssl-cert=/var/lib/mysql/server-cert.pem
ssl-key=/var/lib/mysql/server-key.pem

[client]
ssl-ca=/var/lib/mysql/ca.pem
ssl-cert=/var/lib/mysql/client-cert.pem
ssl-key=/var/lib/mysql/client-key.pem
</pre>

<pre>
$ sudo setcap 'cap_net_bind_service=+ep' `which node`
</pre>