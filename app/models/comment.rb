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

  def self.user_info(user_id, id)
    find_by_sql([
      "SELECT 
        c.id AS comment_id,
        user_id AS comment_user_id,
        u.id AS user_id,
        u.name AS user_name,
        u.image AS user_image
      FROM comments AS c 
      JOIN users AS u ON c.user_id = u.id
      WHERE (c.user_id = ? AND c.id = ?)", user_id, id
    ])
  end

end
