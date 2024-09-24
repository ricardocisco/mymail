import { useState } from "react";
import Menubar from "./components/Menubar";
import Inbox from "./pages/Inbox";
import Favorite from "./pages/Favorite";
import Archived from "./pages/Archived";
import Snoozed from "./pages/Snoozed";
import Sent from "./pages/Sent";
import Draft from "./pages/Draft";
import Trash from "./pages/Trash";
import { data } from "./data/data.ts";
import { Email } from "./interfaces/interfaces.tsx";
import {
  GoArrowLeft,
  GoArchive,
  GoStar,
  GoTag,
  GoClock,
  GoReply,
  GoLink,
  GoPaperAirplane,
  GoKebabHorizontal,
  GoReport,
  GoTrash,
  GoMail,
  GoX,
  GoPlus,
} from "react-icons/go";
import {
  IoMdSettings,
  IoIosHelpBuoy,
  IoIosJournal,
  IoIosPerson,
  IoIosRefresh,
} from "react-icons/io";
import { label } from "./data/label.ts";
import { folder } from "./data/folders.ts";

export default function App() {
  const [selectedSection, setSelectedSection] = useState<string>("Inbox");
  const [modal, setModal] = useState(false);
  const [modalConfig, setModalConfig] = useState(false);
  const [modalLabel, setModalLabel] = useState(false);
  const [modalFolder, setModalFolder] = useState(false);
  const [emails] = useState(data);
  const [labels, setLabels] = useState(label);
  const [newLabel, setNewLabel] = useState("");
  const [newLabelColor, setNewLabelColor] = useState("bg-label_d");
  const [folders, setFolders] = useState(folder);
  const [newFolder, setNewFolder] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const filteredEmails = emails.filter(
    (email) =>
      email.type === selectedSection.toLowerCase() &&
      (email.subject.toLowerCase().includes(query.toLowerCase()) ||
        email.body.toLowerCase().includes(query.toLowerCase()) ||
        email.nome.toLowerCase().includes(query.toLowerCase()))
  );
  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModalConfig = () => {
    setModalConfig(!modalConfig);
  };
  const toggleModalLabel = () => {
    setModalLabel(!modalLabel);
  };
  const toggleModalFolder = () => {
    setModalFolder(!modalFolder);
  };
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const handleEmailSelect = (email: Email) => {
    setSelectedEmailId(email.id);
    setSelectedEmail(email);
    setIsLoading(true);

    setTimeout(() => {
      setSelectedEmail(email);
      setIsLoading(false);
    }, 1500);
  };

  const handleAddLabel = () => {
    if (newLabel.trim() !== "") {
      setLabels([...labels, { name: newLabel, color: newLabelColor }]);
      setNewLabel("");
    }
  };

  const handleAddFolder = () => {
    setFolders([...folders, { nome: newFolder }]);
    setNewFolder("");
  };

  const renderEmailList = () => {
    const renderEmail = filteredEmails;
    if (renderEmail.length === 0) {
      return <p className="dark:text-white text-center">Empty List</p>;
    }

    switch (selectedSection) {
      case "Inbox":
        return (
          <Inbox
            emails={filteredEmails}
            selectedEmailId={selectedEmailId}
            onEmailSelected={handleEmailSelect}
          />
        );
      case "Favorite":
        return <Favorite />;
      case "Archived":
        return (
          <Archived
            emails={filteredEmails}
            selectedEmailId={selectedEmailId}
            onEmailSelected={handleEmailSelect}
          />
        );
      case "Snoozed":
        return (
          <Snoozed
            emails={filteredEmails}
            selectedEmailId={selectedEmailId}
            onEmailSelected={handleEmailSelect}
          />
        );
      case "Sent":
        return (
          <Sent
            emails={filteredEmails}
            selectedEmailId={selectedEmailId}
            onEmailSelected={handleEmailSelect}
          />
        );
      case "Draft":
        return (
          <Draft
            emails={filteredEmails}
            selectedEmailId={selectedEmailId}
            onEmailSelected={handleEmailSelect}
          />
        );
      case "Trash":
        return (
          <Trash
            emails={filteredEmails}
            selectedEmailId={selectedEmailId}
            onEmailSelected={handleEmailSelect}
          />
        );
      default:
        return (
          <Inbox
            emails={filteredEmails}
            selectedEmailId={selectedEmailId}
            onEmailSelected={handleEmailSelect}
          />
        );
    }
  };

  return (
    <div className="h-screen w-screen flex">
      <div className="dark:text-white flex flex-col dark:bg-dark-300 w-60z p-6 justify-between">
        <div className="flex flex-col">
          <div className="flex items-center">
            <p className="mr-2">Mymail</p>
            <i className="text-xl">
              <GoMail />
            </i>
          </div>
          <button
            className="bg-button rounded-md px-16 py-[0.4rem] text-sm mb-4 mt-4"
            onClick={toggleModal}
          >
            Compose
          </button>
        </div>
        <Menubar
          emails={emails}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
        <div>
          <div className="flex items-center justify-between">
            <p>Labels</p>
            <button className="cursor-pointer" onClick={toggleModalLabel}>
              <GoPlus />
            </button>
          </div>
          <ul>
            {labels.map((label, index) => (
              <div key={index} className="flex items-center cursor-pointer">
                <span className={`${label.color} w-2 h-2`}></span>
                <p className="text-sm ml-2">{label.name}</p>
              </div>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p>Folders</p>
            <button className="cursor-pointer" onClick={toggleModalFolder}>
              <GoPlus />
            </button>
          </div>
          <ul>
            {folders.map((folder, index) => (
              <div
                key={index}
                className="flex justify-between items-center cursor-pointer my-2 hover:bg-hover hover:text-button p-2 rounded-lg"
              >
                <p className="text-sm">{folder.nome}</p>
                <p className="text-sm">18</p>
              </div>
            ))}
          </ul>
        </div>
        <div
          className="bg-dark-200 flex items-center justify-between rounded-lg p-2 cursor-pointer"
          onClick={toggleModalConfig}
        >
          <div>
            <p className="text-sm">John Doe</p>
            <p className="text-sm text-gray-400">johndoe@mymail.com</p>
          </div>
          <i>
            <GoKebabHorizontal />
          </i>
        </div>
        {modalLabel && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleModalLabel}
          >
            <div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark-300 rounded-lg p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex py-2 w-full border-b-[1px] border-dark-200">
                <p>New Label</p>
              </div>
              <div className="flex flex-col py-2 w-full border-dark-200">
                <div className="flex flex-col">
                  <span>Label Name</span>
                  <input
                    className="bg-dark-200 rounded-lg px-2 focus:outline-none mt-2"
                    type="text"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="New label"
                  />
                  <select
                    value={newLabelColor}
                    onChange={(e) => setNewLabelColor(e.target.value)}
                    className="mt-2 bg-dark-200 rounded-lg px-2 focus:outline-none"
                  >
                    <option value="bg-label_d">Cor 1</option>
                    <option value="bg-label_b">Cor 2</option>
                    <option value="bg-label_c">Cor 3</option>
                  </select>
                  <div className={`mt-2 w-10 h-10 ${newLabelColor} border`} />
                </div>
              </div>
              <div className="flex justify-between py-2 w-full border-t-[1px] border-dark-200">
                <button
                  className="border-[1px] px-2 rounded-md w-fit"
                  onClick={toggleModalLabel}
                >
                  Cancel
                </button>
                <button
                  className="ml-2 bg-button px-2 rounded-md w-fit"
                  onClick={handleAddLabel}
                >
                  Create Label
                </button>
              </div>
            </div>
          </div>
        )}
        {modalFolder && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleModalFolder}
          >
            <div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark-300 rounded-lg p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex py-2 w-full border-b-[1px] border-dark-200">
                <p>New Folder</p>
              </div>
              <div className="flex flex-col py-2 w-full border-dark-200">
                <div className="flex flex-col">
                  <span>Folder Name</span>
                  <input
                    className="bg-dark-200 rounded-lg px-2 focus:outline-none mt-2"
                    type="text"
                    value={newFolder}
                    onChange={(e) => setNewFolder(e.target.value)}
                    placeholder="New folder"
                  />
                </div>
              </div>
              <div className="flex justify-between py-2 w-full border-t-[1px] border-dark-200">
                <button
                  className="border-[1px] px-2 rounded-md w-fit"
                  onClick={toggleModalFolder}
                >
                  Cancel
                </button>
                <button
                  className="ml-2 bg-button px-2 rounded-md w-fit"
                  onClick={handleAddFolder}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
        {modalConfig && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleModalConfig}
          >
            <div
              className="fixed top-1/2 left-1/2 w-96 h-96 transform -translate-x-1/2 -translate-y-1/2 bg-dark-300 rounded-lg p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between border-b-[1px] border-dark-200">
                <div className="flex items-center py-2">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKEzrhJVtjVXLV0qPopqhS-eR5aS5fMvH6hg&s"
                    alt="foto_perfil"
                    className="text-sm w-14 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-sm">John Doe</p>
                    <p className="text-sm">johndoe@mymail.com</p>
                  </div>
                </div>
                <button className="text-2xl" onClick={toggleModalConfig}>
                  <GoX />
                </button>
              </div>
              <div>
                <ul>
                  <div className="flex items-center cursor-pointer hover:text-button my-4">
                    <i>
                      <IoMdSettings />
                    </i>
                    <p className="ml-2">Settings</p>
                  </div>
                  <div className="flex items-center cursor-pointer hover:text-button my-4">
                    <i>
                      <IoIosJournal />
                    </i>
                    <p className="ml-2">Meetings</p>
                  </div>
                  <div className="flex items-center cursor-pointer hover:text-button my-4">
                    <i>
                      <IoIosHelpBuoy />
                    </i>
                    <p className="ml-2">Help</p>
                  </div>
                  <div className="flex items-center cursor-pointer hover:text-button my-4">
                    <i>
                      <IoIosRefresh />
                    </i>
                    <p className="ml-2">Sync emails</p>
                  </div>
                  <div className="flex items-center cursor-pointer hover:text-button my-4">
                    <i>
                      <IoIosPerson />
                    </i>
                    <p className="ml-2">Manage Accounts</p>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        )}
        {modal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleModal}
          >
            <div
              className="fixed top-4 right-4 bottom-4 rounded-lg w-1/2 bg-dark-300 p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="border-b-[1px] border-dark-200 py-2 text-start">
                New Message
              </p>
              <div className="flex items-center py-2 border-b-[1px] border-dark-200">
                <p className="mr-10">Subject:</p>
                <input
                  type="text"
                  className="bg-transparent focus:outline-none"
                  placeholder="type your subject"
                />
              </div>
              <div className="py-2 h-3/4">
                <textarea
                  className="w-full h-full bg-transparent focus:outline-none resize-none"
                  placeholder="Type your body"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <div className="flex flex-col mb-8">
                <div className="flex items-center">
                  <p className="mr-2">Attachment</p>
                  <i>
                    <GoLink />
                  </i>
                </div>
                <div className="flex items-center bg-dark-200 rounded-md px-2 max-w-fit">
                  <i>
                    <GoLink />
                  </i>
                  <p className="ml-2">Teste.pdf</p>
                </div>
              </div>
              <div className="flex justify-end py-2 w-full border-t-[1px] border-dark-200">
                <button
                  className="border-[1px] p-2 rounded-md w-fit"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button className="ml-2 bg-button p-2 rounded-md w-fit">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="dark:text-white border-[1px] dark:border-dark-300 rounded-lg w-96">
        <div className="flex p-4 justify-between border-b-[1px] dark:border-dark-300 items-center">
          <h2>{selectedSection}</h2>
          <input
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="dark:bg-dark-300 w-60 rounded-lg p-1 focus:outline-none"
          />
        </div>
        {renderEmailList()}
      </div>
      <div className="dark:text-white border-[1px] border-dark-300 rounded-lg flex-1">
        <div className="flex p-5 border-b-[1px] border-dark-300 items-center">
          <button
            disabled={isLoading}
            className={`text-2xl hover:text-button ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              setSelectedEmail(null);
              setSelectedEmailId(null);
            }}
          >
            <GoArrowLeft />
          </button>
          <button className="text-xl ml-4 hover:text-button">
            <GoArchive />
          </button>
          <button className="text-xl ml-3 hover:text-button">
            <GoReport />
          </button>
          <button className="text-xl ml-3 hover:text-button">
            <GoTrash />
          </button>
          <button className="text-xl ml-4 hover:text-button">
            <GoClock />
          </button>
          <button className="text-xl ml-3 hover:text-button">
            <GoTag />
          </button>
          <button className="text-xl ml-3 hover:text-button">
            <GoKebabHorizontal />
          </button>
        </div>
        <div>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="flex justify-between px-6 py-4 border-b-[1px] border-dark-300">
                <div className="flex items-center text-sm">
                  <h3 className="bg-dark-300 w-[500px] p-1 rounded-md"></h3>
                  <p className="ml-2 bg-dark-300 w-[500px] p-1 rounded-md"></p>
                </div>
                <div className="flex items-center">
                  <i className="mr-2 text-xl">
                    <GoLink />
                  </i>
                  <p className="mr-2 bg-dark-300 w-[24px] p-1 rounded-md"></p>
                  <i className="mr-2 text-xl">
                    <GoReply />
                  </i>
                  <i className="mr-2 text-xl">
                    <GoPaperAirplane />
                  </i>
                  <i className="mr-2 text-xl">
                    <GoStar />
                  </i>
                  <i className="mr-2 text-xl">
                    <GoKebabHorizontal />
                  </i>
                </div>
              </div>
              <div className="p-6">
                <p className="bg-dark-300 w-[500px] p-2 rounded-md"></p>
                <p className="mt-4 bg-dark-300 w-[500px] p-8 rounded-md"></p>
                <div className="mt-4">
                  <div className="mt-4 bg-dark-300 w-[500px] p-28 rounded-md"></div>
                  <div className="flex mt-2">
                    <div className="mr-4 flex">
                      <div className="bg-dark-300 max-w-fit p-8 m-2 rounded-lg flex items-center">
                        <div>
                          <p className="text-sm ml-4"></p>
                          <p className="text-sm ml-4"></p>
                        </div>
                      </div>
                      <div className="bg-dark-300 max-w-fit p-8 m-2 rounded-lg flex items-center">
                        <div>
                          <p className="text-sm ml-4"></p>
                          <p className="text-sm ml-4"></p>
                        </div>
                      </div>
                      <div className="bg-dark-300 max-w-fit p-8 m-2 rounded-lg flex items-center">
                        <div>
                          <p className="text-sm ml-4"></p>
                          <p className="text-sm ml-4"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : selectedEmail ? (
            <div>
              <div className="flex justify-between px-6 py-4 border-b-[1px] border-dark-300">
                <div className="flex items-center text-sm">
                  <h3>{selectedEmail.nome}</h3>
                  <p className="ml-2 text-gray-400">{selectedEmail.email}</p>
                </div>
                <div className="flex items-center">
                  <i className="mr-2 text-xl">
                    <GoLink />
                  </i>
                  <p className="mr-2">{formatDate(selectedEmail.date)}</p>
                  <i className="mr-2 text-xl">
                    <GoReply />
                  </i>
                  <i className="mr-2 text-xl">
                    <GoPaperAirplane />
                  </i>
                  <i className="mr-2 text-xl">
                    <GoStar />
                  </i>
                  <i className="mr-2 text-xl">
                    <GoKebabHorizontal />
                  </i>
                </div>
              </div>
              <div className="p-6">
                <p className="text-2xl">{selectedEmail.subject}</p>
                <p className="mt-2 text-sm">{selectedEmail.body}</p>
                {selectedEmail.attachment &&
                selectedEmail.attachment.length > 0 ? (
                  <div className="mt-2">
                    <img
                      src={selectedEmail.attachment[0].url}
                      alt={selectedEmail.attachment[0].filename}
                      className="w-1/2 rounded-md mb-5"
                    />
                    <div className="flex">
                      {selectedEmail.attachment.map((attachment, index) => (
                        <div key={index} className="mr-4">
                          <div className="bg-dark-300 max-w-fit p-2 rounded-lg flex items-center">
                            <img
                              className="w-20 rounded-lg"
                              src={attachment.url}
                              alt={attachment.filename}
                            ></img>
                            <div>
                              <p className="text-sm ml-4">
                                {attachment.filename}
                              </p>
                              <p className="text-sm ml-4">3,6MB</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm">Este email não possui anexo.</p>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
