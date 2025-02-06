
export  const truncatePrompt = (prompt: string, charLimit: number) => {
    if (prompt.length > charLimit) {
      return prompt.substring(0, charLimit) + "...";
    }
    return prompt;
  };


  type Chat = {
    _id: string;
    prompt: string;
    createdAt: string; // Ensure your API returns this
    updatedAt: string;
  };
  
  export const categorizeChats = (chats:Chat[]) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const last7Days = new Date();
    last7Days.setDate(today.getDate() - 7);
    const last30Days = new Date();
    last30Days.setDate(today.getDate() - 30);

    const categorized = {
      today: [] as Chat[],
      yesterday: [] as Chat[],
      last7Days: [] as Chat[],
      last30Days: [] as Chat[],
      older: [] as Chat[],
    };

    chats.forEach((chat) => {
      const chatDate = new Date(chat.createdAt || chat.updatedAt);
      const chatDay = chatDate.toDateString();

      if (chatDay === today.toDateString()) {
        categorized.today.push(chat);
      } else if (chatDay === yesterday.toDateString()) {
        categorized.yesterday.push(chat);
      } else if (chatDate >= last7Days) {
        categorized.last7Days.push(chat);
      } else if (chatDate >= last30Days) {
        categorized.last30Days.push(chat);
      } else {
        categorized.older.push(chat);
      }
    });

    return categorized;
  };

   
