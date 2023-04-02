const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')

const token =
  'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJPekpySkVzSTVVcVVZRkEzaTVCR3pwY3ZOWXdMcDVDRTNZX3RHRkF2UU9FIn0.eyJleHAiOjE2ODA0MDQ5MzAsImlhdCI6MTY4MDQwNDYzMCwiYXV0aF90aW1lIjoxNjgwNDA0NjMwLCJqdGkiOiI3ODFmNjczZS1mYzE1LTRiMzUtODBhMy01MmU2ZmIwMGI1Y2MiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0L2tleWNsb2FrL3JlYWxtcy9teXJlYWxtIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjgzNWUzMzlkLWVkZDEtNDg4MS1iMTE0LTEwMTdhNjBkNTY5OCIsInR5cCI6IkJlYXJlciIsImF6cCI6Im15Y2xpZW50Iiwibm9uY2UiOiI1OGM4YWNkZi0wMmI4LTQ2NDEtODVlYS1hYmE3YzdkNGIwY2MiLCJzZXNzaW9uX3N0YXRlIjoiOTg3ZTI5NzctZTFkNS00OWUxLWJmNWUtYjBlYjM1YmI3M2NhIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLW15cmVhbG0iLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsInNpZCI6Ijk4N2UyOTc3LWUxZDUtNDllMS1iZjVlLWIwZWIzNWJiNzNjYSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGV2IiwiZ2l2ZW5fbmFtZSI6IiIsImZhbWlseV9uYW1lIjoiIn0.Ulsx0FgsxZ9LmlEB1WR6sWQt87Vv-ChzFhwVl5_vxjsU-xadch8SRuj74sjsYJAAwrb4kERI-r11WJm9nH1JPnBGlMGWG9zaa7OoVPYGIzx7ktCCTAo5Ex47iM1JwBX2ceRE-6ggTMA6Vwm-qXQJWzr0WkLNBkr7qlYL4-UrkIEXM7niEPBjhVnQ49vT078l-S021dHA1vEWvCONxLutaNRXTohGCE6ad5EfQWmHEbCQqNWDTS4koepSsikdKHj7Xc_FVQoW6KZaXHBnSXpTKIQxhjMkfgH2zAspXbivHlzdCC-y-SFi_ZSI1q0MVUCVu9Vv4fnH9aeuqV3r7NaXNA'

const client = jwksClient({
  jwksUri: 'http://keycloak:8080/realms/myrealm/protocol/openid-connect/certs',
})

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      callback(err, null)
    }
    var signingKey = key.publicKey || key.rsaPublicKey
    callback(null, signingKey)
  })
}

jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
  if (err) {
    console.log({ err })
    return
  }
  console.log({ decoded })
})
