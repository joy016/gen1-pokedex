import { FaCheck } from 'react-icons/fa';

interface FooterProps {
  handleFilter: (filterBy: string) => void;
}

const Footer: React.FC<FooterProps> = ({ handleFilter }) => {
  return (
    <div className="flex gap-2 items-center fixed bottom-0 w-[90%] md:w-[70%] right-0 left-0 mx-auto justify-center">
      <button
        className="bg-yellow-500 w-1/2 px-10 py-5 md:px-20 md:py-5 md:text-2xl font-semibold rounded-md"
        onClick={() => handleFilter('all')}
      >
        All
      </button>
      <button
        className="flex justify-center items-center w-1/2  bg-red-700 gap-2 px-10 py-5 md:px-20 md:py-5 md:text-2xl font-semibold text-white rounded-md"
        onClick={() => handleFilter('captured')}
      >
        <FaCheck /> Captured
      </button>
    </div>
  );
};

export default Footer;
