class Enrollment < ApplicationRecord
  validates_uniqueness_of :user_id, :scope => :course_id
  belongs_to :user
  belongs_to :course
  

  def self.my_courses(id)
    find_by_sql([
      "select user_id, course_id, courses.title, courses.overview, enrollments.id from enrollments
      left join courses 
      on courses.id = enrollments.course_id
      where user_id = ?", id 
    ])
   
  end
 
  
end
