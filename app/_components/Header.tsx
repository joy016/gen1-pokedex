import { FaSearch, FaThList } from 'react-icons/fa';
import { IoGridSharp } from 'react-icons/io5';

interface HeaderProps {
  listView: boolean;
  handleChange: () => void;
  headerName: string;
  handleSearch: (e: any) => void;
}

const Header: React.FC<HeaderProps> = ({
  listView,
  handleChange,
  headerName,
  handleSearch,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mt-5 tracking-wider">
        {headerName}
      </h2>
      <div className="flex justify-evenly items-center">
        <div className="md:w-1/2 mt-5">
          <form className="flex items-center justify-between rounded p-3 flex-1 bg-gray-100 gap-2 ">
            <FaSearch className="w-7 h-7" />
            <input
              type="text"
              name="name"
              placeholder="Search"
              className="bg-transparent outline-none flex-1"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </form>
        </div>

        <input />
        {/* view icons */}
        <div className="flex gap-1 md:gap-2 cursor-pointer">
          <FaThList
            className={`w-7 h-7 ${!listView && 'text-gray-300'}`}
            onClick={handleChange}
          />
          <IoGridSharp
            className={`w-7 h-7 ${listView && 'text-gray-300'}`}
            onClick={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
