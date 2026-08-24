interface WelcomeScreenProps {
  loading: boolean;
  chatHistory: ChatHistory[];
}

interface ChatHistory {
  question: string;
  answer: string;
  seq: number;
  chatId: string;
}

interface SuggestionProps {
  title: string;
  description: string;
  onClick: () => void;
}

function WelcomeScreen({
  loading,
  chatHistory,
}: WelcomeScreenProps) {

  const handleSuggestion = (question: string) => {
    console.log("Selected question:", question);

    // Later you can pass this to ChatInput
  };

  /*
   * LOADING
   */
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex items-center gap-2 text-neutral-500">
          <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce [animation-delay:300ms]" />

          <span className="ml-2">
            Thinking...
          </span>
        </div>
      </div>
    );
  }

  /*
   * CHAT HISTORY
   */
  if (chatHistory?.length > 0) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8 pb-32">

          {chatHistory?.map((chat) => (
            <div
              key={`${chat.chatId}-${chat.seq}`}
              className="space-y-6 mb-8"
            >

              {/* USER MESSAGE */}
              <div className="flex justify-end">
                <div className="max-w-[80%] bg-neutral-700 rounded-3xl px-5 py-3">
                  <p className="text-sm md:text-base whitespace-pre-wrap text-white">
                    {chat.question}
                  </p>
                </div>
              </div>

              {/* ASSISTANT MESSAGE */}
              <div className="flex gap-4">

                {/* AI ICON */}
                <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    🤖
                  </span>
                </div>

                {/* ANSWER */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base leading-7 whitespace-pre-wrap text-neutral-200">
                    {chat.answer}
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>
      </div>
    );
  }

  /*
   * NEW CHAT / WELCOME SCREEN
   */
  return (
    <div className="h-full flex flex-col items-center justify-center px-4">

      {/* ICON */}
      <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-600/30 flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M7 3h7l5 5v13H7a2 2 0 01-2-2V5a2 2 0 012-2z"
          />

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M14 3v6h5M9 13h6M9 17h6"
          />
        </svg>
      </div>

      {/* HEADING */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 text-white">
        What can I help you understand?
      </h1>

      <p className="text-neutral-400 text-center max-w-xl mb-10">
        Upload a PDF and ask questions about it. DocMind will
        analyze your document and give you accurate,
        contextual answers.
      </p>

      {/* SUGGESTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">

        <Suggestion
          title="📄 Summarize my PDF"
          description="Give me a short summary of this document"
          onClick={() =>
            handleSuggestion(
              "Give me a short summary of this document"
            )
          }
        />

        <Suggestion
          title="🔍 Find important points"
          description="What are the key ideas in this document?"
          onClick={() =>
            handleSuggestion(
              "What are the key ideas in this document?"
            )
          }
        />

        <Suggestion
          title="💡 Explain simply"
          description="Explain this document like I'm a beginner"
          onClick={() =>
            handleSuggestion(
              "Explain this document like I'm a beginner"
            )
          }
        />

        <Suggestion
          title="❓ Ask a question"
          description="Ask anything about your uploaded PDF"
          onClick={() =>
            handleSuggestion(
              "Ask anything about my uploaded PDF"
            )
          }
        />

      </div>

    </div>
  );
}

function Suggestion({
  title,
  description,
  onClick,
}: SuggestionProps) {
  return (
    <button
      onClick={onClick}
      className="
        text-left
        p-4
        rounded-xl
        border
        border-neutral-700
        hover:bg-neutral-900
        hover:border-neutral-600
        transition
      "
    >
      <p className="font-medium mb-1 text-white">
        {title}
      </p>

      <p className="text-sm text-neutral-500">
        {description}
      </p>
    </button>
  );
}

export default WelcomeScreen;