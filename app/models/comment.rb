class Comment < ApplicationRecord
  belongs_to :video
  belongs_to :user
  has_many :replies, dependent: :destroy

  def self.toggle_read(id)
    find_by_sql([
      "UPDATE comments
      SET read = true
      WHERE id = ?", id
    ])
  end

end
