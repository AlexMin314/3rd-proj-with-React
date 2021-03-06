export const setPreferences = (preferences) => {
  if(Array.isArray(preferences)){
    localStorage.setItem('Preferences', JSON.stringify(preferences));
  }
}

export const getPreferences = () => {
  const preferencesJSON = localStorage.getItem('Preferences');
  let Preferences = [];
  try {
    Preferences = JSON.parse(preferencesJSON);
  }catch(e){
    console.log("Error: Cound not decode preferences from localstorage");
  }
  return Array.isArray(Preferences) ? Preferences : [];
}
