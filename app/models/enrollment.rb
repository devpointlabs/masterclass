class Enrollment < ApplicationRecord
  validates_uniqueness_of :user_id, :scope => :course_id
  belongs_to :user
  belongs_to :course
  

  def self.my_courses(id)
    find_by_sql([
      "select user_id, course_id, courses.title, courses.category, courses.overview, courses.image, enrollments.id, enrollments.role from enrollments
      left join courses 
      on courses.id = enrollments.course_id
      where user_id = ?
      order by course_id desc", id 
    ])
  end

  def self.teacher_courses(id)
    find_by_sql([
      "SELECT 
        e.role AS role,
        e.user_id AS e_user_id,
        e.course_id AS e_course_id, 
        c.title AS c_title,
        c.id AS c_id,
        l.course_id AS l_course_id,
        l.name AS lesson_name,
        l.id AS lesson_id, 
        v.lesson_id As v_lesson_id,
        v.title AS video_title,
        v.id AS video_id,
        com.id AS comment_id,
        com.read AS comment_read
      FROM enrollments AS e
      JOIN courses AS c ON c.id = e.course_id
      JOIN lessons AS l ON c.id = l.course_id
      JOIN videos AS v ON l.id = v.lesson_id
      JOIN comments AS com ON v.id = com.video_id
      WHERE (e.user_id = ? AND role = 'teacher' AND com.read = false)
      ORDER BY comment_id", id
    ])
  end
  
end
