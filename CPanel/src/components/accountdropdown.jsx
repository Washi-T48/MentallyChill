import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const AccountDropdown = ({ accounts, onChangeAccount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleAccountChange = (account) => {
    setSelectedAccount(account);
    onChangeAccount(account);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="">
        <RiArrowDropDownLine
          color="white"
          className="w-12 h-12"
          onClick={toggleDropdown}
        />
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {accounts.map((account) => (
              <button
                key={account}
                onClick={() => handleAccountChange(account)}
                className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
                tabIndex="-1"
              >
                {account}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
