const functions = require('firebase-functions');

// this will give aacces to the Db which we'll need access to like count
const admin = require('firebase-admin');
admin.initializeApp();

// this is equivalent to frontend calling firebase.firestore()
const db = admin.firestore();

// trigger for whenever the document is added to the collection for like count
// addLike is the name of func
// pass along the structure of document that we want to access
// {name} - here we are gaining access to the variable of this name
// onCreate() -- is trigger for when doc get created
// in return getting access to params variable

exports.addLike = functions.firestore
	.document('/posts/{creatorId}/userPosts/{postId}/likes/{userId}')
	.onCreate((snap, context) => {
		return db
			.collection('posts')
			.doc(context.params.creatorId)
			.collection('userPosts')
			.doc(context.params.postId)
			.update({
				likesCount: admin.firestore.FieldValue.increment(1),
			});
	});
// to update the fields we use .update({})
// inside is the field that we want to update
// firebase gives us increment func -- which instead of fetching data and incrementing by 1 does by it's own

exports.removeLike = functions.firestore
	.document('/posts/{creatorId}/userPosts/{postId}/likes/{userId}')
	.onDelete((snap, context) => {
		return db
			.collection('posts')
			.doc(context.params.creatorId)
			.collection('userPosts')
			.doc(context.params.postId)
			.update({
				likesCount: admin.firestore.FieldValue.increment(-1),
			});
	});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
