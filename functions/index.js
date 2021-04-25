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
      tempGroups.push({
        id: gr.id,
        groupName: gr.data().groupName,
        groupDescription: gr.data().groupDescription,
        groupAdmins: gr.data().groupAdmins,
        groupPending: gr.data().groupPending,
        groupUsers: gr.data().groupUsers,
        imageUrl: gr.data().imageUrl,
        activityID: gr.data().activityID,
        activityName: "",
        userCreator: gr.data().userCreator,
      });
    });
    for (const group of tempGroups) {
    // groups.forEach((group) => {
      // if (tempGroups[group] != null) {
      const groupData = group;

      let _activityName;

      try {
        _activityName = await dbAct.doc(groupData.activityID).get()
            .then((activity) => {
              return activity.data().activityName == null ?
          "": activity.data().activityName;
            });
      } catch (error) {
        _activityName = null;
      }
      // .then((activity) => {
      //   return activity.data().activityName == null ?
      //           "Not found": {activityName: activity.data().activityName};
      // }).catch((e) =>{console.log(e);})


      listGroups.push({
        id: groupData.id,
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
        activityID: groupData.activityID == null ?
        "": groupData.activityID,
        activityName: groupData.activityID == null ?
        "": _activityName,
        userCreator: groupData.userCreator == null ?
        "": groupData.userCreator,
        // activityRef: groupData.activityRef == null ?
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
      tempGroups.push({
        id: gr.id,
        groupName: gr.data().groupName,
        groupDescription: gr.data().groupDescription,
        groupAdmins: gr.data().groupAdmins,
        groupPending: gr.data().groupPending,
        groupUsers: gr.data().groupUsers,
        imageUrl: gr.data().imageUrl,
        activityID: gr.data().activityID,
        activityName: "",
        userCreator: gr.data().userCreator,
      });
    });
    for (const group of tempGroups) {
    // groups.forEach((group) => {
      // if (tempGroups[group] != null) {
      const groupData = group;

      let _activityName;

      try {
        _activityName = await dbAct.doc(groupData.activityID).get()
            .then((activity) => {
              return activity.data().activityName == null ?
          "": activity.data().activityName;
            });
      } catch (error) {
        _activityName = null;
      }
      // .then((activity) => {
      //   return activity.data().activityName == null ?
      //           "Not found": {activityName: activity.data().activityName};
      // }).catch((e) =>{console.log(e);})


      listGroups.push({
        id: groupData.id,
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
        activityID: groupData.activityID == null ?
        "": groupData.activityID,
        activityName: groupData.activityID == null ?
        "": _activityName,
        userCreator: groupData.userCreator == null ?
        "": groupData.userCreator,
        // activityRef: groupData.activityRef == null ?
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
      tempGroups.push({
        id: gr.id,
        groupName: gr.data().groupName,
        groupDescription: gr.data().groupDescription,
        groupAdmins: gr.data().groupAdmins,
        groupPending: gr.data().groupPending,
        groupUsers: gr.data().groupUsers,
        imageUrl: gr.data().imageUrl,
        activityID: gr.data().activityID,
        activityName: "",
        userCreator: gr.data().userCreator,
      });
    });
    for (const group of tempGroups) {
    // groups.forEach((group) => {
      // if (tempGroups[group] != null) {
      const groupData = group;

      let _activityName;

      try {
        _activityName = await dbAct.doc(groupData.activityID).get()
            .then((activity) => {
              return activity.data().activityName == null ?
          "": activity.data().activityName;
            });
      } catch (error) {
        _activityName = null;
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
        activityID: groupData.activityID == null ?
        "": groupData.activityID,
        activityName: groupData.activityID == null ?
        "": _activityName,
        userCreator: groupData.userCreator == null ?
        "": groupData.userCreator,
        // activityRef: groupData.activityRef == null ?
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

  let _activityName;

  try {
    _activityName = await dbAct.doc(request.body.activityID).get()
        .then((activity) => {
          return activity.data().activityName == null ?
      "": activity.data().activityName;
        });
  } catch (error) {
    _activityName = null;
  }


  const newGroup = {

    "groupName": request.body.groupName,
    "groupDescription": request.body.groupDescription,
    "groupAdmins": [request.body.groupAdmins],
    "groupPending": [],
    "groupUsers": [request.body.groupUsers],
    "imageUrl": request.body.imageUrl,
    "activityID": request.body.activityID,
    // "activityName": _activityName,
    "createDate": actualDate,
    "userCreator": request.body.userCreator,
  };


  db.add(newGroup)
      .then((group) => {
        newGroup.id = group.id;
        newGroup.activityName = _activityName;
        response.status(200).json(newGroup);
      }).catch((e) => {
        response.status(500);
      });
});


router.patch("/groups", async (request, response) => {
  // let _activityName;

  // try {
  //   _activityName = await dbAct.doc(request.body.activityID).get()
  //       .then((activity) => {
  //         return activity.data().activityName == null ?
  //     "": activity.data().activityName;
  //       });
  // } catch (error) {
  //   _activityName = null;
  // }


  const newGroup = {
    "id": request.body.id,
    "groupName": request.body.groupName,
    "groupDescription": request.body.groupDescription,
    "groupAdmins": [request.body.groupAdmins],
    "groupPending": [request.body.groupPending],
    "groupUsers": [request.body.groupUsers],
    "imageUrl": request.body.imageUrl,
    "activityID": request.body.activityID,
    // "activityName": _activityName,
  };


  db.doc(newGroup.id).update(newGroup)
      .then(() => {
        response.status(200).json(newGroup);
      }).catch((e) => {
        response.status(500).send(e.message);
      });
});


exports.dbGroups = functions.https.onRequest(app);
