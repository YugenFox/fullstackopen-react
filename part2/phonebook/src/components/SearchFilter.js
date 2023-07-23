const SearchFilter = ({ filterPersons, handleFilterPersons }) => {
  return (
    <div>
      <h4>filter shown people</h4>
      <input
        value={filterPersons}
        onChange={handleFilterPersons}
        placeholder="search for person"
      />
    </div>
  );
};
export default SearchFilter;
