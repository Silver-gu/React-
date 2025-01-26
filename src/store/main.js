import { create } from 'zustand';

const useStore = create((set) => ({
    users: JSON.parse(localStorage.getItem('users')) || [],
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    posts: JSON.parse(localStorage.getItem('posts')) || [],
    loginError: '',
    messages: JSON.parse(localStorage.getItem('messages')) || [],

    setCurrentUser: (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        set({ currentUser: user });
    },

    addPost: (post) => set((state) => {
        const newPost = {
            ...post,
            likes: post.likes || [],
            comments: post.comments || []
        };
        const updatedPosts = [...state.posts, newPost];
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        return { posts: updatedPosts };
    }),

    deletePost: (postToDelete) => set((state) => {
        const updatedPosts = state.posts.filter(post => post.timestamp !== postToDelete.timestamp);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        return { posts: updatedPosts };
    }),

    likePost: (postToLike) => set((state) => {
        const updatedPosts = state.posts.map(post => {
            if (post.timestamp === postToLike.timestamp) {

                if (!Array.isArray(post.likes)) {
                    post.likes = [];
                }


                if (post.likes.includes(state.currentUser.username)) {

                    return { ...post, likes: post.likes.filter(username => username !== state.currentUser.username) };
                } else {

                    return { ...post, likes: [...post.likes, state.currentUser.username] };
                }
            }
            return post;
        });
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        return { posts: updatedPosts };
    }),

    addComment: (postId, comment) => set((state) => {
        const updatedPosts = state.posts.map(post => {
            if (post.timestamp === postId) {

                if (!Array.isArray(post.comments)) {
                    post.comments = [];
                }

                return { ...post, comments: [...post.comments, comment] };
            }
            return post;
        });
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        return { posts: updatedPosts };
    }),

    deleteComment: (postId, commentId) => set((state) => {
        const updatedPosts = state.posts.map(post => {
            if (post.timestamp === postId) {

                const updatedComments = post.comments.filter(comment => comment.id !== commentId);
                return { ...post, comments: updatedComments };
            }
            return post;
        });
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        return { posts: updatedPosts };
    }),

    addUser: (user) => set((state) => {
        if (state.users.find((u) => u.username === user.username)) {
            console.log('Username already exists!');
            return state;
        }
        const updatedUsers = [...state.users, user];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        return { users: updatedUsers };
    }),

    updateUser: (updatedUser) => set((state) => {
        const updatedUsers = state.users.map((user) =>
            user.username === updatedUser.username ? updatedUser : user
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        return { currentUser: updatedUser, users: updatedUsers };
    }),

    login: (username, password) => set((state) => {
        const user = state.users.find((user) => user.username === username && user.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user)); // Save to localStorage
            return { currentUser: user, loginError: '' };
        } else {
            return { currentUser: null, loginError: 'Invalid username or password' };
        }
    }),

    logout: () => set({ currentUser: null }),

    sendMessage: (recipient, message) => set((state) => {
        const newMessage = {
            sender: state.currentUser.username,
            recipient: recipient.username,
            message,
            timestamp: new Date().toISOString(),
        };


        const updatedMessages = [...state.messages, newMessage];
        localStorage.setItem('messages', JSON.stringify(updatedMessages));

        return { messages: updatedMessages };
    }),

    getMessagesForConversation: (user1, user2) => {
        return (state) => {
            return state.messages.filter(
                (msg) =>
                    (msg.sender === user1 && msg.recipient === user2) ||
                    (msg.sender === user2 && msg.recipient === user1)
            );
        };
    },

}));

export default useStore;
