# NodeJS Weather API

** Important note **

In the project home directory create file `config.yaml` which defines InfluxDB IP address and port in the given format:

```yaml
IP:
  <IPv4_ADDR>
PORT:
  <PORT>
INFLUX_DATABSE:
  <DATABASE_NAME>
```

Otherwise, default values of will be used (IP: localost, PORT: 8086)

```
Usage: node app.js --config <conf-file> -l [api_port]

Options:
      --help        Show help                                             [boolean]
      --version     Show version number                                   [boolean]
      --config                               [default: "IP: localhost, PORT: 8086"]
  -l                                                                 [default:5000]
```