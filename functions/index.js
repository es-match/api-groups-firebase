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
            listGroups.push({
              id: group.id,
              groupName: group.data().groupName,
            });
          });
          response.json(listGroups);
        } else {
          response.send("Groups by user not found");
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


// router.get("/groups", (request, response) => {
//   db.get()
//       .then((group) => {
//         const listGroups = [];

//         group.forEach((user) => {
//           listGroups.push({
//             id: user.id,
//             userEmail: user.data().userEmail,
//             userName: user.data().userName,
//             role: user.data().role,
//             imageUrl: user.data().imageUrl,
//             createDate: new Date(user.data().createDate),
//           });
//         });

//         response.json(listGroups);
//       });
// });
exports.dbGroups = functions.https.onRequest(app);
