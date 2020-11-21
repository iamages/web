const cards = new ImageCards()

api.get_root_latest().then(function (FileIDs) {
  for (FileID of FileIDs) {
    api.get_root_info(FileID).then(function (FileInformation) {
      cards.addImageCard(FileInformation)
    }).catch(function (err) {
      console.error(err)
    })
  }
  console.log(FileIDs)
}).catch(function (err) {
  console.error(err)
})