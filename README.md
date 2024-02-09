# Chat Forge

Chat Forge is a Discord clone.

## Features

- [x] User authentication
- [x] Creation and Joining Servers
- [x] Unique invite link generation & full working invite system
- [x] Creation of Channels in a Server
- [x] Real time messaging using Socket IO
- [x] Timestamps for messages
- [x] Delete & Edit messages in real time for all users
- [x] Infinite loading for messages
- [x] Message formatting: Support for text formatting (bold, italics, code blocks), emojis, and file attachments.
- [x] Create Text, Audio and Video call Channels
- [x] Private messaging
- [ ] 1:1 voice call between members
- [ ] 1:1 video call between members
- [ ] Show current active users
- [ ] Customization options: Allow users to personalize their profiles, change themes.
- [ ] Server Settings (Change name and delete)
- [ ] Channel Settings (Change name and delete)
- [ ] Permissions and roles: Implement different permission levels for users (admin, moderator, regular user, Kick) and assign roles to manage access.
- [ ] Responsive design: Ensure your app is responsive and works well on various devices and screen sizes.
- [ ] Integration with APIs: Integrate with external APIs for additional functionalities like fetching news, weather updates, or displaying rich media content.
- [ ] Convert to Typescript

### Next step

- [ ] remove bug - that send direct message is not showing in receiver page due to reducer problem. on onDirectMessageReceived reducer the currentConversation payload in coming empty.
