import React from 'react';
import { Student } from '../data/students';
import Tag from './Tag';
import StudentPopup from './StudentPopup';

type StudentBoxProps = {
  student: Student;
  isExpanded: boolean;
  onClick: () => void;
  selectedTags: Record<string, Set<string>>;
};

const StudentBox: React.FC<StudentBoxProps> = ({ student, isExpanded, onClick, selectedTags }) => {
  return (
    <>
      <div 
        className="student-box dashed-border p-4 bg-gray-100" 
        onClick={onClick}
      >
        <h3 className="student-box-name">{student.name}</h3>
      </div>
      
      {isExpanded && (
        <StudentPopup 
          student={student}
          selectedTags={selectedTags}
          onClose={onClick}
        />
      )}
    </>
  );
};

export default StudentBox; 