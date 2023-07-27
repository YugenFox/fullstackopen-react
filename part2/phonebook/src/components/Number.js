const Number = ({ name, number, toggleImportance, id, importance, removePerson }) => {
  const label = importance ? "person is important" : "person is not important"

  return (
    <div>
      <p>
        {name} {number}
      </p>
      <button onClick={toggleImportance(id)}>{label}</button>
      <button onClick={removePerson(id, name)}>Remove {name} from list</button>
    </div>
  );
};
export default Number;
