const AddPerson = ({
  addName,
  newName,
  updateName,
  newNumber,
  updateNumber,
}) => {
  return (
    <div>
      <h2>add new person</h2>
      <form onSubmit={addName}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={updateName}
            placeholder="Enter name"
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={updateNumber}
            placeholder="enter number"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};
export default AddPerson;
