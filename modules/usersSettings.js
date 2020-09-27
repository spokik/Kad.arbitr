const usersSettings = JSON.parse(localStorage.getItem(`usersSettings`))
if (!usersSettings) {
  usersSettings = {
    autoMD: "checked",
    tamplaties: "checked",
    checkReload: "checked",
    statisticsInterface: "checked",
    statCollect: "checked",
    usersSS: [5, 10]
  }
}

export { usersSettings }