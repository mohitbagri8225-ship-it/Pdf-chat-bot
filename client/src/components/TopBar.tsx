import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface ChatHistory {
  question: string;
  answer: string;
  seq: number;
  chatId: string;
}

interface topBarProps {
  chatHistory: React.Dispatch<React.SetStateAction<ChatHistory[]>>;
}


function TopBar({ chatHistory }: topBarProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  // const [uploaded,setuploaded] = useState(false); 


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const { chatId } = useParams<{ chatId: string }>();
  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("pdf", file);

      if (chatId) {
        formData.append("chatId", chatId);
      }

      await axios.post(
        "http://localhost:5000/api/v1/chat/upload-pdf",
        formData,
        {
          withCredentials: true,
        }
      );

      alert("PDF uploaded successfully 🚀");

      setFile(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
        console.log("HEADERS:", error.response?.headers);

        alert(
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Upload failed"
        );
      } else {
        console.log(error);
        alert("Upload failed");
      }
    } finally {
      setUploading(false);
    }
  };


  return (
    <header className="h-18 border-b border-neutral-700 flex items-center justify-between px-6">
      <div>
        <h2 className="font-medium">
          New Chat
        </h2>

        <p className="text-xs text-neutral-500">
          {chatHistory.length == 0 ? "No document selected" : null}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {file && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm font-medium disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Confirm Upload"}
          </button>
        )}

        <label
          htmlFor="pdf-upload"
          className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-sm font-medium"
        >

          {chatHistory.length == 0 ? 'upload Pdf' : 'Update pdf'}

        </label>

        <input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </header>
  );
}

export default TopBar;