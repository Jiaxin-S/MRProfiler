from argparse import ArgumentParser
import requests
import json

HOST='localhost'
PORT='9870'

def main():
    parser = ArgumentParser(prog='cli')
    parser.add_argument('--user', help="username", default='ehuang')
    parser.add_argument('--path', help="path", default='user/hive')
    parser.add_argument('op', help="operation, e.g. GETCONTENTSUMMARY, GETQUOTAUSAGE, LISTSTATUS_BATCH, GETNODEMANAGER, GETRESOURCEMANAGER")
    args = parser.parse_args()
    data = None
    if args.op == 'GETRESOURCEMANAGER':
        data = requests.get('http://localhost:8088/ws/v1/cluster/info').json()
    elif args.op == 'GETNODEMANAGER':
        data = requests.get('http://localhost:8088/ws/v1/cluster/info').json()
    else:
        data = requests.get('http://%s:%s/webhdfs/v1/%s?user.name=%s&op=%s' % (HOST, PORT, args.path, args.user, args.op)).json()
    print(json.dumps(data, indent=2))
    
    


if __name__ == '__main__':
    main()
