import { FaFilePdf, FaImage, FaVideo, FaFileAlt } from "react-icons/fa";
import { Email } from "../interfaces/interfaces";

interface Props {
  emails: Email[];
  selectedEmailId: number | null;
  onEmailSelected: (email: Email) => void;
}

export default function Snoozed({
  emails,
  selectedEmailId,
  onEmailSelected,
}: Props) {
  const getIconByFile = (mimeType: string) => {
    if (mimeType.includes("pdf")) {
      return <FaFilePdf className="text-red-500" />;
    } else if (mimeType.includes("image")) {
      return <FaImage className="text-blue-500" />;
    } else if (mimeType.includes("video")) {
      return <FaVideo className="text-green-500" />;
    } else {
      return <FaFileAlt className="text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      {emails.map((email, index) => (
        <div
          key={index}
          className={`border-b-[1px] border-dark-200 p-4  ${
            selectedEmailId === email.id ? "bg-dark-300" : ""
          }`}
          onClick={() => onEmailSelected(email)}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm">{email.email}</p>
            <p className="text-sm">{formatDate(email.date)}</p>
          </div>
          <p className="text-sm">{email.subject}</p>
          <p className="text-sm text-gray-400 mb-6">{email.body}</p>
          {email.attachment && email.attachment.length > 0 && (
            <div className="flex items-center">
              <div className="flex items-center dark:bg-dark-200 rounded-xl px-2 py-1 mb-6 max-w-fit">
                {getIconByFile(email.attachment[0].type)}
                <p className="ml-1 text-sm">{email.attachment[0].filename}</p>
              </div>
              {email.attachment.length > 1 && (
                <div className="ml-2 dark:bg-dark-200 text-sm flex items-center rounded-xl px-2 py-1 mb-6 max-w-fit">
                  +{email.attachment.length - 1}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
