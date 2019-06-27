class Enrollment < ApplicationRecord
  belongs_to :user
  belongs_to :course

  def self.my_courses(id)
    find_by_sql([
      "select user_id, course_id, courses.title, courses.overview from enrollments
      left join courses 
      on courses.id = enrollments.course_id
      where user_id = ?", id 
    ])
   
  end
 
  
end
