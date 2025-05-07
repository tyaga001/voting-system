# 🗳️ VoteHub - Real-Time Voting Chat App

A powerful, interactive **real-time voting system** built with [Stream Chat API](https://getstream.io/chat/) and [Next.js](https://nextjs.org/).

VoteHub lets users join with a simple username, create and answer questions with multiple options, and see live results instantly as participants make their choices. Perfect for team decisions, community polls, or interactive events.

## ✨ Key Features

- **💬 Real-Time Messaging and Presence**  
  Seamless chat experience with channels, typing indicators, and online status.

- **🔄 Live Interactive Voting**  
  Create questions with multiple options and watch vote counts update instantly as users participate.

- **👤 Simple User Authentication**  
  Quick entry with just a username - no complex registration required.

- **📊 Question Management**  
  Create, view, and vote on multiple questions in a clean, organized interface.

- **📱 Responsive Design**  
  Works beautifully on mobile, tablet, and desktop.

- **🛠️ Modern Tech Stack**  
  Built with Next.js 13 App Router, React, Tailwind CSS, and Stream Chat SDK.

## 🔑 Getting Started with Stream

### Create Your Maker Account

To build VoteHub, you'll need to create a free Stream account. Stream offers a generous Maker Account with everything you need to get started:

- **Free for small teams** - Perfect for teams with five or less members
- **No credit card required** - Start building immediately
- **Comprehensive API access** - Full access to Chat, Activity Feeds, Video & Audio APIs
- **Clear usage limits** - 2,000 monthly active users and 100 concurrent connections
- **No surprise bills** - Hard limits to prevent unexpected charges

[**👉 Create Your Free Maker Account**](https://getstream.io/maker-account/)

### Stream's Benefits

> Stream empowers developers with the flexibility and scalability needed to build rich conversations and engaging communities. With over 1 billion end users globally, Stream is trusted by companies like Etoro, Match Group, Gumtree, and more.

Stream offers multiple products that can enhance your application:
- **Chat Messaging** - Build real-time chat messaging in less time
- **Activity Feeds** - Grow engagement with enterprise-ready feeds
- **Video & Audio** - Reliable in-app video calling and livestreaming
- **AI Integrations** - Moderation tools and ChatBot integration

## 🚀 Quick Start

### 1. Create a Stream Account

Visit [Stream's Maker Account page](https://getstream.io/maker-account/) to sign up for free:
- No credit card required
- Perfect for small teams and projects
- Includes Chat, Activity Feeds, and Video/Audio APIs

### 2. Clone the Repository

```bash
git clone https://github.com/your-org/votehub.git
cd votehub
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
```

> **Note**: You can find your API Key and Secret in your [Stream Dashboard](https://dashboard.getstream.io/) after creating a Maker Account.

> **Pro Tip**: Only the public key is exposed to the browser; the secret stays secure on the server.

### 4. Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action!

## 🏗️ Architecture

### Stream Capabilities

VoteHub is built on Stream's powerful, scalable infrastructure:

- **Real-time WebSockets**: For instant message delivery and vote updates
- **Robust APIs**: Comprehensive SDKs for React and Next.js
- **Scalability**: Handles from hundreds to millions of users
- **Security**: Built-in authentication and permissions

### How The App Works

1. **Authentication Flow**
   - Users join by providing just a username
   - Server generates a Stream user token using your API secret
   - Client initializes Stream Chat connection with the token
   - For simplicity, we can disable authentication checks in the Stream Chat dashboard

2. **Application Screens**
   - **Login Screen**: Simple form where users enter their name to join voting
   - **Voting System Screen**: Page where users can view existing questions, vote on options, and create new questions

3. **Voting Mechanism**
   - Special message type for vote prompts with custom UI
   - Vote actions are stored in message reactions and custom fields
   - All votes are synchronized in real-time via Stream's WebSockets

4. **Data Flow**
   - User actions trigger Stream Chat SDK events
   - Real-time updates propagate to all connected clients
   - Server actions handle secure operations like token generation

### Project Structure Highlights

```
src/
├── app/            # Next.js App Router pages and layouts
├── components/     # React components (Chat, Voting, UI)
│   ├── Chat/       # Chat-related components
│   ├── Voting/     # Voting-specific components
│   └── User/       # User management components
├── lib/            # Utility functions and Stream client setup
│   ├── stream.js   # Stream client initialization
│   └── utils.js    # Helper functions
└── styles/         # Global and component styles
```

## 🧩 Core Components

- **ChatContainer**: Main wrapper for the chat interface
- **ChannelList**: Shows available chat channels and their status
- **MessageList**: Displays messages with special handling for vote messages
- **VoteMessage**: Custom message component for polls with voting buttons
- **CreateVote**: UI for creating new questions with multiple options
- **LoginForm**: Simple form for user authentication with just a username
- **VoteStore**: Storage and management for existing questions and votes
- **QuestionList**: Display of all existing questions for users to interact with

## 📚 API Reference

### Stream Chat SDK

This project leverages Stream Chat's powerful features:

- **Channels API**: For organizing conversations
- **Messages API**: For sending/receiving regular and custom messages
- **Reactions API**: For storing and counting votes
- **Presence API**: For showing who's online/offline

## 🔗 Related Resources

- 📖 [Build a Real-Time Voting App with Stream Chat & Next.js](https://getstream.io/blog/aws-chat-app/)
- 📚 [Stream Chat Docs](https://getstream.io/chat/docs/)
- 🎓 [Next.js App Router Guide](https://nextjs.org/docs/app)
- 📱 [React Chat Tutorial](https://getstream.io/chat/react-chat/tutorial/)
- 🤖 [Building a RAG AI Chatbot](https://getstream.io/blog/rag-ai-chatbot/)
- 🔑 [Create a Stream Maker Account](https://getstream.io/maker-account/)

## 💻 Why Choose Stream?

Stream Chat API offers several advantages for your real-time applications:

- **Quick Implementation**: Add chat to your app in hours, not months
- **Enterprise-grade Infrastructure**: Reliable, secure, and compliant
- **Advanced Features**: Rich messages, reactions, threads, typing indicators
- **Customization**: Fully customize the UI to match your brand
- **Scale With Confidence**: Used by industry leaders serving billions of users

Stream is trusted by thousands of developers worldwide to power their real-time chat experiences, from small startups to large enterprises.

## 🤝 Contributing

Contributions are welcome and appreciated.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Stream](https://getstream.io/) for their excellent Chat API
- [Next.js](https://nextjs.org/) team for the powerful framework
