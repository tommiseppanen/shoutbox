# shoutbox
Shoutbox implemented with Cloud Firestore

Security rules:
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{document=**} {
      allow read, create: if true;
    }
  }
}
```