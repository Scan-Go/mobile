export enum FirebaseCollections {
  Profiles = "profiles",
  Notes = "notes",
  Tags = "tags",
  Rooms = "rooms",
  FcmTokens = "fcmTokens",
}

export enum FirebaseSubCollections {
  PrivateSubToProfile = "private",
  MessagesSubToRooms = "messages",
}

export enum FirebaseSubCollectionDocs {
  PhoneToProfilePrivateSub = "phone",
  SocialMediaToProfilePrivateSub = "socialMediaAccounts",
}
