const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();

const router = require("express")();
admin.initializeApp();

const db = admin.firestore()
    .collection("groups");

const dbAct = admin.firestore()
    .collection("activities");

app.use("/api/v1", router);

router.get("/groups/byUser/:userID", async (request, response) => {
  const groups = await db.
      where("groupUsers", "array-contains", request.params.userID).get();


  if (!groups.empty) {
    const listGroups = [];
    const tempGroups = [];
    groups.forEach((gr)=>{
      tempGroups.push(gr.data());
    });
    for (const group of tempGroups) {
    // groups.forEach((group) => {
      // if (tempGroups[group] != null) {
      const groupData = group;

      let _sportName;

      try {
        _sportName = await dbAct.doc(groupData.sportID).get()
            .then((sport) => {
              return sport.data().sportName == null ?
          "": sport.data().sportName;
            });
      } catch (error) {
        _sportName = null;
      }
      // .then((sport) => {
      //   return sport.data().sportName == null ?
      //           "Not found": {sportName: sport.data().sportName};
      // }).catch((e) =>{console.log(e);})


      listGroups.push({
        id: group.id,
        groupName: groupData.groupName == null ?
        "" : groupData.groupName,
        groupDescription: groupData.groupDescription == null ?
        "" : groupData.groupDescription,
        groupAdmins: groupData.groupAdmins == null ?
        [""] : groupData.groupAdmins,
        groupPending: groupData.groupPending == null ?
        [""] : groupData.groupPending,
        groupUsers: groupData.groupUsers == null ?
        [""] : groupData.groupUsers,
        imageUrl: groupData.imageUrl == null ?
        "": groupData.imageUrl,
        sportID: groupData.sportID == null ?
        "": groupData.sportID,
        sportName: groupData.sportID == null ?
        "": _sportName,
        userCreator: groupData.userCreator == null ?
        "": groupData.userCreator,
        // sportRef: groupData.sportRef == null ?
        // "No Reference" :

        // // gData: groupData,
      });
      // }
    }
    response.json(listGroups);
  } else {
    response.send("Groups by user not found");
  }
});

router.get("/groups/byName/:groupName", async (request, response) => {
  const groups = await db.where("groupName", ">=", request.params.groupName)
      .where("groupName", "<=", request.params.groupName+ "\uf8ff").get();

  if (!groups.empty) {
    const listGroups = [];
    const tempGroups = [];
    groups.forEach((gr)=>{
      tempGroups.push(gr.data());
    });
    for (const group of tempGroups) {
    // groups.forEach((group) => {
      // if (tempGroups[group] != null) {
      const groupData = group;

      let _sportName;

      try {
        _sportName = await dbAct.doc(groupData.sportID).get()
            .then((sport) => {
              return sport.data().sportName == null ?
          "": sport.data().sportName;
            });
      } catch (error) {
        _sportName = null;
      }
      // .then((sport) => {
      //   return sport.data().sportName == null ?
      //           "Not found": {sportName: sport.data().sportName};
      // }).catch((e) =>{console.log(e);})


      listGroups.push({
        id: group.id,
        groupName: groupData.groupName == null ?
        "" : groupData.groupName,
        groupDescription: groupData.groupDescription == null ?
        "" : groupData.groupDescription,
        groupAdmins: groupData.groupAdmins == null ?
        [""] : groupData.groupAdmins,
        groupPending: groupData.groupPending == null ?
        [""] : groupData.groupPending,
        groupUsers: groupData.groupUsers == null ?
        [""] : groupData.groupUsers,
        imageUrl: groupData.imageUrl == null ?
        "": groupData.imageUrl,
        sportID: groupData.sportID == null ?
        "": groupData.sportID,
        sportName: groupData.sportID == null ?
        "": _sportName,
        userCreator: groupData.userCreator == null ?
        "": groupData.userCreator,
        // sportRef: groupData.sportRef == null ?
        // "No Reference" :

        // // gData: groupData,
      });
      // }
    }
    response.json(listGroups);
  } else {
    response.send("Groups by user not found");
  }
});

// router.get("/groups/:groupId", (request, response) => {
//   db.doc(request.params.id).get()
//       .then((group) => response.status(200).json({
//         id: group.id,
//         userEmail: group.data().userEmail,
//         userName: group.data().userName,
//         role: group.data().role,
//         imageUrl: group.data().imageUrl,
//         createDate: // .send(`Cannot get user: ${error}`)));

router.get("/groups", async (request, response) => {
  // const activitiesArray = dbAct.get();

  const groups = await db.get();

  if (!groups.empty) {
    const listGroups = [];
    const tempGroups = [];
    groups.forEach((gr)=>{
      tempGroups.push(gr.data());
    });
    for (const group of tempGroups) {
    // groups.forEach((group) => {
      // if (tempGroups[group] != null) {
      const groupData = group;

      let _sportName;

      try {
        _sportName = await dbAct.doc(groupData.sportID).get()
            .then((sport) => {
              return sport.data().sportName == null ?
          "": sport.data().sportName;
            });
      } catch (error) {
        _sportName = null;
      }

      listGroups.push({
        id: group.id,
        groupName: groupData.groupName == null ?
        "" : groupData.groupName,
        groupDescription: groupData.groupDescription == null ?
        "" : groupData.groupDescription,
        groupAdmins: groupData.groupAdmins == null ?
        [""] : groupData.groupAdmins,
        groupPending: groupData.groupPending == null ?
        [""] : groupData.groupPending,
        groupUsers: groupData.groupUsers == null ?
        [""] : groupData.groupUsers,
        imageUrl: groupData.imageUrl == null ?
        "": groupData.imageUrl,
        sportID: groupData.sportID == null ?
        "": groupData.sportID,
        sportName: groupData.sportID == null ?
        "": _sportName,
        userCreator: groupData.userCreator == null ?
        "": groupData.userCreator,
        // sportRef: groupData.sportRef == null ?
        // "No Reference" :

        // // gData: groupData,
      });
      // }
    }
    response.json(listGroups);
  } else {
    response.send("Groups by user not found");
  }
});


router.post("/groups", async (request, response) => {
  const actualDate = new Date(Date.now());

  let _sportName;

  try {
    _sportName = await dbAct.doc(request.body.sportID).get()
        .then((sport) => {
          return sport.data().sportName == null ?
      "": sport.data().sportName;
        });
  } catch (error) {
    _sportName = null;
  }


  const newGroup = {

    "groupName": request.body.groupName,
    "groupDescription": request.body.groupDescription,
    "groupAdmins": [request.body.groupAdmins],
    "groupPending": [],
    "groupUsers": [request.body.groupUsers],
    "imageUrl": request.body.imageUrl,
    "sportID": request.body.sportID,
    "sportName": _sportName,
    "createDate": actualDate,
    "userCreator": request.body.userCreator,
  };


  db.add(newGroup)
      .then(() => {
        response.status(200).json(newGroup);
      }).catch((e) => {
        response.status(500);
      });
});


exports.dbGroups = functions.https.onRequest(app);
