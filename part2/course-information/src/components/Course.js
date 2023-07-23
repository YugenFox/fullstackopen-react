const Course = ({ course }) => {
  const totalExercises = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  const parts = course.parts.map((part) => (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  ));

  return (
    <div>
      <h2>{course.name}</h2>
      {parts}
      <b>
        <p>Total exercises: {totalExercises}</p>
      </b>
    </div>
  );
};
export default Course;
