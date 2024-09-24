import {
  GoInbox,
  GoFile,
  GoArchive,
  GoClock,
  GoPaperAirplane,
  GoTrash,
  GoStar,
} from "react-icons/go";
import { Email } from "../interfaces/interfaces";

interface Props {
  emails: Email[];
  selectedSection: string;
  setSelectedSection: (section: string) => void;
}

export default function Menubar({
  emails,
  selectedSection,
  setSelectedSection,
}: Props) {
  const handleMenuClick = (section: string) => {
    setSelectedSection(section);
  };

  const countEmailsByType = (type: string) => {
    return emails.filter((email) => email.type === type.toLowerCase()).length;
  };

  return (
    <ul className="cursor-pointer">
      <li
        className={`flex items-center justify-between rounded-md p-2 transition duration-300 ease-in-out transform ${
          selectedSection === "Inbox" ? "bg-hover text-button" : ""
        }`}
        onClick={() => handleMenuClick("Inbox")}
      >
        <div className="flex items-center">
          <i className="text-[1.38rem]">
            <GoInbox />
          </i>
          <p className="ml-2 text-sm">Inbox</p>
        </div>
        <p className="text-sm">{countEmailsByType("inbox")}</p>
      </li>
      <li
        className={`flex items-center justify-between rounded-md p-2 transition duration-300 ease-in-out transform ${
          selectedSection === "Favorite" ? "bg-hover text-button" : ""
        }`}
        onClick={() => handleMenuClick("Favorite")}
      >
        <div className="flex items-center">
          <i className="text-[1.38rem]">
            <GoStar />
          </i>
          <p className="ml-2 text-sm">Favorite</p>
        </div>
        <p className="text-sm">{countEmailsByType("favorite")}</p>
      </li>
      <li
        className={`flex items-center justify-between rounded-md p-2 transition duration-300 ease-in-out transform ${
          selectedSection === "Draft" ? "bg-hover text-button" : ""
        }`}
        onClick={() => handleMenuClick("Draft")}
      >
        <div className="flex items-center">
          <i className="text-[1.38rem]">
            <GoFile />
          </i>
          <p className="ml-2 text-sm">Draft</p>
        </div>
        <p className="text-sm">{countEmailsByType("draft")}</p>
      </li>
      <li
        className={`flex items-center justify-between rounded-md p-2 transition duration-300 ease-in-out transform ${
          selectedSection === "Archived" ? "bg-hover text-button" : ""
        }`}
        onClick={() => handleMenuClick("Archived")}
      >
        <div className="flex items-center">
          <i className="text-[1.38rem]">
            <GoArchive />
          </i>
          <p className="ml-2 text-sm">Archived</p>
        </div>
        <p className="text-sm">{countEmailsByType("ardchived")}</p>
      </li>
      <li
        className={`flex items-center justify-between rounded-md p-2 transition duration-300 ease-in-out transform ${
          selectedSection === "Snoozed" ? "bg-hover text-button" : ""
        }`}
        onClick={() => handleMenuClick("Snoozed")}
      >
        <div className="flex items-center">
          <i className="text-[1.38rem]">
            <GoClock />
          </i>
          <p className="ml-2 text-sm">Snoozed</p>
        </div>
        <p className="text-sm">{countEmailsByType("snoozed")}</p>
      </li>
      <li
        className={`flex items-center justify-between rounded-md p-2 transition duration-300 ease-in-out transform ${
          selectedSection === "Sent" ? "bg-hover text-button" : ""
        }`}
        onClick={() => handleMenuClick("Sent")}
      >
        <div className="flex items-center">
          <i className="text-[1.38rem]">
            <GoPaperAirplane />
          </i>
          <p className="ml-2 text-sm">Sent</p>
        </div>
        <p className="text-sm">{countEmailsByType("sent")}</p>
      </li>
      <li
        className={`flex items-center justify-between rounded-md p-2 transition duration-300 ease-in-out transform ${
          selectedSection === "Trash" ? "bg-hover text-button" : ""
        }`}
        onClick={() => handleMenuClick("Trash")}
      >
        <div className="flex items-center">
          <i className="text-[1.38rem]">
            <GoTrash />
          </i>
          <p className="ml-2 text-sm">Trash</p>
        </div>
        <p className="text-sm">{countEmailsByType("trash")}</p>
      </li>
    </ul>
  );
}
