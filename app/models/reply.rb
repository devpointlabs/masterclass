class Reply < ApplicationRecord
  belongs_to :comment
  belongs_to :user

  def self.user_info(user_id, id)
    find_by_sql([
      "SELECT 
        r.id AS reply_id,
        user_id AS reply_user_id,
        u.id AS user_id,
        u.name AS user_name,
        u.image AS user_image
      FROM replies AS r
      JOIN users AS u ON r.user_id = u.id
      WHERE (r.user_id = ? AND r.id = ?)", user_id, id
    ])
  end

end
