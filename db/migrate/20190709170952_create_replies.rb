class CreateReplies < ActiveRecord::Migration[5.2]
  def change
    create_table :replies do |t|
      t.text :body
      t.belongs_to :comment, foreign_key: true

      t.timestamps
    end
  end
end
