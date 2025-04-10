function Course({ courses }) {
  const Header = ({ course }) => {
    return <h2>{course.name}</h2>;
  };

  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };

  const Content = ({ parts }) => {
    return parts.map(part => <Part key={part.id} part={part} />);
  };

  const Total = ({ parts }) => {
    let total = parts.reduce((acc, part) => {
      return acc + part.exercises;
    }, 0);

    return <h4>total of {total} exercises</h4>;
  };

  return courses.map(course => {
    return (
      <div key={course.id}>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  });
}

export default Course;
