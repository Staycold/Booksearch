const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('savedBooks');
            }
            throw new AuthenticationError('You need to be logged in!');
          },

           user: async (parent, args) => {
            const foundUser = await User.findOne({
              $or: [{ _id: args.id }, { username: args.username }],
            }).populate('savedBooks');
        
            if (foundUser) {
              return foundUser;
            }
            throw new AuthenticationError('You need to be logged in!');
          },

          


},

  Mutation: {
    login: async (parent, args) => {
      const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    saveBooks: async (parent, { bookData}, context) => {
      if(context.user){
        const user = await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$push: {savedBooks: bookData } },
          {new: true}
        )
        return user;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async(parent,  { bookId }, context) => {
      if(context.user){
        const user = await User.findByIdAndUpdate(
          {_id: context.user._id },
          {$pull: { savedBooks: {bookId: bookId} } },
          {new: true}
        )
        return user;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
    
  }


};






module.exports = resolvers;