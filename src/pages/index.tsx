import { useState, useEffect } from 'react';
import { students, keywords, Student } from '../data/students';
import Filter from '../components/Filter';
import StudentBox from '../components/StudentBox';
import Tag from '../components/Tag';

export default function Home() {
  // 선택된 태그를 카테고리별로 관리
  const [selectedTags, setSelectedTags] = useState<Record<string, Set<string>>>({
    class: new Set<string>(),
    categoryA: new Set<string>(),
    categoryB: new Set<string>(),
    categoryC: new Set<string>(),
  });

  // 필터링된 학생 목록
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);
  
  // 확장된 학생 ID
  const [expandedStudentId, setExpandedStudentId] = useState<number | null>(null);

  // 학생 목록을 랜덤하게 섞는 함수
  const shuffleArray = (array: Student[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // 페이지 로드 시 학생 목록을 랜덤하게 섞음
  useEffect(() => {
    setFilteredStudents(shuffleArray(students));
  }, []);

  // 태그 클릭 처리
  const handleTagClick = (category: string, tag: string) => {
    setSelectedTags((prevTags) => {
      const newTags = { ...prevTags };
      const categorySet = new Set(newTags[category]);
      
      if (categorySet.has(tag)) {
        categorySet.delete(tag);
      } else {
        categorySet.add(tag);
      }
      
      newTags[category] = categorySet;
      return newTags;
    });
  };

  // 선택된 태그에 따라 학생 필터링
  useEffect(() => {
    const filtered = students.filter((student) => {
      // 모든 카테고리에 대해 체크
      for (const category of Object.keys(selectedTags)) {
        const selectedTagsInCategory = selectedTags[category];
        
        // 해당 카테고리에 선택된 태그가 있는 경우만 필터링
        if (selectedTagsInCategory.size > 0) {
          // TypeScript에서 student[category]를 직접 사용할 수 없으므로 타입 안전하게 접근
          const studentTag = category === 'class' 
            ? student.class 
            : category === 'categoryA'
              ? student.categoryA
              : category === 'categoryB'
                ? student.categoryB
                : student.categoryC;
                
          if (!selectedTagsInCategory.has(studentTag)) {
            return false;
          }
        }
      }
      return true;
    });
    
    setFilteredStudents(filtered);
    
    // 학생 목록이 필터링되면 확장된 학생 상태 초기화
    if (expandedStudentId && !filtered.some(s => s.id === expandedStudentId)) {
      setExpandedStudentId(null);
    }
  }, [selectedTags]);

  // 학생 박스 클릭 처리
  const handleStudentClick = (studentId: number) => {
    // 이미 확장된 상태에서 다시 클릭하면 닫기
    if (expandedStudentId === studentId) {
      setExpandedStudentId(null);
      return;
    }
    
    // 새로운 학생 박스 클릭 시 확장
    setExpandedStudentId(studentId);
    
    // 스크롤 처리
    setTimeout(() => {
      const element = document.getElementById(`student-${studentId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // 태그 초기화 함수
  const resetTags = () => {
    setSelectedTags({
      class: new Set<string>(),
      categoryA: new Set<string>(),
      categoryB: new Set<string>(),
      categoryC: new Set<string>(),
    });
  };

  return (
    <>
      <div className="px-2 py-2 pb-12">
        <header className="mb-4">
          <div className="filter-row mb-1 single-line" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="filter-title">Class</span>
              {keywords.class.map((keyword) => (
                <Tag
                  key={`class-${keyword}`}
                  text={keyword}
                  category="class"
                  isActive={selectedTags.class.has(keyword)}
                  onClick={() => handleTagClick('class', keyword)}
                />
              ))}
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div className="filter-title title">Communication Design (1): Short Story</div>
            </div>
          </div>
          
          <div className="filters">
            <div className="filter-row mb-1 single-line">
              <div className="left-content">
                <span className="filter-title">Category A</span>
                {keywords.categoryA.map((keyword) => (
                  <Tag
                    key={`categoryA-${keyword}`}
                    text={keyword}
                    category="categoryA"
                    isActive={selectedTags.categoryA.has(keyword)}
                    onClick={() => handleTagClick('categoryA', keyword)}
                  />
                ))}
              </div>
              <div className="right-content">
                <Tag
                  text="Reset"
                  category="categoryA"
                  isActive={false}
                  onClick={resetTags}
                />
              </div>
            </div>
            <div className="filter-row mb-1 single-line">
              <div className="left-content">
                <span className="filter-title">Category B</span>
                {keywords.categoryB.map((keyword) => (
                  <Tag
                    key={`categoryB-${keyword}`}
                    text={keyword}
                    category="categoryB"
                    isActive={selectedTags.categoryB.has(keyword)}
                    onClick={() => handleTagClick('categoryB', keyword)}
                  />
                ))}
              </div>
            </div>
            
            <div className="filter-row mb-1 single-line">
              <div className="left-content">
                <span className="filter-title">Category C</span>
                {keywords.categoryC.map((keyword) => (
                  <Tag
                    key={`categoryC-${keyword}`}
                    text={keyword}
                    category="categoryC"
                    isActive={selectedTags.categoryC.has(keyword)}
                    onClick={() => handleTagClick('categoryC', keyword)}
                  />
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="student-grid">
          {filteredStudents.map((student) => (
            <div 
              key={student.id} 
              id={`student-${student.id}`}
              className="box-item"
            >
              <StudentBox
                student={student}
                isExpanded={expandedStudentId === student.id}
                onClick={() => handleStudentClick(student.id)}
                selectedTags={selectedTags}
              />
            </div>
          ))}
          
          {filteredStudents.length === 0 && (
            <div className="w-full text-center py-8 text-gray-500">
              선택한 태그와 일치하는 학생이 없습니다.
            </div>
          )}
        </div>
      </div>
      
      <footer className="footer">
        Made by Sein Hong for the HIVCD Communication Design (1) class
      </footer>
    </>
  );
} 