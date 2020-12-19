from argparse import ArgumentParser
import requests
import json
import smtplib, ssl
from time import sleep, strftime

HOST='localhost'
PORT='9870'

def print_json(data):
    for entry in data:
        for key in data[entry]:
            print(str(key) + ": " + str(data[entry][key]))

def main():
    parser = ArgumentParser(prog='cli')
    parser.add_argument('--user', help="username", default='ehuang')
    parser.add_argument('--path', help="path", default='user/hive')
    parser.add_argument('op', help="operation, e.g. GETCONTENTSUMMARY, GETQUOTAUSAGE, LISTSTATUS_BATCH, GETNODEMANAGER, GETRESOURCEMANAGER")
    parser.add_argument('--time', help="time between emails", default=10)
    parser.add_argument('--memory', help="memory", default=1000000)
    args = parser.parse_args()
    data = None
    if args.op == 'GETRESOURCEMANAGER':
        data = requests.get('http://localhost:8088/ws/v1/cluster/info').json()
    elif args.op == 'GETNODEMANAGER':
        data = requests.get('http://localhost:8042/ws/v1/node/info').json()
    elif args.op == 'EMAILSERVICE':
        while True:
            data = requests.get('http://%s:%s/webhdfs/v1/%s?user.name=%s&op=%s' % (HOST, PORT, args.path, args.user, 'GETQUOTAUSAGE')).json()
            print(json.dumps(data, indent=2))
            if data['QuotaUsage']['spaceConsumed'] >= int(args.memory):
                break
            sleep(int(args.time))
        port = 465
        smtp_server = "smtp.gmail.com"
        sender_email = "cs239mrprofiler@gmail.com"
        receiver_email = "huang.eddie@yahoo.com"
        password = "239h@doop"
        message = """\
Subject: Hadoop Usage Alert

Usage exceeded %s bytes on %s""" % (args.memory, strftime('%X %x'))
        context = ssl.create_default_context()
        
        with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, message)
    else:
        data = requests.get('http://%s:%s/webhdfs/v1/%s?user.name=%s&op=%s' % (HOST, PORT, args.path, args.user, args.op)).json()
    # print(json.dumps(data, indent=2))
    print_json(data)
    
    


if __name__ == '__main__':
    main()
