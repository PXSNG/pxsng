from Types.Course import Course

class CoursesCalls:
    def __init__(self):
        dummy_courses =  [
            Course(title="OracleDB in Python", 
                   id=1, 
                   price=1.99, 
                   description="Python", 
                   duration_days=1,
                   max_participants=2,
                   category_id=1),
            Course(title="React in Typescript",
                   id=2,
                   price=2.99,
                   description="React",
                   duration_days=1,
                   max_participants=3,
                   category_id=1)
        ]
        self.Courses = dummy_courses     
        
    def GetAllCourses(self) -> list[Course]:
        return self.Courses

