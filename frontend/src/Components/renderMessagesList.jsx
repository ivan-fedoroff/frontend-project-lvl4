const renderMessagesList = (messagesList) => {
  if (messagesList) {
    return (
      <div id="messages-box" className="overflow-auto px-5">
        {messagesList.map((message) => {
          const key = message.id;
          return (
            <div key={key} className="text-break mb-2">
              <b>{message.username}</b>
              :&nbsp;
              {message.body}
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export default renderMessagesList;
