import { useState } from "react";

const selections = {
  title: ["Mr.", "Mrs.", "Ms.", "Dr."],
  firstName: ["John", "Micheal", "Elizabeth"],
  lastName: ["Lennon", "Jackson", "Jordan", "Legend", "Taylor"],
};
const useDataSelections = () => {
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([2024, 2025]);
  const [day, setDay] = useState([]);

  return {
    day,
    year,
    month,
  };
};
