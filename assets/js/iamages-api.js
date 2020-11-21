class IamagesAPI {
  constructor () {
    this.IAMAGES_APISERVERROOT = "https://jkel101.uber.space/"
    this.IAMAGES_APIROOT = this.IAMAGES_APISERVERROOT + "iamages/api/"
  }
  getEncodedUserAuth (userAuth) {
    const encodedUserName = btoa(userAuth.UserName)
    const encodedUserPassword = btoa(userAuth.UserPassword)
    return encodedUserName + ':' + encodedUserPassword
  }
  makeRequest (method, endpoint, body=undefined, UserAuth=undefined) {
    var that = this
    return new Promise(function (resolve, reject) {
      var requestHeaders = {
        method: method,
        headers: new Headers()
      }
      if (body && method != 'GET') {
        requestHeaders.headers.append('Content-Type', 'application/json')
        requestHeaders['body'] = body
      }
      if (UserAuth) {
        requestHeaders.headers.append("Authorization", "Basic " + this.getEncodedUserAuth(UserAuth)) 
      }
      fetch(that.IAMAGES_APIROOT + endpoint, requestHeaders).then(function (response) {
        if (response.ok) {
          return response.json()
        } else {
          reject(new Error(response.statusText))
        }
      }).then(function (json) {
        if (json) {
          resolve(json)
        } else {
          reject(new Error("No JSON found!"))
        }
      }).catch(function (err) {
        reject(err)
      })
    })
  }
  get_root_latest() {
    var that = this
    return new Promise(function (resolve, reject) {
      that.makeRequest('GET', 'latest').then(function (response) {
        resolve(response.FileIDs)
      }).catch(function (err) {
        reject(err)
      })
    })
  }
  get_root_info(FileID, encodedUserAuth=undefined) {
    var that = this
    return new Promise(function (resolve, reject) {
      that.makeRequest('GET', 'info/' + FileID, encodedUserAuth).then(function (response) {
        resolve(response)
      }).catch(function (err) {
        reject(err)
      })
    })
  }
  get_root_img(FileID) {
    return this.IAMAGES_APIROOT + 'img/' + FileID
  }
  get_root_embed(FileID) {
    return this.IAMAGES_APIROOT + 'embed/' + FileID
  }
}