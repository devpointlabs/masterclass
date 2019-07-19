class Course < ApplicationRecord
  has_many :enrollments, dependent: :destroy
  has_many :users, through: :enrollments
  has_many :lessons, dependent: :destroy

  def self.get_categories 
    find_by_sql(
      ["select distinct category
      from courses"]
    )
  end

  def self.search_courses(title, overview, category)
    find_by_sql(["
    SELECT *
    FROM courses
    WHERE LOWER(title) LIKE LOWER(?) 
    OR LOWER(overview) LIKE LOWER(?) 
    OR LOWER(category) LIKE LOWER(?)
    ", "%#{title}%", "%#{overview}%", "%#{category}%"])
  end

  def self.course_video_view(id)
    find_by_sql([
      "SELECT
        c.title AS course_title,
        c.id AS course_id,
        l.course_id AS lesson_course_id,
        l.name AS lesson_name,
        l.id AS lesson_id,
        v.lesson_id AS video_lesson_id,
        v.title AS video_title,
        v.id AS video_id
      FROM courses as c
      JOIN lessons AS l ON c.id = l.course_id
      JOIN videos AS v on l.id = v.lesson_id
      WHERE c.id = ?
      ORDER BY video_id", id
    ])
  end

end
