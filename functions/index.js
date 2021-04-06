const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();

const router = require("express")();
admin.initializeApp();

const db = admin.firestore()
    .collection("groups");


app.use("/api/v1", router);

router.get("/groups/byUser/:userID", (request, response) => {
  db.where("groupUsers", "array-contains", request.params.userID).get()
      .then((groups) => {
        if (!groups.empty) {
          const listGroups = [];
          groups.forEach((group) => {
            const groupData = group.data();

            listGroups.push({
              id: group.id,
              groupName: groupData.groupName == null ?
              "" : groupData.groupName,
              groupAdmins: groupData.groupAdmins == null ?
              [""] : groupData.groupAdmins,
              groupPending: groupData.groupPending == null ?
              [""] : groupData.groupPending,
              groupUser: groupData.groupUsers == null ?
              [""] : groupData.groupUsers,
              imageUrl: groupData.imageUrl == null ?
              "": groupData.imageUrl,
              sportID: groupData.sportID == null ?
              "": groupData.sportID,
              sportRef: groupData.sportRef == null ?
              "No Reference" : groupData.sportRef.get()
                  .then((sport) => {
                    return sport.data().sportName == null ?
                    "Not found": {sportName: sport.data().sportName};
                  }),
              userCreator: group.data().userCreator == null ?
              "": group.data().userCreator,
              // gData: groupData,
            });
          });
          response.json(listGroups);
        } else {
          response.send("Groups by user not found");
        }
      });
});

router.get("/groups/byName/:groupName", (request, response) => {
  db.where("groupName", ">=", request.params.groupName)
      .where("groupName", "<=", request.params.groupName+ "\uf8ff").get()
      .then((groups) => {
        if (!groups.empty) {
          const listGroups = [];
          groups.forEach((group) => {
            const groupData = group.data();

            listGroups.push({
              id: group.id,
              groupName: groupData.groupName == null ?
              "" : groupData.groupName,
              groupAdmins: groupData.groupAdmins == null ?
              [""] : groupData.groupAdmins,
              groupPending: groupData.groupPending == null ?
              [""] : groupData.groupPending,
              groupUser: groupData.groupUsers == null ?
              [""] : groupData.groupUsers,
              imageUrl: groupData.imageUrl == null ?
              "": groupData.imageUrl,
              sportID: groupData.sportID == null ?
              "": groupData.sportID,
              sportRef: groupData.sportRef == null ?
              "No Reference" : groupData.sportRef.get()
                  .then((sport) => {
                    return sport.data().sportName == null ?
                    "Not found": {sportName: sport.data().sportName};
                  }),
              userCreator: group.data().userCreator == null ?
              "": group.data().userCreator,
              // gData: groupData,
            });
          });
          response.status(200).json(listGroups);
        } else {
          response.status(204).send("Groups by name not found");
        }
      });
});

// router.get("/groups/:groupId", (request, response) => {
//   db.doc(request.params.id).get()
//       .then((group) => response.status(200).json({
//         id: group.id,
//         userEmail: group.data().userEmail,
//         userName: group.data().userName,
//         role: group.data().role,
//         imageUrl: group.data().imageUrl,
//         createDate: new Date(group.data().createDate),
//       })
//           .catch((error) => response.status(400)
//               .send(`Cannot get user: ${error}`)));
// });


router.get("/groups", (request, response) => {
  db.get()
      .then((groups) => {
        if (!groups.empty) {
          const listGroups = [];
          groups.forEach((group) => {
            const groupData = group.data();

            listGroups.push({
              id: group.id,
              groupName: groupData.groupName == null ?
              "" : groupData.groupName,
              groupAdmins: groupData.groupAdmins == null ?
              [""] : groupData.groupAdmins,
              groupPending: groupData.groupPending == null ?
              [""] : groupData.groupPending,
              groupUser: groupData.groupUsers == null ?
              [""] : groupData.groupUsers,
              imageUrl: groupData.imageUrl == null ?
              "": groupData.imageUrl,
              sportID: groupData.sportID == null ?
              "": groupData.sportID,
              sportRef: groupData.sportRef == null ?
              "No Reference" : groupData.sportRef.get()
                  .then((sport) => {
                    return sport.data().sportName == null ?
                    "Not found": {sportName: sport.data().sportName};
                  }),
              userCreator: group.data().userCreator == null ?
              "": group.data().userCreator,
              // gData: groupData,
            });
          });
          response.json(listGroups);
        } else {
          response.send("Groups by user not found");
        }
      });
});
exports.dbGroups = functions.https.onRequest(app);
