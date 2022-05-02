import requests
import json

response = requests.post('https://httpbin.org/post', data= json.dumps({'id': 1, 'name': 'ram sharma'}))

print(response.status_code) ##status 200


