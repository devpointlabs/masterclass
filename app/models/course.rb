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

end
