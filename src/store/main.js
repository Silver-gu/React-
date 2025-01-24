import { create } from 'zustand';

const useStore = create((set) => ({
    users: [],
    currentUser: null,
    conversations: {},


    addUser: (user) => set((state) => ({ users: [...state.users, user] })),


    setCurrentUser: (user) => set({ currentUser: user }),


    sendMessage: (receiverId, message) => set((state) => {
        const conversationKey = receiverId;
        const newMessage = { senderId: state.currentUser.id, text: message };

        const updatedConversations = { ...state.conversations };
        updatedConversations[conversationKey] = updatedConversations[conversationKey]
            ? [...updatedConversations[conversationKey], newMessage]
            : [newMessage];

        return { conversations: updatedConversations };
    }),


    logout: () => set({ currentUser: null }),


    deleteAccount: () => set({ currentUser: null, posts: [] }),


    updateProfileImage: (newImageUrl) => set((state) => ({
        currentUser: state.currentUser ? { ...state.currentUser, profileImage: newImageUrl } : state.currentUser,
    })),


    addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),


    addCommentToPost: (postId, comment) => set((state) => ({
        posts: state.posts.map(post =>
            post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
        ),
    })),


    likePost: (postId) => set((state) => ({
        posts: state.posts.map(post =>
            post.id === postId
                ? {
                    ...post,
                    likedBy: post.likedBy ? [...post.likedBy, state.currentUser.id] : [state.currentUser.id]
                }
                : post
        ),
    })),


    removePost: (postId) => set((state) => ({
        posts: state.posts.filter(post => post.id !== postId)
    })),


    removeComment: (postId, commentIndex) => set((state) => ({
        posts: state.posts.map(post =>
            post.id === postId
                ? { ...post, comments: post.comments.filter((_, index) => index !== commentIndex) }
                : post
        ),
    })),
}));

export default useStore;
