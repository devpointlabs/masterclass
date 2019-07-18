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

end
