class AppController {
  constructor() {
    this.appPages = {
      latest: {
        markup: 'pages/latest.html',
        controller: new LatestController()
      },
      upload: {
        markup: 'pages/upload.html',
        controller: null
      },
      you: {
        markup: 'pages/you.html',
        controller: null
      }
    }
    this.appPageContainer = document.getElementById("app-page-container")
  }

  navigatePage(page) {
    if (page in this.appPages) {
      
    } else {
      throw new Error(`Specified page ${page} does not exist.`)
    }
  }
}


const appControllerInstance = new AppController()
appControllerInstance.navigatePage('latest')