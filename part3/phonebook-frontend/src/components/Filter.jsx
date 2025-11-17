const Filter = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      filter shown with <input value={searchTerm} onChange={handleSearch} />
    </div>
  );
};

export default Filter;
