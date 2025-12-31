import { Conversation } from "./conversation";
import { Message } from "./message";

Conversation.hasMany(Message, {
  foreignKey: "conversationId",
});

Message.belongsTo(Conversation, {
  foreignKey: "conversationId",
});

export { Conversation, Message };
