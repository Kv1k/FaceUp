export default function(pictureUrlList = [], action) {
  if(action.type === 'snap') {
    var pictureCopyUrlList= [...pictureUrlList];
   
    pictureCopyUrlList.push({
      url: action.actionUrl,
      age: action.actionAge,
      gender: action.actionGender,
      barbe: action.actionBarbe,
      lunettes: action.actionLunettes,
      sourir: action.actionSourir,
      cheveux: action.actionCheveux
    })
    
     return pictureCopyUrlList
  } else {
      return pictureUrlList;
  }
}