import React, { useEffect } from 'react';
import { Student } from '../data/students';
import Tag from './Tag';

type StudentPopupProps = {
  student: Student;
  selectedTags: Record<string, Set<string>>;
  onClose: () => void;
};

const StudentPopup: React.FC<StudentPopupProps> = ({ student, selectedTags, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    
    // 스크롤 방지
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content">
        <div className="student-info-row mb-4">
          <h2 className="student-name">{student.name}</h2>
          <div className="student-tags">
            <Tag 
              text={student.class} 
              category="class" 
              isActive={false}
              onClick={(e) => { e?.stopPropagation(); }} 
            />
            <Tag 
              text={student.categoryA} 
              category="categoryA" 
              isActive={false}
              onClick={(e) => { e?.stopPropagation(); }}
            />
            <Tag 
              text={student.categoryB} 
              category="categoryB" 
              isActive={false}
              onClick={(e) => { e?.stopPropagation(); }}
            />
            <Tag 
              text={student.categoryC} 
              category="categoryC" 
              isActive={false}
              onClick={(e) => { e?.stopPropagation(); }}
            />
          </div>
        </div>
        
        <div className="student-story whitespace-pre-line text-left">
          {student.story}
        </div>
      </div>
    </div>
  );
};

export default StudentPopup;